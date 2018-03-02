import 'package:chronosgl/chronosgl.dart';
import 'package:vector_math/vector_math.dart' as VM;
import 'dart:html' as HTML;

final HTML.InputElement gLuminance = HTML.document.querySelector('#luminance');
final HTML.InputElement gIntensity = HTML.document.querySelector('#intensity');

const int radius = 6;

void main() {
  HTML.CanvasElement canvas = HTML.document.querySelector('#webgl-canvas');
  ChronosGL cgl = new ChronosGL(canvas, faceCulling: true);
  OrbitCamera orbit = new OrbitCamera(165.0, 0.0, 0.0, canvas);
  Perspective perspective = new Perspective(orbit, 0.1, 1000.0);

  final width = canvas.clientWidth;
  final height = canvas.clientHeight;
  canvas.width = width;
  canvas.height = height;
  perspective.AdjustAspect(width, height);

  final Framebuffer screen = new Framebuffer.Screen(cgl);
  final Framebuffer fb = new Framebuffer.Default(cgl, width, height);
  final Framebuffer fb1 = new Framebuffer.Default(cgl, width ~/ 2, height ~/ 2);
  final Framebuffer fb2 = new Framebuffer.Default(cgl, width ~/ 2, height ~/ 2);

  final RenderProgram progPerlinNoise = new RenderProgram("perlin", cgl,
      perlinNoiseVertexShader, makePerlinNoiseColorFragmentShader(true));

  final RenderProgram progHighPass = new RenderProgram("highpass", cgl,
      effectVertexShader, luminosityHighPassFragmentShader);

  final List<ShaderObject> bloomShaders =
      createBloomTextureShader(radius, radius * 1.0);

  final RenderProgram progBloom =
      new RenderProgram("bloom", cgl, bloomShaders[0], bloomShaders[1]);

  final RenderProgram progApplyBloom = new RenderProgram("bloom", cgl,
      applyBloomEffectVertexShader, applyBloomEffectFragmentShader);

  assert(progApplyBloom.HasCompatibleAttributesTo(progHighPass));
  assert(progApplyBloom.HasCompatibleAttributesTo(progBloom));
  final MeshData unitQuad = ShapeQuad(progApplyBloom, 1);

  final Material material = new Material("mat")
    ..SetUniform(uTransformationMatrix, new VM.Matrix4.identity())
    ..SetUniform(uModelMatrix, new VM.Matrix4.identity());

  MeshData torus = ShapeTorusKnot(progPerlinNoise);

  // Note: the input uTexture varies between the various UniformGroups
  UniformGroup uniformsHighPass = new UniformGroup("uniformsHighPass")
    ..SetUniform(uRange, new VM.Vector2(0.65, 0.65 + 0.01))
    ..SetUniform(uColorAlpha, new VM.Vector4.zero())
    ..SetUniform(uTexture, fb.colorTexture);

  UniformGroup uniformsBloomH = new UniformGroup("Bloom Horizontal")
    ..SetUniform(uDirection, new VM.Vector2(1.5, 0.0))
    ..SetUniform(uTexture, fb2.colorTexture);

  UniformGroup uniformsBloomV = new UniformGroup("Bloom Vertical")
    ..SetUniform(uDirection, new VM.Vector2(0.0, 1.5))
    ..SetUniform(uTexture, fb1.colorTexture);

  UniformGroup uniformsApply = new UniformGroup("uniformApply")
    ..SetUniform(uTexture, fb.colorTexture)
    ..SetUniform(uScale, 0.6)
    ..SetUniform(uColor, ColorWhite)
    ..SetUniform(uTexture2, fb2.colorTexture);

  double _lastTimeMs = 0.0;
  void animate(num timeMs) {
    double elapsed = timeMs - _lastTimeMs;
    _lastTimeMs = timeMs + 0.0;
    orbit.azimuth += 0.01;
    orbit.animate(elapsed);
    material.ForceUniform(uTime, timeMs / 1000.0);

    // Draw un-bloomed object to fb
    fb.Activate(GL_CLEAR_ALL, 0, 0, width, height);
    progPerlinNoise.Draw(torus, [perspective, material]);

    // Copy high intensity areas from fb to fb2
    fb2.Activate(GL_CLEAR_ALL, 0, 0, width ~/ 2, height ~/ 2);
    double lum = gLuminance.valueAsNumber * 1.0;
    uniformsHighPass.ForceUniform(uRange, new VM.Vector2(lum, lum + 0.01));
    progHighPass.Draw(unitQuad, [perspective, uniformsHighPass]);

    // Blur fb2 to fb1 horizontally
    fb1.Activate(GL_CLEAR_ALL, 0, 0, width ~/ 2, height ~/ 2);
    progBloom.Draw(unitQuad, [perspective, uniformsBloomH]);

    // Blur fb1 to fb2 vertically
    fb2.Activate(GL_CLEAR_ALL, 0, 0, width ~/ 2, height ~/ 2);
    progBloom.Draw(unitQuad, [perspective, uniformsBloomV]);

    // Put all together: combine un-bloomed fb with fb2 and show result on screen
    screen.Activate(GL_CLEAR_ALL, 0, 0, width, height);
    uniformsApply.ForceUniform(uScale, gIntensity.valueAsNumber * 1.0);
    progApplyBloom.Draw(unitQuad, [perspective, uniformsApply]);

    HTML.window.animationFrame.then(animate);
  }

  animate(0.0);
}

import 'dart:html' as HTML;
import 'dart:async';
import 'package:chronosgl/chronosgl.dart';

void main() {
  StatsFps fps =
      new StatsFps(HTML.document.getElementById("stats"), "blue", "gray");

  HTML.CanvasElement canvas = HTML.document.querySelector('#webgl-canvas');
  ChronosGL cgl = new ChronosGL(canvas);
  OrbitCamera orbit = new OrbitCamera(15.0, 10.0, 0.0, canvas);
  Perspective perspective = new Perspective(orbit, 0.1, 1000.0);

  RenderPhase phase = new RenderPhase("main", cgl);
  Scene scene = new Scene(
      "objects",
      new RenderProgram(
          "solid", cgl, texturedVertexShader, texturedFragmentShader),
      [perspective]);
  phase.add(scene);

  final Material matGradient = new Material("cube");

  Node cube = new Node("cube", ShapeCube(scene.program), matGradient)
    ..setPos(-5.0, 0.0, -5.0);
  scene.add(cube);

  void resolutionChange(HTML.Event ev) {
    int w = canvas.clientWidth;
    int h = canvas.clientHeight;
    canvas.width = w;
    canvas.height = h;
    print("size change $w $h");
    perspective.AdjustAspect(w, h);
    phase.viewPortW = w;
    phase.viewPortH = h;
  }

  resolutionChange(null);
  HTML.window.onResize.listen(resolutionChange);

  HTML.VideoElement video;
  ImageTexture texture;

  double _lastTimeMs = 0.0;
  void animate(num timeMs) {
    double elapsed = timeMs - _lastTimeMs;
    _lastTimeMs = timeMs + 0.0;
    orbit.azimuth += 0.001;
    orbit.animate(elapsed);
    try {
      // Get new image from camera and update texture with it.
      texture.Update();
    } catch (exception) {
      print(exception);
    }
    List<DrawStats> stats = [];
    phase.Draw(stats);
    List<String> out = [];
    for (DrawStats d in stats) {
      out.add(d.toString());
    }

    fps.UpdateFrameCount(_lastTimeMs, out.join("<br>"));

    HTML.window.animationFrame.then(animate);
  }

  List<Future<Object>> futures = [
    MakeVideoElementFromCamera(),
    //LoadVideo("movie.ogv"),
  ];

  Future.wait(futures).then((List list) {
    video = list[0];
    if (video == null) {
      HTML.window.alert("Could not access camera - do you have a camera installed?");
    }
    texture = new ImageTexture(cgl, "video", video, TexturePropertiesVideo);
    matGradient.SetUniform(uTexture, texture);
    animate(0.0);
  });
}

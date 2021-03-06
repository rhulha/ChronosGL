// This is not really a test
@TestOn("dartium")

import 'dart:html' as HTML;
import 'dart:web_gl' as WEBGL;

import 'package:chronosgl/chronosgl.dart';
import "package:test/test.dart";

void main() {
  test("show_extensions", () {
    HTML.CanvasElement canvas = new HTML.CanvasElement(width: 200, height: 200);
    ChronosGL chronosGL = new ChronosGL(canvas);
    List exts = chronosGL.getSupportedExtensions();
    for (var e in exts) {
      print(e);
    }
    WEBGL.DebugRendererInfo di =
        chronosGL.getExtension('WEBGL_debug_renderer_info');
    print(di);
    print(chronosGL.getParameter(GL_UNMASKED_VENDOR_WEBGL));
    print(chronosGL.getParameter(GL_UNMASKED_RENDERER_WEBGL));
  });

  print("PASS");
}

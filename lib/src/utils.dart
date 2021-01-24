part of chronosgl;

class Utils {
  ChronosGL chronosGL;
  RenderingContext gl;
  TextureCache textureCache;

  Utils(this.chronosGL) {
    gl = chronosGL.getRenderingContext();
    textureCache = chronosGL.getTextureCache();
  }

  Texture createTextureFromCanvas(HTML.CanvasElement canvas, {int minFilter: WebGL.LINEAR, int magFilter: WebGL.LINEAR, bool mipmap: false, bool flipY: true}) {
    var texture = gl.createTexture();
    gl.bindTexture(WebGL.TEXTURE_2D, texture);
    if (flipY) {
      gl.pixelStorei(WebGL.UNPACK_FLIP_Y_WEBGL, 1);
    }
    gl.texImage2D(WebGL.TEXTURE_2D, 0, WebGL.RGBA, WebGL.RGBA, WebGL.UNSIGNED_BYTE, canvas);
    gl.texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_MAG_FILTER, magFilter);
    if (mipmap) {
      gl.generateMipmap(WebGL.TEXTURE_2D);
    }
    gl.bindTexture(WebGL.TEXTURE_2D, null);
    return texture;
  }

  Texture createSolidTexture(String fillStyle) {
    HTML.CanvasElement canvas = new HTML.CanvasElement(width: 2, height: 2);
    HTML.CanvasRenderingContext2D ctx = canvas.getContext('2d');
    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return createTextureFromCanvas(canvas);
  }

  Texture createCheckerboardTexture() {
    var pixels = new Uint8List.fromList([255, 255, 255, 0, 0, 0, 0, 0, 0, 255, 255, 255]);
    var texture = gl.createTexture();
    gl.bindTexture(WebGL.TEXTURE_2D, texture);
    gl.texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_WRAP_S, WebGL.CLAMP_TO_EDGE);
    gl.texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_WRAP_T, WebGL.CLAMP_TO_EDGE);
    gl.texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_MIN_FILTER, WebGL.NEAREST);
    gl.texParameteri(WebGL.TEXTURE_2D, WebGL.TEXTURE_MAG_FILTER, WebGL.NEAREST);
    //  gl.texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, LINEAR);
    //  gl.texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, LINEAR);
    gl.pixelStorei(WebGL.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(WebGL.TEXTURE_2D, 0, WebGL.RGB, 2, 2, 0, WebGL.RGB, WebGL.UNSIGNED_BYTE, pixels);
    return texture;
  }

  HTML.CanvasElement createCanvas(HTML.CanvasElement canvas, callback(HTML.CanvasRenderingContext2D ctx), [int size = 512]) {
    if (canvas == null) canvas = new HTML.CanvasElement(width: size, height: size);
    HTML.CanvasRenderingContext2D context = canvas.getContext('2d');
    callback(context);
    return canvas;
  }

  HTML.CanvasElement createGradientImage2(double time, HTML.CanvasElement canvas) {
    int d = 512;
    return createCanvas(canvas, (HTML.CanvasRenderingContext2D ctx) {
      double sint = Math.sin(time);
      double n = (sint + 1) / 2;
      ctx.rect(0, 0, d, d);
      HTML.CanvasGradient grad = ctx.createLinearGradient(0, 0, d * n, d);
      double cs1 = (360 * n).floorToDouble();
      double cs2 = (90 * n).floorToDouble();
      grad.addColorStop(0, 'hsla($cs1, 100%, 40%, 1)');
      grad.addColorStop(0.2, 'black');
      grad.addColorStop(0.3, 'black');
      grad.addColorStop(0.5, 'hsla($cs2, 100%, 40%, 1)');
      grad.addColorStop(0.7, 'black');
      grad.addColorStop(0.9, 'black');
      grad.addColorStop(1, 'hsla($cs1, 100%, 40%, 1)');
      ctx.fillStyle = grad;
      ctx.fill();
    });
  }

  Texture createParticleTexture() {
    return createTextureFromCanvas(createParticleCanvas());
  }

  HTML.CanvasElement createParticleCanvas() {
    int d = 64;
    return createCanvas(null, (HTML.CanvasRenderingContext2D ctx) {
      int x = d ~/ 2, y = d ~/ 2;

      var gradient = ctx.createRadialGradient(x, y, 1, x, y, 22);
      gradient.addColorStop(0, 'gray');
      gradient.addColorStop(1, 'black');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, d, d);

      gradient = ctx.createRadialGradient(x, y, 1, x, y, 6);
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(1, 'gray');

      ctx.globalAlpha = 0.9;
      ctx.fillStyle = gradient;
      ctx.arc(x, y, 4, 0, 2 * Math.pi);
      ctx.fill();
    }, d);
  }

  // TODO: think about deprecating this
  Mesh createQuad(Texture texture, int size) {
    List<double> verts = [-1.0 * size, -1.0 * size, 0.0, 1.0 * size, -1.0 * size, 0.0, 1.0 * size, 1.0 * size, 0.0, -1.0 * size, 1.0 * size, 0.0];

    List<double> textureCoords = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];

    List<int> vertexIndices = [0, 1, 2, 0, 2, 3];
    return new Mesh(new MeshData(vertices: verts, textureCoords: textureCoords, vertexIndices: vertexIndices), texture: texture);
  }

  void addSkycube(Texture cubeTexture) {
    ShaderProgram cm = chronosGL.createProgram(createCubeMapShader());
    Mesh m = createCubeInternal().multiplyVertices(512).createMesh();
    m.textureCube = cubeTexture;
    cm.addFollowCameraObject(m);
  }

  void addSkybox(String prefix, String suffix, String nx, String px, String nz, String pz, String ny, String py) {
    Texture tnx = textureCache.get(prefix + nx + suffix);
    Texture tpx = textureCache.get(prefix + px + suffix);
    Texture tnz = textureCache.get(prefix + nz + suffix);
    Texture tpz = textureCache.get(prefix + pz + suffix);
    Texture tny = textureCache.get(prefix + ny + suffix);
    Texture tpy = textureCache.get(prefix + py + suffix);

    Mesh skybox_nx = createQuad(tnx, 1004);
    skybox_nx.setPos(-2.0, 2.0, -1000.0);
    chronosGL.programBasic.addFollowCameraObject(skybox_nx);

    Mesh skybox_px = createQuad(tpx, 1004);
    skybox_px.setPos(-2.0, 2.0, 1000.0);
    skybox_px.rotY(Math.pi);
    chronosGL.programBasic.addFollowCameraObject(skybox_px);

    Mesh skybox_nz = createQuad(tnz, 1004);
    skybox_nz.setPos(-1000.0, 2.0, -2.0);
    skybox_nz.rotY(0.5 * Math.pi);
    chronosGL.programBasic.addFollowCameraObject(skybox_nz);

    Mesh skybox_pz = createQuad(tpz, 1004);
    skybox_pz.setPos(1000.0, 2.0, -2.0);
    skybox_pz.rotY(1.5 * Math.pi);
    chronosGL.programBasic.addFollowCameraObject(skybox_pz);

    Mesh skybox_ny = createQuad(tny, 1004);
    skybox_ny.setPos(-2.0, -1000.0, -2.0);
    skybox_ny.rotX(1.5 * Math.pi);
    skybox_ny.rotZ(1.5 * Math.pi);
    chronosGL.programBasic.addFollowCameraObject(skybox_ny);

    Mesh skybox_py = createQuad(tpy, 1004);
    skybox_py.setPos(-2.0, 1000.0, -2.0);
    skybox_py.rotX(0.5 * Math.pi);
    skybox_py.rotZ(0.5 * Math.pi);
    chronosGL.programBasic.addFollowCameraObject(skybox_py);
  }

  @deprecated // use chronosGL.shapes.create...
  MeshData createIcosahedron([int subdivisions = 4]) {
    return new Icosahedron(subdivisions);
  }

  @deprecated // use chronosGL.shapes.create...
  MeshData createCube({double x: 1.0, double y: 1.0, double z: 1.0, double uMin: 0.0, double uMax: 1.0, double vMin: 0.0, double vMax: 1.0}) {
    return createCubeInternal(x: x, y: y, z: z, uMin: uMin, uMax: uMax, vMin: vMin, vMax: vMax);
  }

  @deprecated // use chronosGL.shapes.create...
  Mesh createTorusKnotMesh({double radius: 20.0, double tube: 4.0, int segmentsR: 128, int segmentsT: 16, int p: 2, int q: 3, double heightScale: 1.0, Texture texture}) {
    return new Mesh(createTorusKnotInternal(radius: radius, tube: tube, segmentsR: segmentsR, segmentsT: segmentsT, p: p, q: q, heightScale: heightScale), texture: texture);
  }

  @deprecated // use chronosGL.shapes.create...
  MeshData createTorusKnot({double radius: 20.0, double tube: 4.0, int segmentsR: 128, int segmentsT: 16, int p: 2, int q: 3, double heightScale: 1.0}) {
    return createTorusKnotInternal(radius: radius, tube: tube, segmentsR: segmentsR, segmentsT: segmentsT, p: p, q: q, heightScale: heightScale);
  }

  @deprecated // use chronosGL.shapes.create...
  Mesh addCube([TextureWrapper textureWrapper]) {
    Texture t;
    if (textureWrapper != null) t = textureWrapper.texture;
    return chronosGL.programBasic.add(createCubeInternal().createMesh().setTexture(t));
  }

  @deprecated // use chronosGL.shapes.create...
  Mesh addTorusKnot({double radius: 20.0, double tube: 4.0, int segmentsR: 128, int segmentsT: 16, int p: 2, int q: 3, double heightScale: 1.0, TextureWrapper textureWrapper}) {
    Texture t;
    if (textureWrapper != null) t = textureWrapper.texture;
    return chronosGL.programBasic
        .add(createTorusKnotMesh(radius: radius, tube: tube, segmentsR: segmentsR, segmentsT: segmentsT, p: p, q: q, heightScale: heightScale, texture: t));
  }

  void addParticles(int numPoints, [int dimension = 100]) {
    addPointSprites(numPoints, createParticleTexture(), dimension);
  }

  void addPointSprites(int numPoints, Texture texture, [int dimension = 500]) {
    // TODO: make this asynchronous (async/await?)
    Math.Random rand = new Math.Random();
    Float32List vertices = new Float32List(numPoints * 3);
    for (var i = 0; i < vertices.length; i++) {
      vertices[i] = (rand.nextDouble() - 0.5) * dimension;
    }
    MeshData md = new MeshData(vertices: vertices);

    ShaderProgram pssp = chronosGL.programs['point_sprites'];
    if (pssp == null) pssp = chronosGL.createProgram(createPointSpritesShader());
    Mesh m = new Mesh(md, drawPoints: true, texture: texture);
    m.blend = true;
    m.depthWrite = false;
    m.blend_dFactor = WebGL.ONE_MINUS_SRC_COLOR;
    m.name = 'point_sprites_mesh_' + pssp.objects.length.toString();
    pssp.add(m);
  }

  Future<String> loadTextFile(String url) {
    Completer<String> c = new Completer<String>();
    //HTML.Window.fetch();
    HTML.HttpRequest hr = new HTML.HttpRequest();
    hr.open("GET", url);
    hr.onLoadEnd.listen((e) {
      c.complete(hr.response);
    });
    hr.send();
    return c.future;
  }

  Future<ByteBuffer> loadBinaryFile(String url) {
    Completer<ByteBuffer> c = new Completer<ByteBuffer>();
    //HTML.Window.fetch();
    HTML.HttpRequest hr = new HTML.HttpRequest();
    hr.open("GET", url);
    hr.responseType = "arraybuffer";
    hr.onLoadEnd.listen((e) {
      c.complete(hr.response);
    });
    hr.send();
    return c.future;
  }

  Future<String> loadJsonFile(String url) {
    Completer<String> c = new Completer<String>();
    HTML.HttpRequest hr = new HTML.HttpRequest();
    hr.open("GET", url);
    hr.onLoadEnd.listen((e) {
      c.complete(jsonDecode(hr.responseText));
    });
    hr.send();
    return c.future;
  }

  String getQueryVariable(String name) {
    String query = HTML.window.location.search.substring(1);
    List<String> vars = query.split("&");
    for (int i = 0; i < vars.length; i++) {
      List<String> pair = vars[i].split("=");
      if (pair[0] == name) {
        return Uri.decodeComponent(pair[1]);
      }
    }
    return null;
  }
}

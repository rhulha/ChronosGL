(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b,c){"use strict"
function generateAccessor(b0,b1,b2){var g=b0.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var a0
if(g.length>1)a0=true
else a0=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a1=d&3
var a2=d>>2
var a3=f=f.substring(0,e-1)
var a4=f.indexOf(":")
if(a4>0){a3=f.substring(0,a4)
f=f.substring(a4+1)}if(a1){var a5=a1&2?"r":""
var a6=a1&1?"this":"r"
var a7="return "+a6+"."+f
var a8=b2+".prototype.g"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}if(a2){var a5=a2&2?"r,v":"v"
var a6=a2&1?"this":"r"
var a7=a6+"."+f+"=v"
var a8=b2+".prototype.s"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}}return f}function defineClass(a4,a5){var g=[]
var f="function "+a4+"("
var e="",d=""
for(var a0=0;a0<a5.length;a0++){var a1=a5[a0]
if(a1.charCodeAt(0)==48){a1=a1.substring(1)
var a2=generateAccessor(a1,g,a4)
d+="this."+a2+" = null;\n"}else{var a2=generateAccessor(a1,g,a4)
var a3="p_"+a2
f+=e
e=", "
f+=a3
d+="this."+a2+" = "+a3+";\n"}}if(supportsDirectProtoAccess)d+="this."+"$deferredAction"+"();"
f+=") {\n"+d+"}\n"
f+=a4+".builtin$cls=\""+a4+"\";\n"
f+="$desc=$collectedClasses."+a4+"[1];\n"
f+=a4+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a4+".name=\""+a4+"\";\n"
f+=g.join("")
return f}var z=supportsDirectProtoAccess?function(d,e){var g=d.prototype
g.__proto__=e.prototype
g.constructor=d
g["$is"+d.name]=d
return convertToFastObject(g)}:function(){function tmp(){}return function(a1,a2){tmp.prototype=a2.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a1.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var a0=e[d]
g[a0]=f[a0]}g["$is"+a1.name]=a1
g.constructor=a1
a1.prototype=g
return g}}()
function finishClasses(a5){var g=init.allClasses
a5.combinedConstructorFunction+="return [\n"+a5.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a5.combinedConstructorFunction)(a5.collected)
a5.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.name
var a1=a5.collected[a0]
var a2=a1[0]
a1=a1[1]
g[a0]=d
a2[a0]=d}f=null
var a3=init.finishedClasses
function finishClass(c2){if(a3[c2])return
a3[c2]=true
var a6=a5.pending[c2]
if(a6&&a6.indexOf("+")>0){var a7=a6.split("+")
a6=a7[0]
var a8=a7[1]
finishClass(a8)
var a9=g[a8]
var b0=a9.prototype
var b1=g[c2].prototype
var b2=Object.keys(b0)
for(var b3=0;b3<b2.length;b3++){var b4=b2[b3]
if(!u.call(b1,b4))b1[b4]=b0[b4]}}if(!a6||typeof a6!="string"){var b5=g[c2]
var b6=b5.prototype
b6.constructor=b5
b6.$isb=b5
b6.$deferredAction=function(){}
return}finishClass(a6)
var b7=g[a6]
if(!b7)b7=existingIsolateProperties[a6]
var b5=g[c2]
var b6=z(b5,b7)
if(b0)b6.$deferredAction=mixinDeferredActionHelper(b0,b6)
if(Object.prototype.hasOwnProperty.call(b6,"%")){var b8=b6["%"].split(";")
if(b8[0]){var b9=b8[0].split("|")
for(var b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=true}}if(b8[1]){b9=b8[1].split("|")
if(b8[2]){var c0=b8[2].split("|")
for(var b3=0;b3<c0.length;b3++){var c1=g[c0[b3]]
c1.$nativeSuperclassTag=b9[0]}}for(b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$isk)b6.$deferredAction()}var a4=Object.keys(a5.pending)
for(var e=0;e<a4.length;e++)finishClass(a4[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.charCodeAt(0)
var a1
if(d!=="^"&&d!=="$reflectable"&&a0!==43&&a0!==42&&(a1=g[d])!=null&&a1.constructor===Array&&d!=="<>")addStubs(g,a1,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(d,e){var g
if(e.hasOwnProperty("$deferredAction"))g=e.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}d.$deferredAction()
f.$deferredAction()}}function processClassData(b2,b3,b4){b3=convertToSlowObject(b3)
var g
var f=Object.keys(b3)
var e=false
var d=supportsDirectProtoAccess&&b2!="b"
for(var a0=0;a0<f.length;a0++){var a1=f[a0]
var a2=a1.charCodeAt(0)
if(a1==="p"){processStatics(init.statics[b2]=b3.p,b4)
delete b3.p}else if(a2===43){w[g]=a1.substring(1)
var a3=b3[a1]
if(a3>0)b3[g].$reflectable=a3}else if(a2===42){b3[g].$D=b3[a1]
var a4=b3.$methodsWithOptionalArguments
if(!a4)b3.$methodsWithOptionalArguments=a4={}
a4[a1]=g}else{var a5=b3[a1]
if(a1!=="^"&&a5!=null&&a5.constructor===Array&&a1!=="<>")if(d)e=true
else addStubs(b3,a5,a1,false,[])
else g=a1}}if(e)b3.$deferredAction=finishAddStubsHelper
var a6=b3["^"],a7,a8,a9=a6
var b0=a9.split(";")
a9=b0[1]?b0[1].split(","):[]
a8=b0[0]
a7=a8.split(":")
if(a7.length==2){a8=a7[0]
var b1=a7[1]
if(b1)b3.$S=function(b5){return function(){return init.types[b5]}}(b1)}if(a8)b4.pending[b2]=a8
b4.combinedConstructorFunction+=defineClass(b2,a9)
b4.constructorsList.push(b2)
b4.collected[b2]=[m,b3]
i.push(b2)}function processStatics(a4,a5){var g=Object.keys(a4)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a4[e]
var a0=e.charCodeAt(0)
var a1
if(a0===43){v[a1]=e.substring(1)
var a2=a4[e]
if(a2>0)a4[a1].$reflectable=a2
if(d&&d.length)init.typeInformation[a1]=d}else if(a0===42){m[a1].$D=d
var a3=a4.$methodsWithOptionalArguments
if(!a3)a4.$methodsWithOptionalArguments=a3={}
a3[e]=a1}else if(typeof d==="function"){m[a1=e]=d
h.push(e)}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a1=e
processClassData(e,d,a5)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=g,e=b7[g],d
if(typeof e=="string")d=b7[++g]
else{d=e
e=b8}if(typeof d=="number"){f=d
d=b7[++g]}b6[b8]=b6[e]=d
var a0=[d]
d.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){d=b7[g]
if(typeof d!="function")break
if(!b9)d.$stubName=b7[++g]
a0.push(d)
if(d.$stubName){b6[d.$stubName]=d
c0.push(d.$stubName)}}for(var a1=0;a1<a0.length;g++,a1++)a0[a1].$callName=b7[g]
var a2=b7[g]
b7=b7.slice(++g)
var a3=b7[0]
var a4=(a3&1)===1
a3=a3>>1
var a5=a3>>1
var a6=(a3&1)===1
var a7=a3===3
var a8=a3===1
var a9=b7[1]
var b0=a9>>1
var b1=(a9&1)===1
var b2=a5+b0
var b3=b7[2]
if(typeof b3=="number")b7[2]=b3+c
if(b>0){var b4=3
for(var a1=0;a1<b0;a1++){if(typeof b7[b4]=="number")b7[b4]=b7[b4]+b
b4++}for(var a1=0;a1<b2;a1++){b7[b4]=b7[b4]+b
b4++}}var b5=2*b0+a5+3
if(a2){d=tearOff(a0,f,b7,b9,b8,a4)
b6[b8].$getter=d
d.$getterStub=true
if(b9)c0.push(a2)
b6[a2]=d
a0.push(d)
d.$stubName=a2
d.$callName=null}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(receiver) {"+"if (c === null) c = "+"H.cO"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, true, name);"+"return new c(this, funcs[0], receiver, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.cO"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, false, name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g=null
return a0?function(){if(g===null)g=H.cO(this,d,e,f,true,false,a1).prototype
return g}:tearOffGetter(d,e,f,a1,a2)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bo=function(){}
var dart=[["","",,H,{"^":"",mw:{"^":"b;a"}}],["","",,J,{"^":"",
cS:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
cc:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cR==null){H.lv()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(P.cG("Return interceptor for "+H.c(y(a,z))))}w=a.constructor
v=w==null?null:w[$.cV()]
if(v!=null)return v
v=H.lz(a)
if(v!=null)return v
if(typeof a=="function")return C.T
y=Object.getPrototypeOf(a)
if(y==null)return C.C
if(y===Object.prototype)return C.C
if(typeof w=="function"){Object.defineProperty(w,$.cV(),{value:C.x,enumerable:false,writable:true,configurable:true})
return C.x}return C.x},
k:{"^":"b;",
F:function(a,b){return a===b},
gv:function(a){return H.bf(a)},
l:["cJ",function(a){return"Instance of '"+H.bg(a)+"'"}],
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationEffectTimingReadOnly|AnimationTimeline|AnimationWorkletGlobalScope|ArrayBuffer|AudioListener|AudioParam|AudioTrack|AudioWorkletGlobalScope|AudioWorkletProcessor|AuthenticatorAssertionResponse|AuthenticatorAttestationResponse|AuthenticatorResponse|BackgroundFetchFetch|BackgroundFetchManager|BackgroundFetchSettledFetch|BarProp|BarcodeDetector|Bluetooth|BluetoothCharacteristicProperties|BluetoothRemoteGATTDescriptor|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|BudgetService|BudgetState|CSS|CSSVariableReferenceValue|Cache|CacheStorage|CanvasGradient|CanvasPattern|Client|Clients|CookieStore|Coordinates|Credential|CredentialUserData|CredentialsContainer|Crypto|CryptoKey|CustomElementRegistry|DOMError|DOMFileSystem|DOMFileSystemSync|DOMMatrix|DOMMatrixReadOnly|DOMParser|DOMPoint|DOMPointReadOnly|DOMQuad|DOMStringMap|DataTransfer|DataTransferItem|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeprecationReport|DetectedBarcode|DetectedFace|DetectedText|DeviceAcceleration|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|DocumentOrShadowRoot|DocumentTimeline|EXTBlendMinMax|EXTColorBufferFloat|EXTColorBufferHalfFloat|EXTDisjointTimerQuery|EXTDisjointTimerQueryWebGL2|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|Entry|EntrySync|External|FaceDetector|FederatedCredential|FileEntry|FileEntrySync|FileReaderSync|FileWriterSync|FontFace|FontFaceSource|FormData|GamepadButton|GamepadPose|Geolocation|HTMLAllCollection|HTMLHyperlinkElementUtils|Headers|IDBCursor|IDBCursorWithValue|IDBFactory|IDBIndex|IDBKeyRange|IDBObjectStore|IDBObservation|IDBObserver|IDBObserverChanges|IdleDeadline|ImageBitmapRenderingContext|ImageCapture|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|InterventionReport|Iterator|KeyframeEffect|KeyframeEffectReadOnly|MediaCapabilities|MediaCapabilitiesInfo|MediaDeviceInfo|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaKeysPolicy|MediaMetadata|MediaSession|MediaSettingsRange|MemoryInfo|MessageChannel|Metadata|Mojo|MojoHandle|MojoWatcher|MutationObserver|MutationRecord|NFC|NavigationPreloadManager|Navigator|NavigatorAutomationInformation|NavigatorConcurrentHardware|NavigatorCookies|NavigatorUserMediaError|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|NoncedElement|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvasRenderingContext2D|OverconstrainedError|PagePopupController|PaintRenderingContext2D|PaintWorkletGlobalScope|PasswordCredential|Path2D|PaymentAddress|PaymentInstruments|PaymentManager|PaymentResponse|PerformanceEntry|PerformanceLongTaskTiming|PerformanceMark|PerformanceMeasure|PerformanceNavigation|PerformanceNavigationTiming|PerformanceObserver|PerformanceObserverEntryList|PerformancePaintTiming|PerformanceResourceTiming|PerformanceServerTiming|PerformanceTiming|PeriodicWave|Permissions|PhotoCapabilities|Position|PositionError|Presentation|PresentationReceiver|PublicKeyCredential|PushManager|PushMessageData|PushSubscription|PushSubscriptionOptions|RTCCertificate|RTCIceCandidate|RTCLegacyStatsReport|RTCRtpContributingSource|RTCRtpReceiver|RTCRtpSender|RTCSessionDescription|RTCStatsResponse|RelatedApplication|Report|ReportBody|ReportingObserver|Request|ResizeObserver|ResizeObserverEntry|Response|SQLError|SQLResultSet|SQLTransaction|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGMatrix|SVGPoint|SVGPreserveAspectRatio|SVGUnitTypes|ScrollState|ScrollTimeline|Selection|SharedArrayBuffer|SpeechRecognitionAlternative|SpeechSynthesisVoice|StaticRange|StorageManager|StyleMedia|StylePropertyMap|StylePropertyMapReadonly|SubtleCrypto|SyncManager|TaskAttributionTiming|TextDetector|TrackDefault|TreeWalker|TrustedHTML|TrustedScriptURL|TrustedURL|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRCoordinateSystem|VRDisplayCapabilities|VREyeParameters|VRFrameData|VRFrameOfReference|VRPose|VRStageBounds|VRStageBoundsPoint|VRStageParameters|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGL|WebGL2RenderingContextBase|WebGLActiveInfo|WebGLCanvas|WebGLColorBufferFloat|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLCompressedTextureS3TCsRGB|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLGetBufferSubDataAsync|WebGLLoseContext|WebGLQuery|WebGLRenderbuffer|WebGLSampler|WebGLShaderPrecisionFormat|WebGLSync|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLVertexArrayObjectOES|WebKitMutationObserver|WindowClient|WorkerLocation|WorkerNavigator|Worklet|WorkletAnimation|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate|mozRTCSessionDescription"},
hS:{"^":"k;",
l:function(a){return String(a)},
gv:function(a){return a?519018:218159},
$isZ:1},
hT:{"^":"k;",
F:function(a,b){return null==b},
l:function(a){return"null"},
gv:function(a){return 0},
$isA:1},
cv:{"^":"k;",
gv:function(a){return 0},
l:["cL",function(a){return String(a)}]},
iy:{"^":"cv;"},
bk:{"^":"cv;"},
bA:{"^":"cv;",
l:function(a){var z=a[$.eR()]
if(z==null)return this.cL(a)
return"JavaScript function for "+H.c(J.bs(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$isbv:1},
bx:{"^":"k;$ti",
k:function(a,b){H.z(b,H.q(a,0))
if(!!a.fixed$length)H.aa(P.B("add"))
a.push(b)},
I:function(a,b){var z,y
H.p(b,"$ism",[H.q(a,0)],"$asm")
if(!!a.fixed$length)H.aa(P.B("addAll"))
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.E)(b),++y)a.push(b[y])},
a0:function(a,b){var z,y
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)this.i(z,y,H.c(a[y]))
return z.join(b)},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
gef:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.d(H.dE())},
bz:function(a,b){var z,y
H.n(b,{func:1,ret:P.Z,args:[H.q(a,0)]})
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y]))return!0
if(a.length!==z)throw H.d(P.ax(a))}return!1},
cD:function(a,b){if(!!a.immutable$list)H.aa(P.B("sort"))
H.iZ(a,J.l3(),H.q(a,0))},
al:function(a){return this.cD(a,null)},
u:function(a,b){var z
for(z=0;z<a.length;++z)if(J.aR(a[z],b))return!0
return!1},
l:function(a){return P.ct(a,"[","]")},
gw:function(a){return new J.db(a,a.length,0,[H.q(a,0)])},
gv:function(a){return H.bf(a)},
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.aO(a,b))
if(b>=a.length||b<0)throw H.d(H.aO(a,b))
return a[b]},
i:function(a,b,c){H.i(b)
H.z(c,H.q(a,0))
if(!!a.immutable$list)H.aa(P.B("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.aO(a,b))
if(b>=a.length||b<0)throw H.d(H.aO(a,b))
a[b]=c},
$isx:1,
$asx:I.bo,
$ism:1,
$isa:1,
p:{
hR:function(a,b){return J.cu(H.f(a,[b]))},
cu:function(a){H.N(a)
a.fixed$length=Array
return a},
mu:[function(a,b){return J.fl(H.eL(a,"$isa3"),H.eL(b,"$isa3"))},"$2","l3",8,0,32]}},
mv:{"^":"bx;$ti"},
db:{"^":"b;a,b,c,0d,$ti",
sbd:function(a){this.d=H.z(a,H.q(this,0))},
gA:function(a){return this.d},
t:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(H.E(z))
x=this.c
if(x>=y){this.sbd(null)
return!1}this.sbd(z[x]);++this.c
return!0},
$isb6:1},
by:{"^":"k;",
N:function(a,b){var z
H.cT(b)
if(typeof b!=="number")throw H.d(H.aM(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gai(b)
if(this.gai(a)===z)return 0
if(this.gai(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gai:function(a){return a===0?1/a<0:a<0},
cc:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(P.B(""+a+".toInt()"))},
dS:function(a){var z,y
if(a>=0){if(a<=2147483647){z=a|0
return a===z?z:z+1}}else if(a>=-2147483648)return a|0
y=Math.ceil(a)
if(isFinite(y))return y
throw H.d(P.B(""+a+".ceil()"))},
e9:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.d(P.B(""+a+".floor()"))},
dT:function(a,b,c){if(this.N(b,c)>0)throw H.d(H.aM(b))
if(this.N(a,b)<0)return b
if(this.N(a,c)>0)return c
return a},
es:function(a){return a},
ev:function(a,b){var z
if(b>20)throw H.d(P.bZ(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gai(a))return"-"+z
return z},
l:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv:function(a){return a&0x1FFFFFFF},
aW:function(a,b){var z
if(typeof b!=="number")throw H.d(H.aM(b))
z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
a8:function(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.bv(a,b)},
H:function(a,b){return(a|0)===a?a/b|0:this.bv(a,b)},
bv:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.d(P.B("Result of truncating division is "+H.c(z)+": "+H.c(a)+" ~/ "+b))},
bt:function(a,b){var z
if(a>0)z=this.dH(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
dH:function(a,b){return b>31?0:a>>>b},
Y:function(a,b){if(typeof b!=="number")throw H.d(H.aM(b))
return a>b},
$isa3:1,
$asa3:function(){return[P.J]},
$isR:1,
$isJ:1},
dG:{"^":"by;",$isD:1},
dF:{"^":"by;"},
bz:{"^":"k;",
ar:function(a,b){if(b>=a.length)throw H.d(H.aO(a,b))
return a.charCodeAt(b)},
K:function(a,b){H.v(b)
if(typeof b!=="string")throw H.d(P.da(b,null,null))
return a+b},
cF:function(a,b,c){var z
if(c>a.length)throw H.d(P.bZ(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
cE:function(a,b){return this.cF(a,b,0)},
cH:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.d(P.c_(b,null,null))
if(b>c)throw H.d(P.c_(b,null,null))
if(c>a.length)throw H.d(P.c_(c,null,null))
return a.substring(b,c)},
cG:function(a,b){return this.cH(a,b,null)},
eu:function(a){return a.toLowerCase()},
dW:function(a,b,c){if(c>a.length)throw H.d(P.bZ(c,0,a.length,null,null))
return H.lH(a,b,c)},
N:function(a,b){var z
H.v(b)
if(typeof b!=="string")throw H.d(H.aM(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
l:function(a){return a},
gv:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>=a.length||!1)throw H.d(H.aO(a,b))
return a[b]},
$isx:1,
$asx:I.bo,
$isa3:1,
$asa3:function(){return[P.e]},
$isiw:1,
$ise:1}}],["","",,H,{"^":"",
dE:function(){return new P.cD("No element")},
hQ:function(){return new P.cD("Too many elements")},
iZ:function(a,b,c){H.p(a,"$isa",[c],"$asa")
H.n(b,{func:1,ret:P.D,args:[c,c]})
H.bD(a,0,J.ap(a)-1,b,c)},
bD:function(a,b,c,d,e){H.p(a,"$isa",[e],"$asa")
H.n(d,{func:1,ret:P.D,args:[e,e]})
if(c-b<=32)H.iY(a,b,c,d,e)
else H.iX(a,b,c,d,e)},
iY:function(a,b,c,d,e){var z,y,x,w,v
H.p(a,"$isa",[e],"$asa")
H.n(d,{func:1,ret:P.D,args:[e,e]})
for(z=b+1,y=J.L(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.ag(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.i(a,w,y.h(a,v))
w=v}y.i(a,w,x)}},
iX:function(a,b,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
H.p(a,"$isa",[a2],"$asa")
H.n(a1,{func:1,ret:P.D,args:[a2,a2]})
z=C.b.H(a0-b+1,6)
y=b+z
x=a0-z
w=C.b.H(b+a0,2)
v=w-z
u=w+z
t=J.L(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.ag(a1.$2(s,r),0)){n=r
r=s
s=n}if(J.ag(a1.$2(p,o),0)){n=o
o=p
p=n}if(J.ag(a1.$2(s,q),0)){n=q
q=s
s=n}if(J.ag(a1.$2(r,q),0)){n=q
q=r
r=n}if(J.ag(a1.$2(s,p),0)){n=p
p=s
s=n}if(J.ag(a1.$2(q,p),0)){n=p
p=q
q=n}if(J.ag(a1.$2(r,o),0)){n=o
o=r
r=n}if(J.ag(a1.$2(r,q),0)){n=q
q=r
r=n}if(J.ag(a1.$2(p,o),0)){n=o
o=p
p=n}t.i(a,y,s)
t.i(a,w,q)
t.i(a,x,o)
t.i(a,v,t.h(a,b))
t.i(a,u,t.h(a,a0))
m=b+1
l=a0-1
if(J.aR(a1.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=a1.$2(j,r)
if(i===0)continue
if(typeof i!=="number")return i.R()
if(i<0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else for(;!0;){i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.Y()
if(i>0){--l
continue}else{h=l-1
if(i<0){t.i(a,k,t.h(a,m))
g=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
l=h
m=g
break}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
e=a1.$2(j,r)
if(typeof e!=="number")return e.R()
if(e<0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else{d=a1.$2(j,p)
if(typeof d!=="number")return d.Y()
if(d>0)for(;!0;){i=a1.$2(t.h(a,l),p)
if(typeof i!=="number")return i.Y()
if(i>0){--l
if(l<k)break
continue}else{i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.R()
h=l-1
if(i<0){t.i(a,k,t.h(a,m))
g=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=g}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=h
break}}}}f=!1}c=m-1
t.i(a,b,t.h(a,c))
t.i(a,c,r)
c=l+1
t.i(a,a0,t.h(a,c))
t.i(a,c,p)
H.bD(a,b,m-2,a1,a2)
H.bD(a,l+2,a0,a1,a2)
if(f)return
if(m<y&&l>x){for(;J.aR(a1.$2(t.h(a,m),r),0);)++m
for(;J.aR(a1.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(a1.$2(j,r)===0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else if(a1.$2(j,p)===0)for(;!0;)if(a1.$2(t.h(a,l),p)===0){--l
if(l<k)break
continue}else{i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.R()
h=l-1
if(i<0){t.i(a,k,t.h(a,m))
g=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=g}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=h
break}}H.bD(a,m,l,a1,a2)}else H.bD(a,m,l,a1,a2)},
du:{"^":"m;"},
b9:{"^":"du;$ti",
gw:function(a){return new H.dI(this,this.gj(this),0,[H.cQ(this,"b9",0)])},
aN:function(a,b){return this.cK(0,H.n(b,{func:1,ret:P.Z,args:[H.cQ(this,"b9",0)]}))}},
dI:{"^":"b;a,b,c,0d,$ti",
sbe:function(a){this.d=H.z(a,H.q(this,0))},
gA:function(a){return this.d},
t:function(){var z,y,x,w
z=this.a
y=J.L(z)
x=y.gj(z)
if(this.b!==x)throw H.d(P.ax(z))
w=this.c
if(w>=x){this.sbe(null)
return!1}this.sbe(y.q(z,w));++this.c
return!0},
$isb6:1},
i9:{"^":"b9;a,b,$ti",
gj:function(a){return J.ap(this.a)},
q:function(a,b){return this.b.$1(J.fw(this.a,b))},
$asb9:function(a,b){return[b]},
$asm:function(a,b){return[b]}},
e6:{"^":"m;a,b,$ti",
gw:function(a){return new H.jk(J.br(this.a),this.b,this.$ti)}},
jk:{"^":"b6;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=this.b;z.t();)if(y.$1(z.gA(z)))return!0
return!1},
gA:function(a){var z=this.a
return z.gA(z)}},
bW:{"^":"b;$ti"}}],["","",,H,{"^":"",
aQ:function(a){var z,y
z=H.v(init.mangledGlobalNames[a])
if(typeof z==="string")return z
y="minified:"+a
return y},
ln:function(a){return init.types[H.i(a)]},
ly:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.C(a).$isy},
c:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.bs(a)
if(typeof z!=="string")throw H.d(H.aM(a))
return z},
bf:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bg:function(a){return H.iz(a)+H.c6(H.au(a),0,null)},
iz:function(a){var z,y,x,w,v,u,t,s,r
z=J.C(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
v=w==null
if(v||z===C.M||!!z.$isbk){u=C.B(a)
if(v)w=u
if(u==="Object"){t=a.constructor
if(typeof t=="function"){s=String(t).match(/^\s*function\s*([\w$]*)\s*\(/)
r=s==null?null:s[1]
if(typeof r==="string"&&/^\w+$/.test(r))w=r}}return w}w=w
return H.aQ(w.length>1&&C.h.ar(w,0)===36?C.h.cG(w,1):w)},
a1:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
iG:function(a){return a.b?H.a1(a).getUTCFullYear()+0:H.a1(a).getFullYear()+0},
iE:function(a){return a.b?H.a1(a).getUTCMonth()+1:H.a1(a).getMonth()+1},
iA:function(a){return a.b?H.a1(a).getUTCDate()+0:H.a1(a).getDate()+0},
iB:function(a){return a.b?H.a1(a).getUTCHours()+0:H.a1(a).getHours()+0},
iD:function(a){return a.b?H.a1(a).getUTCMinutes()+0:H.a1(a).getMinutes()+0},
iF:function(a){return a.b?H.a1(a).getUTCSeconds()+0:H.a1(a).getSeconds()+0},
iC:function(a){return a.b?H.a1(a).getUTCMilliseconds()+0:H.a1(a).getMilliseconds()+0},
a9:function(a){throw H.d(H.aM(a))},
j:function(a,b){if(a==null)J.ap(a)
throw H.d(H.aO(a,b))},
aO:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aw(!0,b,"index",null)
z=H.i(J.ap(a))
if(!(b<0)){if(typeof z!=="number")return H.a9(z)
y=b>=z}else y=!0
if(y)return P.K(b,a,"index",null,z)
return P.c_(b,"index",null)},
aM:function(a){return new P.aw(!0,a,null,null)},
d:function(a){var z
if(a==null)a=new P.bY()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eO})
z.name=""}else z.toString=H.eO
return z},
eO:function(){return J.bs(this.dartException)},
aa:function(a){throw H.d(a)},
E:function(a){throw H.d(P.ax(a))},
a5:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.lJ(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.bt(x,16)&8191)===10)switch(w){case 438:return z.$1(H.cx(H.c(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.dT(H.c(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.eU()
u=$.eV()
t=$.eW()
s=$.eX()
r=$.f_()
q=$.f0()
p=$.eZ()
$.eY()
o=$.f2()
n=$.f1()
m=v.M(y)
if(m!=null)return z.$1(H.cx(H.v(y),m))
else{m=u.M(y)
if(m!=null){m.method="call"
return z.$1(H.cx(H.v(y),m))}else{m=t.M(y)
if(m==null){m=s.M(y)
if(m==null){m=r.M(y)
if(m==null){m=q.M(y)
if(m==null){m=p.M(y)
if(m==null){m=s.M(y)
if(m==null){m=o.M(y)
if(m==null){m=n.M(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.dT(H.v(y),m))}}return z.$1(new H.jh(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dY()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aw(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dY()
return a},
b_:function(a){var z
if(a==null)return new H.eo(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.eo(a)},
lk:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.i(0,a[y],a[x])}return b},
lx:function(a,b,c,d,e,f){H.h(a,"$isbv")
switch(H.i(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.d(P.dy("Unsupported number of arguments for wrapped closure"))},
aN:function(a,b){var z
H.i(b)
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.lx)
a.$identity=z
return z},
hb:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b[0]
y=z.$callName
if(!!J.C(d).$isa){z.$reflectionInfo=d
x=H.iL(z).r}else x=d
w=e?Object.create(new H.j_().constructor.prototype):Object.create(new H.cn(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function static_tear_off(){this.$initialize()}
else{u=$.ah
if(typeof u!=="number")return u.K()
$.ah=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=H.di(a,z,f)
t.$reflectionInfo=d}else{w.$static_name=g
t=z}if(typeof x=="number")s=function(h,i){return function(){return h(i)}}(H.ln,x)
else if(typeof x=="function")if(e)s=x
else{r=f?H.dg:H.co
s=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,r)}else throw H.d("Error in reflectionInfo.")
w.$S=s
w[y]=t
for(q=t,p=1;p<b.length;++p){o=b[p]
n=o.$callName
if(n!=null){o=e?o:H.di(a,o,f)
w[n]=o}if(p===c){o.$reflectionInfo=d
q=o}}w.$C=q
w.$R=z.$R
w.$D=z.$D
return v},
h8:function(a,b,c,d){var z=H.co
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
di:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.ha(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.h8(y,!w,z,b)
if(y===0){w=$.ah
if(typeof w!=="number")return w.K()
$.ah=w+1
u="self"+w
w="return function(){var "+u+" = this."
v=$.b2
if(v==null){v=H.bU("self")
$.b2=v}return new Function(w+H.c(v)+";return "+u+"."+H.c(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.ah
if(typeof w!=="number")return w.K()
$.ah=w+1
t+=w
w="return function("+t+"){return this."
v=$.b2
if(v==null){v=H.bU("self")
$.b2=v}return new Function(w+H.c(v)+"."+H.c(z)+"("+t+");}")()},
h9:function(a,b,c,d){var z,y
z=H.co
y=H.dg
switch(b?-1:a){case 0:throw H.d(H.iR("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
ha:function(a,b){var z,y,x,w,v,u,t,s
z=$.b2
if(z==null){z=H.bU("self")
$.b2=z}y=$.df
if(y==null){y=H.bU("receiver")
$.df=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.h9(w,!u,x,b)
if(w===1){z="return function(){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+");"
y=$.ah
if(typeof y!=="number")return y.K()
$.ah=y+1
return new Function(z+y+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+", "+s+");"
y=$.ah
if(typeof y!=="number")return y.K()
$.ah=y+1
return new Function(z+y+"}")()},
cO:function(a,b,c,d,e,f,g){return H.hb(a,b,H.i(c),d,!!e,!!f,g)},
v:function(a){if(a==null)return a
if(typeof a==="string")return a
throw H.d(H.ad(a,"String"))},
ca:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.d(H.ad(a,"double"))},
cT:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.d(H.ad(a,"num"))},
c8:function(a){if(a==null)return a
if(typeof a==="boolean")return a
throw H.d(H.ad(a,"bool"))},
i:function(a){if(a==null)return a
if(typeof a==="number"&&Math.floor(a)===a)return a
throw H.d(H.ad(a,"int"))},
cU:function(a,b){throw H.d(H.ad(a,H.aQ(H.v(b).substring(3))))},
lF:function(a,b){throw H.d(H.dh(a,H.aQ(H.v(b).substring(3))))},
h:function(a,b){if(a==null)return a
if((typeof a==="object"||typeof a==="function")&&J.C(a)[b])return a
H.cU(a,b)},
an:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.C(a)[b]
else z=!0
if(z)return a
H.lF(a,b)},
eL:function(a,b){if(a==null)return a
if(typeof a==="string")return a
if(typeof a==="number")return a
if(J.C(a)[b])return a
H.cU(a,b)},
N:function(a){if(a==null)return a
if(!!J.C(a).$isa)return a
throw H.d(H.ad(a,"List<dynamic>"))},
eJ:function(a,b){var z
if(a==null)return a
z=J.C(a)
if(!!z.$isa)return a
if(z[b])return a
H.cU(a,b)},
cP:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[H.i(z)]
else return a.$S()}return},
bI:function(a,b){var z
if(a==null)return!1
if(typeof a=="function")return!0
z=H.cP(J.C(a))
if(z==null)return!1
return H.et(z,null,b,null)},
n:function(a,b){var z,y
if(a==null)return a
if($.cK)return a
$.cK=!0
try{if(H.bI(a,b))return a
z=H.bL(b)
y=H.ad(a,z)
throw H.d(y)}finally{$.cK=!1}},
aZ:function(a,b){if(a!=null&&!H.cN(a,b))H.aa(H.ad(a,H.bL(b)))
return a},
ex:function(a){var z,y
z=J.C(a)
if(!!z.$iso){y=H.cP(z)
if(y!=null)return H.bL(y)
return"Closure"}return H.bg(a)},
lI:function(a){throw H.d(new P.hj(H.v(a)))},
eG:function(a){return init.getIsolateTag(a)},
f:function(a,b){a.$ti=b
return a},
au:function(a){if(a==null)return
return a.$ti},
o_:function(a,b,c){return H.b1(a["$as"+H.c(c)],H.au(b))},
bp:function(a,b,c,d){var z
H.v(c)
H.i(d)
z=H.b1(a["$as"+H.c(c)],H.au(b))
return z==null?null:z[d]},
cQ:function(a,b,c){var z
H.v(b)
H.i(c)
z=H.b1(a["$as"+H.c(b)],H.au(a))
return z==null?null:z[c]},
q:function(a,b){var z
H.i(b)
z=H.au(a)
return z==null?null:z[b]},
bL:function(a){return H.aL(a,null)},
aL:function(a,b){var z,y
H.p(b,"$isa",[P.e],"$asa")
if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return H.aQ(a[0].builtin$cls)+H.c6(a,1,b)
if(typeof a=="function")return H.aQ(a.builtin$cls)
if(a===-2)return"dynamic"
if(typeof a==="number"){H.i(a)
if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+a
z=b.length
y=z-a-1
if(y<0||y>=z)return H.j(b,y)
return H.c(b[y])}if('func' in a)return H.l2(a,b)
if('futureOr' in a)return"FutureOr<"+H.aL("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
l2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=[P.e]
H.p(b,"$isa",z,"$asa")
if("bounds" in a){y=a.bounds
if(b==null){b=H.f([],z)
x=null}else x=b.length
w=b.length
for(v=y.length,u=v;u>0;--u)C.a.k(b,"T"+(w+u))
for(t="<",s="",u=0;u<v;++u,s=", "){t+=s
z=b.length
r=z-u-1
if(r<0)return H.j(b,r)
t=C.h.K(t,b[r])
q=y[u]
if(q!=null&&q!==P.b)t+=" extends "+H.aL(q,b)}t+=">"}else{t=""
x=null}p=!!a.v?"void":H.aL(a.ret,b)
if("args" in a){o=a.args
for(z=o.length,n="",m="",l=0;l<z;++l,m=", "){k=o[l]
n=n+m+H.aL(k,b)}}else{n=""
m=""}if("opt" in a){j=a.opt
n+=m+"["
for(z=j.length,m="",l=0;l<z;++l,m=", "){k=j[l]
n=n+m+H.aL(k,b)}n+="]"}if("named" in a){i=a.named
n+=m+"{"
for(z=H.lj(i),r=z.length,m="",l=0;l<r;++l,m=", "){h=H.v(z[l])
n=n+m+H.aL(i[h],b)+(" "+H.c(h))}n+="}"}if(x!=null)b.length=x
return t+"("+n+") => "+p},
c6:function(a,b,c){var z,y,x,w,v,u
H.p(c,"$isa",[P.e],"$asa")
if(a==null)return""
z=new P.cE("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.aL(u,c)}return"<"+z.l(0)+">"},
lm:function(a){var z,y,x,w
z=J.C(a)
if(!!z.$iso){y=H.cP(z)
if(y!=null)return y}x=z.constructor
if(a==null)return x
if(typeof a!="object")return x
w=H.au(a)
if(w!=null){w=w.slice()
w.splice(0,0,x)
x=w}return x},
b1:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
at:function(a,b,c,d){var z,y
H.v(b)
H.N(c)
H.v(d)
if(a==null)return!1
z=H.au(a)
y=J.C(a)
if(y[b]==null)return!1
return H.eA(H.b1(y[d],z),null,c,null)},
bM:function(a,b,c,d){H.v(b)
H.N(c)
H.v(d)
if(a==null)return a
if(H.at(a,b,c,d))return a
throw H.d(H.dh(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(H.aQ(b.substring(3))+H.c6(c,0,null),init.mangledGlobalNames)))},
p:function(a,b,c,d){H.v(b)
H.N(c)
H.v(d)
if(a==null)return a
if(H.at(a,b,c,d))return a
throw H.d(H.ad(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(H.aQ(b.substring(3))+H.c6(c,0,null),init.mangledGlobalNames)))},
eA:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.a8(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.a8(a[y],b,c[y],d))return!1
return!0},
nW:function(a,b,c){return a.apply(b,H.b1(J.C(b)["$as"+H.c(c)],H.au(b)))},
eI:function(a){var z
if(typeof a==="number")return!1
if('futureOr' in a){z="type" in a?a.type:null
return a==null||a.builtin$cls==="b"||a.builtin$cls==="A"||a===-1||a===-2||H.eI(z)}return!1},
cN:function(a,b){var z,y
if(a==null)return b==null||b.builtin$cls==="b"||b.builtin$cls==="A"||b===-1||b===-2||H.eI(b)
if(b==null||b===-1||b.builtin$cls==="b"||b===-2)return!0
if(typeof b=="object"){if('futureOr' in b)if(H.cN(a,"type" in b?b.type:null))return!0
if('func' in b)return H.bI(a,b)}z=J.C(a).constructor
y=H.au(a)
if(y!=null){y=y.slice()
y.splice(0,0,z)
z=y}return H.a8(z,null,b,null)},
z:function(a,b){if(a!=null&&!H.cN(a,b))throw H.d(H.ad(a,H.bL(b)))
return a},
a8:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="b"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="b"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.a8(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="A")return!0
if('func' in c)return H.et(a,b,c,d)
if('func' in a)return c.builtin$cls==="bv"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.a8("type" in a?a.type:null,b,x,d)
else if(H.a8(a,b,x,d))return!0
else{if(!('$is'+"a4" in y.prototype))return!1
w=y.prototype["$as"+"a4"]
v=H.b1(w,z?a.slice(1):null)
return H.a8(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=t.builtin$cls
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.eA(H.b1(r,z),b,u,d)},
et:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.a8(a.ret,b,c.ret,d))return!1
x=a.args
w=c.args
v=a.opt
u=c.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
for(p=0;p<t;++p)if(!H.a8(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.a8(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.a8(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.lE(m,b,l,d)},
lE:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.a8(c[w],d,a[w],b))return!1}return!0},
nX:function(a,b,c){Object.defineProperty(a,H.v(b),{value:c,enumerable:false,writable:true,configurable:true})},
lz:function(a){var z,y,x,w,v,u
z=H.v($.eH.$1(a))
y=$.c9[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cd[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=H.v($.ez.$2(a,z))
if(z!=null){y=$.c9[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cd[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.ce(x)
$.c9[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.cd[z]=x
return x}if(v==="-"){u=H.ce(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eM(a,x)
if(v==="*")throw H.d(P.cG(z))
if(init.leafTags[z]===true){u=H.ce(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eM(a,x)},
eM:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.cS(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
ce:function(a){return J.cS(a,!1,null,!!a.$isy)},
lD:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.ce(z)
else return J.cS(z,c,null,null)},
lv:function(){if(!0===$.cR)return
$.cR=!0
H.lw()},
lw:function(){var z,y,x,w,v,u,t,s
$.c9=Object.create(null)
$.cd=Object.create(null)
H.lr()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.eN.$1(v)
if(u!=null){t=H.lD(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
lr:function(){var z,y,x,w,v,u,t
z=C.Q()
z=H.aY(C.N,H.aY(C.S,H.aY(C.A,H.aY(C.A,H.aY(C.R,H.aY(C.O,H.aY(C.P(C.B),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.eH=new H.ls(v)
$.ez=new H.lt(u)
$.eN=new H.lu(t)},
aY:function(a,b){return a(b)||b},
lH:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
iK:{"^":"b;a,b,c,d,e,f,r,0x",p:{
iL:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.cu(z)
y=z[0]
x=z[1]
return new H.iK(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
jb:{"^":"b;a,b,c,d,e,f",
M:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
p:{
aj:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.f([],[P.e])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.jb(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
c1:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
e3:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
it:{"^":"T;a,b",
l:function(a){var z=this.b
if(z==null)return"NoSuchMethodError: "+H.c(this.a)
return"NoSuchMethodError: method not found: '"+z+"' on null"},
p:{
dT:function(a,b){return new H.it(a,b==null?null:b.method)}}},
hU:{"^":"T;a,b,c",
l:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.c(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.c(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.c(this.a)+")"},
p:{
cx:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.hU(a,y,z?null:b.receiver)}}},
jh:{"^":"T;a",
l:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
lJ:{"^":"o:8;a",
$1:function(a){if(!!J.C(a).$isT)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
eo:{"^":"b;a,0b",
l:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isU:1},
o:{"^":"b;",
l:function(a){return"Closure '"+H.bg(this).trim()+"'"},
gcs:function(){return this},
$isbv:1,
gcs:function(){return this}},
e_:{"^":"o;"},
j_:{"^":"e_;",
l:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+H.aQ(z)+"'"}},
cn:{"^":"e_;a,b,c,d",
F:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cn))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gv:function(a){var z,y
z=this.c
if(z==null)y=H.bf(this.a)
else y=typeof z!=="object"?J.av(z):H.bf(z)
return(y^H.bf(this.b))>>>0},
l:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.c(this.d)+"' of "+("Instance of '"+H.bg(z)+"'")},
p:{
co:function(a){return a.a},
dg:function(a){return a.c},
bU:function(a){var z,y,x,w,v
z=new H.cn("self","target","receiver","name")
y=J.cu(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
jc:{"^":"T;a",
l:function(a){return this.a},
p:{
ad:function(a,b){return new H.jc("TypeError: "+H.c(P.bV(a))+": type '"+H.ex(a)+"' is not a subtype of type '"+b+"'")}}},
h6:{"^":"T;a",
l:function(a){return this.a},
p:{
dh:function(a,b){return new H.h6("CastError: "+H.c(P.bV(a))+": type '"+H.ex(a)+"' is not a subtype of type '"+b+"'")}}},
iQ:{"^":"T;a",
l:function(a){return"RuntimeError: "+H.c(this.a)},
p:{
iR:function(a){return new H.iQ(a)}}},
e4:{"^":"b;a,0b,0c,0d",
gag:function(){var z=this.b
if(z==null){z=H.bL(this.a)
this.b=z}return z},
l:function(a){return this.gag()},
gv:function(a){var z=this.d
if(z==null){z=C.h.gv(this.gag())
this.d=z}return z},
F:function(a,b){if(b==null)return!1
return b instanceof H.e4&&this.gag()===b.gag()}},
cw:{"^":"cA;a,0b,0c,0d,0e,0f,r,$ti",
gj:function(a){return this.a},
gE:function(a){return new H.as(this,[H.q(this,0)])},
C:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.dd(z,b)}else{y=this.ed(b)
return y}},
ed:function(a){var z=this.d
if(z==null)return!1
return this.aG(this.ay(z,J.av(a)&0x3ffffff),a)>=0},
h:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ad(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.ad(w,b)
x=y==null?null:y.b
return x}else return this.ee(b)},
ee:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.ay(z,J.av(a)&0x3ffffff)
x=this.aG(y,a)
if(x<0)return
return y[x].b},
i:function(a,b,c){var z,y,x,w,v,u
H.z(b,H.q(this,0))
H.z(c,H.q(this,1))
if(typeof b==="string"){z=this.b
if(z==null){z=this.aA()
this.b=z}this.bf(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aA()
this.c=y}this.bf(y,b,c)}else{x=this.d
if(x==null){x=this.aA()
this.d=x}w=J.av(b)&0x3ffffff
v=this.ay(x,w)
if(v==null)this.aC(x,w,[this.ap(b,c)])
else{u=this.aG(v,b)
if(u>=0)v[u].b=c
else v.push(this.ap(b,c))}}},
V:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.bh()}},
D:function(a,b){var z,y
H.n(b,{func:1,ret:-1,args:[H.q(this,0),H.q(this,1)]})
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(P.ax(this))
z=z.c}},
bf:function(a,b,c){var z
H.z(b,H.q(this,0))
H.z(c,H.q(this,1))
z=this.ad(a,b)
if(z==null)this.aC(a,b,this.ap(b,c))
else z.b=c},
bh:function(){this.r=this.r+1&67108863},
ap:function(a,b){var z,y
z=new H.i1(H.z(a,H.q(this,0)),H.z(b,H.q(this,1)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.bh()
return z},
aG:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.aR(a[y].a,b))return y
return-1},
l:function(a){return P.dN(this)},
ad:function(a,b){return a[b]},
ay:function(a,b){return a[b]},
aC:function(a,b,c){a[b]=c},
df:function(a,b){delete a[b]},
dd:function(a,b){return this.ad(a,b)!=null},
aA:function(){var z=Object.create(null)
this.aC(z,"<non-identifier-key>",z)
this.df(z,"<non-identifier-key>")
return z},
$isdH:1},
i1:{"^":"b;a,b,0c,0d"},
as:{"^":"du;a,$ti",
gj:function(a){return this.a.a},
gw:function(a){var z,y
z=this.a
y=new H.i2(z,z.r,this.$ti)
y.c=z.e
return y},
u:function(a,b){return this.a.C(0,b)}},
i2:{"^":"b;a,b,0c,0d,$ti",
sbg:function(a){this.d=H.z(a,H.q(this,0))},
gA:function(a){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.d(P.ax(z))
else{z=this.c
if(z==null){this.sbg(null)
return!1}else{this.sbg(z.a)
this.c=this.c.c
return!0}}},
$isb6:1},
ls:{"^":"o:8;a",
$1:function(a){return this.a(a)}},
lt:{"^":"o:33;a",
$2:function(a,b){return this.a(a,b)}},
lu:{"^":"o:14;a",
$1:function(a){return this.a(H.v(a))}}}],["","",,H,{"^":"",
lj:function(a){return J.hR(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
b0:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
c5:function(a){var z,y
if(!!J.C(a).$isx)return a
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)C.a.i(z,y,a[y])
return z},
am:function(a,b,c){if(a>>>0!==a||a>=c)throw H.d(H.aO(b,a))},
io:{"^":"k;",$isjd:1,"%":"DataView;ArrayBufferView;cB|ei|ej|dQ|ek|el|aC"},
cB:{"^":"io;",
gj:function(a){return a.length},
$isx:1,
$asx:I.bo,
$isy:1,
$asy:I.bo},
dQ:{"^":"ej;",
h:function(a,b){H.i(b)
H.am(b,a,a.length)
return a[b]},
i:function(a,b,c){H.i(b)
H.ca(c)
H.am(b,a,a.length)
a[b]=c},
$asbW:function(){return[P.R]},
$ast:function(){return[P.R]},
$ism:1,
$asm:function(){return[P.R]},
$isa:1,
$asa:function(){return[P.R]},
"%":"Float64Array"},
aC:{"^":"el;",
i:function(a,b,c){H.i(b)
H.i(c)
H.am(b,a,a.length)
a[b]=c},
$asbW:function(){return[P.D]},
$ast:function(){return[P.D]},
$ism:1,
$asm:function(){return[P.D]},
$isa:1,
$asa:function(){return[P.D]}},
im:{"^":"dQ;",$isar:1,"%":"Float32Array"},
mF:{"^":"aC;",
h:function(a,b){H.i(b)
H.am(b,a,a.length)
return a[b]},
"%":"Int16Array"},
mG:{"^":"aC;",
h:function(a,b){H.i(b)
H.am(b,a,a.length)
return a[b]},
$ishO:1,
"%":"Int32Array"},
mH:{"^":"aC;",
h:function(a,b){H.i(b)
H.am(b,a,a.length)
return a[b]},
"%":"Int8Array"},
mI:{"^":"aC;",
h:function(a,b){H.i(b)
H.am(b,a,a.length)
return a[b]},
"%":"Uint16Array"},
ip:{"^":"aC;",
h:function(a,b){H.i(b)
H.am(b,a,a.length)
return a[b]},
$isnt:1,
"%":"Uint32Array"},
mJ:{"^":"aC;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
H.am(b,a,a.length)
return a[b]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
mK:{"^":"aC;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
H.am(b,a,a.length)
return a[b]},
"%":";Uint8Array"},
ei:{"^":"cB+t;"},
ej:{"^":"ei+bW;"},
ek:{"^":"cB+t;"},
el:{"^":"ek+bW;"}}],["","",,P,{"^":"",
jr:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.lb()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aN(new P.jt(z),1)).observe(y,{childList:true})
return new P.js(z,y,x)}else if(self.setImmediate!=null)return P.lc()
return P.ld()},
nE:[function(a){self.scheduleImmediate(H.aN(new P.ju(H.n(a,{func:1,ret:-1})),0))},"$1","lb",4,0,3],
nF:[function(a){self.setImmediate(H.aN(new P.jv(H.n(a,{func:1,ret:-1})),0))},"$1","lc",4,0,3],
nG:[function(a){H.n(a,{func:1,ret:-1})
P.kK(0,a)},"$1","ld",4,0,3],
hB:function(a,b,c){var z
H.h(b,"$isU")
if(a==null)a=new P.bY()
z=$.G
if(z!==C.e)z.toString
z=new P.V(0,z,[c])
z.bl(a,b)
return z},
hC:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
H.p(a,"$ism",[[P.a4,d]],"$asm")
s=[P.a,d]
r=[s]
y=new P.V(0,$.G,r)
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.hE(z,b,!1,y)
try{for(q=a,p=q.length,o=0,n=0;o<q.length;q.length===p||(0,H.E)(q),++o){w=q[o]
v=n
w.aL(new P.hD(z,v,y,b,!1,d),x,null)
n=++z.b}if(n===0){r=new P.V(0,$.G,r)
r.bk(C.Z)
return r}r=new Array(n)
r.fixed$length=Array
z.a=H.f(r,[d])}catch(m){u=H.a5(m)
t=H.b_(m)
if(z.b===0||!1)return P.hB(u,t,s)
else{z.c=u
z.d=t}}return y},
l7:function(a,b){if(H.bI(a,{func:1,args:[P.b,P.U]}))return H.n(a,{func:1,ret:null,args:[P.b,P.U]})
if(H.bI(a,{func:1,args:[P.b]}))return H.n(a,{func:1,ret:null,args:[P.b]})
throw H.d(P.da(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
l5:function(){var z,y
for(;z=$.aW,z!=null;){$.bn=null
y=z.b
$.aW=y
if(y==null)$.bm=null
z.a.$0()}},
nS:[function(){$.cL=!0
try{P.l5()}finally{$.bn=null
$.cL=!1
if($.aW!=null)$.cW().$1(P.eB())}},"$0","eB",0,0,1],
ew:function(a){var z=new P.e8(H.n(a,{func:1,ret:-1}))
if($.aW==null){$.bm=z
$.aW=z
if(!$.cL)$.cW().$1(P.eB())}else{$.bm.b=z
$.bm=z}},
la:function(a){var z,y,x
H.n(a,{func:1,ret:-1})
z=$.aW
if(z==null){P.ew(a)
$.bn=$.bm
return}y=new P.e8(a)
x=$.bn
if(x==null){y.b=z
$.bn=y
$.aW=y}else{y.b=x.b
x.b=y
$.bn=y
if(y.b==null)$.bm=y}},
lG:function(a){var z,y
z={func:1,ret:-1}
H.n(a,z)
y=$.G
if(C.e===y){P.aX(null,null,C.e,a)
return}y.toString
P.aX(null,null,y,H.n(y.bC(a),z))},
c7:function(a,b,c,d,e){var z={}
z.a=d
P.la(new P.l8(z,e))},
eu:function(a,b,c,d,e){var z,y
H.n(d,{func:1,ret:e})
y=$.G
if(y===c)return d.$0()
$.G=c
z=y
try{y=d.$0()
return y}finally{$.G=z}},
ev:function(a,b,c,d,e,f,g){var z,y
H.n(d,{func:1,ret:f,args:[g]})
H.z(e,g)
y=$.G
if(y===c)return d.$1(e)
$.G=c
z=y
try{y=d.$1(e)
return y}finally{$.G=z}},
l9:function(a,b,c,d,e,f,g,h,i){var z,y
H.n(d,{func:1,ret:g,args:[h,i]})
H.z(e,h)
H.z(f,i)
y=$.G
if(y===c)return d.$2(e,f)
$.G=c
z=y
try{y=d.$2(e,f)
return y}finally{$.G=z}},
aX:function(a,b,c,d){var z
H.n(d,{func:1,ret:-1})
z=C.e!==c
if(z)d=!(!z||!1)?c.bC(d):c.dP(d,-1)
P.ew(d)},
jt:{"^":"o:9;a",
$1:function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()}},
js:{"^":"o:26;a,b,c",
$1:function(a){var z,y
this.a.a=H.n(a,{func:1,ret:-1})
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
ju:{"^":"o:0;a",
$0:function(){this.a.$0()}},
jv:{"^":"o:0;a",
$0:function(){this.a.$0()}},
kJ:{"^":"b;a,0b,c",
d7:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.aN(new P.kL(this,b),0),a)
else throw H.d(P.B("`setTimeout()` not found."))},
p:{
kK:function(a,b){var z=new P.kJ(!0,0)
z.d7(a,b)
return z}}},
kL:{"^":"o:1;a,b",
$0:function(){var z=this.a
z.b=null
z.c=1
this.b.$0()}},
a4:{"^":"b;$ti"},
hE:{"^":"o:15;a,b,c,d",
$2:function(a,b){var z,y
H.h(b,"$isU")
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.c)this.d.L(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.c)this.d.L(z.c,z.d)}},
hD:{"^":"o;a,b,c,d,e,f",
$1:function(a){var z,y
H.z(a,this.f)
z=this.a;--z.b
y=z.a
if(y!=null){C.a.i(y,this.b,a)
if(z.b===0)this.c.bn(z.a)}else if(z.b===0&&!this.e)this.c.L(z.c,z.d)},
$S:function(){return{func:1,ret:P.A,args:[this.f]}}},
ec:{"^":"b;$ti",
dV:function(a,b){if(a==null)a=new P.bY()
if(this.a.a!==0)throw H.d(P.bE("Future already completed"))
$.G.toString
this.L(a,b)},
dU:function(a){return this.dV(a,null)}},
e9:{"^":"ec;a,$ti",
ah:function(a,b){var z
H.aZ(b,{futureOr:1,type:H.q(this,0)})
z=this.a
if(z.a!==0)throw H.d(P.bE("Future already completed"))
z.bk(b)},
L:function(a,b){this.a.bl(a,b)}},
kE:{"^":"ec;a,$ti",
ah:function(a,b){var z
H.aZ(b,{futureOr:1,type:H.q(this,0)})
z=this.a
if(z.a!==0)throw H.d(P.bE("Future already completed"))
z.as(b)},
L:function(a,b){this.a.L(a,b)}},
aU:{"^":"b;0a,b,c,d,e,$ti",
eh:function(a){if(this.c!==6)return!0
return this.b.b.aJ(H.n(this.d,{func:1,ret:P.Z,args:[P.b]}),a.a,P.Z,P.b)},
ec:function(a){var z,y,x,w
z=this.e
y=P.b
x={futureOr:1,type:H.q(this,1)}
w=this.b.b
if(H.bI(z,{func:1,args:[P.b,P.U]}))return H.aZ(w.eo(z,a.a,a.b,null,y,P.U),x)
else return H.aZ(w.aJ(H.n(z,{func:1,args:[P.b]}),a.a,null,y),x)}},
V:{"^":"b;bu:a<,b,0dA:c<,$ti",
aL:function(a,b,c){var z,y,x,w
z=H.q(this,0)
H.n(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
y=$.G
if(y!==C.e){y.toString
H.n(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
if(b!=null)b=P.l7(b,y)}H.n(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
x=new P.V(0,$.G,[c])
w=b==null?1:3
this.bj(new P.aU(x,w,a,b,[z,c]))
return x},
aK:function(a,b){return this.aL(a,null,b)},
bj:function(a){var z,y
z=this.a
if(z<=1){a.a=H.h(this.c,"$isaU")
this.c=a}else{if(z===2){y=H.h(this.c,"$isV")
z=y.a
if(z<4){y.bj(a)
return}this.a=z
this.c=y.c}z=this.b
z.toString
P.aX(null,null,z,H.n(new P.jO(this,a),{func:1,ret:-1}))}},
br:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=H.h(this.c,"$isaU")
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){u=H.h(this.c,"$isV")
y=u.a
if(y<4){u.br(a)
return}this.a=y
this.c=u.c}z.a=this.af(a)
y=this.b
y.toString
P.aX(null,null,y,H.n(new P.jV(z,this),{func:1,ret:-1}))}},
ae:function(){var z=H.h(this.c,"$isaU")
this.c=null
return this.af(z)},
af:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
as:function(a){var z,y,x
z=H.q(this,0)
H.aZ(a,{futureOr:1,type:z})
y=this.$ti
if(H.at(a,"$isa4",y,"$asa4"))if(H.at(a,"$isV",y,null))P.c2(a,this)
else P.ed(a,this)
else{x=this.ae()
H.z(a,z)
this.a=4
this.c=a
P.aV(this,x)}},
bn:function(a){var z
H.z(a,H.q(this,0))
z=this.ae()
this.a=4
this.c=a
P.aV(this,z)},
L:function(a,b){var z
H.h(b,"$isU")
z=this.ae()
this.a=8
this.c=new P.a6(a,b)
P.aV(this,z)},
bk:function(a){var z
H.aZ(a,{futureOr:1,type:H.q(this,0)})
if(H.at(a,"$isa4",this.$ti,"$asa4")){this.da(a)
return}this.a=1
z=this.b
z.toString
P.aX(null,null,z,H.n(new P.jQ(this,a),{func:1,ret:-1}))},
da:function(a){var z=this.$ti
H.p(a,"$isa4",z,"$asa4")
if(H.at(a,"$isV",z,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.aX(null,null,z,H.n(new P.jU(this,a),{func:1,ret:-1}))}else P.c2(a,this)
return}P.ed(a,this)},
bl:function(a,b){var z
H.h(b,"$isU")
this.a=1
z=this.b
z.toString
P.aX(null,null,z,H.n(new P.jP(this,a,b),{func:1,ret:-1}))},
$isa4:1,
p:{
ed:function(a,b){var z,y,x
b.a=1
try{a.aL(new P.jR(b),new P.jS(b),null)}catch(x){z=H.a5(x)
y=H.b_(x)
P.lG(new P.jT(b,z,y))}},
c2:function(a,b){var z,y
for(;z=a.a,z===2;)a=H.h(a.c,"$isV")
if(z>=4){y=b.ae()
b.a=a.a
b.c=a.c
P.aV(b,y)}else{y=H.h(b.c,"$isaU")
b.a=2
b.c=a
a.br(y)}},
aV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=H.h(y.c,"$isa6")
y=y.b
u=v.a
t=v.b
y.toString
P.c7(null,null,y,u,t)}return}for(;s=b.a,s!=null;b=s){b.a=null
P.aV(z.a,b)}y=z.a
r=y.c
x.a=w
x.b=r
u=!w
if(u){t=b.c
t=(t&1)!==0||t===8}else t=!0
if(t){t=b.b
q=t.b
if(w){p=y.b
p.toString
p=p==q
if(!p)q.toString
else p=!0
p=!p}else p=!1
if(p){H.h(r,"$isa6")
y=y.b
u=r.a
t=r.b
y.toString
P.c7(null,null,y,u,t)
return}o=$.G
if(o!=q)$.G=q
else o=null
y=b.c
if(y===8)new P.jY(z,x,b,w).$0()
else if(u){if((y&1)!==0)new P.jX(x,b,r).$0()}else if((y&2)!==0)new P.jW(z,x,b).$0()
if(o!=null)$.G=o
y=x.b
if(!!J.C(y).$isa4){if(y.a>=4){n=H.h(t.c,"$isaU")
t.c=null
b=t.af(n)
t.a=y.a
t.c=y.c
z.a=y
continue}else P.c2(y,t)
return}}m=b.b
n=H.h(m.c,"$isaU")
m.c=null
b=m.af(n)
y=x.a
u=x.b
if(!y){H.z(u,H.q(m,0))
m.a=4
m.c=u}else{H.h(u,"$isa6")
m.a=8
m.c=u}z.a=m
y=m}}}},
jO:{"^":"o:0;a,b",
$0:function(){P.aV(this.a,this.b)}},
jV:{"^":"o:0;a,b",
$0:function(){P.aV(this.b,this.a.a)}},
jR:{"^":"o:9;a",
$1:function(a){var z=this.a
z.a=0
z.as(a)}},
jS:{"^":"o:16;a",
$2:function(a,b){H.h(b,"$isU")
this.a.L(a,b)},
$1:function(a){return this.$2(a,null)}},
jT:{"^":"o:0;a,b,c",
$0:function(){this.a.L(this.b,this.c)}},
jQ:{"^":"o:0;a,b",
$0:function(){var z=this.a
z.bn(H.z(this.b,H.q(z,0)))}},
jU:{"^":"o:0;a,b",
$0:function(){P.c2(this.b,this.a)}},
jP:{"^":"o:0;a,b,c",
$0:function(){this.a.L(this.b,this.c)}},
jY:{"^":"o:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.c7(H.n(w.d,{func:1}),null)}catch(v){y=H.a5(v)
x=H.b_(v)
if(this.d){w=H.h(this.a.a.c,"$isa6").a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=H.h(this.a.a.c,"$isa6")
else u.b=new P.a6(y,x)
u.a=!0
return}if(!!J.C(z).$isa4){if(z instanceof P.V&&z.gbu()>=4){if(z.gbu()===8){w=this.b
w.b=H.h(z.gdA(),"$isa6")
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.aK(new P.jZ(t),null)
w.a=!1}}},
jZ:{"^":"o:17;a",
$1:function(a){return this.a}},
jX:{"^":"o:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t
try{x=this.b
w=H.q(x,0)
v=H.z(this.c,w)
u=H.q(x,1)
this.a.b=x.b.b.aJ(H.n(x.d,{func:1,ret:{futureOr:1,type:u},args:[w]}),v,{futureOr:1,type:u},w)}catch(t){z=H.a5(t)
y=H.b_(t)
x=this.a
x.b=new P.a6(z,y)
x.a=!0}}},
jW:{"^":"o:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=H.h(this.a.a.c,"$isa6")
w=this.c
if(w.eh(z)&&w.e!=null){v=this.b
v.b=w.ec(z)
v.a=!1}}catch(u){y=H.a5(u)
x=H.b_(u)
w=H.h(this.a.a.c,"$isa6")
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.a6(y,x)
s.a=!0}}},
e8:{"^":"b;a,0b"},
j3:{"^":"b;$ti",
gj:function(a){var z,y,x,w
z={}
y=new P.V(0,$.G,[P.D])
z.a=0
x=H.q(this,0)
w=H.n(new P.j6(z,this),{func:1,ret:-1,args:[x]})
H.n(new P.j7(z,y),{func:1,ret:-1})
W.al(this.a,this.b,w,!1,x)
return y}},
j6:{"^":"o;a,b",
$1:function(a){H.z(a,H.q(this.b,0));++this.a.a},
$S:function(){return{func:1,ret:P.A,args:[H.q(this.b,0)]}}},
j7:{"^":"o:0;a,b",
$0:function(){this.b.as(this.a.a)}},
j4:{"^":"b;"},
j5:{"^":"b;"},
a6:{"^":"b;a,b",
l:function(a){return H.c(this.a)},
$isT:1},
kR:{"^":"b;",$isnC:1},
l8:{"^":"o:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.bY()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.d(z)
x=H.d(z)
x.stack=y.l(0)
throw x}},
kn:{"^":"kR;",
ep:function(a){var z,y,x
H.n(a,{func:1,ret:-1})
try{if(C.e===$.G){a.$0()
return}P.eu(null,null,this,a,-1)}catch(x){z=H.a5(x)
y=H.b_(x)
P.c7(null,null,this,z,H.h(y,"$isU"))}},
eq:function(a,b,c){var z,y,x
H.n(a,{func:1,ret:-1,args:[c]})
H.z(b,c)
try{if(C.e===$.G){a.$1(b)
return}P.ev(null,null,this,a,b,-1,c)}catch(x){z=H.a5(x)
y=H.b_(x)
P.c7(null,null,this,z,H.h(y,"$isU"))}},
dP:function(a,b){return new P.kp(this,H.n(a,{func:1,ret:b}),b)},
bC:function(a){return new P.ko(this,H.n(a,{func:1,ret:-1}))},
dQ:function(a,b){return new P.kq(this,H.n(a,{func:1,ret:-1,args:[b]}),b)},
h:function(a,b){return},
c7:function(a,b){H.n(a,{func:1,ret:b})
if($.G===C.e)return a.$0()
return P.eu(null,null,this,a,b)},
aJ:function(a,b,c,d){H.n(a,{func:1,ret:c,args:[d]})
H.z(b,d)
if($.G===C.e)return a.$1(b)
return P.ev(null,null,this,a,b,c,d)},
eo:function(a,b,c,d,e,f){H.n(a,{func:1,ret:d,args:[e,f]})
H.z(b,e)
H.z(c,f)
if($.G===C.e)return a.$2(b,c)
return P.l9(null,null,this,a,b,c,d,e,f)}},
kp:{"^":"o;a,b,c",
$0:function(){return this.a.c7(this.b,this.c)},
$S:function(){return{func:1,ret:this.c}}},
ko:{"^":"o:1;a,b",
$0:function(){return this.a.ep(this.b)}},
kq:{"^":"o;a,b,c",
$1:function(a){var z=this.c
return this.a.eq(this.b,H.z(a,z),z)},
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
cy:function(a,b,c){H.N(a)
return H.p(H.lk(a,new H.cw(0,0,[b,c])),"$isdH",[b,c],"$asdH")},
ab:function(a,b){return new H.cw(0,0,[a,b])},
i3:function(){return new H.cw(0,0,[null,null])},
ac:function(a,b,c,d){return new P.k8(0,0,[d])},
hP:function(a,b,c){var z,y
if(P.cM(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=H.f([],[P.e])
y=$.bq()
C.a.k(y,a)
try{P.l4(a,z)}finally{if(0>=y.length)return H.j(y,-1)
y.pop()}y=P.dZ(b,H.eJ(z,"$ism"),", ")+c
return y.charCodeAt(0)==0?y:y},
ct:function(a,b,c){var z,y,x
if(P.cM(a))return b+"..."+c
z=new P.cE(b)
y=$.bq()
C.a.k(y,a)
try{x=z
x.a=P.dZ(x.gZ(),a,", ")}finally{if(0>=y.length)return H.j(y,-1)
y.pop()}y=z
y.a=y.gZ()+c
y=z.gZ()
return y.charCodeAt(0)==0?y:y},
cM:function(a){var z,y
for(z=0;y=$.bq(),z<y.length;++z)if(a===y[z])return!0
return!1},
l4:function(a,b){var z,y,x,w,v,u,t,s,r,q
H.p(b,"$isa",[P.e],"$asa")
z=a.gw(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.t())return
w=H.c(z.gA(z))
C.a.k(b,w)
y+=w.length+2;++x}if(!z.t()){if(x<=5)return
if(0>=b.length)return H.j(b,-1)
v=b.pop()
if(0>=b.length)return H.j(b,-1)
u=b.pop()}else{t=z.gA(z);++x
if(!z.t()){if(x<=4){C.a.k(b,H.c(t))
return}v=H.c(t)
if(0>=b.length)return H.j(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gA(z);++x
for(;z.t();t=s,s=r){r=z.gA(z);++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.j(b,-1)
y-=b.pop().length+2;--x}C.a.k(b,"...")
return}}u=H.c(t)
v=H.c(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.j(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)C.a.k(b,q)
C.a.k(b,u)
C.a.k(b,v)},
cz:function(a,b){var z,y,x
z=P.ac(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.E)(a),++x)z.k(0,H.z(a[x],b))
return z},
dN:function(a){var z,y,x
z={}
if(P.cM(a))return"{...}"
y=new P.cE("")
try{C.a.k($.bq(),a)
x=y
x.a=x.gZ()+"{"
z.a=!0
J.fz(a,new P.i8(z,y))
z=y
z.a=z.gZ()+"}"}finally{z=$.bq()
if(0>=z.length)return H.j(z,-1)
z.pop()}z=y.gZ()
return z.charCodeAt(0)==0?z:z},
k8:{"^":"k0;a,0b,0c,0d,0e,0f,r,$ti",
gw:function(a){var z=new P.eh(this,this.r,this.$ti)
z.c=this.e
return z},
gj:function(a){return this.a},
u:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return H.h(z[b],"$isbH")!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return H.h(y[b],"$isbH")!=null}else return this.dc(b)},
dc:function(a){var z=this.d
if(z==null)return!1
return this.aw(this.bq(z,a),a)>=0},
k:function(a,b){var z,y
H.z(b,H.q(this,0))
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.cI()
this.b=z}return this.bi(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.cI()
this.c=y}return this.bi(y,b)}else return this.d8(0,b)},
d8:function(a,b){var z,y,x
H.z(b,H.q(this,0))
z=this.d
if(z==null){z=P.cI()
this.d=z}y=this.bo(b)
x=z[y]
if(x==null)z[y]=[this.aB(b)]
else{if(this.aw(x,b)>=0)return!1
x.push(this.aB(b))}return!0},
c5:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bs(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bs(this.c,b)
else return this.dt(0,b)},
dt:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=this.bq(z,b)
x=this.aw(y,b)
if(x<0)return!1
this.bw(y.splice(x,1)[0])
return!0},
V:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.az()}},
bi:function(a,b){H.z(b,H.q(this,0))
if(H.h(a[b],"$isbH")!=null)return!1
a[b]=this.aB(b)
return!0},
bs:function(a,b){var z
if(a==null)return!1
z=H.h(a[b],"$isbH")
if(z==null)return!1
this.bw(z)
delete a[b]
return!0},
az:function(){this.r=this.r+1&67108863},
aB:function(a){var z,y
z=new P.bH(H.z(a,H.q(this,0)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.az()
return z},
bw:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.az()},
bo:function(a){return J.av(a)&0x3ffffff},
bq:function(a,b){return a[this.bo(b)]},
aw:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.aR(a[y].a,b))return y
return-1},
p:{
cI:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
bH:{"^":"b;a,0b,0c"},
eh:{"^":"b;a,b,0c,0d,$ti",
sbm:function(a){this.d=H.z(a,H.q(this,0))},
gA:function(a){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.d(P.ax(z))
else{z=this.c
if(z==null){this.sbm(null)
return!1}else{this.sbm(H.z(z.a,H.q(this,0)))
this.c=this.c.b
return!0}}},
$isb6:1,
p:{
k9:function(a,b,c){var z=new P.eh(a,b,[c])
z.c=a.e
return z}}},
k0:{"^":"iS;"},
i4:{"^":"ka;",$ism:1,$isa:1},
t:{"^":"b;$ti",
gw:function(a){return new H.dI(a,this.gj(a),0,[H.bp(this,a,"t",0)])},
q:function(a,b){return this.h(a,b)},
ea:function(a,b,c,d){var z,y,x
H.z(b,d)
H.n(c,{func:1,ret:d,args:[d,H.bp(this,a,"t",0)]})
z=this.gj(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.h(a,x))
if(z!==this.gj(a))throw H.d(P.ax(a))}return y},
l:function(a){return P.ct(a,"[","]")}},
cA:{"^":"Y;"},
i8:{"^":"o:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.c(a)
z.a=y+": "
z.a+=H.c(b)}},
Y:{"^":"b;$ti",
D:function(a,b){var z,y
H.n(b,{func:1,ret:-1,args:[H.bp(this,a,"Y",0),H.bp(this,a,"Y",1)]})
for(z=J.br(this.gE(a));z.t();){y=z.gA(z)
b.$2(y,this.h(a,y))}},
C:function(a,b){return J.fm(this.gE(a),b)},
gj:function(a){return J.ap(this.gE(a))},
l:function(a){return P.dN(a)},
$isF:1},
iT:{"^":"b;$ti",
I:function(a,b){var z
for(z=J.br(H.p(b,"$ism",this.$ti,"$asm"));z.t();)this.k(0,z.gA(z))},
l:function(a){return P.ct(this,"{","}")},
$ism:1,
$isn1:1},
iS:{"^":"iT;"},
ka:{"^":"b+t;"}}],["","",,P,{"^":"",
l6:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.d(H.aM(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.a5(x)
w=String(y)
throw H.d(new P.hy(w,null,null))}w=P.c4(z)
return w},
c4:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.k4(a,Object.create(null))
for(z=0;z<a.length;++z)a[z]=P.c4(a[z])
return a},
k4:{"^":"cA;a,b,0c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.ds(b):y}},
gj:function(a){return this.b==null?this.c.a:this.ac().length},
gE:function(a){var z
if(this.b==null){z=this.c
return new H.as(z,[H.q(z,0)])}return new P.k5(this)},
C:function(a,b){if(this.b==null)return this.c.C(0,b)
return Object.prototype.hasOwnProperty.call(this.a,b)},
D:function(a,b){var z,y,x,w
H.n(b,{func:1,ret:-1,args:[P.e,,]})
if(this.b==null)return this.c.D(0,b)
z=this.ac()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.c4(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.d(P.ax(this))}},
ac:function(){var z=H.N(this.c)
if(z==null){z=H.f(Object.keys(this.a),[P.e])
this.c=z}return z},
ds:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.c4(this.a[a])
return this.b[a]=z},
$asY:function(){return[P.e,null]},
$asF:function(){return[P.e,null]}},
k5:{"^":"b9;a",
gj:function(a){var z=this.a
return z.gj(z)},
q:function(a,b){var z=this.a
if(z.b==null)z=z.gE(z).q(0,b)
else{z=z.ac()
if(b<0||b>=z.length)return H.j(z,b)
z=z[b]}return z},
gw:function(a){var z=this.a
if(z.b==null){z=z.gE(z)
z=z.gw(z)}else{z=z.ac()
z=new J.db(z,z.length,0,[H.q(z,0)])}return z},
u:function(a,b){return this.a.C(0,b)},
$asb9:function(){return[P.e]},
$asm:function(){return[P.e]}},
dj:{"^":"b;$ti"},
dm:{"^":"j5;$ti"},
hV:{"^":"dj;a,b",
e2:function(a,b,c){var z=P.l6(b,this.ge3().a)
return z},
e1:function(a,b){return this.e2(a,b,null)},
ge3:function(){return C.V},
$asdj:function(){return[P.b,P.e]}},
hW:{"^":"dm;a",
$asdm:function(){return[P.e,P.b]}}}],["","",,P,{"^":"",
hu:function(a){if(a instanceof H.o)return a.l(0)
return"Instance of '"+H.bg(a)+"'"},
bV:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.bs(a)
if(typeof a==="string")return JSON.stringify(a)
return P.hu(a)},
dy:function(a){return new P.jJ(a)},
a_:function(a){H.b0(H.c(a))},
Z:{"^":"b;"},
"+bool":0,
b3:{"^":"b;a,b",
F:function(a,b){if(b==null)return!1
return b instanceof P.b3&&this.a===b.a&&this.b===b.b},
N:function(a,b){return C.b.N(this.a,H.h(b,"$isb3").a)},
gv:function(a){var z=this.a
return(z^C.b.bt(z,30))&1073741823},
l:function(a){var z,y,x,w,v,u,t
z=P.hk(H.iG(this))
y=P.bt(H.iE(this))
x=P.bt(H.iA(this))
w=P.bt(H.iB(this))
v=P.bt(H.iD(this))
u=P.bt(H.iF(this))
t=P.hl(H.iC(this))
if(this.b)return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
else return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
$isa3:1,
$asa3:function(){return[P.b3]},
p:{
hk:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+z
if(z>=10)return y+"00"+z
return y+"000"+z},
hl:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bt:function(a){if(a>=10)return""+a
return"0"+a}}},
R:{"^":"J;"},
"+double":0,
b4:{"^":"b;a",
Y:function(a,b){return C.b.Y(this.a,H.h(b,"$isb4").a)},
F:function(a,b){if(b==null)return!1
return b instanceof P.b4&&this.a===b.a},
gv:function(a){return this.a&0x1FFFFFFF},
N:function(a,b){return C.b.N(this.a,H.h(b,"$isb4").a)},
l:function(a){var z,y,x,w,v
z=new P.hr()
y=this.a
if(y<0)return"-"+new P.b4(0-y).l(0)
x=z.$1(C.b.H(y,6e7)%60)
w=z.$1(C.b.H(y,1e6)%60)
v=new P.hq().$1(y%1e6)
return""+C.b.H(y,36e8)+":"+H.c(x)+":"+H.c(w)+"."+H.c(v)},
$isa3:1,
$asa3:function(){return[P.b4]},
p:{
dt:function(a,b,c,d,e,f){return new P.b4(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
hq:{"^":"o:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
hr:{"^":"o:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
T:{"^":"b;"},
bY:{"^":"T;",
l:function(a){return"Throw of null."}},
aw:{"^":"T;a,b,c,d",
gau:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gat:function(){return""},
l:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.c(z)
w=this.gau()+y+x
if(!this.a)return w
v=this.gat()
u=P.bV(this.b)
return w+v+": "+H.c(u)},
p:{
h_:function(a){return new P.aw(!1,null,null,a)},
da:function(a,b,c){return new P.aw(!0,a,b,c)}}},
dU:{"^":"aw;e,f,a,b,c,d",
gau:function(){return"RangeError"},
gat:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.c(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.c(z)
else if(x>z)y=": Not in range "+H.c(z)+".."+H.c(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.c(z)}return y},
p:{
c_:function(a,b,c){return new P.dU(null,null,!0,a,b,"Value not in range")},
bZ:function(a,b,c,d,e){return new P.dU(b,c,!0,a,d,"Invalid value")}}},
hN:{"^":"aw;e,j:f>,a,b,c,d",
gau:function(){return"RangeError"},
gat:function(){var z,y
z=H.i(this.b)
if(typeof z!=="number")return z.R()
if(z<0)return": index must not be negative"
y=this.f
if(y===0)return": no indices are valid"
return": index should be less than "+H.c(y)},
p:{
K:function(a,b,c,d,e){var z=H.i(e==null?J.ap(b):e)
return new P.hN(b,z,!0,a,c,"Index out of range")}}},
ji:{"^":"T;a",
l:function(a){return"Unsupported operation: "+this.a},
p:{
B:function(a){return new P.ji(a)}}},
jg:{"^":"T;a",
l:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
p:{
cG:function(a){return new P.jg(a)}}},
cD:{"^":"T;a",
l:function(a){return"Bad state: "+this.a},
p:{
bE:function(a){return new P.cD(a)}}},
hc:{"^":"T;a",
l:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.c(P.bV(z))+"."},
p:{
ax:function(a){return new P.hc(a)}}},
dY:{"^":"b;",
l:function(a){return"Stack Overflow"},
$isT:1},
hj:{"^":"T;a",
l:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
jJ:{"^":"b;a",
l:function(a){return"Exception: "+this.a}},
hy:{"^":"b;a,b,c",
l:function(a){var z,y
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
return y}},
bv:{"^":"b;"},
D:{"^":"J;"},
"+int":0,
m:{"^":"b;$ti",
aN:["cK",function(a,b){var z=H.cQ(this,"m",0)
return new H.e6(this,H.n(b,{func:1,ret:P.Z,args:[z]}),[z])}],
gj:function(a){var z,y
z=this.gw(this)
for(y=0;z.t();)++y
return y},
q:function(a,b){var z,y,x
if(b<0)H.aa(P.bZ(b,0,null,"index",null))
for(z=this.gw(this),y=0;z.t();){x=z.gA(z)
if(b===y)return x;++y}throw H.d(P.K(b,this,"index",null,y))},
l:function(a){return P.hP(this,"(",")")}},
b6:{"^":"b;$ti"},
a:{"^":"b;$ti",$ism:1},
"+List":0,
F:{"^":"b;$ti"},
A:{"^":"b;",
gv:function(a){return P.b.prototype.gv.call(this,this)},
l:function(a){return"null"}},
"+Null":0,
J:{"^":"b;",$isa3:1,
$asa3:function(){return[P.J]}},
"+num":0,
b:{"^":";",
F:function(a,b){return this===b},
gv:function(a){return H.bf(this)},
l:function(a){return"Instance of '"+H.bg(this)+"'"},
toString:function(){return this.l(this)}},
U:{"^":"b;"},
e:{"^":"b;",$isa3:1,
$asa3:function(){return[P.e]},
$isiw:1},
"+String":0,
cE:{"^":"b;Z:a<",
gj:function(a){return this.a.length},
l:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
p:{
dZ:function(a,b,c){var z=J.br(b)
if(!z.t())return a
if(c.length===0){do a+=H.c(z.gA(z))
while(z.t())}else{a+=H.c(z.gA(z))
for(;z.t();)a=a+c+H.c(z.gA(z))}return a}}}}],["","",,W,{"^":"",
hs:function(a,b,c){var z,y,x,w
z=document.body
y=(z&&C.r).O(z,a,b,c)
y.toString
z=W.w
z=new H.e6(new W.ae(y),H.n(new W.ht(),{func:1,ret:P.Z,args:[z]}),[z])
x=z.gw(z)
if(!x.t())H.aa(H.dE())
w=x.gA(x)
if(x.t())H.aa(H.hQ())
return H.h(w,"$isS")},
dx:function(a){H.h(a,"$isO")
return"wheel"},
b5:function(a){var z,y,x
z="element tag unavailable"
try{y=J.fD(a)
if(typeof y==="string")z=a.tagName}catch(x){H.a5(x)}return z},
jG:function(a,b){return document.createElement(a)},
c3:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
eg:function(a,b,c,d){var z,y
z=W.c3(W.c3(W.c3(W.c3(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
cJ:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.jA(a)
if(!!J.C(z).$isO)return z
return}else return H.h(a,"$isO")},
l1:function(a){if(!!J.C(a).$iscr)return a
return new P.jo([],[],!1).dX(a,!0)},
ey:function(a,b){var z
H.n(a,{func:1,ret:-1,args:[b]})
z=$.G
if(z===C.e)return a
return z.dQ(a,b)},
P:{"^":"S;","%":"HTMLBRElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTextAreaElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
lK:{"^":"k;0j:length=","%":"AccessibleNodeList"},
fX:{"^":"P;",
l:function(a){return String(a)},
$isfX:1,
"%":"HTMLAnchorElement"},
lL:{"^":"P;",
l:function(a){return String(a)},
"%":"HTMLAreaElement"},
dc:{"^":"P;",$isdc:1,"%":"HTMLBaseElement"},
h2:{"^":"k;","%":";Blob"},
bT:{"^":"P;",$isbT:1,"%":"HTMLBodyElement"},
cp:{"^":"P;0n:height=,0m:width=",
ct:function(a,b,c){var z=this.di(a,b,P.le(c,null))
return z},
di:function(a,b,c){return a.getContext(b,c)},
$iscp:1,
"%":"HTMLCanvasElement"},
lQ:{"^":"k;",
ak:function(a){return P.W(a.getContextAttributes())},
"%":"CanvasRenderingContext2D"},
lR:{"^":"w;0j:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
hf:{"^":"cq;",$ishf:1,"%":"CSSNumericValue|CSSUnitValue"},
lS:{"^":"hi;0j:length=","%":"CSSPerspective"},
ay:{"^":"k;",$isay:1,"%":"CSSCharsetRule|CSSConditionRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
hg:{"^":"jy;0j:length=",
aS:function(a,b){var z=this.dj(a,this.aq(a,b))
return z==null?"":z},
aq:function(a,b){var z,y
z=$.eQ()
y=z[b]
if(typeof y==="string")return y
y=this.dI(a,b)
z[b]=y
return y},
dI:function(a,b){var z
if(b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()}) in a)return b
z=P.hm()+b
if(z in a)return z
return b},
dj:function(a,b){return a.getPropertyValue(b)},
gn:function(a){return a.height},
gm:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
hh:{"^":"b;",
gn:function(a){return this.aS(a,"height")},
gm:function(a){return this.aS(a,"width")}},
cq:{"^":"k;","%":"CSSImageValue|CSSKeywordValue|CSSPositionValue|CSSResourceValue|CSSURLImageValue;CSSStyleValue"},
hi:{"^":"k;","%":"CSSMatrixComponent|CSSRotation|CSSScale|CSSSkew|CSSTranslation;CSSTransformComponent"},
lU:{"^":"cq;0j:length=","%":"CSSTransformValue"},
lV:{"^":"cq;0j:length=","%":"CSSUnparsedValue"},
lX:{"^":"k;0j:length=",
h:function(a,b){return a[H.i(b)]},
"%":"DataTransferItemList"},
hn:{"^":"P;","%":"HTMLDivElement"},
cr:{"^":"w;",
dK:function(a,b){return a.adoptNode(b)},
de:function(a,b){return a.createEvent(b)},
aO:function(a,b){return a.getElementsByTagName(b)},
cu:function(a,b){return a.getElementById(b)},
ek:function(a,b){return a.querySelector(b)},
gc1:function(a){return new W.bF(a,"mousedown",!1,[W.a0])},
gc2:function(a){return new W.bF(a,"mousemove",!1,[W.a0])},
gc3:function(a){return new W.bF(a,"mouseup",!1,[W.a0])},
gc4:function(a){return new W.bF(a,H.v(W.dx(a)),!1,[W.aT])},
$iscr:1,
"%":"XMLDocument;Document"},
lY:{"^":"k;",
l:function(a){return String(a)},
"%":"DOMException"},
ho:{"^":"k;",
e_:function(a,b){return a.createHTMLDocument(b)},
"%":"DOMImplementation"},
lZ:{"^":"jC;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.p(c,"$isa2",[P.J],"$asa2")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[[P.a2,P.J]]},
$isy:1,
$asy:function(){return[[P.a2,P.J]]},
$ast:function(){return[[P.a2,P.J]]},
$ism:1,
$asm:function(){return[[P.a2,P.J]]},
$isa:1,
$asa:function(){return[[P.a2,P.J]]},
$asu:function(){return[[P.a2,P.J]]},
"%":"ClientRectList|DOMRectList"},
hp:{"^":"k;",
l:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(this.gm(a))+" x "+H.c(this.gn(a))},
F:function(a,b){var z
if(b==null)return!1
if(!H.at(b,"$isa2",[P.J],"$asa2"))return!1
if(a.left===b.left)if(a.top===b.top){z=J.l(b)
z=this.gm(a)===z.gm(b)&&this.gn(a)===z.gn(b)}else z=!1
else z=!1
return z},
gv:function(a){return W.eg(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,this.gm(a)&0x1FFFFFFF,this.gn(a)&0x1FFFFFFF)},
gn:function(a){return a.height},
gm:function(a){return a.width},
$isa2:1,
$asa2:function(){return[P.J]},
"%":";DOMRectReadOnly"},
m_:{"^":"jE;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.v(c)
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[P.e]},
$isy:1,
$asy:function(){return[P.e]},
$ast:function(){return[P.e]},
$ism:1,
$asm:function(){return[P.e]},
$isa:1,
$asa:function(){return[P.e]},
$asu:function(){return[P.e]},
"%":"DOMStringList"},
m0:{"^":"k;0j:length=","%":"DOMTokenList"},
S:{"^":"w;0er:tagName=",
gdN:function(a){return new W.jF(a)},
l:function(a){return a.localName},
O:["am",function(a,b,c,d){var z,y,x,w
if(c==null){z=$.dw
if(z==null){z=H.f([],[W.ai])
y=new W.dS(z)
C.a.k(z,W.ee(null))
C.a.k(z,W.ep())
$.dw=y
d=y}else d=z
z=$.dv
if(z==null){z=new W.es(d)
$.dv=z
c=z}else{z.a=d
c=z}}if($.aq==null){z=document
y=z.implementation
y=(y&&C.K).e_(y,"")
$.aq=y
$.cs=y.createRange()
y=$.aq
y.toString
y=y.createElement("base")
H.h(y,"$isdc")
y.href=z.baseURI
z=$.aq.head;(z&&C.L).J(z,y)}z=$.aq
if(z.body==null){z.toString
y=z.createElement("body")
z.body=H.h(y,"$isbT")}z=$.aq
if(!!this.$isbT)x=z.body
else{y=a.tagName
z.toString
x=z.createElement(y)
z=$.aq.body;(z&&C.r).J(z,x)}if("createContextualFragment" in window.Range.prototype&&!C.a.u(C.X,a.tagName)){z=$.cs;(z&&C.D).cw(z,x)
z=$.cs
w=(z&&C.D).dY(z,b)}else{x.innerHTML=b
w=$.aq.createDocumentFragment()
for(z=J.l(w);y=x.firstChild,y!=null;)z.J(w,y)}z=$.aq.body
if(x==null?z!=null:x!==z)J.d3(x)
c.aX(w)
C.j.dK(document,w)
return w},function(a,b,c){return this.O(a,b,c,null)},"dZ",null,null,"geA",5,5,null],
cB:function(a,b,c,d){a.textContent=null
this.J(a,this.O(a,b,c,d))},
cA:function(a,b){return this.cB(a,b,null,null)},
a2:function(a,b){return a.getAttribute(b)},
dk:function(a,b){return a.hasAttribute(b)},
du:function(a,b){return a.removeAttribute(b)},
gc0:function(a){return new W.bl(a,"change",!1,[W.Q])},
gc1:function(a){return new W.bl(a,"mousedown",!1,[W.a0])},
gc2:function(a){return new W.bl(a,"mousemove",!1,[W.a0])},
gc3:function(a){return new W.bl(a,"mouseup",!1,[W.a0])},
gc4:function(a){return new W.bl(a,H.v(W.dx(a)),!1,[W.aT])},
$isS:1,
"%":";Element"},
ht:{"^":"o:34;",
$1:function(a){return!!J.C(H.h(a,"$isw")).$isS}},
m1:{"^":"P;0n:height=,0m:width=","%":"HTMLEmbedElement"},
Q:{"^":"k;",
gc8:function(a){return W.cJ(a.target)},
dl:function(a,b,c,d){return a.initEvent(b,!0,!0)},
$isQ:1,
"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
O:{"^":"k;",
by:["cI",function(a,b,c,d){H.n(c,{func:1,args:[W.Q]})
if(c!=null)this.d9(a,b,c,!1)}],
d9:function(a,b,c,d){return a.addEventListener(b,H.aN(H.n(c,{func:1,args:[W.Q]}),1),!1)},
e5:function(a,b){return a.dispatchEvent(b)},
$isO:1,
"%":"AbsoluteOrientationSensor|Accelerometer|AccessibleNode|AmbientLightSensor|AnalyserNode|Animation|ApplicationCache|AudioBufferSourceNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioNode|AudioPannerNode|AudioScheduledSourceNode|AudioWorkletNode|BackgroundFetchRegistration|BatteryManager|BiquadFilterNode|BluetoothDevice|BluetoothRemoteGATTCharacteristic|BroadcastChannel|CanvasCaptureMediaStreamTrack|ChannelMergerNode|ChannelSplitterNode|Clipboard|ConstantSourceNode|ConvolverNode|DOMApplicationCache|DataChannel|DedicatedWorkerGlobalScope|DelayNode|DynamicsCompressorNode|EventSource|FileReader|FontFaceSet|GainNode|Gyroscope|IDBDatabase|IDBTransaction|IIRFilterNode|JavaScriptAudioNode|LinearAccelerationSensor|MIDIAccess|MIDIInput|MIDIOutput|MIDIPort|Magnetometer|MediaDevices|MediaElementAudioSourceNode|MediaKeySession|MediaQueryList|MediaRecorder|MediaSource|MediaStream|MediaStreamAudioDestinationNode|MediaStreamAudioSourceNode|MediaStreamTrack|MojoInterfaceInterceptor|NetworkInformation|Notification|OfflineResourceList|OrientationSensor|Oscillator|OscillatorNode|PannerNode|PaymentRequest|Performance|PermissionStatus|PresentationAvailability|PresentationConnection|PresentationConnectionList|PresentationRequest|RTCDTMFSender|RTCDataChannel|RTCPeerConnection|RealtimeAnalyserNode|RelativeOrientationSensor|RemotePlayback|ScreenOrientation|ScriptProcessorNode|Sensor|ServiceWorker|ServiceWorkerContainer|ServiceWorkerGlobalScope|ServiceWorkerRegistration|SharedWorker|SharedWorkerGlobalScope|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|StereoPannerNode|USB|VR|VRDevice|VRDisplay|VRSession|WaveShaperNode|WebSocket|Worker|WorkerGlobalScope|WorkerPerformance|mozRTCPeerConnection|webkitAudioPannerNode|webkitRTCPeerConnection;EventTarget;em|en|eq|er"},
az:{"^":"h2;",$isaz:1,"%":"File"},
mi:{"^":"jL;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isaz")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.az]},
$isy:1,
$asy:function(){return[W.az]},
$ast:function(){return[W.az]},
$ism:1,
$asm:function(){return[W.az]},
$isa:1,
$asa:function(){return[W.az]},
$asu:function(){return[W.az]},
"%":"FileList"},
mj:{"^":"O;0j:length=","%":"FileWriter"},
mm:{"^":"P;0j:length=","%":"HTMLFormElement"},
aA:{"^":"k;",$isaA:1,"%":"Gamepad"},
hG:{"^":"P;","%":"HTMLHeadElement"},
mn:{"^":"k;0j:length=","%":"History"},
mo:{"^":"k2;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isw")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.w]},
$isy:1,
$asy:function(){return[W.w]},
$ast:function(){return[W.w]},
$ism:1,
$asm:function(){return[W.w]},
$isa:1,
$asa:function(){return[W.w]},
$asu:function(){return[W.w]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
hH:{"^":"cr;","%":"HTMLDocument"},
hI:{"^":"hJ;",
eB:function(a,b,c,d,e,f){return a.open(b,c)},
ei:function(a,b,c){return a.open(b,c)},
cz:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
hJ:{"^":"O;","%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
mp:{"^":"P;0n:height=,0m:width=","%":"HTMLIFrameElement"},
mq:{"^":"k;0n:height=,0m:width=","%":"ImageBitmap"},
mr:{"^":"k;0n:height=,0m:width=","%":"ImageData"},
ms:{"^":"P;0n:height=,0m:width=","%":"HTMLImageElement"},
dD:{"^":"P;0n:height=,0m:width=",$isdD:1,"%":"HTMLInputElement"},
b7:{"^":"e5;",$isb7:1,"%":"KeyboardEvent"},
i7:{"^":"k;",
l:function(a){return String(a)},
$isi7:1,
"%":"Location"},
ib:{"^":"P;","%":"HTMLAudioElement;HTMLMediaElement"},
mA:{"^":"k;0j:length=","%":"MediaList"},
mB:{"^":"O;",
by:function(a,b,c,d){H.n(c,{func:1,args:[W.Q]})
if(b==="message")a.start()
this.cI(a,b,c,!1)},
"%":"MessagePort"},
mC:{"^":"kc;",
C:function(a,b){return P.W(a.get(b))!=null},
h:function(a,b){return P.W(a.get(H.v(b)))},
D:function(a,b){var z,y
H.n(b,{func:1,ret:-1,args:[P.e,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.W(y.value[1]))}},
gE:function(a){var z=H.f([],[P.e])
this.D(a,new W.id(z))
return z},
gj:function(a){return a.size},
$asY:function(){return[P.e,null]},
$isF:1,
$asF:function(){return[P.e,null]},
"%":"MIDIInputMap"},
id:{"^":"o:2;a",
$2:function(a,b){return C.a.k(this.a,a)}},
mD:{"^":"kd;",
C:function(a,b){return P.W(a.get(b))!=null},
h:function(a,b){return P.W(a.get(H.v(b)))},
D:function(a,b){var z,y
H.n(b,{func:1,ret:-1,args:[P.e,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.W(y.value[1]))}},
gE:function(a){var z=H.f([],[P.e])
this.D(a,new W.ie(z))
return z},
gj:function(a){return a.size},
$asY:function(){return[P.e,null]},
$isF:1,
$asF:function(){return[P.e,null]},
"%":"MIDIOutputMap"},
ie:{"^":"o:2;a",
$2:function(a,b){return C.a.k(this.a,a)}},
aB:{"^":"k;",$isaB:1,"%":"MimeType"},
mE:{"^":"kf;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isaB")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.aB]},
$isy:1,
$asy:function(){return[W.aB]},
$ast:function(){return[W.aB]},
$ism:1,
$asm:function(){return[W.aB]},
$isa:1,
$asa:function(){return[W.aB]},
$asu:function(){return[W.aB]},
"%":"MimeTypeArray"},
a0:{"^":"e5;",
gc_:function(a){var z,y,x,w,v,u
if(!!a.offsetX)return new P.be(a.offsetX,a.offsetY,[P.J])
else{z=a.target
if(!J.C(W.cJ(z)).$isS)throw H.d(P.B("offsetX is only supported on elements"))
y=H.h(W.cJ(z),"$isS")
z=a.clientX
x=a.clientY
w=[P.J]
v=y.getBoundingClientRect()
u=v.left
v=v.top
H.p(new P.be(u,v,w),"$isbe",w,"$asbe")
if(typeof z!=="number")return z.b0()
if(typeof x!=="number")return x.b0()
return new P.be(C.o.cc(z-u),C.o.cc(x-v),w)}},
$isa0:1,
"%":";DragEvent|MouseEvent"},
ae:{"^":"i4;a",
ga7:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.d(P.bE("No elements"))
if(y>1)throw H.d(P.bE("More than one element"))
return z.firstChild},
I:function(a,b){var z,y,x,w,v
H.p(b,"$ism",[W.w],"$asm")
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=J.l(y),v=0;v<x;++v)w.J(y,z.firstChild)
return},
i:function(a,b,c){var z
H.i(b)
z=this.a
J.fd(z,H.h(c,"$isw"),C.w.h(z.childNodes,b))},
gw:function(a){var z=this.a.childNodes
return new W.dB(z,z.length,-1,[H.bp(C.w,z,"u",0)])},
gj:function(a){return this.a.childNodes.length},
h:function(a,b){H.i(b)
return C.w.h(this.a.childNodes,b)},
$ast:function(){return[W.w]},
$asm:function(){return[W.w]},
$asa:function(){return[W.w]}},
w:{"^":"O;0ej:previousSibling=",
el:function(a){var z=a.parentNode
if(z!=null)J.bN(z,a)},
l:function(a){var z=a.nodeValue
return z==null?this.cJ(a):z},
J:function(a,b){return a.appendChild(b)},
dv:function(a,b){return a.removeChild(b)},
dw:function(a,b,c){return a.replaceChild(b,c)},
$isw:1,
"%":"DocumentFragment|DocumentType|ShadowRoot;Node"},
iq:{"^":"kh;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isw")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.w]},
$isy:1,
$asy:function(){return[W.w]},
$ast:function(){return[W.w]},
$ism:1,
$asm:function(){return[W.w]},
$isa:1,
$asa:function(){return[W.w]},
$asu:function(){return[W.w]},
"%":"NodeList|RadioNodeList"},
mN:{"^":"P;0n:height=,0m:width=","%":"HTMLObjectElement"},
mP:{"^":"O;0n:height=,0m:width=","%":"OffscreenCanvas"},
mQ:{"^":"k;0n:height=,0m:width=","%":"PaintSize"},
aD:{"^":"k;0j:length=",$isaD:1,"%":"Plugin"},
mS:{"^":"kl;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isaD")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.aD]},
$isy:1,
$asy:function(){return[W.aD]},
$ast:function(){return[W.aD]},
$ism:1,
$asm:function(){return[W.aD]},
$isa:1,
$asa:function(){return[W.aD]},
$asu:function(){return[W.aD]},
"%":"PluginArray"},
mU:{"^":"a0;0n:height=,0m:width=","%":"PointerEvent"},
bB:{"^":"Q;",$isbB:1,"%":"ProgressEvent|ResourceProgressEvent"},
iI:{"^":"k;",
dY:function(a,b){return a.createContextualFragment(b)},
cw:function(a,b){return a.selectNodeContents(b)},
"%":"Range"},
mZ:{"^":"kr;",
C:function(a,b){return P.W(a.get(b))!=null},
h:function(a,b){return P.W(a.get(H.v(b)))},
D:function(a,b){var z,y
H.n(b,{func:1,ret:-1,args:[P.e,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.W(y.value[1]))}},
gE:function(a){var z=H.f([],[P.e])
this.D(a,new W.iP(z))
return z},
gj:function(a){return a.size},
$asY:function(){return[P.e,null]},
$isF:1,
$asF:function(){return[P.e,null]},
"%":"RTCStatsReport"},
iP:{"^":"o:2;a",
$2:function(a,b){return C.a.k(this.a,a)}},
n_:{"^":"k;0n:height=,0m:width=","%":"Screen"},
n0:{"^":"P;0j:length=","%":"HTMLSelectElement"},
aE:{"^":"O;",$isaE:1,"%":"SourceBuffer"},
n2:{"^":"en;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isaE")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.aE]},
$isy:1,
$asy:function(){return[W.aE]},
$ast:function(){return[W.aE]},
$ism:1,
$asm:function(){return[W.aE]},
$isa:1,
$asa:function(){return[W.aE]},
$asu:function(){return[W.aE]},
"%":"SourceBufferList"},
aF:{"^":"k;",$isaF:1,"%":"SpeechGrammar"},
n3:{"^":"kx;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isaF")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.aF]},
$isy:1,
$asy:function(){return[W.aF]},
$ast:function(){return[W.aF]},
$ism:1,
$asm:function(){return[W.aF]},
$isa:1,
$asa:function(){return[W.aF]},
$asu:function(){return[W.aF]},
"%":"SpeechGrammarList"},
aG:{"^":"k;0j:length=",$isaG:1,"%":"SpeechRecognitionResult"},
n6:{"^":"kA;",
C:function(a,b){return this.ax(a,b)!=null},
h:function(a,b){return this.ax(a,H.v(b))},
D:function(a,b){var z,y
H.n(b,{func:1,ret:-1,args:[P.e,P.e]})
for(z=0;!0;++z){y=this.dn(a,z)
if(y==null)return
b.$2(y,this.ax(a,y))}},
gE:function(a){var z=H.f([],[P.e])
this.D(a,new W.j2(z))
return z},
gj:function(a){return a.length},
ax:function(a,b){return a.getItem(b)},
dn:function(a,b){return a.key(b)},
$asY:function(){return[P.e,P.e]},
$isF:1,
$asF:function(){return[P.e,P.e]},
"%":"Storage"},
j2:{"^":"o:18;a",
$2:function(a,b){return C.a.k(this.a,a)}},
aH:{"^":"k;",$isaH:1,"%":"CSSStyleSheet|StyleSheet"},
j8:{"^":"P;",
O:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.am(a,b,c,d)
z=W.hs("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
z.toString
new W.ae(y).I(0,new W.ae(z))
return y},
"%":"HTMLTableElement"},
n9:{"^":"P;",
O:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.am(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.I.O(z.createElement("table"),b,c,d)
z.toString
z=new W.ae(z)
x=z.ga7(z)
x.toString
z=new W.ae(x)
w=z.ga7(z)
y.toString
w.toString
new W.ae(y).I(0,new W.ae(w))
return y},
"%":"HTMLTableRowElement"},
na:{"^":"P;",
O:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.am(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.I.O(z.createElement("table"),b,c,d)
z.toString
z=new W.ae(z)
x=z.ga7(z)
y.toString
x.toString
new W.ae(y).I(0,new W.ae(x))
return y},
"%":"HTMLTableSectionElement"},
e0:{"^":"P;",$ise0:1,"%":"HTMLTemplateElement"},
nb:{"^":"k;0m:width=","%":"TextMetrics"},
aI:{"^":"O;",$isaI:1,"%":"TextTrack"},
aJ:{"^":"O;",$isaJ:1,"%":"TextTrackCue|VTTCue"},
nc:{"^":"kI;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isaJ")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.aJ]},
$isy:1,
$asy:function(){return[W.aJ]},
$ast:function(){return[W.aJ]},
$ism:1,
$asm:function(){return[W.aJ]},
$isa:1,
$asa:function(){return[W.aJ]},
$asu:function(){return[W.aJ]},
"%":"TextTrackCueList"},
nd:{"^":"er;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isaI")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.aI]},
$isy:1,
$asy:function(){return[W.aI]},
$ast:function(){return[W.aI]},
$ism:1,
$asm:function(){return[W.aI]},
$isa:1,
$asa:function(){return[W.aI]},
$asu:function(){return[W.aI]},
"%":"TextTrackList"},
nf:{"^":"k;0j:length=","%":"TimeRanges"},
aK:{"^":"k;",$isaK:1,"%":"Touch"},
ng:{"^":"kN;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isaK")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.aK]},
$isy:1,
$asy:function(){return[W.aK]},
$ast:function(){return[W.aK]},
$ism:1,
$asm:function(){return[W.aK]},
$isa:1,
$asa:function(){return[W.aK]},
$asu:function(){return[W.aK]},
"%":"TouchList"},
nh:{"^":"k;0j:length=","%":"TrackDefaultList"},
e5:{"^":"Q;","%":"CompositionEvent|FocusEvent|TextEvent|TouchEvent;UIEvent"},
nv:{"^":"k;",
l:function(a){return String(a)},
"%":"URL"},
ny:{"^":"ib;0n:height=,0m:width=","%":"HTMLVideoElement"},
nz:{"^":"O;0j:length=","%":"VideoTrackList"},
nA:{"^":"O;0n:height=,0m:width=","%":"VisualViewport"},
nB:{"^":"k;0m:width=","%":"VTTRegion"},
aT:{"^":"a0;",
ge4:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.d(P.B("deltaY is not supported"))},
$isaT:1,
"%":"WheelEvent"},
jl:{"^":"O;",
gdM:function(a){var z,y,x
z=P.J
y=new P.V(0,$.G,[z])
x=H.n(new W.jm(new P.kE(y,[z])),{func:1,ret:-1,args:[P.J]})
this.dh(a)
this.dz(a,W.ey(x,z))
return y},
dz:function(a,b){return a.requestAnimationFrame(H.aN(H.n(b,{func:1,ret:-1,args:[P.J]}),1))},
dh:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$ise7:1,
"%":"DOMWindow|Window"},
jm:{"^":"o:19;a",
$1:function(a){this.a.ah(0,H.cT(a))}},
ea:{"^":"w;",$isea:1,"%":"Attr"},
nH:{"^":"kT;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isay")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.ay]},
$isy:1,
$asy:function(){return[W.ay]},
$ast:function(){return[W.ay]},
$ism:1,
$asm:function(){return[W.ay]},
$isa:1,
$asa:function(){return[W.ay]},
$asu:function(){return[W.ay]},
"%":"CSSRuleList"},
nI:{"^":"hp;",
l:function(a){return"Rectangle ("+H.c(a.left)+", "+H.c(a.top)+") "+H.c(a.width)+" x "+H.c(a.height)},
F:function(a,b){var z
if(b==null)return!1
if(!H.at(b,"$isa2",[P.J],"$asa2"))return!1
if(a.left===b.left)if(a.top===b.top){z=J.l(b)
z=a.width===z.gm(b)&&a.height===z.gn(b)}else z=!1
else z=!1
return z},
gv:function(a){return W.eg(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gn:function(a){return a.height},
gm:function(a){return a.width},
"%":"ClientRect|DOMRect"},
nJ:{"^":"kV;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isaA")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.aA]},
$isy:1,
$asy:function(){return[W.aA]},
$ast:function(){return[W.aA]},
$ism:1,
$asm:function(){return[W.aA]},
$isa:1,
$asa:function(){return[W.aA]},
$asu:function(){return[W.aA]},
"%":"GamepadList"},
nO:{"^":"kX;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isw")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.w]},
$isy:1,
$asy:function(){return[W.w]},
$ast:function(){return[W.w]},
$ism:1,
$asm:function(){return[W.w]},
$isa:1,
$asa:function(){return[W.w]},
$asu:function(){return[W.w]},
"%":"MozNamedAttrMap|NamedNodeMap"},
nP:{"^":"kZ;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isaG")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.aG]},
$isy:1,
$asy:function(){return[W.aG]},
$ast:function(){return[W.aG]},
$ism:1,
$asm:function(){return[W.aG]},
$isa:1,
$asa:function(){return[W.aG]},
$asu:function(){return[W.aG]},
"%":"SpeechRecognitionResultList"},
nQ:{"^":"l0;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.i(b)
H.h(c,"$isaH")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isx:1,
$asx:function(){return[W.aH]},
$isy:1,
$asy:function(){return[W.aH]},
$ast:function(){return[W.aH]},
$ism:1,
$asm:function(){return[W.aH]},
$isa:1,
$asa:function(){return[W.aH]},
$asu:function(){return[W.aH]},
"%":"StyleSheetList"},
jw:{"^":"cA;dg:a<",
D:function(a,b){var z,y,x,w,v,u
H.n(b,{func:1,ret:-1,args:[P.e,P.e]})
for(z=this.gE(this),y=z.length,x=this.a,w=J.l(x),v=0;v<z.length;z.length===y||(0,H.E)(z),++v){u=z[v]
b.$2(u,w.a2(x,u))}},
gE:function(a){var z,y,x,w,v
z=this.a.attributes
y=H.f([],[P.e])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.j(z,w)
v=H.h(z[w],"$isea")
if(v.namespaceURI==null)C.a.k(y,v.name)}return y},
$asY:function(){return[P.e,P.e]},
$asF:function(){return[P.e,P.e]}},
jF:{"^":"jw;a",
C:function(a,b){return J.fb(this.a,b)},
h:function(a,b){return J.ck(this.a,H.v(b))},
gj:function(a){return this.gE(this).length}},
bF:{"^":"j3;a,b,c,$ti"},
bl:{"^":"bF;a,b,c,$ti"},
jH:{"^":"j4;a,b,c,d,e,$ti",p:{
al:function(a,b,c,d,e){var z=W.ey(new W.jI(c),W.Q)
if(z!=null&&!0)J.fe(a,b,z,!1)
return new W.jH(0,a,b,z,!1,[e])}}},
jI:{"^":"o:20;a",
$1:function(a){return this.a.$1(H.h(a,"$isQ"))}},
bG:{"^":"b;a",
d5:function(a){var z,y
z=$.cX()
if(z.a===0){for(y=0;y<262;++y)z.i(0,C.W[y],W.lp())
for(y=0;y<12;++y)z.i(0,C.v[y],W.lq())}},
a_:function(a){return $.f3().u(0,W.b5(a))},
U:function(a,b,c){var z,y,x
z=W.b5(a)
y=$.cX()
x=y.h(0,H.c(z)+"::"+b)
if(x==null)x=y.h(0,"*::"+b)
if(x==null)return!1
return H.c8(x.$4(a,b,c,this))},
$isai:1,
p:{
ee:function(a){var z,y
z=document.createElement("a")
y=new W.ks(z,window.location)
y=new W.bG(y)
y.d5(a)
return y},
nM:[function(a,b,c,d){H.h(a,"$isS")
H.v(b)
H.v(c)
H.h(d,"$isbG")
return!0},"$4","lp",16,0,12],
nN:[function(a,b,c,d){var z,y,x
H.h(a,"$isS")
H.v(b)
H.v(c)
z=H.h(d,"$isbG").a
y=z.a
y.href=c
x=y.hostname
z=z.b
if(!(x==z.hostname&&y.port==z.port&&y.protocol==z.protocol))if(x==="")if(y.port===""){z=y.protocol
z=z===":"||z===""}else z=!1
else z=!1
else z=!0
return z},"$4","lq",16,0,12]}},
u:{"^":"b;$ti",
gw:function(a){return new W.dB(a,this.gj(a),-1,[H.bp(this,a,"u",0)])}},
dS:{"^":"b;a",
a_:function(a){return C.a.bz(this.a,new W.is(a))},
U:function(a,b,c){return C.a.bz(this.a,new W.ir(a,b,c))},
$isai:1},
is:{"^":"o:5;a",
$1:function(a){return H.h(a,"$isai").a_(this.a)}},
ir:{"^":"o:5;a,b,c",
$1:function(a){return H.h(a,"$isai").U(this.a,this.b,this.c)}},
kt:{"^":"b;",
d6:function(a,b,c,d){var z,y,x
this.a.I(0,c)
z=b.aN(0,new W.ku())
y=b.aN(0,new W.kv())
this.b.I(0,z)
x=this.c
x.I(0,C.Y)
x.I(0,y)},
a_:function(a){return this.a.u(0,W.b5(a))},
U:["cM",function(a,b,c){var z,y
z=W.b5(a)
y=this.c
if(y.u(0,H.c(z)+"::"+b))return this.d.dL(c)
else if(y.u(0,"*::"+b))return this.d.dL(c)
else{y=this.b
if(y.u(0,H.c(z)+"::"+b))return!0
else if(y.u(0,"*::"+b))return!0
else if(y.u(0,H.c(z)+"::*"))return!0
else if(y.u(0,"*::*"))return!0}return!1}],
$isai:1},
ku:{"^":"o:11;",
$1:function(a){return!C.a.u(C.v,H.v(a))}},
kv:{"^":"o:11;",
$1:function(a){return C.a.u(C.v,H.v(a))}},
kF:{"^":"kt;e,a,b,c,d",
U:function(a,b,c){if(this.cM(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(J.ck(a,"template")==="")return this.e.u(0,b)
return!1},
p:{
ep:function(){var z,y,x,w,v
z=P.e
y=P.cz(C.u,z)
x=H.q(C.u,0)
w=H.n(new W.kG(),{func:1,ret:z,args:[x]})
v=H.f(["TEMPLATE"],[z])
y=new W.kF(y,P.ac(null,null,null,z),P.ac(null,null,null,z),P.ac(null,null,null,z),null)
y.d6(null,new H.i9(C.u,w,[x,z]),v,null)
return y}}},
kG:{"^":"o:21;",
$1:function(a){return"TEMPLATE::"+H.c(H.v(a))}},
kD:{"^":"b;",
a_:function(a){var z=J.C(a)
if(!!z.$isdW)return!1
z=!!z.$isM
if(z&&W.b5(a)==="foreignObject")return!1
if(z)return!0
return!1},
U:function(a,b,c){if(b==="is"||C.h.cE(b,"on"))return!1
return this.a_(a)},
$isai:1},
dB:{"^":"b;a,b,c,0d,$ti",
sbp:function(a){this.d=H.z(a,H.q(this,0))},
t:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.sbp(J.ao(this.a,z))
this.c=z
return!0}this.sbp(null)
this.c=y
return!1},
gA:function(a){return this.d},
$isb6:1},
jz:{"^":"b;a",$isO:1,$ise7:1,p:{
jA:function(a){if(a===window)return H.h(a,"$ise7")
else return new W.jz(a)}}},
ai:{"^":"b;"},
ks:{"^":"b;a,b",$isnu:1},
es:{"^":"b;a",
aX:function(a){new W.kQ(this).$2(a,null)},
a6:function(a,b){if(b==null)J.d3(a)
else J.bN(b,a)},
dE:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.fA(a)
x=J.ck(y.gdg(),"is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.a5(t)}v="element unprintable"
try{v=J.bs(a)}catch(t){H.a5(t)}try{u=W.b5(a)
this.dD(H.h(a,"$isS"),b,z,v,u,H.h(y,"$isF"),H.v(x))}catch(t){if(H.a5(t) instanceof P.aw)throw t
else{this.a6(a,b)
window
s="Removing corrupted element "+H.c(v)
if(typeof console!="undefined")window.console.warn(s)}}},
dD:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
if(c){this.a6(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")window.console.warn(z)
return}if(!this.a.a_(a)){this.a6(a,b)
window
z="Removing disallowed element <"+H.c(e)+"> from "+H.c(b)
if(typeof console!="undefined")window.console.warn(z)
return}if(g!=null)if(!this.a.U(a,"is",g)){this.a6(a,b)
window
z="Removing disallowed type extension <"+H.c(e)+' is="'+g+'">'
if(typeof console!="undefined")window.console.warn(z)
return}z=f.gE(f)
y=H.f(z.slice(0),[H.q(z,0)])
for(x=f.gE(f).length-1,z=f.a,w=J.l(z);x>=0;--x){if(x>=y.length)return H.j(y,x)
v=y[x]
if(!this.a.U(a,J.fO(v),w.a2(z,v))){window
u="Removing disallowed attribute <"+H.c(e)+" "+v+'="'+H.c(w.a2(z,v))+'">'
if(typeof console!="undefined")window.console.warn(u)
w.a2(z,v)
w.du(z,v)}}if(!!J.C(a).$ise0)this.aX(a.content)},
$ismL:1},
kQ:{"^":"o:22;a",
$2:function(a,b){var z,y,x,w,v,u
x=this.a
switch(a.nodeType){case 1:x.dE(a,b)
break
case 8:case 11:case 3:case 4:break
default:x.a6(a,b)}z=a.lastChild
for(x=a==null;null!=z;){y=null
try{y=J.fC(z)}catch(w){H.a5(w)
v=H.h(z,"$isw")
if(x){u=v.parentNode
if(u!=null)J.bN(u,v)}else J.bN(a,v)
z=null
y=a.lastChild}if(z!=null)this.$2(z,a)
z=H.h(y,"$isw")}}},
jy:{"^":"k+hh;"},
jB:{"^":"k+t;"},
jC:{"^":"jB+u;"},
jD:{"^":"k+t;"},
jE:{"^":"jD+u;"},
jK:{"^":"k+t;"},
jL:{"^":"jK+u;"},
k1:{"^":"k+t;"},
k2:{"^":"k1+u;"},
kc:{"^":"k+Y;"},
kd:{"^":"k+Y;"},
ke:{"^":"k+t;"},
kf:{"^":"ke+u;"},
kg:{"^":"k+t;"},
kh:{"^":"kg+u;"},
kk:{"^":"k+t;"},
kl:{"^":"kk+u;"},
kr:{"^":"k+Y;"},
em:{"^":"O+t;"},
en:{"^":"em+u;"},
kw:{"^":"k+t;"},
kx:{"^":"kw+u;"},
kA:{"^":"k+Y;"},
kH:{"^":"k+t;"},
kI:{"^":"kH+u;"},
eq:{"^":"O+t;"},
er:{"^":"eq+u;"},
kM:{"^":"k+t;"},
kN:{"^":"kM+u;"},
kS:{"^":"k+t;"},
kT:{"^":"kS+u;"},
kU:{"^":"k+t;"},
kV:{"^":"kU+u;"},
kW:{"^":"k+t;"},
kX:{"^":"kW+u;"},
kY:{"^":"k+t;"},
kZ:{"^":"kY+u;"},
l_:{"^":"k+t;"},
l0:{"^":"l_+u;"}}],["","",,P,{"^":"",
W:function(a){var z,y,x,w,v
if(a==null)return
z=P.ab(P.e,null)
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.E)(y),++w){v=H.v(y[w])
z.i(0,v,a[v])}return z},
le:function(a,b){var z={}
a.D(0,new P.lf(z))
return z},
lg:function(a){var z,y
z=new P.V(0,$.G,[null])
y=new P.e9(z,[null])
a.then(H.aN(new P.lh(y),1))["catch"](H.aN(new P.li(y),1))
return z},
ds:function(){var z=$.dr
if(z==null){z=J.cg(window.navigator.userAgent,"Opera",0)
$.dr=z}return z},
hm:function(){var z,y
z=$.dn
if(z!=null)return z
y=$.dp
if(y==null){y=J.cg(window.navigator.userAgent,"Firefox",0)
$.dp=y}if(y)z="-moz-"
else{y=$.dq
if(y==null){y=!P.ds()&&J.cg(window.navigator.userAgent,"Trident/",0)
$.dq=y}if(y)z="-ms-"
else z=P.ds()?"-o-":"-webkit-"}$.dn=z
return z},
jn:{"^":"b;",
bX:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}C.a.k(z,a)
C.a.k(this.b,null)
return y},
aM:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date){y=a.getTime()
if(Math.abs(y)<=864e13)x=!1
else x=!0
if(x)H.aa(P.h_("DateTime is outside valid range: "+y))
return new P.b3(y,!0)}if(a instanceof RegExp)throw H.d(P.cG("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.lg(a)
w=Object.getPrototypeOf(a)
if(w===Object.prototype||w===null){v=this.bX(a)
x=this.b
if(v>=x.length)return H.j(x,v)
u=x[v]
z.a=u
if(u!=null)return u
u=P.i3()
z.a=u
C.a.i(x,v,u)
this.eb(a,new P.jp(z,this))
return z.a}if(a instanceof Array){t=a
v=this.bX(t)
x=this.b
if(v>=x.length)return H.j(x,v)
u=x[v]
if(u!=null)return u
s=J.L(t)
r=s.gj(t)
u=this.c?new Array(r):t
C.a.i(x,v,u)
for(x=J.bJ(u),q=0;q<r;++q)x.i(u,q,this.aM(s.h(t,q)))
return u}return a},
dX:function(a,b){this.c=b
return this.aM(a)}},
jp:{"^":"o:23;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.aM(b)
J.fa(z,a,y)
return y}},
lf:{"^":"o:6;a",
$2:function(a,b){this.a[a]=b}},
jo:{"^":"jn;a,b,c",
eb:function(a,b){var z,y,x,w
H.n(b,{func:1,args:[,,]})
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.E)(z),++x){w=z[x]
b.$2(w,a[w])}}},
lh:{"^":"o:10;a",
$1:function(a){return this.a.ah(0,a)}},
li:{"^":"o:10;a",
$1:function(a){return this.a.dU(a)}}}],["","",,P,{"^":"",iu:{"^":"iO;",$isiu:1,"%":"IDBOpenDBRequest|IDBVersionChangeRequest"},iO:{"^":"O;","%":";IDBRequest"},nx:{"^":"Q;0c8:target=","%":"IDBVersionChangeEvent"}}],["","",,P,{"^":"",
ef:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
be:{"^":"b;a1:a>,X:b>,$ti",
l:function(a){return"Point("+H.c(this.a)+", "+H.c(this.b)+")"},
F:function(a,b){if(b==null)return!1
return H.at(b,"$isbe",[P.J],null)&&this.a==J.bR(b)&&this.b==b.gX(b)},
gv:function(a){var z,y,x
z=J.av(this.a)
y=J.av(this.b)
y=P.ef(P.ef(0,z),y)
x=536870911&y+((67108863&y)<<3)
x^=x>>>11
return 536870911&x+((16383&x)<<15)}},
km:{"^":"b;"},
a2:{"^":"km;$ti"}}],["","",,P,{"^":"",fY:{"^":"k;",$isfY:1,"%":"SVGAnimatedLength"},m2:{"^":"M;0n:height=,0m:width=","%":"SVGFEBlendElement"},m3:{"^":"M;0n:height=,0m:width=","%":"SVGFEColorMatrixElement"},m4:{"^":"M;0n:height=,0m:width=","%":"SVGFEComponentTransferElement"},m5:{"^":"M;0n:height=,0m:width=","%":"SVGFECompositeElement"},m6:{"^":"M;0n:height=,0m:width=","%":"SVGFEConvolveMatrixElement"},m7:{"^":"M;0n:height=,0m:width=","%":"SVGFEDiffuseLightingElement"},m8:{"^":"M;0n:height=,0m:width=","%":"SVGFEDisplacementMapElement"},m9:{"^":"M;0n:height=,0m:width=","%":"SVGFEFloodElement"},ma:{"^":"M;0n:height=,0m:width=","%":"SVGFEGaussianBlurElement"},mb:{"^":"M;0n:height=,0m:width=","%":"SVGFEImageElement"},mc:{"^":"M;0n:height=,0m:width=","%":"SVGFEMergeElement"},md:{"^":"M;0n:height=,0m:width=","%":"SVGFEMorphologyElement"},me:{"^":"M;0n:height=,0m:width=","%":"SVGFEOffsetElement"},mf:{"^":"M;0n:height=,0m:width=","%":"SVGFESpecularLightingElement"},mg:{"^":"M;0n:height=,0m:width=","%":"SVGFETileElement"},mh:{"^":"M;0n:height=,0m:width=","%":"SVGFETurbulenceElement"},mk:{"^":"M;0n:height=,0m:width=","%":"SVGFilterElement"},ml:{"^":"bw;0n:height=,0m:width=","%":"SVGForeignObjectElement"},hF:{"^":"bw;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},bw:{"^":"M;","%":"SVGAElement|SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement|SVGTSpanElement|SVGTextContentElement|SVGTextElement|SVGTextPathElement|SVGTextPositioningElement;SVGGraphicsElement"},mt:{"^":"bw;0n:height=,0m:width=","%":"SVGImageElement"},b8:{"^":"k;",$isb8:1,"%":"SVGLength"},my:{"^":"k7;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return this.T(a,b)},
i:function(a,b,c){H.i(b)
H.h(c,"$isb8")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){return this.h(a,b)},
T:function(a,b){return a.getItem(b)},
$ast:function(){return[P.b8]},
$ism:1,
$asm:function(){return[P.b8]},
$isa:1,
$asa:function(){return[P.b8]},
$asu:function(){return[P.b8]},
"%":"SVGLengthList"},mz:{"^":"M;0n:height=,0m:width=","%":"SVGMaskElement"},bd:{"^":"k;",$isbd:1,"%":"SVGNumber"},mM:{"^":"kj;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return this.T(a,b)},
i:function(a,b,c){H.i(b)
H.h(c,"$isbd")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){return this.h(a,b)},
T:function(a,b){return a.getItem(b)},
$ast:function(){return[P.bd]},
$ism:1,
$asm:function(){return[P.bd]},
$isa:1,
$asa:function(){return[P.bd]},
$asu:function(){return[P.bd]},
"%":"SVGNumberList"},mR:{"^":"M;0n:height=,0m:width=","%":"SVGPatternElement"},mT:{"^":"k;0j:length=","%":"SVGPointList"},mV:{"^":"k;0n:height=,0m:width=","%":"SVGRect"},mW:{"^":"hF;0n:height=,0m:width=","%":"SVGRectElement"},dW:{"^":"M;",$isdW:1,"%":"SVGScriptElement"},n7:{"^":"kC;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return this.T(a,b)},
i:function(a,b,c){H.i(b)
H.v(c)
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){return this.h(a,b)},
T:function(a,b){return a.getItem(b)},
$ast:function(){return[P.e]},
$ism:1,
$asm:function(){return[P.e]},
$isa:1,
$asa:function(){return[P.e]},
$asu:function(){return[P.e]},
"%":"SVGStringList"},M:{"^":"S;",
O:function(a,b,c,d){var z,y,x,w,v,u
z=H.f([],[W.ai])
C.a.k(z,W.ee(null))
C.a.k(z,W.ep())
C.a.k(z,new W.kD())
c=new W.es(new W.dS(z))
y='<svg version="1.1">'+b+"</svg>"
z=document
x=z.body
w=(x&&C.r).dZ(x,y,c)
v=z.createDocumentFragment()
w.toString
z=new W.ae(w)
u=z.ga7(z)
for(z=J.l(v);x=u.firstChild,x!=null;)z.J(v,x)
return v},
gc0:function(a){return new W.bl(a,"change",!1,[W.Q])},
$isM:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGGradientElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMetadataElement|SVGRadialGradientElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSymbolElement|SVGTitleElement|SVGViewElement;SVGElement"},n8:{"^":"bw;0n:height=,0m:width=","%":"SVGSVGElement"},bi:{"^":"k;",$isbi:1,"%":"SVGTransform"},ni:{"^":"kP;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return this.T(a,b)},
i:function(a,b,c){H.i(b)
H.h(c,"$isbi")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){return this.h(a,b)},
T:function(a,b){return a.getItem(b)},
$ast:function(){return[P.bi]},
$ism:1,
$asm:function(){return[P.bi]},
$isa:1,
$asa:function(){return[P.bi]},
$asu:function(){return[P.bi]},
"%":"SVGTransformList"},nw:{"^":"bw;0n:height=,0m:width=","%":"SVGUseElement"},k6:{"^":"k+t;"},k7:{"^":"k6+u;"},ki:{"^":"k+t;"},kj:{"^":"ki+u;"},kB:{"^":"k+t;"},kC:{"^":"kB+u;"},kO:{"^":"k+t;"},kP:{"^":"kO+u;"}}],["","",,P,{"^":"",ar:{"^":"b;",$ism:1,
$asm:function(){return[P.R]},
$isa:1,
$asa:function(){return[P.R]},
$isjd:1}}],["","",,P,{"^":"",lM:{"^":"k;0j:length=","%":"AudioBuffer"},lN:{"^":"jx;",
C:function(a,b){return P.W(a.get(b))!=null},
h:function(a,b){return P.W(a.get(H.v(b)))},
D:function(a,b){var z,y
H.n(b,{func:1,ret:-1,args:[P.e,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.W(y.value[1]))}},
gE:function(a){var z=H.f([],[P.e])
this.D(a,new P.h0(z))
return z},
gj:function(a){return a.size},
$asY:function(){return[P.e,null]},
$isF:1,
$asF:function(){return[P.e,null]},
"%":"AudioParamMap"},h0:{"^":"o:2;a",
$2:function(a,b){return C.a.k(this.a,a)}},lO:{"^":"O;0j:length=","%":"AudioTrackList"},h1:{"^":"O;","%":"AudioContext|webkitAudioContext;BaseAudioContext"},mO:{"^":"h1;0j:length=","%":"OfflineAudioContext"},jx:{"^":"k+Y;"}}],["","",,P,{"^":"",h4:{"^":"k;",$ish4:1,"%":"WebGLBuffer"},hA:{"^":"k;",$ishA:1,"%":"WebGLFramebuffer"},iH:{"^":"k;",$isiH:1,"%":"WebGLProgram"},mX:{"^":"k;",
bx:function(a,b){return a.activeTexture(b)},
bA:function(a,b,c){return a.attachShader(b,c)},
bB:function(a,b,c){return a.bindBuffer(b,c)},
bD:function(a,b,c){return a.bindFramebuffer(b,c)},
bE:function(a,b,c){return a.bindTexture(b,c)},
bF:function(a,b){return a.blendEquation(b)},
bG:function(a,b,c){return a.blendFunc(b,c)},
bH:function(a,b,c,d){return a.bufferData(b,c,d)},
bI:function(a,b){return a.clear(b)},
bJ:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
bK:function(a,b){return a.compileShader(b)},
bL:function(a){return a.createBuffer()},
bM:function(a){return a.createProgram()},
bN:function(a,b){return a.createShader(b)},
bO:function(a){return a.createTexture()},
bQ:function(a,b){return a.depthMask(b)},
bR:function(a,b){return a.disable(b)},
bS:function(a,b,c,d){return a.drawArrays(b,c,d)},
bT:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
bU:function(a,b){return a.enable(b)},
bV:function(a,b){return a.enableVertexAttribArray(b)},
ak:function(a){return P.W(a.getContextAttributes())},
aP:function(a){return a.getError()},
aQ:function(a,b){return a.getProgramInfoLog(b)},
aR:function(a,b,c){return a.getProgramParameter(b,c)},
aT:function(a,b){return a.getShaderInfoLog(b)},
aU:function(a,b,c){return a.getShaderParameter(b,c)},
aV:function(a,b,c){return a.getUniformLocation(b,c)},
bZ:function(a,b){return a.linkProgram(b)},
aZ:function(a,b,c){return a.shaderSource(b,c)},
b_:function(a,b,c,d){return a.stencilFunc(b,c,d)},
c9:function(a,b,c,d,e,f,g,h,i,j){this.aD(a,b,c,d,e,f,g,h,i,j)
return},
aD:function(a,b,c,d,e,f,g,h,i,j){return a.texImage2D(b,c,d,e,f,g,h,i,j)},
ca:function(a,b,c,d){return a.texParameterf(b,c,d)},
cb:function(a,b,c,d){return a.texParameteri(b,c,d)},
cd:function(a,b,c){return a.uniform1f(b,c)},
ce:function(a,b,c){return a.uniform1fv(b,c)},
cf:function(a,b,c){return a.uniform1i(b,c)},
cg:function(a,b,c){return a.uniform1iv(b,c)},
ci:function(a,b,c){return a.uniform2fv(b,c)},
cj:function(a,b,c){return a.uniform3fv(b,c)},
ck:function(a,b,c){return a.uniform4fv(b,c)},
cl:function(a,b,c,d){return a.uniformMatrix3fv(b,!1,d)},
cm:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
cn:function(a,b){return a.useProgram(b)},
co:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
cq:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
"%":"WebGLRenderingContext"},mY:{"^":"k;",
dO:function(a,b){return a.beginTransformFeedback(b)},
dR:function(a,b){return a.bindVertexArray(b)},
e0:function(a){return a.createVertexArray()},
e6:function(a,b,c,d,e){return a.drawArraysInstanced(b,c,d,e)},
e7:function(a,b,c,d,e,f){return a.drawElementsInstanced(b,c,d,e,f)},
e8:function(a){return a.endTransformFeedback()},
ew:function(a,b,c,d){this.dJ(a,b,H.p(c,"$isa",[P.e],"$asa"),d)
return},
dJ:function(a,b,c,d){return a.transformFeedbackVaryings(b,c,d)},
ex:function(a,b,c){return a.vertexAttribDivisor(b,c)},
bx:function(a,b){return a.activeTexture(b)},
bA:function(a,b,c){return a.attachShader(b,c)},
bB:function(a,b,c){return a.bindBuffer(b,c)},
bD:function(a,b,c){return a.bindFramebuffer(b,c)},
bE:function(a,b,c){return a.bindTexture(b,c)},
bF:function(a,b){return a.blendEquation(b)},
bG:function(a,b,c){return a.blendFunc(b,c)},
bH:function(a,b,c,d){return a.bufferData(b,c,d)},
bI:function(a,b){return a.clear(b)},
bJ:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
bK:function(a,b){return a.compileShader(b)},
bL:function(a){return a.createBuffer()},
bM:function(a){return a.createProgram()},
bN:function(a,b){return a.createShader(b)},
bO:function(a){return a.createTexture()},
bQ:function(a,b){return a.depthMask(b)},
bR:function(a,b){return a.disable(b)},
bS:function(a,b,c,d){return a.drawArrays(b,c,d)},
bT:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
bU:function(a,b){return a.enable(b)},
bV:function(a,b){return a.enableVertexAttribArray(b)},
ak:function(a){return P.W(a.getContextAttributes())},
aP:function(a){return a.getError()},
aQ:function(a,b){return a.getProgramInfoLog(b)},
aR:function(a,b,c){return a.getProgramParameter(b,c)},
aT:function(a,b){return a.getShaderInfoLog(b)},
aU:function(a,b,c){return a.getShaderParameter(b,c)},
aV:function(a,b,c){return a.getUniformLocation(b,c)},
bZ:function(a,b){return a.linkProgram(b)},
aZ:function(a,b,c){return a.shaderSource(b,c)},
b_:function(a,b,c,d){return a.stencilFunc(b,c,d)},
c9:function(a,b,c,d,e,f,g,h,i,j){this.aD(a,b,c,d,e,f,g,h,i,j)
return},
aD:function(a,b,c,d,e,f,g,h,i,j){return a.texImage2D(b,c,d,e,f,g,h,i,j)},
ca:function(a,b,c,d){return a.texParameterf(b,c,d)},
cb:function(a,b,c,d){return a.texParameteri(b,c,d)},
cd:function(a,b,c){return a.uniform1f(b,c)},
ce:function(a,b,c){return a.uniform1fv(b,c)},
cf:function(a,b,c){return a.uniform1i(b,c)},
cg:function(a,b,c){return a.uniform1iv(b,c)},
ci:function(a,b,c){return a.uniform2fv(b,c)},
cj:function(a,b,c){return a.uniform3fv(b,c)},
ck:function(a,b,c){return a.uniform4fv(b,c)},
cl:function(a,b,c,d){return a.uniformMatrix3fv(b,!1,d)},
cm:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
cn:function(a,b){return a.useProgram(b)},
co:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
cq:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
"%":"WebGL2RenderingContext"},iU:{"^":"k;",$isiU:1,"%":"WebGLShader"},j9:{"^":"k;",$isj9:1,"%":"WebGLTexture"},jf:{"^":"k;",$isjf:1,"%":"WebGLUniformLocation"},jj:{"^":"k;",$isjj:1,"%":"WebGLVertexArrayObject"}}],["","",,P,{"^":"",n4:{"^":"kz;",
gj:function(a){return a.length},
h:function(a,b){H.i(b)
if(b>>>0!==b||b>=a.length)throw H.d(P.K(b,a,null,null,null))
return P.W(this.dm(a,b))},
i:function(a,b,c){H.i(b)
H.h(c,"$isF")
throw H.d(P.B("Cannot assign element of immutable List."))},
q:function(a,b){return this.h(a,b)},
dm:function(a,b){return a.item(b)},
$ast:function(){return[[P.F,,,]]},
$ism:1,
$asm:function(){return[[P.F,,,]]},
$isa:1,
$asa:function(){return[[P.F,,,]]},
$asu:function(){return[[P.F,,,]]},
"%":"SQLResultSetRowList"},ky:{"^":"k+t;"},kz:{"^":"ky+u;"}}],["","",,L,{"^":"",
iJ:function(a){var z,y,x,w,v,u
H.p(a,"$isa",[L.aS],"$asa")
P.a_("recomputing local transform")
z=a.length
y=new Array(z)
y.fixed$length=Array
x=H.f(y,[T.I])
for(y=x.length,w=0;w<z;++w){v=a[w]
u=v.e
if(typeof u!=="number")return u.R()
if(u<0){u=new T.I(new Float32Array(16))
u.G()
C.a.i(x,w,H.h(u.a3(0,v.b),"$isI"))}else{if(u<0||u>=x.length)return H.j(x,u)
C.a.i(x,w,H.h(x[u].a3(0,v.b),"$isI"))}u=v.c
if(w>=y)return H.j(x,w)
u.aE(x[w])}},
cH:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
H.p(a,"$isa",[L.aS],"$asa")
z=new T.I(new Float32Array(16))
for(y=a.length,x=c.b,w=x.length,v=d.a,u=v.length,t=0;t<y;++t){s=a[t]
if(t>=u)return H.j(v,t)
r=v[t]
q=s.e
if(typeof q!=="number")return q.R()
if(q<0)r.G()
else{if(q>=u)return H.j(v,q)
r.B(v[q])}if(t>=w)return H.j(x,t)
p=x[t]
if(p!=null){o=L.cm(p.f,e)
n=L.cm(p.b,e)
m=L.cm(p.d,e)
q=p.r
if(o>=q.length)return H.j(q,o)
l=q[o]
q=p.c
if(n>=q.length)return H.j(q,n)
q=q[n]
k=p.e
if(m>=k.length)return H.j(k,m)
z.aY(q,k[m])
z.a4(0,l)
r.W(0,z)}else r.W(0,s.b)}for(x=d.b,w=x.length,t=0;t<y;++t){if(t>=w)return H.j(x,t)
r=x[t]
r.B(b)
if(t>=u)return H.j(v,t)
r.W(0,v[t])
r.W(0,a[t].c)}},
he:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n
H.p(a,"$isa",[L.aS],"$asa")
H.p(d,"$isa",[P.R],"$asa")
z=a.length
y=L.d9(z)
x=d.length
w=new Float32Array(z*16*x)
for(z=d.length,x=y.b,v=x.length,u=w.length,t=0,s=0;s<d.length;d.length===z||(0,H.E)(d),++s){L.cH(a,b,c,y,d[s])
for(r=0;r<v;++r){q=x[r]
for(p=0;p<16;++p){o=t+p
n=q.a[p]
if(o<0||o>=u)return H.j(w,o)
w[o]=n}t+=16}}return w},
aS:{"^":"b;a,b,c,d,e",
l:function(a){return"BONE["+this.d+"] ("+H.c(this.e)+") "+H.c(this.a)+"\ntrans:\n"+this.b.l(0)+"offset:\n"+this.c.l(0)}},
fZ:{"^":"b;a,b",
cS:function(a){var z,y,x
for(z=this.b,y=this.a,x=0;x<a;++x){C.a.i(y,x,new T.I(new Float32Array(16)))
C.a.i(z,x,new T.I(new Float32Array(16)))}},
p:{
d9:function(a){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=[T.I]
z=H.f(z,y)
x=new Array(a)
x.fixed$length=Array
y=new L.fZ(z,H.f(x,y))
y.cS(a)
return y}}},
dd:{"^":"b;a,b,c,d,e,f,r",
sdq:function(a){this.b=H.p(a,"$isa",[P.R],"$asa")},
sdr:function(a){this.c=H.p(a,"$isa",[T.r],"$asa")},
sdB:function(a){this.d=H.p(a,"$isa",[P.R],"$asa")},
sdC:function(a){this.e=H.p(a,"$isa",[T.bC],"$asa")},
sdF:function(a){this.f=H.p(a,"$isa",[P.R],"$asa")},
sdG:function(a){this.r=H.p(a,"$isa",[T.r],"$asa")},
l:function(a){var z=H.f([],[P.e])
C.a.k(z,H.c(this.a.a))
C.a.k(z,""+this.b.length+": "+H.c(this.c))
C.a.k(z,""+this.d.length+": "+H.c(this.e))
C.a.k(z,""+this.f.length+": "+H.c(this.r))
return C.a.a0(z,"\n")},
p:{
cm:function(a,b){var z,y,x,w
H.p(a,"$isa",[P.R],"$asa")
for(z=a.length-1,y=0;y<z;y=x){x=y+1
w=a[x]
if(typeof b!=="number")return b.R()
if(b<w)return y}return 0}}},
iW:{"^":"b;a,b,c",
l:function(a){return"SkeletalAnimation["+H.c(this.a)+", duration: "+H.c(this.c)+", frames: "+this.b.length+"]"}}}],["","",,G,{"^":"",
jq:function(a){var z,y,x,w
z=H.f(a.split("\n"),[P.e])
for(y=0;y<z.length;y=x){x=y+1
w=""+x+": "
if(y>=z.length)return H.j(z,y)
C.a.i(z,y,w+H.c(z[y]))}return C.a.a0(z,"\n")},
eb:function(a,b,c){var z,y,x,w
z=J.l(a)
y=z.bN(a,b)
z.aZ(a,y,c)
z.bK(a,y)
x=H.c8(z.aU(a,y,35713))
if(x!=null&&!x){w=z.aT(a,y)
P.a_("E:Compilation failed:")
P.a_("E:"+G.jq(c))
P.a_("E:Failure:")
P.a_(C.h.K("E:",w))
throw H.d(w)}return y},
bX:function(a,b){var z,y,x
H.p(a,"$isa",[T.r],"$asa")
z=a.length
b=new Float32Array(z*3)
for(y=0;y<a.length;++y){z=y*3
C.i.i(b,z,J.bR(a[y]))
if(y>=a.length)return H.j(a,y)
C.i.i(b,z+1,J.cj(a[y]))
z+=2
if(y>=a.length)return H.j(a,y)
x=J.d1(a[y])
if(z>=b.length)return H.j(b,z)
b[z]=x}return b},
hw:function(a,b){var z,y
H.p(a,"$isa",[T.ak],"$asa")
z=a.length
b=new Float32Array(z*2)
for(y=0;y<a.length;++y){z=y*2
C.i.i(b,z,J.bR(a[y]))
if(y>=a.length)return H.j(a,y)
C.i.i(b,z+1,J.cj(a[y]))}return b},
hx:function(a,b){var z,y,x,w,v
H.p(a,"$isa",[T.a7],"$asa")
z=a.length
b=new Float32Array(z*4)
for(y=0;y<a.length;++y){z=y*4
C.i.i(b,z,J.bR(a[y]))
if(y>=a.length)return H.j(a,y)
C.i.i(b,z+1,J.cj(a[y]))
x=z+2
if(y>=a.length)return H.j(a,y)
w=J.d1(a[y])
v=b.length
if(x>=v)return H.j(b,x)
b[x]=w
z+=3
if(y>=a.length)return H.j(a,y)
w=J.fF(a[y])
if(z>=v)return H.j(b,z)
b[z]=w}return b},
hv:function(a,b){var z,y
H.p(a,"$isa",[[P.a,P.D]],"$asa")
z=a.length
b=new Uint32Array(z*4)
for(y=0;y<a.length;++y){z=y*4
C.p.i(b,z,J.ao(a[y],0))
if(y>=a.length)return H.j(a,y)
C.p.i(b,z+1,J.ao(a[y],1))
if(y>=a.length)return H.j(a,y)
C.p.i(b,z+2,J.ao(a[y],2))
if(y>=a.length)return H.j(a,y)
C.p.i(b,z+3,J.ao(a[y],3))}return b},
k_:function(a,b){var z,y,x,w,v,u,t,s,r,q
for(z=a.e,y=new H.as(z,[H.q(z,0)]),y=y.gw(y),x=b.x,w=[[P.a,P.D]],v=[P.R],u=[T.a7],t=[T.r],s=[T.ak];y.t();){r=y.d
if(!x.C(0,r)){r="Dropping unnecessary attribute: "+H.c(r)
if($.eD>0)H.b0("I: "+r)
continue}q=z.h(0,r)
switch($.af().h(0,r).a){case"vec2":b.a5(r,G.hw(H.bM(q,"$isa",s,"$asa"),null),2)
break
case"vec3":b.a5(r,G.bX(H.bM(q,"$isa",t,"$asa"),null),3)
break
case"vec4":b.a5(r,G.hx(H.bM(q,"$isa",u,"$asa"),null),4)
break
case"float":b.a5(r,new Float32Array(H.c5(H.bM(q,"$isa",v,"$asa"))),1)
break
case"uvec4":b.a5(r,G.hv(H.bM(q,"$isa",w,"$asa"),null),4)
break}}},
i0:function(a,b,c){var z,y,x,w
H.p(c,"$isa",[T.r],"$asa")
z=G.dP(a,b.d,1,b.e.x)
z.b3(G.bX(c,null))
y=new Array(c.length)
y.fixed$length=Array
x=H.f(y,[P.D])
for(w=0;w<c.length;++w)C.a.i(x,w,w)
z.b2(x)
return z},
bb:{"^":"b;"},
bj:{"^":"bb;d,a,b,c",
b8:function(){return this.d},
l:function(a){var z,y,x,w
z=H.f(["{"+new H.e4(H.lm(this)).l(0)+"}["+this.a+"]"],[P.e])
for(y=this.d,x=new H.as(y,[H.q(y,0)]),x=x.gw(x);x.t();){w=x.d
C.a.k(z,H.c(w)+": "+H.c(y.h(0,w)))}return C.a.a0(z,"\n")}},
h5:{"^":"dX;"},
h7:{"^":"b;0a,b",
bW:function(a,b,c){J.fx(this.a,b)
if(c>0)J.fU(this.a,b,c)},
cp:function(a,b,c,d,e,f,g,h){J.cf(this.a,34962,b)
J.fV(this.a,c,d,e,!1,g,h)}},
hz:{"^":"b;a,b,c,d,e"},
dz:{"^":"b;a,b,c"},
dA:{"^":"b;a,b,c,d"},
dC:{"^":"b;a,b,c,d,e",
ab:function(a){switch($.af().h(0,a).a){case"vec2":this.e.i(0,a,H.f([],[T.ak]))
break
case"vec3":this.e.i(0,a,H.f([],[T.r]))
break
case"vec4":this.e.i(0,a,H.f([],[T.a7]))
break
case"float":this.e.i(0,a,H.f([],[P.R]))
break
case"uvec4":this.e.i(0,a,H.f([],[[P.a,P.D]]))
break}},
cP:function(a){var z,y,x,w,v,u
H.p(a,"$isa",[T.r],"$asa")
z=this.d
y=z.length
C.a.k(this.b,new G.dz(y,y+1,y+2))
for(x=a.length,w=0;w<a.length;a.length===x||(0,H.E)(a),++w){v=a[w]
v.toString
u=new T.r(new Float32Array(3))
u.B(v)
C.a.k(z,u)}},
cN:function(a,b){var z,y,x,w,v,u,t
z=[T.ak]
H.p(b,"$isa",z,"$asa")
y=H.p(this.e.h(0,a),"$isa",z,"$asa")
for(z=b.length,x=y&&C.a,w=0;w<b.length;b.length===z||(0,H.E)(b),++w){v=b[w]
v.toString
u=new Float32Array(2)
t=v.a
u[1]=t[1]
u[0]=t[0]
x.k(y,new T.ak(u))}},
cO:function(a,b){var z,y,x,w,v,u
z=[T.r]
H.p(b,"$isa",z,"$asa")
y=H.p(this.e.h(0,a),"$isa",z,"$asa")
for(z=b.length,x=y&&C.a,w=0;w<b.length;b.length===z||(0,H.E)(b),++w){v=b[w]
v.toString
u=new T.r(new Float32Array(3))
u.B(v)
x.k(y,u)}},
b1:function(a,b){var z,y,x,w,v,u
z=[T.a7]
H.p(b,"$isa",z,"$asa")
y=H.p(this.e.h(0,a),"$isa",z,"$asa")
for(z=b.length,x=y&&C.a,w=0;w<b.length;b.length===z||(0,H.E)(b),++w){v=b[w]
v.toString
u=new T.a7(new Float32Array(4))
u.B(v)
x.k(y,u)}},
cQ:function(a){var z,y,x,w,v,u
H.p(a,"$isa",[T.r],"$asa")
z=this.d
y=z.length
C.a.k(this.c,new G.dA(y,y+1,y+2,y+3))
for(x=a.length,w=0;w<a.length;a.length===x||(0,H.E)(a),++w){v=a[w]
v.toString
u=new T.r(new Float32Array(3))
u.B(v)
C.a.k(z,u)}},
cV:function(){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.c
x=new Array(z.length*3+y.length*6)
x.fixed$length=Array
w=H.f(x,[P.D])
for(x=z.length,v=0,u=0;u<z.length;z.length===x||(0,H.E)(z),++u){t=z[u]
C.a.i(w,v,t.a)
C.a.i(w,v+1,t.b)
C.a.i(w,v+2,t.c)
v+=3}for(z=y.length,u=0;u<y.length;y.length===z||(0,H.E)(y),++u){s=y[u]
x=s.a
C.a.i(w,v,x)
C.a.i(w,v+1,s.b)
r=s.c
C.a.i(w,v+2,r)
C.a.i(w,v+3,x)
C.a.i(w,v+4,r)
C.a.i(w,v+5,s.d)
v+=6}return w},
l:function(a){var z,y,x,w,v
z=H.f(["GB:","V["+this.d.length+"]","f3["+this.b.length+"]","f4["+this.c.length+"]"],[P.e])
for(y=this.e,x=new H.as(y,[H.q(y,0)]),x=x.gw(x);x.t();){w=x.d
v=$.af().h(0,w).a
C.a.k(z,H.c(w)+"["+v+","+y.h(0,w).length+"]")}return C.a.a0(z," ")}},
e2:{"^":"b;a,b,c"},
e1:{"^":"b;a,b,c"},
ia:{"^":"bj;d,a,b,c",p:{
dO:function(a){var z=P.ab(P.e,P.b)
z.i(0,"cDepthTest",!0)
z.i(0,"cDepthWrite",!0)
z.i(0,"cBlendEquation",$.eP())
z.i(0,"cStencilFunc",$.eS())
return new G.ia(z,a,!1,!0)}}},
ic:{"^":"bb;d,e,f,r,x,0y,z,Q,0ch,0cx,cy,a,b,c",
sav:function(a){this.cx=H.p(a,"$isa",[P.D],"$asa")},
b4:function(a,b,c){var z,y
C.h.ar(a,0)
H.h(b,"$isar")
this.cy.i(0,a,b)
z=this.d
y=this.r.h(0,a)
J.cf(z.a,34962,y)
J.d0(z.a,34962,b,35048)},
b5:function(a){this.ch=a
this.b4("aPosition",a,3)},
b6:function(){var z=this.cx
if(z!=null)return z.length
return this.ch.length/3|0},
a5:function(a,b,c){var z,y,x,w,v
z=J.cY(a,0)===105
if(z&&this.z===0)this.z=C.b.a8(b.length,c)
y=this.r
x=this.d
y.i(0,a,J.ch(x.a))
this.b4(a,b,c)
w=$.af().h(0,a)
if(w==null)throw H.d("Unknown canonical "+a)
v=this.x.h(0,a)
J.bP(x.a,this.e)
x.bW(0,v,z?1:0)
x.cp(0,y.h(0,a),v,w.b7(),5126,!1,0,0)},
b3:function(a){var z,y,x,w
z=this.r
y=this.d
z.i(0,"aPosition",J.ch(y.a))
this.b5(a)
x=$.af().h(0,"aPosition")
if(x==null)throw H.d("Unknown canonical aPosition")
w=this.x.h(0,"aPosition")
J.bP(y.a,this.e)
y.bW(0,w,0)
y.cp(0,z.h(0,"aPosition"),w,x.b7(),5126,!1,0,0)},
b2:function(a){var z,y,x
H.p(a,"$isa",[P.D],"$asa")
z=this.d
this.y=J.ch(z.a)
y=this.ch.length
if(y<768){this.sav(new Uint8Array(H.c5(a)))
this.Q=5121}else if(y<196608){this.sav(new Uint16Array(H.c5(a)))
this.Q=5123}else{this.sav(new Uint32Array(H.c5(a)))
this.Q=5125}J.bP(z.a,this.e)
y=this.y
x=this.cx
J.cf(z.a,34963,y)
J.d0(z.a,34963,x,35048)},
l:function(a){var z,y,x,w
z=this.cx
y=H.f(["Faces:"+(z==null?0:z.length)],[P.e])
for(z=this.cy,x=new H.as(z,[H.q(z,0)]),x=x.gw(x);x.t();){w=x.d
C.a.k(y,H.c(w)+":"+z.h(0,w).length)}return"MESH["+this.a+"] "+C.a.a0(y,"  ")},
p:{
dP:function(a,b,c,d){var z=P.e
return new G.ic(b,J.fp(b.a),c,P.ab(z,P.b),d,0,-1,P.ab(z,P.ar),"meshdata:"+a,!1,!0)}}},
ix:{"^":"bj;x,y,z,Q,ch,cx,cy,db,d,a,b,c",
cR:function(a,b){var z
if(typeof a!=="number")return a.ez()
if(typeof b!=="number")return H.a9(b)
z=a/b
if(this.z===z)return
this.z=z
this.bb()},
bb:function(){var z,y,x,w,v,u
z=this.z
y=this.Q
x=this.ch
w=Math.tan(this.y*3.141592653589793/180*0.5)
v=y-x
u=this.db.a
u[0]=0
u[1]=0
u[2]=0
u[3]=0
u[4]=0
u[5]=0
u[6]=0
u[7]=0
u[8]=0
u[9]=0
u[10]=0
u[11]=0
u[12]=0
u[13]=0
u[14]=0
u[15]=0
u[0]=1/(w*z)
u[5]=1/w
u[10]=(x+y)/v
u[11]=-1
u[14]=2*y*x/v},
b8:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.x.d
y=z.a
x=y[12]
w=y[13]
v=y[14]
u=new T.r(new Float32Array(3))
u.S(x,w,v)
v=this.d
v.i(0,"uEyePosition",u)
u=this.cy
u.B(z)
z=u.a
z[12]=0
z[13]=0
z[14]=0
z[15]=1
t=-y[12]
s=-y[13]
r=-y[14]
y=J.C(t)
x=!!y.$isa7
q=x?t.gcr(t):1
if(!!y.$isr){p=t.ga1(t)
s=t.gX(t)
r=t.gaj(t)
t=p}else if(x){p=t.ga1(t)
s=t.gX(t)
r=t.gaj(t)
t=p}else if(!(typeof t==="number")){t=null
s=null
r=null}y=z[0]
if(typeof t!=="number")return H.a9(t)
x=z[4]
if(typeof s!=="number")return H.a9(s)
w=z[8]
if(typeof r!=="number")return H.a9(r)
o=z[12]
n=z[1]
m=z[5]
l=z[9]
k=z[13]
j=z[2]
i=z[6]
h=z[10]
g=z[14]
f=z[3]
e=z[7]
d=z[11]
c=z[15]
z[12]=y*t+x*s+w*r+o*q
z[13]=n*t+m*s+l*r+k*q
z[14]=j*t+i*s+h*r+g*q
z[15]=f*t+e*s+d*r+c*q
c=this.cx
c.B(this.db)
c.W(0,u)
v.i(0,"uPerspectiveViewMatrix",c)
return v}},
bu:{"^":"b;a,b,c,d,e",
l:function(a){return"["+this.a+"] "+this.b+" "+this.c+" mode:"+this.d+" ["+this.e.a+"usec]"}},
dV:{"^":"bb;d,e,f,r,x,y,z,Q,0ch,a,b,c",
cZ:function(a,b,c,d){var z,y,x,w,v,u,t
for(z=this.e.d,y=z.length,x=this.y,w=this.d,v=this.r,u=0;u<z.length;z.length===y||(0,H.E)(z),++u){t=z[u]
x.i(0,t,J.d2(w.a,v,t))}for(z=this.f.d,y=z.length,u=0;u<z.length;z.length===y||(0,H.E)(z),++u){t=z[u]
x.i(0,t,J.d2(w.a,v,t))}},
d1:function(){var z,y,x,w
z=this.z
y=this.y
if(z.a===y.a&&this.Q.a===this.x.a)return H.f([],[P.e])
x=H.f([],[P.e])
for(y=new H.as(y,[H.q(y,0)]),y=y.gw(y);y.t();){w=y.d
if(!z.C(0,w))C.a.k(x,w)}for(z=this.x,z=P.k9(z,z.r,H.q(z,0)),y=this.Q;z.t();){w=z.d
if(!y.u(0,w))C.a.k(x,w)}return x},
d4:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
H.p(b,"$isF",[P.e,P.b],"$asF")
z=Date.now()
for(y=new H.as(b,[H.q(b,0)]),y=y.gw(y),x=this.d,w=this.y,v=this.z,u=0;y.t();){t=y.d
switch(J.cY(t,0)){case 117:if(w.C(0,t)){s=b.h(0,t)
if(v.C(0,t))H.b0("E:"+(t+" : group ["+a+"] overwrites ["+t+"]"))
v.i(0,t,a)
r=$.af().h(0,t)
if(r==null)H.aa("unknown "+t)
q=w.h(0,t)
t=r.a
switch(t){case"int":if(r.c===0){H.i(s)
J.cl(x.a,q,s)}else if(!!J.C(s).$ishO)J.fS(x.a,q,s)
break
case"float":if(r.c===0){H.ca(s)
J.fQ(x.a,q,s)}else if(!!J.C(s).$isar)J.fR(x.a,q,s)
break
case"mat4":if(r.c===0){t=H.an(s,"$isI").a
J.d8(x.a,q,!1,t)}else if(!!J.C(s).$isar)J.d8(x.a,q,!1,s)
break
case"mat3":if(r.c===0){t=H.an(s,"$isba").a
J.d7(x.a,q,!1,t)}else if(!!J.C(s).$isar)J.d7(x.a,q,!1,s)
break
case"vec4":t=r.c
p=x.a
if(t===0)J.d6(p,q,H.an(s,"$isa7").a)
else J.d6(p,q,H.h(s,"$isar"))
break
case"vec3":t=r.c
p=x.a
if(t===0)J.d5(p,q,H.an(s,"$isr").a)
else J.d5(p,q,H.h(s,"$isar"))
break
case"vec2":t=r.c
p=x.a
if(t===0)J.d4(p,q,H.an(s,"$isak").a)
else J.d4(p,q,H.h(s,"$isar"))
break
case"sampler2D":case"sampler2DShadow":t=this.ch
if(typeof t!=="number")return H.a9(t)
J.cZ(x.a,33984+t)
t=H.an(s,"$iscF").b
J.bO(x.a,3553,t)
t=this.ch
J.cl(x.a,q,t)
t=this.ch
if(typeof t!=="number")return t.K()
this.ch=t+1
break
case"samplerCube":t=this.ch
if(typeof t!=="number")return H.a9(t)
J.cZ(x.a,33984+t)
t=H.an(s,"$iscF").b
J.bO(x.a,34067,t)
t=this.ch
J.cl(x.a,q,t)
t=this.ch
if(typeof t!=="number")return t.K()
this.ch=t+1
break
default:H.b0("Error: unknow uniform type: "+t)}++u}break
case 99:s=b.h(0,t)
switch(t){case"cDepthTest":t=J.aR(s,!0)
p=x.a
if(t)J.bQ(p,2929)
else J.ci(p,2929)
break
case"cStencilFunc":H.an(s,"$ise2")
t=s.a
p=x.a
if(t===1281)J.ci(p,2960)
else{J.bQ(p,2960)
p=s.b
o=s.c
J.fL(x.a,t,p,o)}break
case"cDepthWrite":H.c8(s)
J.fq(x.a,s)
break
case"cBlendEquation":H.an(s,"$ise1")
t=s.a
p=x.a
if(t===1281)J.ci(p,3042)
else{J.bQ(p,3042)
p=s.b
o=s.c
J.fi(x.a,p,o)
J.fh(x.a,t)}break}++u
break}}n=P.dt(0,0,0,Date.now()-new P.b3(z,!1).a,0,0)
""+u
n.l(0)},
cU:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
H.p(b,"$isa",[G.bj],"$asa")
H.p(c,"$isa",[G.bu],"$asa")
z=Date.now()
y=this.d
J.fT(y.a,this.r)
this.ch=0
this.z.V(0)
for(x=b.length,w=0;w<b.length;b.length===x||(0,H.E)(b),++w){v=b[w]
this.d4(v.a,v.b8())}x=this.Q
x.V(0)
for(u=a.cy,u=new H.as(u,[H.q(u,0)]),u=u.gw(u);u.t();)x.k(0,u.d)
t=this.d1()
if(t.length!==0)P.a_("E:"+(this.a+" "+a.f+": uninitialized inputs: "+H.c(t)))
x=a.d
u=a.e
J.bP(x.a,u)
s=this.e.f.length>0
u=a.f
x=a.b6()
r=a.Q
q=a.z
if(s)J.ff(y.a,u)
if(r!==-1){p=y.a
if(q>1)J.fv(p,u,x,r,0,q)
else J.fu(p,u,x,r,0)}else{r=y.a
if(q>1)J.ft(r,u,0,x,q)
else J.fs(r,u,0,x)}if(s)J.fy(y.a)
C.a.k(c,new G.bu(this.a,a.z,a.b6(),u,P.dt(0,0,0,Date.now()-new P.b3(z,!1).a,0,0)))},
p:{
cC:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=P.e
y=P.ac(null,null,null,z)
x=c.b
w=d.b
v=H.p(c.f,"$isa",[z],"$asa")
u=J.fn(b.a)
t=G.eb(b.a,35633,x)
J.d_(b.a,u,t)
s=G.eb(b.a,35632,w)
J.d_(b.a,u,s)
if(v.length>0)J.fP(b.a,u,v,35980)
J.fK(b.a,u)
if(!H.c8(J.fJ(b.a,u,35714)))H.aa(J.fI(b.a,u))
z=new G.dV(b,c,d,u,P.cz(c.c,z),P.ab(z,P.b),P.ab(z,z),y,a,!1,!0)
z.cZ(a,b,c,d)
return z}}},
H:{"^":"b;a,b,c",
b7:function(){switch(this.a){case"float":return 1
case"vec2":return 2
case"vec3":case"uvec3":return 3
case"vec4":case"uvec4":return 4
default:return-1}}},
iV:{"^":"b;a,0b,c,d,e,f,r,x",
an:function(a){var z,y,x,w,v
H.p(a,"$isa",[P.e],"$asa")
for(z=a.length,y=this.c,x=this.x,w=0;w<a.length;a.length===z||(0,H.E)(a),++w){v=a[w]
C.a.k(y,v)
x.i(0,v,this.r);++this.r}C.a.al(y)},
a9:function(a){var z,y,x
H.p(a,"$isa",[P.e],"$asa")
for(z=a.length,y=this.d,x=0;x<a.length;a.length===z||(0,H.E)(a),++x)C.a.k(y,a[x])
C.a.al(y)},
aa:function(a){var z,y
H.p(a,"$isa",[P.e],"$asa")
for(z=this.e,y=0;y<1;++y)C.a.k(z,a[y])
C.a.al(z)},
ba:function(a,b){var z=[P.e]
this.b=this.bc(!0,H.p(a,"$isa",z,"$asa"),H.p(b,"$isa",z,"$asa"))},
ao:function(a){return this.ba(a,null)},
d_:function(a,b){this.b=this.bc(!1,H.p(a,"$isa",[P.e],"$asa"),b)},
b9:function(a){return this.d_(a,null)},
bc:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=[P.e]
H.p(b,"$isa",z,"$asa")
H.p(c,"$isa",z,"$asa")
y=this.c
x=y.length===0
w=H.f(["#version 300 es","precision highp float;","precision highp sampler2DShadow;",""],z)
for(z=y.length,v=this.x,u=0;u<y.length;y.length===z||(0,H.E)(y),++u){t=y[u]
s=$.af().h(0,t)
C.a.k(w,"layout (location="+H.c(v.h(0,t))+") in "+s.a+" "+H.c(t)+";")}C.a.k(w,"")
r=x?"in":"out"
if(x)C.a.k(w,"out vec4 oFragColor;")
for(z=this.e,y=z.length,u=0;u<z.length;z.length===y||(0,H.E)(z),++u){q=z[u]
s=$.af().h(0,q)
C.a.k(w,r+" "+s.a+" "+H.c(q)+";")}for(z=this.f,y=z.length,u=0;u<z.length;z.length===y||(0,H.E)(z),++u){q=z[u]
s=$.af().h(0,q)
C.a.k(w,r+" "+s.a+" "+H.c(q)+";")}C.a.k(w,"")
for(z=this.d,y=z.length,u=0;u<z.length;z.length===y||(0,H.E)(z),++u){q=z[u]
s=$.af().h(0,q)
v=s.c
p=v===0?"":"["+v+"]"
C.a.k(w,"uniform "+s.a+" "+H.c(q)+p+";")}C.a.k(w,"")
if(c!=null)C.a.I(w,c)
if(a)C.a.k(w,"void main(void) {")
C.a.I(w,b)
if(a)C.a.k(w,"}")
return C.a.a0(w,"\n")},
p:{
bh:function(a){var z,y
z=P.e
y=[z]
return new G.iV(a,H.f([],y),H.f([],y),H.f([],y),H.f([],y),0,P.ab(z,P.D))}}},
dX:{"^":"bb;",
eg:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.d.a
y=z[12]
x=z[13]
w=z[14]
b=new T.r(new Float32Array(3))
b.S(0,1,0)
v=this.e
u=v.a
u[0]=z[12]
u[1]=z[13]
u[2]=z[14]
u=new Float32Array(3)
t=new T.r(u)
t.B(v)
s=a.a
u[0]=u[0]-s[0]
u[1]=u[1]-s[1]
u[2]=u[2]-s[2]
t.aI(0)
r=b.bP(t)
r.aI(0)
q=t.bP(r)
q.aI(0)
p=r.aF(v)
o=q.aF(v)
v=t.aF(v)
n=r.a
m=n[0]
l=q.a
k=l[0]
j=u[0]
i=n[1]
h=l[1]
g=u[1]
n=n[2]
l=l[2]
u=u[2]
z[15]=1
z[14]=-v
z[13]=-o
z[12]=-p
z[11]=0
z[10]=u
z[9]=l
z[8]=n
z[7]=0
z[6]=g
z[5]=h
z[4]=i
z[3]=0
z[2]=j
z[1]=k
z[0]=m
z[12]=y
z[13]=x
z[14]=w},
aH:function(a){return this.eg(a,null)}},
ja:{"^":"b;a,b,c,d,e,f,r"},
cF:{"^":"b;",
l:function(a){return"Texture["+this.a+", "+this.c+"]"}},
je:{"^":"cF;f,r,x,a,b,c,d,e",
l:function(a){return"TypedTextureMutable["+this.a+", "+this.x+", "+this.f+" X "+this.r+"]"}}}],["","",,Y,{"^":"",
jN:function(a){var z,y,x,w
z=J.L(a)
y=new Array(z.gj(a))
y.fixed$length=Array
x=H.f(y,[P.R])
for(w=0;w<z.gj(a);++w){y=z.h(a,w)
if(typeof y==="number"&&Math.floor(y)===y)C.a.i(x,w,J.X(z.h(a,w)))
else{y=z.h(a,w)
if(typeof y==="number")C.a.i(x,w,H.ca(z.h(a,w)))}}return x},
k3:function(a){var z,y,x,w
z=J.L(a)
y=new Array(z.gj(a))
y.fixed$length=Array
x=H.f(y,[P.D])
for(w=0;w<z.gj(a);++w)C.a.i(x,w,H.i(z.h(a,w)))
return x},
jM:function(a){var z,y,x
z=J.L(a)
y=H.N(z.h(a,"skinIndices"))
H.N(z.h(a,"skinWeights"))
if(y==null||J.ap(y)===0)return 0
z=J.ap(z.h(a,"vertices"))
if(typeof z!=="number")return z.a8()
z=C.o.H(z,3)
x=C.b.a8(J.ap(y),z)
P.a_("Skin multiplier is "+x)
return x},
hL:function(b5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4
z=H.f([],[G.dC])
y=Y.jM(b5)
x=J.L(b5)
w=Y.k3(H.N(x.h(b5,"faces")))
v=w.length
P.a_("faces: "+v)
u=Y.dk(H.N(x.h(b5,"vertices")))
t=Y.dk(H.N(x.h(b5,"normals")))
s=y===0
r=s?null:Y.dl(y,H.N(x.h(b5,"skinIndices")))
q=s?null:Y.dl(y,Y.jN(H.N(x.h(b5,"skinWeights"))))
if(q!=null)for(s=q.length,p=0;p<s;++p){o=q[p]
n=o.a
m=n[0]+n[1]+n[2]+n[3]
if(m<0.98||m>1.02)H.b0("bad vector: "+H.c(o))}l=Y.hd(H.N(J.ao(x.h(b5,"uvs"),0)))
for(x=y>0,s=[T.r],n=l.length>0,k=t.length>0,j=[G.dz],i=[G.dA],h=P.e,g=[P.a,,],f=[P.D],e=[T.ak],d=r&&C.a,c=q&&C.a,b=[T.a7],a=0;a<v;){a0=a+1
if(a<0)return H.j(w,a)
a1=w[a]
if(typeof a1!=="number")return a1.ey()
m=(a1&1)===0?3:4
a2=H.f([],f)
for(a=a0,a3=0;a3<m;++a3,a=a0){a0=a+1
if(a<0||a>=v)return H.j(w,a)
C.a.k(a2,w[a])}if((a1&2)!==0){a0=a+1
if(a<0||a>=v)return H.j(w,a)
a4=w[a]
a=a0}else a4=0
a5=H.f([],e)
if((a1&8)!==0)for(a3=0;a3<m;++a3,a=a0){a0=a+1
if(a<0||a>=v)return H.j(w,a)
C.a.k(a5,C.a.h(l,w[a]))}a6=H.f([],s)
if((a1&16)!==0){a0=a+1
if(a<0||a>=v)return H.j(w,a)
a7=C.a.h(t,w[a])
for(a3=0;a3<m;++a3)C.a.k(a6,a7)
a=a0}if((a1&32)!==0)for(a3=0;a3<m;++a3,a=a0){a0=a+1
if(a<0||a>=v)return H.j(w,a)
C.a.k(a6,C.a.h(t,w[a]))}a8=H.f([],f)
if((a1&64)!==0){a0=a+1
if(a<0||a>=v)return H.j(w,a)
a9=w[a]
for(a3=0;a3<m;++a3)C.a.k(a8,a9)
a=a0}if((a1&128)!==0)for(a3=0;a3<m;++a3,a=a0){a0=a+1
if(a<0||a>=v)return H.j(w,a)
C.a.k(a8,w[a])}if(typeof a4!=="number")return H.a9(a4)
for(;b0=z.length,b0<=a4;){b1=new G.dC(!1,H.f([],j),H.f([],i),H.f([],s),P.ab(h,g))
if(k)b1.ab("aNormal")
if(n)b1.ab("aTexUV")
if(x){b1.ab("aBoneIndex")
b1.ab("aBoneWeight")}C.a.k(z,b1)}if(a4<0)return H.j(z,a4)
b1=z[a4]
b2=H.f([],s)
for(b0=a2.length,p=0;p<a2.length;a2.length===b0||(0,H.E)(a2),++p)C.a.k(b2,C.a.h(u,a2[p]))
if(m===3)b1.cP(b2)
else b1.cQ(b2)
if(a5.length>0)b1.cN("aTexUV",a5)
if(a6.length>0)b1.cO("aNormal",a6)
if(x){b3=H.f([],b)
b4=H.f([],b)
for(b0=a2.length,p=0;p<a2.length;a2.length===b0||(0,H.E)(a2),++p){a0=a2[p]
C.a.k(b3,d.h(r,a0))
C.a.k(b4,c.h(q,a0))}b1.b1("aBoneIndex",b3)
b1.b1("aBoneWeight",b4)}}x="out: "+z.length+" "
if(0>=z.length)return H.j(z,0)
P.a_(x+z[0].l(0))
return z},
hK:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
H.p(b,"$isa",[L.aS],"$asa")
z=H.h(J.ao(a,"animation"),"$isF")
y=J.L(z)
x=H.N(y.h(z,"hierarchy"))
w=H.v(y.h(z,"name"))
y=H.ca(y.h(z,"length"))
v=J.L(x)
u=new Array(v.gj(x))
u.fixed$length=Array
u=H.f(u,[L.dd])
for(t=b.length,s=[P.R],r=[T.r],q=[T.bC],p=0;p<v.gj(x);++p){o=H.f([],s)
n=H.f([],r)
m=H.f([],s)
l=H.f([],q)
k=H.f([],s)
j=H.f([],r)
for(i=J.br(H.eJ(J.ao(v.h(x,p),"keys"),"$ism"));i.t();){h=H.h(i.gA(i),"$isF")
g=J.L(h)
f=J.X(g.h(h,"time"))
if(g.C(h,"pos")){C.a.k(o,f)
C.a.k(n,Y.dL(H.N(g.h(h,"pos"))))}if(g.C(h,"scale")){C.a.k(k,f)
C.a.k(j,Y.dK(H.N(g.h(h,"scl"))))}if(g.C(h,"rot")){C.a.k(m,f)
C.a.k(l,Y.dJ(H.N(g.h(h,"rot"))))}}if(p>=t)return H.j(b,p)
i=b[p]
e=new L.dd(i,o,n,m,l,k,j)
h=o.length
if(h===0){e.sdq(H.f([0],s))
h=new Float32Array(3)
h[0]=0
h[1]=0
h[2]=0
e.sdr(H.f([new T.r(h)],r))}h=e.d
if(h==null||h.length===0){e.sdB(H.f([0],s))
h=new Float32Array(4)
h[0]=0
h[1]=0
h[2]=0
h[3]=1
e.sdC(H.f([new T.bC(h)],q))}h=e.f
if(h==null||h.length===0){e.sdF(H.f([0],s))
h=new Float32Array(3)
h[0]=1
h[1]=1
h[2]=1
e.sdG(H.f([new T.r(h)],r))}C.a.i(u,i.d,e)}P.a_("anim-bones: "+u.length)
return new L.iW(w,u,y)},
hM:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=J.L(a)
y=H.h(z.h(a,"metadata"),"$isF")
x=H.N(z.h(a,"bones"))
z=H.i(J.ao(y,"bones"))
if(typeof z!=="number")return H.a9(z)
z=new Array(z)
z.fixed$length=Array
w=H.f(z,[L.aS])
for(z=J.L(x),v=0;v<z.gj(x);++v){u=H.h(z.h(x,v),"$isF")
t=J.L(u)
s=H.v(t.h(u,"name"))
r=H.i(t.h(u,"parent"))
q=Y.dK(H.N(t.h(u,"scl")))
p=Y.dL(H.N(t.h(u,"pos")))
o=Y.dJ(H.N(t.h(u,"rotq")))
n=new T.I(new Float32Array(16))
n.aY(p,o)
n.a4(0,q)
if(v!==0){if(typeof r!=="number")return r.R()
t=r<0}else t=!1
if(t)H.b0("found unusal root node "+v+" "+H.c(r))
t=new T.I(new Float32Array(16))
t.G()
C.a.i(w,v,new L.aS(s,n,t,v,r))}P.a_("bones: "+w.length)
L.iJ(w)
return w},
dk:function(a){var z,y,x,w,v,u,t,s
z=J.L(a)
y=new Array(C.b.H(z.gj(a),3))
y.fixed$length=Array
x=H.f(y,[T.r])
for(w=0;w<z.gj(a);w+=3){y=C.b.H(w,3)
v=J.X(z.h(a,w))
u=J.X(z.h(a,w+1))
t=J.X(z.h(a,w+2))
s=new Float32Array(3)
s[0]=v
s[1]=u
s[2]=t
C.a.i(x,y,new T.r(s))}return x},
hd:function(a){var z,y,x,w,v,u,t
z=J.L(a)
y=new Array(C.b.H(z.gj(a),2))
y.fixed$length=Array
x=H.f(y,[T.ak])
for(w=0;w<z.gj(a);w+=2){y=C.b.H(w,2)
v=J.X(z.h(a,w))
u=J.X(z.h(a,w+1))
t=new Float32Array(2)
t[0]=v
t[1]=u
C.a.i(x,y,new T.ak(t))}return x},
dl:function(a,b){var z,y,x,w,v,u,t
z=J.L(b)
y=new Array(C.b.a8(z.gj(b),a))
y.fixed$length=Array
x=H.f(y,[T.a7])
for(w=0,v=0;w<z.gj(b);w+=a,++v){y=new Float32Array(4)
for(u=0;u<a;++u){t=J.X(z.h(b,w+u))
if(u>=4)return H.j(y,u)
y[u]=t}C.a.i(x,v,new T.a7(y))}return x},
dM:function(a){var z,y,x,w
z=J.L(a)
y=J.X(z.h(a,0))
x=J.X(z.h(a,1))
z=J.X(z.h(a,2))
w=new T.r(new Float32Array(3))
w.S(y,x,z)
return w},
dL:function(a){if(a==null)return new T.r(new Float32Array(3))
return Y.dM(a)},
dK:function(a){var z
if(a==null){z=new T.r(new Float32Array(3))
z.S(1,1,1)
return z}return Y.dM(a)},
dJ:function(a){var z,y,x,w,v
if(a==null){z=new Float32Array(4)
z[3]=1
return new T.bC(z)}z=J.L(a)
y=J.X(z.h(a,0))
x=J.X(z.h(a,1))
w=J.X(z.h(a,2))
z=J.X(z.h(a,3))
v=new T.bC(new Float32Array(4))
v.cC(y,x,w,z)
return v}}],["","",,R,{"^":"",
de:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
H.p(a,"$isa",[L.aS],"$asa")
z=H.f([],[T.r])
for(y=a.length,x=b.a,w=x.length,v=0;v<y;++v){u=a[v].e
if(u===-1)continue
if(v>=w)return H.j(x,v)
t=x[v].a
s=t[14]
r=t[13]
q=t[12]
t=new Float32Array(3)
t[0]=q
t[1]=r
t[2]=s
p=new T.r(new Float32Array(3))
p.B(new T.r(t))
p.a4(0,c)
C.a.k(z,p)
p=C.a.h(x,u).a
s=p[14]
r=p[13]
q=p[12]
t=new Float32Array(3)
t[0]=q
t[1]=r
t[2]=s
p=new T.r(new Float32Array(3))
p.B(new T.r(t))
p.a4(0,c)
C.a.k(z,p)}return z},
kb:function(a,b,c,d){var z,y,x,w,v
z=document.createElement("div")
y=z.style
x=""+c+"px"
y.width=x
x=""+d+"px"
y.height=x
y.color=a
y.background=a
for(w=0;w<c;++w){v=H.h(W.jG("span",null),"$isS")
y=v.style
y.width="1px"
x=""+d+"px"
y.height=x
x=(y&&C.y).aq(y,"float")
y.setProperty(x,"left","")
x=C.y.aq(y,"opacity")
y.setProperty(x,"0.9","")
y.background=b
C.t.J(z,v)}return z},
h3:{"^":"b;a,0b,c,d,0e,0f"},
iN:{"^":"iM;db,dx,d,e,f,r,x,y,z,Q,a,b,c",
en:[function(a){var z,y,x
z=this.db
y=z.clientWidth
x=z.clientHeight
z.width=y
z.height=x
P.a_("size change "+H.c(y)+" "+H.c(x))
this.dx.cR(y,x)
this.z=y
this.Q=x},"$1","gem",4,0,24]},
j0:{"^":"b;",
d0:function(a,b,c){var z,y
z=this.a
if(z==null)throw H.d("no element provided")
y=z.style
y.color=b
y.fontFamily="Helvetica,Arial,sans-serif"
y.fontSize="9px"
y.lineHeight="15px"
y.padding="0 0 3px 3px"
y.textAlign="left"
y.background=c
y=J.l(z)
y.J(z,this.b)
y.J(z,this.d)
y.J(z,this.c)}},
j1:{"^":"j0;e,f,a,b,c,d",
d3:function(a,b){var z,y,x,w,v,u
z=++this.e
if(a-this.f<1000)return
y=z*1000/1000
this.e=0
this.f=a
this.b.textContent=C.n.ev(y,2)+" fps"
C.t.cA(this.c,b)
x=C.b.H(30*C.n.dS(y),90)
if(x<0)x=0
if(x>30)x=30
z=this.d
w=H.h(z.firstChild,"$isS")
v=w.style
u=""+x+"px"
v.height=u
C.t.J(z,w)},
d2:function(a){return this.d3(a,"")}}}],["","",,A,{"^":"",
eC:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
H.p(d,"$isa",[G.bu],"$asa")
H.p(e,"$isa",[G.bj],"$asa")
if(!b.c)return
z=b.dx
z.B(c)
y=b.d
z.W(0,y)
x=b.ch
if(x!=null&&b.cx!=null){H.c(b)
w=C.a.gef(e)
v=b.db
u=new Float32Array(9)
t=z.a
u[0]=t[0]
u[1]=t[1]
u[2]=t[2]
u[3]=t[4]
u[4]=t[5]
u[5]=t[6]
u[6]=t[8]
u[7]=t[9]
u[8]=t[10]
v.aE(new T.ba(u))
u=v.a
s=u[3]
u[3]=u[1]
u[1]=s
s=u[6]
u[6]=u[2]
u[2]=s
s=u[7]
u[7]=u[5]
u[5]=s
w=w.d
w.i(0,"uTransformationMatrix",y)
w.i(0,"uModelMatrix",z)
w.i(0,"uNormalMatrix",v)
C.a.k(e,x)
a.cU(b.cx,e,d)
if(0>=e.length)return H.j(e,-1)
e.pop()}for(y=b.cy,x=y.length,r=0;r<y.length;y.length===x||(0,H.E)(y),++r)A.eC(a,y[r],z,d,e)},
bc:{"^":"dX;ch,cx,cy,db,dx,d,e,f,r,x,a,b,c",
l:function(a){return"NODE["+this.a+"]"},
p:{
dR:function(a,b){var z,y,x,w,v,u,t,s
z=H.f([],[A.bc])
y=new Float32Array(9)
x=new T.I(new Float32Array(16))
x.G()
w=new T.I(new Float32Array(16))
w.G()
v=new Float32Array(3)
u=new Float32Array(3)
t=new Float32Array(3)
s=new Float32Array(3)
C.a.k(z,b)
return new A.bc(null,null,z,new T.ba(y),x,w,new T.r(v),new T.r(u),new T.r(t),new T.r(s),a,!1,!0)}}},
c0:{"^":"bb;d,e,f,a,b,c"},
iM:{"^":"bb;",
cY:function(a,b,c){if(this.d==null)this.d=new G.hz(this.e,null,null,null,null)},
cT:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
H.p(a,"$isa",[G.bu],"$asa")
z=this.d
y=this.r
x=this.z
w=this.Q
v=z.a
z=z.b
J.fg(v.a,36160,z)
J.fW(v.a,this.x,this.y,x,w)
if(y!==0)J.fj(v.a,y)
for(z=this.f,y=z.length,x=P.e,w=P.b,u=0;u<z.length;z.length===y||(0,H.E)(z),++u){t=z[u]
if(!t.c)continue
v=t.d
if(!v.c)continue
s=t.e
C.a.k(s,new G.bj(P.ab(x,w),"transforms",!1,!0))
r=new T.I(new Float32Array(16))
r.G()
for(q=t.f,p=q.length,o=0;o<q.length;q.length===p||(0,H.E)(q),++o)A.eC(v,q[o],r,a,s)
if(0>=s.length)return H.j(s,-1)
s.pop()}}}}],["","",,V,{}],["","",,D,{"^":"",
i5:function(a){var z,y,x,w
z=[P.F,,,]
y=new P.V(0,$.G,[z])
x=new XMLHttpRequest()
C.z.ei(x,"GET",a)
w=W.bB
W.al(x,"loadend",H.n(new D.i6(new P.e9(y,[z]),x),{func:1,ret:-1,args:[w]}),!1,w)
C.z.cz(x,"")
return y},
i6:{"^":"o:25;a,b",
$1:function(a){H.h(a,"$isbB")
this.a.ah(0,H.aZ(C.U.e1(0,H.v(W.l1(this.b.response))),{futureOr:1,type:[P.F,,,]}))}},
hX:{"^":"b;a,b,c",
cW:function(a){var z,y
a=document
z=W.b7
y={func:1,ret:-1,args:[z]}
W.al(a,"keydown",H.n(new D.hZ(this),y),!1,z)
W.al(a,"keyup",H.n(new D.i_(this),y),!1,z)},
p:{
hY:function(a){var z=P.D
z=new D.hX(P.ac(null,null,null,z),P.ac(null,null,null,z),P.ac(null,null,null,z))
z.cW(a)
return z}}},
hZ:{"^":"o:13;a",
$1:function(a){var z
H.h(a,"$isb7")
z=this.a
z.a.k(0,a.which)
z.b.k(0,a.which)}},
i_:{"^":"o:13;a",
$1:function(a){var z
H.h(a,"$isb7")
z=this.a
z.a.c5(0,a.which)
z.c.k(0,a.which)}},
ig:{"^":"b;a,b,c,d,e,f,r,x",
cX:function(a){var z,y,x
if(a==null)a=document
z=J.l(a)
y=z.gc2(a)
x=H.q(y,0)
W.al(y.a,y.b,H.n(new D.ii(this),{func:1,ret:-1,args:[x]}),!1,x)
x=z.gc1(a)
y=H.q(x,0)
W.al(x.a,x.b,H.n(new D.ij(this),{func:1,ret:-1,args:[y]}),!1,y)
y=z.gc3(a)
x=H.q(y,0)
W.al(y.a,y.b,H.n(new D.ik(this),{func:1,ret:-1,args:[x]}),!1,x)
z=z.gc4(a)
x=H.q(z,0)
W.al(z.a,z.b,H.n(new D.il(this),{func:1,ret:-1,args:[x]}),!1,x)},
p:{
ih:function(a){var z=P.D
z=new D.ig(P.ac(null,null,null,z),P.ac(null,null,null,z),P.ac(null,null,null,z),0,0,0,0,0)
z.cX(a)
return z}}},
ii:{"^":"o:4;a",
$1:function(a){var z,y
H.h(a,"$isa0")
a.preventDefault()
z=this.a
y=J.l(a)
z.r=H.i(y.gc_(a).a)
z.x=H.i(y.gc_(a).b)
z.d=a.movementX
z.e=a.movementY}},
ij:{"^":"o:4;a",
$1:function(a){var z
H.h(a,"$isa0")
a.preventDefault()
P.a_("BUTTON "+H.c(a.button))
z=this.a
z.a.k(0,a.button)
z.b.k(0,a.button)}},
ik:{"^":"o:4;a",
$1:function(a){var z
H.h(a,"$isa0")
a.preventDefault()
z=this.a
z.a.c5(0,a.button)
z.c.k(0,a.button)}},
il:{"^":"o:27;a",
$1:function(a){H.h(a,"$isaT")
a.preventDefault()
this.a.f=H.i(C.af.ge4(a))}},
iv:{"^":"h5;fy,go,id,k1,k2,k3,k4,r1,d,e,f,r,x,a,b,c"}}],["","",,A,{"^":"",
bK:function(a){var z,y
z=C.i.ea(H.p(a,"$ism",[P.b],"$asm"),0,new A.lo(),P.D)
if(typeof z!=="number")return H.a9(z)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
lo:{"^":"o:28;",
$2:function(a,b){var z,y
H.i(a)
z=J.av(b)
if(typeof a!=="number")return a.K()
y=536870911&a+z
y=536870911&y+((524287&y)<<10)
return y^y>>>6}}}],["","",,T,{"^":"",ba:{"^":"b;a",
B:function(a){var z,y
z=a.a
y=this.a
y[8]=z[8]
y[7]=z[7]
y[6]=z[6]
y[5]=z[5]
y[4]=z[4]
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
l:function(a){return"[0] "+this.P(0).l(0)+"\n[1] "+this.P(1).l(0)+"\n[2] "+this.P(2).l(0)+"\n"},
h:function(a,b){var z
H.i(b)
z=this.a
if(b>=9)return H.j(z,b)
return z[b]},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.ba){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]}else z=!1
return z},
gv:function(a){return A.bK(this.a)},
P:function(a){var z,y,x
z=new Float32Array(3)
y=this.a
if(a>=9)return H.j(y,a)
z[0]=y[a]
x=3+a
if(x>=9)return H.j(y,x)
z[1]=y[x]
x=6+a
if(x>=9)return H.j(y,x)
z[2]=y[x]
return new T.r(z)},
aE:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=a.a
y=z[0]
x=z[4]
w=z[8]
v=z[5]
u=z[7]
t=x*w-v*u
s=z[1]
r=z[3]
q=r*w
p=z[6]
o=v*p
z=z[2]
n=r*u-x*p
m=y*t-s*(q-o)+z*n
if(m===0){this.B(a)
return 0}l=1/m
k=this.a
k[0]=l*t
k[1]=l*(z*u-s*w)
k[2]=l*(s*v-z*x)
k[3]=l*(o-q)
k[4]=l*(y*w-z*p)
k[5]=l*(z*r-y*v)
k[6]=l*n
k[7]=l*(s*p-y*u)
k[8]=l*(y*x-s*r)
return m}},I:{"^":"b;a",
B:function(a){var z,y
z=a.a
y=this.a
y[15]=z[15]
y[14]=z[14]
y[13]=z[13]
y[12]=z[12]
y[11]=z[11]
y[10]=z[10]
y[9]=z[9]
y[8]=z[8]
y[7]=z[7]
y[6]=z[6]
y[5]=z[5]
y[4]=z[4]
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
aY:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=b.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=y+y
t=x+x
s=w+w
r=y*u
q=y*t
p=y*s
o=x*t
n=x*s
m=w*s
l=v*u
k=v*t
j=v*s
i=a.a
h=this.a
h[0]=1-(o+m)
h[1]=q+j
h[2]=p-k
h[3]=0
h[4]=q-j
h[5]=1-(r+m)
h[6]=n+l
h[7]=0
h[8]=p+k
h[9]=n-l
h[10]=1-(r+o)
h[11]=0
h[12]=i[0]
h[13]=i[1]
h[14]=i[2]
h[15]=1},
l:function(a){return"[0] "+this.P(0).l(0)+"\n[1] "+this.P(1).l(0)+"\n[2] "+this.P(2).l(0)+"\n[3] "+this.P(3).l(0)+"\n"},
h:function(a,b){var z
H.i(b)
z=this.a
if(b>=16)return H.j(z,b)
return z[b]},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.I){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]&&z[9]===x[9]&&z[10]===x[10]&&z[11]===x[11]&&z[12]===x[12]&&z[13]===x[13]&&z[14]===x[14]&&z[15]===x[15]}else z=!1
return z},
gv:function(a){return A.bK(this.a)},
P:function(a){var z,y,x
z=new Float32Array(4)
y=this.a
if(a>=16)return H.j(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.j(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.j(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.j(y,x)
z[3]=y[x]
return new T.a7(z)},
a3:function(a,b){var z=new T.I(new Float32Array(16))
z.B(this)
z.W(0,b)
return z},
c6:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=Math.cos(a)
y=Math.sin(a)
x=this.a
w=x[4]
v=x[8]
u=x[5]
t=x[9]
s=x[6]
r=x[10]
q=x[7]
p=x[11]
o=-y
x[4]=w*z+v*y
x[5]=u*z+t*y
x[6]=s*z+r*y
x[7]=q*z+p*y
x[8]=w*o+v*z
x[9]=u*o+t*z
x[10]=s*o+r*z
x[11]=q*o+p*z},
cv:function(a,b,c,d){var z,y,x,w
z=b.a
y=z[0]
x=z[1]
w=z[2]
z=this.a
z[0]=z[0]*y
z[1]=z[1]*y
z[2]=z[2]*y
z[3]=z[3]*y
z[4]=z[4]*x
z[5]=z[5]*x
z[6]=z[6]*x
z[7]=z[7]*x
z[8]=z[8]*w
z[9]=z[9]*w
z[10]=z[10]*w
z[11]=z[11]*w
z[12]=z[12]
z[13]=z[13]
z[14]=z[14]
z[15]=z[15]},
a4:function(a,b){return this.cv(a,b,null,null)},
G:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=1
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=1
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=1},
aE:function(a8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
z=a8.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=z[4]
t=z[5]
s=z[6]
r=z[7]
q=z[8]
p=z[9]
o=z[10]
n=z[11]
m=z[12]
l=z[13]
k=z[14]
j=z[15]
i=y*t-x*u
h=y*s-w*u
g=y*r-v*u
f=x*s-w*t
e=x*r-v*t
d=w*r-v*s
c=q*l-p*m
b=q*k-o*m
a=q*j-n*m
a0=p*k-o*l
a1=p*j-n*l
a2=o*j-n*k
a3=i*a2-h*a1+g*a0+f*a-e*b+d*c
if(a3===0){this.B(a8)
return 0}a4=1/a3
a5=this.a
a5[0]=(t*a2-s*a1+r*a0)*a4
a5[1]=(-x*a2+w*a1-v*a0)*a4
a5[2]=(l*d-k*e+j*f)*a4
a5[3]=(-p*d+o*e-n*f)*a4
a6=-u
a5[4]=(a6*a2+s*a-r*b)*a4
a5[5]=(y*a2-w*a+v*b)*a4
a7=-m
a5[6]=(a7*d+k*g-j*h)*a4
a5[7]=(q*d-o*g+n*h)*a4
a5[8]=(u*a1-t*a+r*c)*a4
a5[9]=(-y*a1+x*a-v*c)*a4
a5[10]=(m*e-l*g+j*i)*a4
a5[11]=(-q*e+p*g-n*i)*a4
a5[12]=(a6*a0+t*b-s*c)*a4
a5[13]=(y*a0-x*b+w*c)*a4
a5[14]=(a7*f+l*h-k*i)*a4
a5[15]=(q*f-p*h+o*i)*a4
return a3},
W:function(a8,a9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
z=this.a
y=z[0]
x=z[4]
w=z[8]
v=z[12]
u=z[1]
t=z[5]
s=z[9]
r=z[13]
q=z[2]
p=z[6]
o=z[10]
n=z[14]
m=z[3]
l=z[7]
k=z[11]
j=z[15]
i=a9.a
h=i[0]
g=i[4]
f=i[8]
e=i[12]
d=i[1]
c=i[5]
b=i[9]
a=i[13]
a0=i[2]
a1=i[6]
a2=i[10]
a3=i[14]
a4=i[3]
a5=i[7]
a6=i[11]
a7=i[15]
z[0]=y*h+x*d+w*a0+v*a4
z[4]=y*g+x*c+w*a1+v*a5
z[8]=y*f+x*b+w*a2+v*a6
z[12]=y*e+x*a+w*a3+v*a7
z[1]=u*h+t*d+s*a0+r*a4
z[5]=u*g+t*c+s*a1+r*a5
z[9]=u*f+t*b+s*a2+r*a6
z[13]=u*e+t*a+s*a3+r*a7
z[2]=q*h+p*d+o*a0+n*a4
z[6]=q*g+p*c+o*a1+n*a5
z[10]=q*f+p*b+o*a2+n*a6
z[14]=q*e+p*a+o*a3+n*a7
z[3]=m*h+l*d+k*a0+j*a4
z[7]=m*g+l*c+k*a1+j*a5
z[11]=m*f+l*b+k*a2+j*a6
z[15]=m*e+l*a+k*a3+j*a7}},bC:{"^":"b;a",
cC:function(a,b,c,d){var z=this.a
z[0]=a
z[1]=b
z[2]=c
z[3]=d},
gj:function(a){var z,y,x,w,v
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
return Math.sqrt(y*y+x*x+w*w+v*v)},
h:function(a,b){var z
H.i(b)
z=this.a
if(b>=4)return H.j(z,b)
return z[b]},
l:function(a){var z=this.a
return H.c(z[0])+", "+H.c(z[1])+", "+H.c(z[2])+" @ "+H.c(z[3])}},ak:{"^":"b;a",
l:function(a){var z=this.a
return"["+H.c(z[0])+","+H.c(z[1])+"]"},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.ak){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gv:function(a){return A.bK(this.a)},
h:function(a,b){var z
H.i(b)
z=this.a
if(b>=2)return H.j(z,b)
return z[b]},
gj:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(y*y+z*z)},
ga1:function(a){return this.a[0]},
gX:function(a){return this.a[1]}},r:{"^":"b;a",
S:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c},
B:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
l:function(a){var z=this.a
return"["+H.c(z[0])+","+H.c(z[1])+","+H.c(z[2])+"]"},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.r){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gv:function(a){return A.bK(this.a)},
h:function(a,b){var z
H.i(b)
z=this.a
if(b>=3)return H.j(z,b)
return z[b]},
gj:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(y*y+x*x+z*z)},
gbY:function(){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return y*y+x*x+z*z},
aI:function(a){var z,y,x
z=Math.sqrt(this.gbY())
if(z===0)return 0
y=1/z
x=this.a
x[0]=x[0]*y
x[1]=x[1]*y
x[2]=x[2]*y
return z},
aF:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[0]+y[1]*z[1]+y[2]*z[2]},
bP:function(a){var z,y,x,w,v,u,t,s
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=a.a
u=v[0]
t=v[1]
s=v[2]
z=new T.r(new Float32Array(3))
z.S(x*s-w*t,w*u-y*s,y*t-x*u)
return z},
a4:function(a,b){var z=this.a
z[2]=z[2]*b
z[1]=z[1]*b
z[0]=z[0]*b},
ga1:function(a){return this.a[0]},
gX:function(a){return this.a[1]},
gaj:function(a){return this.a[2]}},a7:{"^":"b;a",
B:function(a){var z,y
z=a.a
y=this.a
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
l:function(a){var z=this.a
return H.c(z[0])+","+H.c(z[1])+","+H.c(z[2])+","+H.c(z[3])},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.a7){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gv:function(a){return A.bK(this.a)},
h:function(a,b){var z
H.i(b)
z=this.a
if(b>=4)return H.j(z,b)
return z[b]},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(y*y+x*x+w*w+z*z)},
ga1:function(a){return this.a[0]},
gX:function(a){return this.a[1]},
gaj:function(a){return this.a[2]},
gcr:function(a){return this.a[3]}}}],["","",,B,{"^":"",
eK:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z={}
y=document
x=C.j.cu(y,"stats")
w=y.createElement("div")
v=w.style
v.fontWeight="bold"
w.textContent="@@@@"
u=new R.j1(0,0,x,w,y.createElement("div"),R.kb("blue","gray",90,30))
u.d0(x,"blue","gray")
t=H.h(C.j.ek(y,"#webgl-canvas"),"$iscp")
s=new G.h7(t)
x=P.e
v=P.b
r=(t&&C.J).ct(t,"webgl2",P.cy(["alpha",!1,"depth",!0,"stencil",!0,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1,"failIfMajorPerformanceCaveat",!1],x,v))
s.a=r
if(r==null)H.aa(P.dy('Calling canvas.getContext("webgl2") failed,\nmake sure you run on a computer that supports WebGL2.\n\nYou can test your browser\'s compatibility here: http://webglreport.com/\n\n(If you are using Dartium make sure you start it with the\noption: --enable-unsafe-es3-apis)\n'))
q="ChronosGL Config: "+H.c(J.fG(r))
if($.eD>0)P.a_("I: "+q)
J.fk(r,0,0,0,1)
J.bQ(r,2929)
r=new Float32Array(3)
q=D.hY(null)
p=D.ih(t)
o=new T.I(new Float32Array(16))
o.G()
n=new Float32Array(3)
m=new Float32Array(3)
l=new Float32Array(3)
k=new D.iv(20,0,0,0,new T.r(r),-0.02,q,p,o,new T.r(n),new T.r(m),new T.r(l),new T.r(new Float32Array(3)),"camera:orbit",!1,!0)
r=new T.I(new Float32Array(16))
r.G()
q=new T.I(new Float32Array(16))
q.G()
j=new G.ix(k,50,1,0.1,1000,r,q,new T.I(new Float32Array(16)),P.ab(x,v),"perspective",!1,!0)
j.bb()
r=G.cC("animation",s,$.f5(),$.f4())
q=[G.bj]
p=H.f([j],q)
o=[A.bc]
n=H.f([],o)
i=new A.c0(r,p,n,"animation",!1,!0)
p=G.cC("solid",s,$.f9(),$.f8())
n=H.f([j],q)
m=H.f([],o)
h=new A.c0(p,n,m,"solid",!1,!0)
n=G.cC("demo",s,$.f7(),$.f6())
q=H.f([j],q)
o=H.f([],o)
g=new A.c0(n,q,o,"demo",!1,!0)
q=H.f([],[A.c0])
f=new R.iN(t,j,null,s,q,17664,0,0,0,0,"main",!1,!0)
f.cY("main",s,null)
f.en(null)
o=W.Q
W.al(window,"resize",H.n(f.gem(),{func:1,ret:-1,args:[o]}),!1,o)
C.a.k(q,h)
C.a.k(q,i)
C.a.k(q,g)
e=G.dO("wire")
q=new T.r(new Float32Array(3))
q.S(1,1,0)
e.d.i(0,"uColor",q)
z.a=null
z.b=null
z.c=null
d=G.dO("mat")
c=P.cy(["idSkeleton",p,"idStatic",n,"idAnimation",r],x,G.dV)
for(x=C.j.aO(y,"input"),r=x.length,b=0;b<x.length;x.length===r||(0,H.E)(x),++b){q=J.fB(H.h(x[b],"$isS"))
p=H.q(q,0)
W.al(q.a,q.b,H.n(new B.lB(c),{func:1,ret:-1,args:[p]}),!1,p)}for(x=C.j.aO(y,"input"),r=x.length,b=0;b<x.length;x.length===r||(0,H.E)(x),++b){q=H.h(x[b],"$isS")
H.b0("initialize inputs "+H.c(q.id))
a=C.j.de(y,"Event")
J.fc(a,"change",!0,!0)
J.fr(q,a)}z.d=0
d.d.i(0,"uTime",0)
P.hC(H.f([D.i5("../asset/knight/knight.js")],[[P.a4,P.b]]),null,!1,v).aK(new B.lC(z,i,d,g,s,h,e,new B.lA(z,k,f,u,d)),null)},
lB:{"^":"o:29;a",
$1:function(a){var z=H.an(J.fE(a),"$isdD")
P.a_(H.c(z.id)+" toggle "+H.c(z.checked))
this.a.h(0,z.id).c=z.checked}},
lA:{"^":"o:30;a,b,c,d,e",
$1:function(a8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
H.cT(a8)
if(typeof a8!=="number")return a8.b0()
z=this.a
z.d=a8+0
y=this.b
y.go+=0.001
x=y.r1
w=x.a
if(w.u(0,0)||w.u(0,1)){w=y.go
v=x.d
if(typeof v!=="number")return v.a3()
y.go=w+v*0.01
v=y.id
w=x.e
if(typeof w!=="number")return w.a3()
y.id=v+w*0.01}w=y.k4
v=w.a
if(v.u(0,37))y.go+=0.03
else if(v.u(0,39))y.go-=0.03
if(v.u(0,38))y.id+=0.03
else if(v.u(0,40))y.id-=0.03
if(v.u(0,33))y.fy*=0.99
else if(v.u(0,34))y.fy*=1.01
if(v.u(0,32)){y.go=0
y.id=0}v=x.f
if(typeof v!=="number")return v.a3()
v=y.fy-v*y.k3
if(v>0)y.fy=v
v=C.o.dT(y.id,-1.4707963267948965,1.4707963267948965)
y.id=v
u=y.fy
t=y.go
s=u*Math.cos(v)
r=Math.cos(t)
v=Math.sin(v)
t=Math.sin(t)
q=y.d.a
q[12]=s*r
q[13]=u*v
q[14]=s*t
t=y.k2
v=t.a
q[12]=q[12]+v[0]
q[13]=q[13]+v[1]
q[14]=q[14]+v[2]
y.aH(t)
t=y.f
v=t.a
v[0]=q[2]
v[1]=q[6]
v[2]=q[10]
y=-y.k1
p=Math.sqrt(t.gbY())
o=v[0]/p
n=v[1]/p
m=v[2]/p
l=Math.cos(y)
k=Math.sin(y)
j=1-l
i=o*o*j+l
y=m*k
h=o*n*j-y
v=n*k
g=o*m*j+v
f=n*o*j+y
e=n*n*j+l
y=o*k
d=n*m*j-y
c=m*o*j-v
b=m*n*j+y
a=m*m*j+l
y=q[0]
v=q[4]
t=q[8]
u=q[1]
r=q[5]
a0=q[9]
a1=q[2]
a2=q[6]
a3=q[10]
a4=q[3]
a5=q[7]
a6=q[11]
q[0]=y*i+v*f+t*c
q[1]=u*i+r*f+a0*c
q[2]=a1*i+a2*f+a3*c
q[3]=a4*i+a5*f+a6*c
q[4]=y*h+v*e+t*b
q[5]=u*h+r*e+a0*b
q[6]=a1*h+a2*e+a3*b
q[7]=a4*h+a5*e+a6*b
q[8]=y*g+v*d+t*a
q[9]=u*g+r*d+a0*a
q[10]=a1*g+a2*d+a3*a
q[11]=a4*g+a5*d+a6*a
w.c.V(0)
w.b.V(0)
x.e=0
x.d=0
x.f=0
x.c.V(0)
x.b.V(0)
this.c.cT(H.f([],[G.bu]))
C.ag.gdM(window).aK(this,-1)
this.d.d2(z.d)
x=a8/1000
this.e.d.i(0,"uTime",C.b.aW(C.n.e9(x/0.0333),z.c.length))
z=z.a
w=z.c
a6=z.a
a5=z.d
a4=z.e
q=a5.c
if(typeof q!=="number")return H.a9(q)
L.cH(w,a6,a5,a4,C.n.aW(x,q))
a7=R.de(w,z.e,1)
z.b.b5(G.bX(a7,null))}},
lC:{"^":"o:31;a,b,c,d,e,f,r,x",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
H.N(a)
z=new T.I(new Float32Array(16))
z.G()
y=J.L(a)
x=Y.hL(H.h(y.h(a,0),"$isF"))
w=Y.hM(H.h(y.h(a,0),"$isF"))
v=Y.hK(H.h(y.h(a,0),"$isF"),w)
y=this.b
u=y.d
if(0>=x.length)return H.j(x,0)
t=x[0]
s=G.dP("../asset/knight/knight.js",u.d,4,u.e.x)
s.b3(G.bX(t.d,null))
s.b2(t.cV())
G.k_(t,s)
u=this.c
t=[A.bc]
r=H.f([],t)
q=new Float32Array(9)
p=new T.I(new Float32Array(16))
p.G()
o=new T.I(new Float32Array(16))
o.G()
n=new Float32Array(3)
m=new Float32Array(3)
l=new Float32Array(3)
k=new Float32Array(3)
o.c6(-0.785)
j=A.dR("wrapper",new A.bc(u,s,r,new T.ba(q),p,o,new T.r(n),new T.r(m),new T.r(l),new T.r(k),s.a,!1,!0))
r=new T.r(new Float32Array(3))
r.S(100,0,0)
j.aH(r)
C.a.k(this.d.f,j)
C.a.k(y.f,j)
y=this.a
y.c=H.f([],[P.R])
r=v.c
if(typeof r!=="number")return H.a9(r)
i=0
for(;i<r;i+=0.0333){q=y.c;(q&&C.a).k(q,i)}h=L.he(w,z,v,y.c)
r=this.e
q=w.length
p=q*4
o=y.c.length
n=$.eT()
m=J.fo(r.a)
g=new G.je(p,o,34836,"anim",m,3553,r,n)
J.bO(r.a,3553,m)
J.fM(r.a,3553,0,34836,p,o,0,6408,5126,h)
p=n.e
if(p!==1)J.fN(r.a,3553,34046,p)
p=n.r
J.bS(r.a,3553,10240,p)
p=n.f
J.bS(r.a,3553,10241,p)
if(n.b){J.bS(r.a,3553,10242,33071)
J.bS(r.a,3553,10243,33071)}n.c
J.fH(r.a)
J.bO(r.a,3553,null)
y.b=g
u.d.i(0,"uAnimationTable",g)
u=this.f
r=new T.I(new Float32Array(16))
r.G()
f=new R.h3(r,w,v)
q=L.d9(q)
f.e=q
L.cH(w,r,v,q,0)
q=G.i0("wire",u.d,R.de(w,q,1))
f.b=q
t=H.f([],t)
r=new Float32Array(9)
p=new T.I(new Float32Array(16))
p.G()
o=new T.I(new Float32Array(16))
o.G()
n=new Float32Array(3)
m=new Float32Array(3)
l=new Float32Array(3)
t=new A.bc(this.r,q,t,new T.ba(r),p,o,new T.r(n),new T.r(m),new T.r(l),new T.r(new Float32Array(3)),q.a,!1,!0)
f.f=t
y.a=f
o.c6(0.785)
j=A.dR("wrapper",t)
y=new T.r(new Float32Array(3))
y.S(100,0,0)
j.aH(y)
C.a.k(u.f,j)
this.x.$1(0)}}},1]]
setupProgram(dart,0,0)
J.C=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dG.prototype
return J.dF.prototype}if(typeof a=="string")return J.bz.prototype
if(a==null)return J.hT.prototype
if(typeof a=="boolean")return J.hS.prototype
if(a.constructor==Array)return J.bx.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
return a}if(a instanceof P.b)return a
return J.cc(a)}
J.L=function(a){if(typeof a=="string")return J.bz.prototype
if(a==null)return a
if(a.constructor==Array)return J.bx.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
return a}if(a instanceof P.b)return a
return J.cc(a)}
J.bJ=function(a){if(a==null)return a
if(a.constructor==Array)return J.bx.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
return a}if(a instanceof P.b)return a
return J.cc(a)}
J.eE=function(a){if(typeof a=="number")return J.by.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bk.prototype
return a}
J.ll=function(a){if(typeof a=="number")return J.by.prototype
if(typeof a=="string")return J.bz.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bk.prototype
return a}
J.eF=function(a){if(typeof a=="string")return J.bz.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.bk.prototype
return a}
J.l=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
return a}if(a instanceof P.b)return a
return J.cc(a)}
J.cb=function(a){if(a==null)return a
if(!(a instanceof P.b))return J.bk.prototype
return a}
J.aR=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.C(a).F(a,b)}
J.ag=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.eE(a).Y(a,b)}
J.ao=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.ly(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.L(a).h(a,b)}
J.fa=function(a,b,c){return J.bJ(a).i(a,b,c)}
J.cY=function(a,b){return J.eF(a).ar(a,b)}
J.fb=function(a,b){return J.l(a).dk(a,b)}
J.fc=function(a,b,c,d){return J.l(a).dl(a,b,c,d)}
J.bN=function(a,b){return J.l(a).dv(a,b)}
J.fd=function(a,b,c){return J.l(a).dw(a,b,c)}
J.cZ=function(a,b){return J.l(a).bx(a,b)}
J.fe=function(a,b,c,d){return J.l(a).by(a,b,c,d)}
J.d_=function(a,b,c){return J.l(a).bA(a,b,c)}
J.ff=function(a,b){return J.l(a).dO(a,b)}
J.cf=function(a,b,c){return J.l(a).bB(a,b,c)}
J.fg=function(a,b,c){return J.l(a).bD(a,b,c)}
J.bO=function(a,b,c){return J.l(a).bE(a,b,c)}
J.bP=function(a,b){return J.l(a).dR(a,b)}
J.fh=function(a,b){return J.l(a).bF(a,b)}
J.fi=function(a,b,c){return J.l(a).bG(a,b,c)}
J.d0=function(a,b,c,d){return J.l(a).bH(a,b,c,d)}
J.fj=function(a,b){return J.bJ(a).bI(a,b)}
J.fk=function(a,b,c,d,e){return J.l(a).bJ(a,b,c,d,e)}
J.fl=function(a,b){return J.ll(a).N(a,b)}
J.fm=function(a,b){return J.L(a).u(a,b)}
J.cg=function(a,b,c){return J.L(a).dW(a,b,c)}
J.ch=function(a){return J.l(a).bL(a)}
J.fn=function(a){return J.l(a).bM(a)}
J.fo=function(a){return J.l(a).bO(a)}
J.fp=function(a){return J.l(a).e0(a)}
J.fq=function(a,b){return J.l(a).bQ(a,b)}
J.ci=function(a,b){return J.l(a).bR(a,b)}
J.fr=function(a,b){return J.l(a).e5(a,b)}
J.fs=function(a,b,c,d){return J.l(a).bS(a,b,c,d)}
J.ft=function(a,b,c,d,e){return J.l(a).e6(a,b,c,d,e)}
J.fu=function(a,b,c,d,e){return J.l(a).bT(a,b,c,d,e)}
J.fv=function(a,b,c,d,e,f){return J.l(a).e7(a,b,c,d,e,f)}
J.fw=function(a,b){return J.bJ(a).q(a,b)}
J.bQ=function(a,b){return J.l(a).bU(a,b)}
J.fx=function(a,b){return J.l(a).bV(a,b)}
J.fy=function(a){return J.l(a).e8(a)}
J.fz=function(a,b){return J.l(a).D(a,b)}
J.fA=function(a){return J.l(a).gdN(a)}
J.av=function(a){return J.C(a).gv(a)}
J.br=function(a){return J.bJ(a).gw(a)}
J.ap=function(a){return J.L(a).gj(a)}
J.fB=function(a){return J.l(a).gc0(a)}
J.fC=function(a){return J.l(a).gej(a)}
J.fD=function(a){return J.l(a).ger(a)}
J.fE=function(a){return J.l(a).gc8(a)}
J.fF=function(a){return J.cb(a).gcr(a)}
J.bR=function(a){return J.cb(a).ga1(a)}
J.cj=function(a){return J.cb(a).gX(a)}
J.d1=function(a){return J.cb(a).gaj(a)}
J.ck=function(a,b){return J.l(a).a2(a,b)}
J.fG=function(a){return J.l(a).ak(a)}
J.fH=function(a){return J.l(a).aP(a)}
J.fI=function(a,b){return J.l(a).aQ(a,b)}
J.fJ=function(a,b,c){return J.l(a).aR(a,b,c)}
J.d2=function(a,b,c){return J.l(a).aV(a,b,c)}
J.fK=function(a,b){return J.l(a).bZ(a,b)}
J.d3=function(a){return J.l(a).el(a)}
J.fL=function(a,b,c,d){return J.l(a).b_(a,b,c,d)}
J.fM=function(a,b,c,d,e,f,g,h,i,j){return J.l(a).c9(a,b,c,d,e,f,g,h,i,j)}
J.fN=function(a,b,c,d){return J.l(a).ca(a,b,c,d)}
J.bS=function(a,b,c,d){return J.l(a).cb(a,b,c,d)}
J.X=function(a){return J.eE(a).es(a)}
J.fO=function(a){return J.eF(a).eu(a)}
J.bs=function(a){return J.C(a).l(a)}
J.fP=function(a,b,c,d){return J.l(a).ew(a,b,c,d)}
J.fQ=function(a,b,c){return J.l(a).cd(a,b,c)}
J.fR=function(a,b,c){return J.l(a).ce(a,b,c)}
J.cl=function(a,b,c){return J.l(a).cf(a,b,c)}
J.fS=function(a,b,c){return J.l(a).cg(a,b,c)}
J.d4=function(a,b,c){return J.l(a).ci(a,b,c)}
J.d5=function(a,b,c){return J.l(a).cj(a,b,c)}
J.d6=function(a,b,c){return J.l(a).ck(a,b,c)}
J.d7=function(a,b,c,d){return J.l(a).cl(a,b,c,d)}
J.d8=function(a,b,c,d){return J.l(a).cm(a,b,c,d)}
J.fT=function(a,b){return J.l(a).cn(a,b)}
J.fU=function(a,b,c){return J.l(a).ex(a,b,c)}
J.fV=function(a,b,c,d,e,f,g){return J.l(a).co(a,b,c,d,e,f,g)}
J.fW=function(a,b,c,d,e){return J.l(a).cq(a,b,c,d,e)}
I.aP=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.r=W.bT.prototype
C.J=W.cp.prototype
C.y=W.hg.prototype
C.t=W.hn.prototype
C.K=W.ho.prototype
C.L=W.hG.prototype
C.j=W.hH.prototype
C.z=W.hI.prototype
C.M=J.k.prototype
C.a=J.bx.prototype
C.n=J.dF.prototype
C.b=J.dG.prototype
C.o=J.by.prototype
C.h=J.bz.prototype
C.T=J.bA.prototype
C.i=H.im.prototype
C.p=H.ip.prototype
C.w=W.iq.prototype
C.C=J.iy.prototype
C.D=W.iI.prototype
C.I=W.j8.prototype
C.x=J.bk.prototype
C.af=W.aT.prototype
C.ag=W.jl.prototype
C.e=new P.kn()
C.N=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.O=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.A=function(hooks) { return hooks; }

C.P=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.Q=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.R=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.S=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.B=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.U=new P.hV(null,null)
C.V=new P.hW(null)
C.W=H.f(I.aP(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.e])
C.X=H.f(I.aP(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"]),[P.e])
C.Z=H.f(I.aP([]),[P.A])
C.Y=H.f(I.aP([]),[P.e])
C.u=H.f(I.aP(["bind","if","ref","repeat","syntax"]),[P.e])
C.v=H.f(I.aP(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.e])
C.a_=new G.H("vec3","vertex btangents",0)
C.d=new G.H("vec3","",0)
C.a0=new G.H("vec4","delta from light",0)
C.q=new G.H("","",0)
C.E=new G.H("vec3","vertex coordinates",0)
C.a1=new G.H("vec3","vertex binormals",0)
C.F=new G.H("vec4","for wireframe",0)
C.a2=new G.H("vec4","per vertex color",0)
C.a3=new G.H("float","for normal maps",0)
C.k=new G.H("mat4","",0)
C.a5=new G.H("mat4","",4)
C.a4=new G.H("mat4","",128)
C.c=new G.H("float","",0)
C.a6=new G.H("float","",4)
C.a7=new G.H("float","depth for shadowmaps",0)
C.f=new G.H("sampler2D","",0)
C.a8=new G.H("float","for bump maps",0)
C.a9=new G.H("vec2","texture uvs",0)
C.aa=new G.H("float","time since program start in sec",0)
C.l=new G.H("vec2","",0)
C.ab=new G.H("samplerCube","",0)
C.m=new G.H("vec4","",0)
C.ac=new G.H("vec3","vertex normals",0)
C.ad=new G.H("sampler2DShadow","",0)
C.G=new G.H("vec3","per vertex color",0)
C.H=new G.H("mat3","",0)
C.ae=new G.H("vec3","vertex tangents",0)
$.ah=0
$.b2=null
$.df=null
$.cK=!1
$.eH=null
$.ez=null
$.eN=null
$.c9=null
$.cd=null
$.cR=null
$.aW=null
$.bm=null
$.bn=null
$.cL=!1
$.G=C.e
$.aq=null
$.cs=null
$.dw=null
$.dv=null
$.dr=null
$.dq=null
$.dp=null
$.dn=null
$.eD=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){var z=$dart_deferred_initializers$[a]
if(z==null)throw"DeferredLoading state error: code with hash '"+a+"' was not loaded"
z($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryParts={}
init.deferredPartUris=[]
init.deferredPartHashes=[];(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["lW","eR",function(){return H.eG("_$dart_dartClosure")},"mx","cV",function(){return H.eG("_$dart_js")},"nj","eU",function(){return H.aj(H.c1({
toString:function(){return"$receiver$"}}))},"nk","eV",function(){return H.aj(H.c1({$method$:null,
toString:function(){return"$receiver$"}}))},"nl","eW",function(){return H.aj(H.c1(null))},"nm","eX",function(){return H.aj(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"np","f_",function(){return H.aj(H.c1(void 0))},"nq","f0",function(){return H.aj(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"no","eZ",function(){return H.aj(H.e3(null))},"nn","eY",function(){return H.aj(function(){try{null.$method$}catch(z){return z.message}}())},"ns","f2",function(){return H.aj(H.e3(void 0))},"nr","f1",function(){return H.aj(function(){try{(void 0).$method$}catch(z){return z.message}}())},"nD","cW",function(){return P.jr()},"nT","bq",function(){return[]},"lT","eQ",function(){return{}},"nK","f3",function(){return P.cz(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],P.e)},"nL","cX",function(){return P.ab(P.e,P.bv)},"n5","eS",function(){return new G.e2(1281,0,4294967295)},"lP","eP",function(){return new G.e1(1281,1281,1281)},"nR","af",function(){return P.cy(["cBlendEquation",C.q,"cDepthWrite",C.q,"cDepthTest",C.q,"cStencilFunc",C.q,"tPosition",C.d,"tSpeed",C.d,"tForce",C.d,"aColor",C.G,"aColorAlpha",C.a2,"aPosition",C.E,"aTexUV",C.a9,"aNormal",C.ac,"aBinormal",C.a1,"aCenter",C.F,"aPointSize",C.c,"aBoneIndex",C.m,"aBoneWeight",C.m,"aTangent",C.ae,"aBitangent",C.a_,"iaRotation",C.m,"iaTranslation",C.d,"iaScale",C.c,"iaColor",C.d,"vColor",C.G,"vTexUV",C.l,"vLightWeighting",C.d,"vNormal",C.d,"vPosition",C.E,"vPositionFromLight",C.a0,"vCenter",C.F,"vDepth",C.a7,"uTransformationMatrix",C.k,"uModelMatrix",C.k,"uNormalMatrix",C.H,"uConvolutionMatrix",C.H,"uPerspectiveViewMatrix",C.k,"uLightPerspectiveViewMatrix",C.k,"uShadowMap",C.ad,"uTexture",C.f,"uTexture2",C.f,"uTexture3",C.f,"uTexture4",C.f,"uSpecularMap",C.f,"uNormalMap",C.f,"uBumpMap",C.f,"uDepthMap",C.f,"uCubeTexture",C.ab,"uAnimationTable",C.f,"uTime",C.aa,"uCameraNear",C.c,"uCameraFar",C.c,"uFogNear",C.c,"uFogFar",C.c,"uPointSize",C.c,"uScale",C.c,"uAngle",C.c,"uCanvasSize",C.l,"uCenter2",C.l,"uCutOff",C.c,"uShininess",C.c,"uShadowBias",C.c,"uOpacity",C.c,"uColor",C.d,"uAmbientDiffuse",C.d,"uColorEmissive",C.d,"uColorSpecular",C.d,"uColorDiffuse",C.d,"uColorAlpha",C.m,"uColorAlpha2",C.m,"uEyePosition",C.d,"uMaterial",C.k,"uRange",C.l,"uDirection",C.l,"uBoneMatrices",C.a4,"uLightDescs",C.a5,"uLightCount",C.c,"uLightTypes",C.a6,"uBumpScale",C.a8,"uNormalScale",C.a3],P.e,G.H)},"ne","eT",function(){var z=new G.ja(!1,!1,!1,!0,1,9729,9729)
z.d=!1
z.b=!0
z.f=9728
z.r=9728
return z},"o1","f9",function(){var z,y
z=G.bh("SolidColor")
y=[P.e]
z.an(H.f(["aPosition"],y))
z.a9(H.f(["uPerspectiveViewMatrix","uModelMatrix"],y))
z.ao(H.f(["gl_Position = uPerspectiveViewMatrix * uModelMatrix * vec4(aPosition, 1.0);"],y))
return z},"o0","f8",function(){var z,y
z=G.bh("SolidColorF")
y=[P.e]
z.a9(H.f(["uColor"],y))
z.ao(H.f(["oFragColor = vec4( uColor, 1.0 );"],y))
return z},"nZ","f7",function(){var z,y
z=G.bh("FixedVertexColorV")
y=[P.e]
z.an(H.f(["aPosition"],y))
z.a9(H.f(["uPerspectiveViewMatrix","uModelMatrix"],y))
z.aa(H.f(["vColor"],y))
z.ba(H.f(["gl_Position = uPerspectiveViewMatrix * uModelMatrix * vec4(aPosition, 1.0);","vColor = ColorFromPosition(aPosition);"],y),H.f(["// ============================================================\n// MISC\n// ============================================================\n\nvec3 ColorFromPosition(vec3 pos) {\n    return vec3( sin(pos.x) / 2.0 + 0.5,\n                 cos(pos.y) / 2.0 + 0.5,\n                 sin(pos.z) / 2.0 + 0.5);\n}\n\nvec3 RangeToGray(float f, float a, float b) {\n    if (f > a) return vec3(1.0);\n    if (f < b) return vec3(0.0);\n    return vec3 ((f - b) / (a-b));\n}\n\nfloat useValueButReturnZero(float x) {\n    return (x + 1.0) * (x + 1.0) - x * x - 2.0 * x - 1.0;\n}\n\n// ============================================================\n// LIGHT\n// ============================================================\n\nfloat GetDiffuse(vec3 lightDir, vec3 normal) {\n    return max(dot(normal, lightDir), 0.0);\n}\n\nfloat GetSpecular(vec3 lightDir, vec3 viewDir, vec3 normal, float glossiness) {\n    vec3 angleW = normalize(viewDir + lightDir);\n    float specComp = max(0., dot(normal, angleW));\n    return pow(specComp, max(1.0, glossiness));\n}\n\nstruct ColorComponents {\n   vec3 diffuse;\n   vec3 specular;\n};\n\n// ============================================================\n// Spot Light\n// ============================================================\n\nstruct SpotLightInfo {\n    vec3 pos;      // for spot and point\n    vec3 dir;      // for spot and dir light\n    vec3 diffuseColor;\n    vec3 specularColor;\n    float range;        // for spot and point\n    float spotCutoff;   // for spot\n    float spotFocus;    // for spot\n    // float glossiness;   // Oddball: this comes from the material\n};\n\nSpotLightInfo UnpackSpotLightInfo(mat4 m) {\n    SpotLightInfo info;\n    info.pos = m[0].xyz;\n    info.dir = normalize(m[1].xyz);\n    info.diffuseColor = m[2].xyz;\n    info.specularColor = m[3].xyz;\n    // info.glossiness = m[0].a;\n    info.range = m[1].a;\n    info.spotCutoff = m[2].a;\n    info.spotFocus = m[3].a;\n    return info;\n}\n\nColorComponents SpotLightGetDiffuseAndSpecular(SpotLightInfo light,\n                                               vec3 vertexPos,\n                                               vec3 vertexNormal,\n                                               vec3 eyePos,\n                                               float uShininess) {\n    vec3 toSpot = light.pos - vertexPos;\n    vec3 spotDir = normalize(toSpot);\n    vec3 lightDirNorm = -normalize(light.dir);\n    float cosAngle = max(0., dot(lightDirNorm, spotDir));\n\t  if (cosAngle < light.spotCutoff) {\n        return ColorComponents(vec3(0.0), vec3(0.0));\n    }\n\n    cosAngle = max(0.0, pow(cosAngle, light.spotFocus));\n\t  float attenuation = max(0.0, 1.0 - length(toSpot) / light.range) * cosAngle;\n\t  vec3 viewDirNorm = normalize(eyePos - vertexPos);\n\t  return ColorComponents(\n\t           attenuation *\n             GetDiffuse(lightDirNorm, vertexNormal) *\n             light.diffuseColor,\n             attenuation *\n             GetSpecular(lightDirNorm, viewDirNorm, vertexNormal, uShininess) *\n             light.specularColor);\n}\n\n// ============================================================\n// Point Light\n// ============================================================\n\nstruct PointLightInfo {\n    vec3 pos;\n    vec3 diffuseColor;\n    vec3 specularColor;\n    float range;\n    // float glossiness;\n};\n\nPointLightInfo UnpackPointLightInfo(mat4 m) {\n    PointLightInfo info;\n    info.pos = m[0].xyz;\n    info.diffuseColor = m[2].xyz;\n    info.specularColor = m[3].xyz;\n    info.range = m[1].a;\n    // info.glossiness = m[0].a;\n    return info;\n}\n\nColorComponents PointLightGetDiffuseAndSpecular(PointLightInfo info,\n                                     vec3 vertexPos,\n                                     vec3 vertexNormal,\n                                     vec3 eyePos,\n                                     float uShininess) {\n    vec3 lightDir = info.pos - vertexPos;\n    float attenuation = max(0.0, 1.0 - length(lightDir) / info.range);\n    vec3 lightDirNorm = normalize(lightDir);\n    vec3 viewDirNorm = normalize(eyePos - vertexPos);\n    return ColorComponents(\n              attenuation *\n              GetDiffuse(lightDirNorm, vertexNormal) *\n              info.diffuseColor,\n               attenuation *\n               GetSpecular(lightDirNorm, viewDirNorm, vertexNormal, uShininess) *\n               info.specularColor);\n}\n\n// ============================================================\n// Directional Light\n// ============================================================\n\nstruct DirectionalLightInfo {\n    vec3 dir;      // for spot and dir light\n    vec3 diffuseColor;\n    vec3 specularColor;\n    // float glossiness;   // Oddball: this comes from the material\n};\n\nDirectionalLightInfo UnpackDirectionalLightInfo(mat4 m) {\n    DirectionalLightInfo info;\n    info.dir = normalize(m[1].xyz);\n    info.diffuseColor = m[2].xyz;\n    info.specularColor = m[3].xyz;\n    // info.glossiness = m[0].a;\n    return info;\n}\n\nColorComponents DirectionalLightGetDiffuseAndSpecular(DirectionalLightInfo info,\n                                                      vec3 vertexPos,\n                                                      vec3 vertexNormal,\n                                                      vec3 eyePos,\n                                                      float uShininess) {\n    vec3 viewDirNorm = normalize(eyePos - vertexPos);\n    return ColorComponents(\n              GetDiffuse(-info.dir, vertexNormal) *\n              info.diffuseColor,\n              GetSpecular(-info.dir, viewDirNorm, vertexNormal, uShininess) *\n              info.specularColor);\n}\n\n\nColorComponents CombinedLightSpot(\n    vec3 vVertexPosition, vec3 vNormal, vec3 uEyePosition, mat4 lightDesc,\n    float shininess) {\n    SpotLightInfo info = UnpackSpotLightInfo(lightDesc);\n    return SpotLightGetDiffuseAndSpecular(\n        info, vVertexPosition, vNormal, uEyePosition, shininess);\n}\n\nColorComponents CombinedLightPoint(\n    vec3 vVertexPosition, vec3 vNormal, vec3 uEyePosition, mat4 lightDesc,\n    float shininess) {\n    PointLightInfo info = UnpackPointLightInfo(lightDesc);\n    return PointLightGetDiffuseAndSpecular(\n        info, vVertexPosition, vNormal, uEyePosition, shininess);\n}\n\nColorComponents CombinedLightDirectional(\n    vec3 vVertexPosition, vec3 vNormal, vec3 uEyePosition, mat4 lightDesc,\n    float shininess) {\n    DirectionalLightInfo info = UnpackDirectionalLightInfo(lightDesc);\n    return DirectionalLightGetDiffuseAndSpecular(\n        info, vVertexPosition, vNormal, uEyePosition, shininess);\n}\n\n// ============================================================\n// Combined Light\n// ============================================================\nColorComponents CombinedLight(vec3 vVertexPosition,\n                   vec3 vNormal,\n                   vec3 uEyePosition,\n                   const mat4 uLightDescs[4],\n                   const float uLightTypes[4],\n                   float uShininess) {\n    ColorComponents acc = ColorComponents(vec3(0.0), vec3(0.0));\n\n    for (int i = 0; i < 4; ++i) {\n        ColorComponents curr;\n        float type = uLightTypes[i];\n        if (type == 2.0) {\n            curr = CombinedLightSpot(\n                       vVertexPosition, vNormal, uEyePosition, uLightDescs[i], \n                       uShininess);\n        } else if (type == 3.0) {\n            curr = CombinedLightPoint(\n                       vVertexPosition, vNormal, uEyePosition, uLightDescs[i], \n                       uShininess);\n        } else if (type == 1.0) {\n            curr = CombinedLightDirectional(\n                       vVertexPosition, vNormal, uEyePosition, uLightDescs[i], \n                       uShininess);\n        } else {\n            continue;\n        }\n        acc.diffuse = acc.diffuse + curr.diffuse;\n        acc.specular = acc.specular + curr.specular;\n    }\n    return acc;\n}\n"],y))
return z},"nY","f6",function(){var z,y
z=G.bh("FixedVertexColorF")
y=[P.e]
z.aa(H.f(["vColor"],y))
z.ao(H.f(["oFragColor = vec4( vColor, 1.0 );"],y))
return z},"nV","f5",function(){var z,y
z=G.bh("AnimationV")
y=[P.e]
z.an(H.f(["aPosition","aBoneIndex","aBoneWeight"],y))
z.aa(H.f(["vColor"],y))
z.a9(H.f(["uPerspectiveViewMatrix","uModelMatrix","uAnimationTable","uTime"],y))
z.b9(H.f(["mat4 GetBoneMatrix(sampler2D table, int index, int time) {\n    vec4 v1 = texelFetch(table, ivec2(index * 4 + 0, time), 0);\n    vec4 v2 = texelFetch(table, ivec2(index * 4 + 1, time), 0);\n    vec4 v3 = texelFetch(table, ivec2(index * 4 + 2, time), 0);\n    vec4 v4 = texelFetch(table, ivec2(index * 4 + 3, time), 0);\n    return mat4(v1, v2, v3, v4);\n    //return uBoneMatrices[index];\n}\n\nmat4 adjustMatrix(sampler2D table, vec4 weights, ivec4 indices, int time) {\n    return weights.x * GetBoneMatrix(table, indices.x, time) +\n           weights.y * GetBoneMatrix(table, indices.y, time) +\n           weights.z * GetBoneMatrix(table, indices.z, time) +\n           weights.w * GetBoneMatrix(table, indices.w, time);\n}\n\nvoid main() {\n   mat4 skinMat = uModelMatrix * adjustMatrix(uAnimationTable,\n                                              aBoneWeight,\n                                              ivec4(aBoneIndex),\n                                              int(uTime));\n   vec4 pos = skinMat * vec4(aPosition, 1.0);\n   // vPosition = pos.xyz;\n   // This is not quite accurate\n   //vNormal = normalize(mat3(skinMat) * aNormal);\n   gl_Position = uPerspectiveViewMatrix * pos;\n\n\n   vColor = vec3( sin(aPosition.x)/2.0+0.5,\n                      cos(aPosition.y)/2.0+0.5,\n                      sin(aPosition.z)/2.0+0.5);\n   //vTexUV = aTexUV;\n}\n\n"],y))
return z},"nU","f4",function(){var z,y
z=G.bh("AnimationV")
y=[P.e]
z.aa(H.f(["vColor"],y))
z.b9(H.f(["void main() {\n  oFragColor.rgb = vColor;\n}\n"],y))
return z}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,ret:P.A},{func:1,ret:-1},{func:1,ret:-1,args:[P.e,,]},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,ret:P.A,args:[W.a0]},{func:1,ret:P.Z,args:[W.ai]},{func:1,ret:P.A,args:[,,]},{func:1,ret:P.e,args:[P.D]},{func:1,args:[,]},{func:1,ret:P.A,args:[,]},{func:1,ret:-1,args:[,]},{func:1,ret:P.Z,args:[P.e]},{func:1,ret:P.Z,args:[W.S,P.e,P.e,W.bG]},{func:1,ret:P.A,args:[W.b7]},{func:1,args:[P.e]},{func:1,ret:P.A,args:[,P.U]},{func:1,ret:P.A,args:[,],opt:[P.U]},{func:1,ret:[P.V,,],args:[,]},{func:1,ret:-1,args:[P.e,P.e]},{func:1,ret:P.A,args:[P.J]},{func:1,args:[W.Q]},{func:1,ret:P.e,args:[P.e]},{func:1,ret:-1,args:[W.w,W.w]},{func:1,args:[,,]},{func:1,ret:-1,args:[W.Q]},{func:1,ret:P.A,args:[W.bB]},{func:1,ret:P.A,args:[{func:1,ret:-1}]},{func:1,ret:P.A,args:[W.aT]},{func:1,ret:P.D,args:[P.D,P.b]},{func:1,ret:P.A,args:[W.Q]},{func:1,ret:-1,args:[P.J]},{func:1,ret:P.A,args:[[P.a,,]]},{func:1,ret:P.D,args:[,,]},{func:1,args:[,P.e]},{func:1,ret:P.Z,args:[W.w]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.lI(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.aP=a.aP
Isolate.bo=a.bo
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(B.eK,[])
else B.eK([])})})()
//# sourceMappingURL=animation2.dart.js.map
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
b6.$isc=b5
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
var d=supportsDirectProtoAccess&&b2!="c"
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
d.$callName=null}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(receiver) {"+"if (c === null) c = "+"H.cK"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, true, name);"+"return new c(this, funcs[0], receiver, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.cK"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, false, name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g=null
return a0?function(){if(g===null)g=H.cK(this,d,e,f,true,false,a1).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bj=function(){}
var dart=[["","",,H,{"^":"",mr:{"^":"c;a"}}],["","",,J,{"^":"",
cO:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
c9:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cN==null){H.ld()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(P.dW("Return interceptor for "+H.b(y(a,z))))}w=a.constructor
v=w==null?null:w[$.cS()]
if(v!=null)return v
v=H.li(a)
if(v!=null)return v
if(typeof a=="function")return C.S
y=Object.getPrototypeOf(a)
if(y==null)return C.B
if(y===Object.prototype)return C.B
if(typeof w=="function"){Object.defineProperty(w,$.cS(),{value:C.w,enumerable:false,writable:true,configurable:true})
return C.w}return C.w},
k:{"^":"c;",
F:function(a,b){return a===b},
gB:function(a){return H.b7(a)},
l:["cJ",function(a){return"Instance of '"+H.b8(a)+"'"}],
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationEffectTimingReadOnly|AnimationTimeline|AnimationWorkletGlobalScope|ArrayBuffer|AudioListener|AudioParam|AudioTrack|AudioWorkletGlobalScope|AudioWorkletProcessor|AuthenticatorAssertionResponse|AuthenticatorAttestationResponse|AuthenticatorResponse|BackgroundFetchFetch|BackgroundFetchManager|BackgroundFetchSettledFetch|BarProp|BarcodeDetector|Bluetooth|BluetoothCharacteristicProperties|BluetoothRemoteGATTDescriptor|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|BudgetService|BudgetState|CSS|CSSVariableReferenceValue|Cache|CacheStorage|CanvasGradient|CanvasPattern|Client|Clients|CookieStore|Coordinates|Credential|CredentialUserData|CredentialsContainer|Crypto|CryptoKey|CustomElementRegistry|DOMError|DOMFileSystem|DOMFileSystemSync|DOMMatrix|DOMMatrixReadOnly|DOMParser|DOMPoint|DOMPointReadOnly|DOMQuad|DOMStringMap|DataTransfer|DataTransferItem|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeprecationReport|DetectedBarcode|DetectedFace|DetectedText|DeviceAcceleration|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|DocumentOrShadowRoot|DocumentTimeline|EXTBlendMinMax|EXTColorBufferFloat|EXTColorBufferHalfFloat|EXTDisjointTimerQuery|EXTDisjointTimerQueryWebGL2|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|Entry|EntrySync|External|FaceDetector|FederatedCredential|FileEntry|FileEntrySync|FileReaderSync|FileWriterSync|FontFace|FontFaceSource|FormData|GamepadButton|GamepadPose|Geolocation|HTMLAllCollection|HTMLHyperlinkElementUtils|Headers|IDBCursor|IDBCursorWithValue|IDBFactory|IDBIndex|IDBKeyRange|IDBObjectStore|IDBObservation|IDBObserver|IDBObserverChanges|IdleDeadline|ImageBitmapRenderingContext|ImageCapture|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|InterventionReport|Iterator|KeyframeEffect|KeyframeEffectReadOnly|MediaCapabilities|MediaCapabilitiesInfo|MediaDeviceInfo|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaKeysPolicy|MediaMetadata|MediaSession|MediaSettingsRange|MemoryInfo|MessageChannel|Metadata|Mojo|MojoHandle|MojoWatcher|MutationObserver|MutationRecord|NFC|NavigationPreloadManager|Navigator|NavigatorAutomationInformation|NavigatorConcurrentHardware|NavigatorCookies|NavigatorUserMediaError|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|NoncedElement|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvasRenderingContext2D|OverconstrainedError|PagePopupController|PaintRenderingContext2D|PaintWorkletGlobalScope|PasswordCredential|Path2D|PaymentAddress|PaymentInstruments|PaymentManager|PaymentResponse|PerformanceEntry|PerformanceLongTaskTiming|PerformanceMark|PerformanceMeasure|PerformanceNavigation|PerformanceNavigationTiming|PerformanceObserver|PerformanceObserverEntryList|PerformancePaintTiming|PerformanceResourceTiming|PerformanceServerTiming|PerformanceTiming|PeriodicWave|Permissions|PhotoCapabilities|Position|PositionError|Presentation|PresentationReceiver|PublicKeyCredential|PushManager|PushMessageData|PushSubscription|PushSubscriptionOptions|RTCCertificate|RTCIceCandidate|RTCLegacyStatsReport|RTCRtpContributingSource|RTCRtpReceiver|RTCRtpSender|RTCSessionDescription|RTCStatsResponse|RelatedApplication|Report|ReportBody|ReportingObserver|Request|ResizeObserver|ResizeObserverEntry|Response|SQLError|SQLResultSet|SQLTransaction|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGMatrix|SVGPoint|SVGPreserveAspectRatio|SVGUnitTypes|ScrollState|ScrollTimeline|Selection|SharedArrayBuffer|SpeechRecognitionAlternative|SpeechSynthesisVoice|StaticRange|StorageManager|StyleMedia|StylePropertyMap|StylePropertyMapReadonly|SubtleCrypto|SyncManager|TaskAttributionTiming|TextDetector|TrackDefault|TreeWalker|TrustedHTML|TrustedScriptURL|TrustedURL|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRCoordinateSystem|VRDisplayCapabilities|VREyeParameters|VRFrameData|VRFrameOfReference|VRPose|VRStageBounds|VRStageBoundsPoint|VRStageParameters|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGL|WebGL2RenderingContextBase|WebGLActiveInfo|WebGLCanvas|WebGLColorBufferFloat|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLCompressedTextureS3TCsRGB|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLGetBufferSubDataAsync|WebGLLoseContext|WebGLQuery|WebGLRenderbuffer|WebGLSampler|WebGLShaderPrecisionFormat|WebGLSync|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLVertexArrayObjectOES|WebKitMutationObserver|WindowClient|WorkerLocation|WorkerNavigator|Worklet|WorkletAnimation|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate|mozRTCSessionDescription"},
hO:{"^":"k;",
l:function(a){return String(a)},
gB:function(a){return a?519018:218159},
$isV:1},
hP:{"^":"k;",
F:function(a,b){return null==b},
l:function(a){return"null"},
gB:function(a){return 0},
$isG:1},
ct:{"^":"k;",
gB:function(a){return 0},
l:["cL",function(a){return String(a)}]},
is:{"^":"ct;"},
bc:{"^":"ct;"},
bz:{"^":"ct;",
l:function(a){var z=a[$.eP()]
if(z==null)return this.cL(a)
return"JavaScript function for "+H.b(J.bq(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$isbu:1},
bw:{"^":"k;$ti",
j:function(a,b){H.A(b,H.o(a,0))
if(!!a.fixed$length)H.ai(P.B("add"))
a.push(b)},
H:function(a,b){var z,y
H.t(b,"$ism",[H.o(a,0)],"$asm")
if(!!a.fixed$length)H.ai(P.B("addAll"))
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.E)(b),++y)a.push(b[y])},
ab:function(a,b){var z,y
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)this.h(z,y,H.b(a[y]))
return z.join(b)},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
ge3:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.d(H.dt())},
bz:function(a,b){var z,y
H.n(b,{func:1,ret:P.V,args:[H.o(a,0)]})
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y]))return!0
if(a.length!==z)throw H.d(P.aI(a))}return!1},
cE:function(a,b){if(!!a.immutable$list)H.ai(P.B("sort"))
H.iT(a,J.kP(),H.o(a,0))},
aq:function(a){return this.cE(a,null)},
A:function(a,b){var z
for(z=0;z<a.length;++z)if(J.aG(a[z],b))return!0
return!1},
l:function(a){return P.cr(a,"[","]")},
gw:function(a){return new J.fY(a,a.length,0,[H.o(a,0)])},
gB:function(a){return H.b7(a)},
gk:function(a){return a.length},
i:function(a,b){if(b>=a.length||b<0)throw H.d(H.bi(a,b))
return a[b]},
h:function(a,b,c){H.A(c,H.o(a,0))
if(!!a.immutable$list)H.ai(P.B("indexed set"))
if(b>=a.length||b<0)throw H.d(H.bi(a,b))
a[b]=c},
$isw:1,
$asw:I.bj,
$ism:1,
$isa:1,
p:{
hN:function(a,b){return J.cs(H.h(a,[b]))},
cs:function(a){H.bI(a)
a.fixed$length=Array
return a},
mp:[function(a,b){return J.fm(H.eA(a,"$isZ"),H.eA(b,"$isZ"))},"$2","kP",8,0,30]}},
mq:{"^":"bw;$ti"},
fY:{"^":"c;a,b,c,0d,$ti",
sbg:function(a){this.d=H.A(a,H.o(this,0))},
gE:function(a){return this.d},
t:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(H.E(z))
x=this.c
if(x>=y){this.sbg(null)
return!1}this.sbg(z[x]);++this.c
return!0},
$isas:1},
bx:{"^":"k;",
O:function(a,b){var z
H.cP(b)
if(typeof b!=="number")throw H.d(H.aS(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gal(b)
if(this.gal(a)===z)return 0
if(this.gal(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gal:function(a){return a===0?1/a<0:a<0},
ce:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.d(P.B(""+a+".toInt()"))},
dL:function(a){var z,y
if(a>=0){if(a<=2147483647){z=a|0
return a===z?z:z+1}}else if(a>=-2147483648)return a|0
y=Math.ceil(a)
if(isFinite(y))return y
throw H.d(P.B(""+a+".ceil()"))},
dZ:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.d(P.B(""+a+".floor()"))},
aQ:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(P.B(""+a+".round()"))},
dM:function(a,b,c){if(this.O(b,c)>0)throw H.d(H.aS(b))
if(this.O(a,b)<0)return b
if(this.O(a,c)>0)return c
return a},
ec:function(a,b){var z
if(b>20)throw H.d(P.b9(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gal(a))return"-"+z
return z},
l:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gB:function(a){return a&0x1FFFFFFF},
cN:function(a,b){if((a|0)===a)if(b>=1||!1)return a/b|0
return this.bw(a,b)},
a_:function(a,b){return(a|0)===a?a/b|0:this.bw(a,b)},
bw:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.d(P.B("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
bu:function(a,b){var z
if(a>0)z=this.dz(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
dz:function(a,b){return b>31?0:a>>>b},
W:function(a,b){if(typeof b!=="number")throw H.d(H.aS(b))
return a>b},
$isZ:1,
$asZ:function(){return[P.H]},
$isal:1,
$isH:1},
dv:{"^":"bx;",$isx:1},
du:{"^":"bx;"},
by:{"^":"k;",
aA:function(a,b){if(b>=a.length)throw H.d(H.bi(a,b))
return a.charCodeAt(b)},
I:function(a,b){H.v(b)
if(typeof b!=="string")throw H.d(P.d9(b,null,null))
return a+b},
cG:function(a,b,c){var z
if(c>a.length)throw H.d(P.b9(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
cF:function(a,b){return this.cG(a,b,0)},
cI:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.d(P.bZ(b,null,null))
if(b>c)throw H.d(P.bZ(b,null,null))
if(c>a.length)throw H.d(P.bZ(c,null,null))
return a.substring(b,c)},
cH:function(a,b){return this.cI(a,b,null)},
eb:function(a){return a.toLowerCase()},
dN:function(a,b,c){if(c>a.length)throw H.d(P.b9(c,0,a.length,null,null))
return H.lr(a,b,c)},
O:function(a,b){var z
H.v(b)
if(typeof b!=="string")throw H.d(H.aS(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
l:function(a){return a},
gB:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gk:function(a){return a.length},
i:function(a,b){if(b>=a.length||!1)throw H.d(H.bi(a,b))
return a[b]},
$isw:1,
$asw:I.bj,
$isZ:1,
$asZ:function(){return[P.e]},
$isiq:1,
$ise:1}}],["","",,H,{"^":"",
dt:function(){return new P.cA("No element")},
hM:function(){return new P.cA("Too many elements")},
iT:function(a,b,c){H.t(a,"$isa",[c],"$asa")
H.n(b,{func:1,ret:P.x,args:[c,c]})
H.bB(a,0,J.aX(a)-1,b,c)},
bB:function(a,b,c,d,e){H.t(a,"$isa",[e],"$asa")
H.n(d,{func:1,ret:P.x,args:[e,e]})
if(c-b<=32)H.iS(a,b,c,d,e)
else H.iR(a,b,c,d,e)},
iS:function(a,b,c,d,e){var z,y,x,w,v
H.t(a,"$isa",[e],"$asa")
H.n(d,{func:1,ret:P.x,args:[e,e]})
for(z=b+1,y=J.bk(a);z<=c;++z){x=y.i(a,z)
w=z
while(!0){if(!(w>b&&J.a9(d.$2(y.i(a,w-1),x),0)))break
v=w-1
y.h(a,w,y.i(a,v))
w=v}y.h(a,w,x)}},
iR:function(a,b,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
H.t(a,"$isa",[a2],"$asa")
H.n(a1,{func:1,ret:P.x,args:[a2,a2]})
z=C.d.a_(a0-b+1,6)
y=b+z
x=a0-z
w=C.d.a_(b+a0,2)
v=w-z
u=w+z
t=J.bk(a)
s=t.i(a,y)
r=t.i(a,v)
q=t.i(a,w)
p=t.i(a,u)
o=t.i(a,x)
if(J.a9(a1.$2(s,r),0)){n=r
r=s
s=n}if(J.a9(a1.$2(p,o),0)){n=o
o=p
p=n}if(J.a9(a1.$2(s,q),0)){n=q
q=s
s=n}if(J.a9(a1.$2(r,q),0)){n=q
q=r
r=n}if(J.a9(a1.$2(s,p),0)){n=p
p=s
s=n}if(J.a9(a1.$2(q,p),0)){n=p
p=q
q=n}if(J.a9(a1.$2(r,o),0)){n=o
o=r
r=n}if(J.a9(a1.$2(r,q),0)){n=q
q=r
r=n}if(J.a9(a1.$2(p,o),0)){n=o
o=p
p=n}t.h(a,y,s)
t.h(a,w,q)
t.h(a,x,o)
t.h(a,v,t.i(a,b))
t.h(a,u,t.i(a,a0))
m=b+1
l=a0-1
if(J.aG(a1.$2(r,p),0)){for(k=m;k<=l;++k){j=t.i(a,k)
i=a1.$2(j,r)
if(i===0)continue
if(typeof i!=="number")return i.ad()
if(i<0){if(k!==m){t.h(a,k,t.i(a,m))
t.h(a,m,j)}++m}else for(;!0;){i=a1.$2(t.i(a,l),r)
if(typeof i!=="number")return i.W()
if(i>0){--l
continue}else{h=l-1
if(i<0){t.h(a,k,t.i(a,m))
g=m+1
t.h(a,m,t.i(a,l))
t.h(a,l,j)
l=h
m=g
break}else{t.h(a,k,t.i(a,l))
t.h(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.i(a,k)
e=a1.$2(j,r)
if(typeof e!=="number")return e.ad()
if(e<0){if(k!==m){t.h(a,k,t.i(a,m))
t.h(a,m,j)}++m}else{d=a1.$2(j,p)
if(typeof d!=="number")return d.W()
if(d>0)for(;!0;){i=a1.$2(t.i(a,l),p)
if(typeof i!=="number")return i.W()
if(i>0){--l
if(l<k)break
continue}else{i=a1.$2(t.i(a,l),r)
if(typeof i!=="number")return i.ad()
h=l-1
if(i<0){t.h(a,k,t.i(a,m))
g=m+1
t.h(a,m,t.i(a,l))
t.h(a,l,j)
m=g}else{t.h(a,k,t.i(a,l))
t.h(a,l,j)}l=h
break}}}}f=!1}c=m-1
t.h(a,b,t.i(a,c))
t.h(a,c,r)
c=l+1
t.h(a,a0,t.i(a,c))
t.h(a,c,p)
H.bB(a,b,m-2,a1,a2)
H.bB(a,l+2,a0,a1,a2)
if(f)return
if(m<y&&l>x){for(;J.aG(a1.$2(t.i(a,m),r),0);)++m
for(;J.aG(a1.$2(t.i(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.i(a,k)
if(a1.$2(j,r)===0){if(k!==m){t.h(a,k,t.i(a,m))
t.h(a,m,j)}++m}else if(a1.$2(j,p)===0)for(;!0;)if(a1.$2(t.i(a,l),p)===0){--l
if(l<k)break
continue}else{i=a1.$2(t.i(a,l),r)
if(typeof i!=="number")return i.ad()
h=l-1
if(i<0){t.h(a,k,t.i(a,m))
g=m+1
t.h(a,m,t.i(a,l))
t.h(a,l,j)
m=g}else{t.h(a,k,t.i(a,l))
t.h(a,l,j)}l=h
break}}H.bB(a,m,l,a1,a2)}else H.bB(a,m,l,a1,a2)},
dl:{"^":"m;"},
bW:{"^":"dl;$ti",
gw:function(a){return new H.dy(this,this.gk(this),0,[H.cM(this,"bW",0)])},
aT:function(a,b){return this.cK(0,H.n(b,{func:1,ret:P.V,args:[H.cM(this,"bW",0)]}))}},
dy:{"^":"c;a,b,c,0d,$ti",
sa6:function(a){this.d=H.A(a,H.o(this,0))},
gE:function(a){return this.d},
t:function(){var z,y,x,w
z=this.a
y=J.bk(z)
x=y.gk(z)
if(this.b!==x)throw H.d(P.aI(z))
w=this.c
if(w>=x){this.sa6(null)
return!1}this.sa6(y.u(z,w));++this.c
return!0},
$isas:1},
i1:{"^":"m;a,b,$ti",
gw:function(a){var z=this.a
return new H.cx(z.gw(z),this.b,this.$ti)},
gk:function(a){return this.a.a.a},
$asm:function(a,b){return[b]},
p:{
i2:function(a,b,c,d){H.t(a,"$ism",[c],"$asm")
H.n(b,{func:1,ret:d,args:[c]})
return new H.hq(a,b,[c,d])}}},
hq:{"^":"i1;a,b,$ti"},
cx:{"^":"as;0a,b,c,$ti",
sa6:function(a){this.a=H.A(a,H.o(this,1))},
t:function(){var z=this.b
if(z.t()){this.sa6(this.c.$1(z.d))
return!0}this.sa6(null)
return!1},
gE:function(a){return this.a},
$asas:function(a,b){return[b]}},
i3:{"^":"bW;a,b,$ti",
gk:function(a){return J.aX(this.a)},
u:function(a,b){return this.b.$1(J.fv(this.a,b))},
$asbW:function(a,b){return[b]},
$asm:function(a,b){return[b]}},
dX:{"^":"m;a,b,$ti",
gw:function(a){return new H.jf(J.bP(this.a),this.b,this.$ti)}},
jf:{"^":"as;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=this.b;z.t();)if(y.$1(z.gE(z)))return!0
return!1},
gE:function(a){var z=this.a
return z.gE(z)}},
bV:{"^":"c;$ti"}}],["","",,H,{"^":"",
aF:function(a){var z,y
z=H.v(init.mangledGlobalNames[a])
if(typeof z==="string")return z
y="minified:"+a
return y},
l5:function(a){return init.types[H.L(a)]},
lg:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.C(a).$isz},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.bq(a)
if(typeof z!=="string")throw H.d(H.aS(a))
return z},
b7:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
b8:function(a){return H.it(a)+H.c3(H.am(a),0,null)},
it:function(a){var z,y,x,w,v,u,t,s,r
z=J.C(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
v=w==null
if(v||z===C.L||!!z.$isbc){u=C.A(a)
if(v)w=u
if(u==="Object"){t=a.constructor
if(typeof t=="function"){s=String(t).match(/^\s*function\s*([\w$]*)\s*\(/)
r=s==null?null:s[1]
if(typeof r==="string"&&/^\w+$/.test(r))w=r}}return w}w=w
return H.aF(w.length>1&&C.j.aA(w,0)===36?C.j.cH(w,1):w)},
aL:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
iA:function(a){var z=H.aL(a).getFullYear()+0
return z},
iy:function(a){var z=H.aL(a).getMonth()+1
return z},
iu:function(a){var z=H.aL(a).getDate()+0
return z},
iv:function(a){var z=H.aL(a).getHours()+0
return z},
ix:function(a){var z=H.aL(a).getMinutes()+0
return z},
iz:function(a){var z=H.aL(a).getSeconds()+0
return z},
iw:function(a){var z=H.aL(a).getMilliseconds()+0
return z},
aE:function(a){throw H.d(H.aS(a))},
f:function(a,b){if(a==null)J.aX(a)
throw H.d(H.bi(a,b))},
bi:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aH(!0,b,"index",null)
z=H.L(J.aX(a))
if(!(b<0)){if(typeof z!=="number")return H.aE(z)
y=b>=z}else y=!0
if(y)return P.I(b,a,"index",null,z)
return P.bZ(b,"index",null)},
aS:function(a){return new P.aH(!0,a,null,null)},
eq:function(a){if(typeof a!=="number")throw H.d(H.aS(a))
return a},
d:function(a){var z
if(a==null)a=new P.dF()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eD})
z.name=""}else z.toString=H.eD
return z},
eD:function(){return J.bq(this.dartException)},
ai:function(a){throw H.d(a)},
E:function(a){throw H.d(P.aI(a))},
a7:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.lt(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.bu(x,16)&8191)===10)switch(w){case 438:return z.$1(H.cu(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.dE(H.b(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.eS()
u=$.eT()
t=$.eU()
s=$.eV()
r=$.eY()
q=$.eZ()
p=$.eX()
$.eW()
o=$.f0()
n=$.f_()
m=v.M(y)
if(m!=null)return z.$1(H.cu(H.v(y),m))
else{m=u.M(y)
if(m!=null){m.method="call"
return z.$1(H.cu(H.v(y),m))}else{m=t.M(y)
if(m==null){m=s.M(y)
if(m==null){m=r.M(y)
if(m==null){m=q.M(y)
if(m==null){m=p.M(y)
if(m==null){m=s.M(y)
if(m==null){m=o.M(y)
if(m==null){m=n.M(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.dE(H.v(y),m))}}return z.$1(new H.j9(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dN()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aH(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dN()
return a},
bl:function(a){var z
if(a==null)return new H.ec(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ec(a)},
l1:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.h(0,a[y],a[x])}return b},
lf:function(a,b,c,d,e,f){H.j(a,"$isbu")
switch(H.L(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.d(P.dq("Unsupported number of arguments for wrapped closure"))},
bh:function(a,b){var z
H.L(b)
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.lf)
a.$identity=z
return z},
h8:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b[0]
y=z.$callName
if(!!J.C(d).$isa){z.$reflectionInfo=d
x=H.iG(z).r}else x=d
w=e?Object.create(new H.iU().constructor.prototype):Object.create(new H.cj(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function static_tear_off(){this.$initialize()}
else{u=$.aa
if(typeof u!=="number")return u.I()
$.aa=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=H.de(a,z,f)
t.$reflectionInfo=d}else{w.$static_name=g
t=z}if(typeof x=="number")s=function(h,i){return function(){return h(i)}}(H.l5,x)
else if(typeof x=="function")if(e)s=x
else{r=f?H.dc:H.ck
s=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,r)}else throw H.d("Error in reflectionInfo.")
w.$S=s
w[y]=t
for(q=t,p=1;p<b.length;++p){o=b[p]
n=o.$callName
if(n!=null){o=e?o:H.de(a,o,f)
w[n]=o}if(p===c){o.$reflectionInfo=d
q=o}}w.$C=q
w.$R=z.$R
w.$D=z.$D
return v},
h5:function(a,b,c,d){var z=H.ck
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
de:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.h7(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.h5(y,!w,z,b)
if(y===0){w=$.aa
if(typeof w!=="number")return w.I()
$.aa=w+1
u="self"+w
w="return function(){var "+u+" = this."
v=$.aY
if(v==null){v=H.bS("self")
$.aY=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aa
if(typeof w!=="number")return w.I()
$.aa=w+1
t+=w
w="return function("+t+"){return this."
v=$.aY
if(v==null){v=H.bS("self")
$.aY=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
h6:function(a,b,c,d){var z,y
z=H.ck
y=H.dc
switch(b?-1:a){case 0:throw H.d(H.iM("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
h7:function(a,b){var z,y,x,w,v,u,t,s
z=$.aY
if(z==null){z=H.bS("self")
$.aY=z}y=$.db
if(y==null){y=H.bS("receiver")
$.db=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.h6(w,!u,x,b)
if(w===1){z="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
y=$.aa
if(typeof y!=="number")return y.I()
$.aa=y+1
return new Function(z+y+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
y=$.aa
if(typeof y!=="number")return y.I()
$.aa=y+1
return new Function(z+y+"}")()},
cK:function(a,b,c,d,e,f,g){return H.h8(a,b,H.L(c),d,!!e,!!f,g)},
v:function(a){if(a==null)return a
if(typeof a==="string")return a
throw H.d(H.a4(a,"String"))},
er:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.d(H.a4(a,"double"))},
cP:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.d(H.a4(a,"num"))},
c6:function(a){if(a==null)return a
if(typeof a==="boolean")return a
throw H.d(H.a4(a,"bool"))},
L:function(a){if(a==null)return a
if(typeof a==="number"&&Math.floor(a)===a)return a
throw H.d(H.a4(a,"int"))},
cQ:function(a,b){throw H.d(H.a4(a,H.aF(H.v(b).substring(3))))},
lo:function(a,b){throw H.d(H.dd(a,H.aF(H.v(b).substring(3))))},
j:function(a,b){if(a==null)return a
if((typeof a==="object"||typeof a==="function")&&J.C(a)[b])return a
H.cQ(a,b)},
a6:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.C(a)[b]
else z=!0
if(z)return a
H.lo(a,b)},
eA:function(a,b){if(a==null)return a
if(typeof a==="string")return a
if(typeof a==="number")return a
if(J.C(a)[b])return a
H.cQ(a,b)},
bI:function(a){if(a==null)return a
if(!!J.C(a).$isa)return a
throw H.d(H.a4(a,"List<dynamic>"))},
lh:function(a,b){var z
if(a==null)return a
z=J.C(a)
if(!!z.$isa)return a
if(z[b])return a
H.cQ(a,b)},
cL:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[H.L(z)]
else return a.$S()}return},
bF:function(a,b){var z
if(a==null)return!1
if(typeof a=="function")return!0
z=H.cL(J.C(a))
if(z==null)return!1
return H.eh(z,null,b,null)},
n:function(a,b){var z,y
if(a==null)return a
if($.cG)return a
$.cG=!0
try{if(H.bF(a,b))return a
z=H.bK(b)
y=H.a4(a,z)
throw H.d(y)}finally{$.cG=!1}},
c8:function(a,b){if(a!=null&&!H.cJ(a,b))H.ai(H.a4(a,H.bK(b)))
return a},
el:function(a){var z,y
z=J.C(a)
if(!!z.$isp){y=H.cL(z)
if(y!=null)return H.bK(y)
return"Closure"}return H.b8(a)},
ls:function(a){throw H.d(new P.hf(H.v(a)))},
ew:function(a){return init.getIsolateTag(a)},
h:function(a,b){a.$ti=b
return a},
am:function(a){if(a==null)return
return a.$ti},
nR:function(a,b,c){return H.aW(a["$as"+H.b(c)],H.am(b))},
aU:function(a,b,c,d){var z
H.v(c)
H.L(d)
z=H.aW(a["$as"+H.b(c)],H.am(b))
return z==null?null:z[d]},
cM:function(a,b,c){var z
H.v(b)
H.L(c)
z=H.aW(a["$as"+H.b(b)],H.am(a))
return z==null?null:z[c]},
o:function(a,b){var z
H.L(b)
z=H.am(a)
return z==null?null:z[b]},
bK:function(a){return H.aD(a,null)},
aD:function(a,b){var z,y
H.t(b,"$isa",[P.e],"$asa")
if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return H.aF(a[0].builtin$cls)+H.c3(a,1,b)
if(typeof a=="function")return H.aF(a.builtin$cls)
if(a===-2)return"dynamic"
if(typeof a==="number"){H.L(a)
if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+a
z=b.length
y=z-a-1
if(y<0||y>=z)return H.f(b,y)
return H.b(b[y])}if('func' in a)return H.kO(a,b)
if('futureOr' in a)return"FutureOr<"+H.aD("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
kO:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=[P.e]
H.t(b,"$isa",z,"$asa")
if("bounds" in a){y=a.bounds
if(b==null){b=H.h([],z)
x=null}else x=b.length
w=b.length
for(v=y.length,u=v;u>0;--u)C.a.j(b,"T"+(w+u))
for(t="<",s="",u=0;u<v;++u,s=", "){t+=s
z=b.length
r=z-u-1
if(r<0)return H.f(b,r)
t=C.j.I(t,b[r])
q=y[u]
if(q!=null&&q!==P.c)t+=" extends "+H.aD(q,b)}t+=">"}else{t=""
x=null}p=!!a.v?"void":H.aD(a.ret,b)
if("args" in a){o=a.args
for(z=o.length,n="",m="",l=0;l<z;++l,m=", "){k=o[l]
n=n+m+H.aD(k,b)}}else{n=""
m=""}if("opt" in a){j=a.opt
n+=m+"["
for(z=j.length,m="",l=0;l<z;++l,m=", "){k=j[l]
n=n+m+H.aD(k,b)}n+="]"}if("named" in a){i=a.named
n+=m+"{"
for(z=H.l0(i),r=z.length,m="",l=0;l<r;++l,m=", "){h=H.v(z[l])
n=n+m+H.aD(i[h],b)+(" "+H.b(h))}n+="}"}if(x!=null)b.length=x
return t+"("+n+") => "+p},
c3:function(a,b,c){var z,y,x,w,v,u
H.t(c,"$isa",[P.e],"$asa")
if(a==null)return""
z=new P.cC("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.aD(u,c)}return"<"+z.l(0)+">"},
l4:function(a){var z,y,x,w
z=J.C(a)
if(!!z.$isp){y=H.cL(z)
if(y!=null)return y}x=z.constructor
if(a==null)return x
if(typeof a!="object")return x
w=H.am(a)
if(w!=null){w=w.slice()
w.splice(0,0,x)
x=w}return x},
aW:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aT:function(a,b,c,d){var z,y
H.v(b)
H.bI(c)
H.v(d)
if(a==null)return!1
z=H.am(a)
y=J.C(a)
if(y[b]==null)return!1
return H.eo(H.aW(y[d],z),null,c,null)},
bL:function(a,b,c,d){H.v(b)
H.bI(c)
H.v(d)
if(a==null)return a
if(H.aT(a,b,c,d))return a
throw H.d(H.dd(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(H.aF(b.substring(3))+H.c3(c,0,null),init.mangledGlobalNames)))},
t:function(a,b,c,d){H.v(b)
H.bI(c)
H.v(d)
if(a==null)return a
if(H.aT(a,b,c,d))return a
throw H.d(H.a4(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(H.aF(b.substring(3))+H.c3(c,0,null),init.mangledGlobalNames)))},
eo:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.a0(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.a0(a[y],b,c[y],d))return!1
return!0},
nN:function(a,b,c){return a.apply(b,H.aW(J.C(b)["$as"+H.b(c)],H.am(b)))},
ey:function(a){var z
if(typeof a==="number")return!1
if('futureOr' in a){z="type" in a?a.type:null
return a==null||a.builtin$cls==="c"||a.builtin$cls==="G"||a===-1||a===-2||H.ey(z)}return!1},
cJ:function(a,b){var z,y
if(a==null)return b==null||b.builtin$cls==="c"||b.builtin$cls==="G"||b===-1||b===-2||H.ey(b)
if(b==null||b===-1||b.builtin$cls==="c"||b===-2)return!0
if(typeof b=="object"){if('futureOr' in b)if(H.cJ(a,"type" in b?b.type:null))return!0
if('func' in b)return H.bF(a,b)}z=J.C(a).constructor
y=H.am(a)
if(y!=null){y=y.slice()
y.splice(0,0,z)
z=y}return H.a0(z,null,b,null)},
A:function(a,b){if(a!=null&&!H.cJ(a,b))throw H.d(H.a4(a,H.bK(b)))
return a},
a0:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="c"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="c"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.a0(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="G")return!0
if('func' in c)return H.eh(a,b,c,d)
if('func' in a)return c.builtin$cls==="bu"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.a0("type" in a?a.type:null,b,x,d)
else if(H.a0(a,b,x,d))return!0
else{if(!('$is'+"b0" in y.prototype))return!1
w=y.prototype["$as"+"b0"]
v=H.aW(w,z?a.slice(1):null)
return H.a0(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=t.builtin$cls
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.eo(H.aW(r,z),b,u,d)},
eh:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.a0(a.ret,b,c.ret,d))return!1
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
for(p=0;p<t;++p)if(!H.a0(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.a0(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.a0(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.ln(m,b,l,d)},
ln:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.a0(c[w],d,a[w],b))return!1}return!0},
nO:function(a,b,c){Object.defineProperty(a,H.v(b),{value:c,enumerable:false,writable:true,configurable:true})},
li:function(a){var z,y,x,w,v,u
z=H.v($.ex.$1(a))
y=$.c7[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.ca[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=H.v($.en.$2(a,z))
if(z!=null){y=$.c7[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.ca[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cb(x)
$.c7[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.ca[z]=x
return x}if(v==="-"){u=H.cb(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eB(a,x)
if(v==="*")throw H.d(P.dW(z))
if(init.leafTags[z]===true){u=H.cb(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eB(a,x)},
eB:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.cO(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cb:function(a){return J.cO(a,!1,null,!!a.$isz)},
lm:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.cb(z)
else return J.cO(z,c,null,null)},
ld:function(){if(!0===$.cN)return
$.cN=!0
H.le()},
le:function(){var z,y,x,w,v,u,t,s
$.c7=Object.create(null)
$.ca=Object.create(null)
H.l9()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.eC.$1(v)
if(u!=null){t=H.lm(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
l9:function(){var z,y,x,w,v,u,t
z=C.P()
z=H.aR(C.M,H.aR(C.R,H.aR(C.z,H.aR(C.z,H.aR(C.Q,H.aR(C.N,H.aR(C.O(C.A),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.ex=new H.la(v)
$.en=new H.lb(u)
$.eC=new H.lc(t)},
aR:function(a,b){return a(b)||b},
lr:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
iF:{"^":"c;a,b,c,d,e,f,r,0x",p:{
iG:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.cs(z)
y=z[0]
x=z[1]
return new H.iF(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
j4:{"^":"c;a,b,c,d,e,f",
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
af:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.h([],[P.e])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.j4(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
c0:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
dT:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
im:{"^":"S;a,b",
l:function(a){var z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
return"NoSuchMethodError: method not found: '"+z+"' on null"},
p:{
dE:function(a,b){return new H.im(a,b==null?null:b.method)}}},
hR:{"^":"S;a,b,c",
l:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
p:{
cu:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.hR(a,y,z?null:b.receiver)}}},
j9:{"^":"S;a",
l:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
lt:{"^":"p:5;a",
$1:function(a){if(!!J.C(a).$isS)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ec:{"^":"c;a,0b",
l:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isa3:1},
p:{"^":"c;",
l:function(a){return"Closure '"+H.b8(this).trim()+"'"},
gcv:function(){return this},
$isbu:1,
gcv:function(){return this}},
dP:{"^":"p;"},
iU:{"^":"dP;",
l:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+H.aF(z)+"'"}},
cj:{"^":"dP;a,b,c,d",
F:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cj))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gB:function(a){var z,y
z=this.c
if(z==null)y=H.b7(this.a)
else y=typeof z!=="object"?J.ao(z):H.b7(z)
return(y^H.b7(this.b))>>>0},
l:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+("Instance of '"+H.b8(z)+"'")},
p:{
ck:function(a){return a.a},
dc:function(a){return a.c},
bS:function(a){var z,y,x,w,v
z=new H.cj("self","target","receiver","name")
y=J.cs(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
j5:{"^":"S;a",
l:function(a){return this.a},
p:{
a4:function(a,b){return new H.j5("TypeError: "+H.b(P.bU(a))+": type '"+H.el(a)+"' is not a subtype of type '"+b+"'")}}},
h3:{"^":"S;a",
l:function(a){return this.a},
p:{
dd:function(a,b){return new H.h3("CastError: "+H.b(P.bU(a))+": type '"+H.el(a)+"' is not a subtype of type '"+b+"'")}}},
iL:{"^":"S;a",
l:function(a){return"RuntimeError: "+H.b(this.a)},
p:{
iM:function(a){return new H.iL(a)}}},
dU:{"^":"c;a,0b,0c,0d",
gai:function(){var z=this.b
if(z==null){z=H.bK(this.a)
this.b=z}return z},
l:function(a){return this.gai()},
gB:function(a){var z=this.d
if(z==null){z=C.j.gB(this.gai())
this.d=z}return z},
F:function(a,b){if(b==null)return!1
return b instanceof H.dU&&this.gai()===b.gai()}},
dw:{"^":"dz;a,0b,0c,0d,0e,0f,r,$ti",
gk:function(a){return this.a},
gK:function(a){return new H.ad(this,[H.o(this,0)])},
gcq:function(a){var z=H.o(this,0)
return H.i2(new H.ad(this,[z]),new H.hQ(this),z,H.o(this,1))},
ak:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.dc(z,b)}else{y=this.e1(b)
return y}},
e1:function(a){var z=this.d
if(z==null)return!1
return this.aO(this.aG(z,J.ao(a)&0x3ffffff),a)>=0},
i:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ag(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.ag(w,b)
x=y==null?null:y.b
return x}else return this.e2(b)},
e2:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.aG(z,J.ao(a)&0x3ffffff)
x=this.aO(y,a)
if(x<0)return
return y[x].b},
h:function(a,b,c){var z,y,x,w,v,u
H.A(b,H.o(this,0))
H.A(c,H.o(this,1))
if(typeof b==="string"){z=this.b
if(z==null){z=this.aI()
this.b=z}this.bh(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aI()
this.c=y}this.bh(y,b,c)}else{x=this.d
if(x==null){x=this.aI()
this.d=x}w=J.ao(b)&0x3ffffff
v=this.aG(x,w)
if(v==null)this.aL(x,w,[this.ay(b,c)])
else{u=this.aO(v,b)
if(u>=0)v[u].b=c
else v.push(this.ay(b,c))}}},
G:function(a,b){var z,y
H.n(b,{func:1,ret:-1,args:[H.o(this,0),H.o(this,1)]})
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(P.aI(this))
z=z.c}},
bh:function(a,b,c){var z
H.A(b,H.o(this,0))
H.A(c,H.o(this,1))
z=this.ag(a,b)
if(z==null)this.aL(a,b,this.ay(b,c))
else z.b=c},
bj:function(){this.r=this.r+1&67108863},
ay:function(a,b){var z,y
z=new H.hW(H.A(a,H.o(this,0)),H.A(b,H.o(this,1)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.bj()
return z},
aO:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.aG(a[y].a,b))return y
return-1},
l:function(a){return P.dA(this)},
ag:function(a,b){return a[b]},
aG:function(a,b){return a[b]},
aL:function(a,b,c){a[b]=c},
de:function(a,b){delete a[b]},
dc:function(a,b){return this.ag(a,b)!=null},
aI:function(){var z=Object.create(null)
this.aL(z,"<non-identifier-key>",z)
this.de(z,"<non-identifier-key>")
return z},
$isdx:1},
hQ:{"^":"p;a",
$1:function(a){var z=this.a
return z.i(0,H.A(a,H.o(z,0)))},
$S:function(){var z=this.a
return{func:1,ret:H.o(z,1),args:[H.o(z,0)]}}},
hW:{"^":"c;a,b,0c,0d"},
ad:{"^":"dl;a,$ti",
gk:function(a){return this.a.a},
gw:function(a){var z,y
z=this.a
y=new H.hX(z,z.r,this.$ti)
y.c=z.e
return y}},
hX:{"^":"c;a,b,0c,0d,$ti",
sbi:function(a){this.d=H.A(a,H.o(this,0))},
gE:function(a){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.d(P.aI(z))
else{z=this.c
if(z==null){this.sbi(null)
return!1}else{this.sbi(z.a)
this.c=this.c.c
return!0}}},
$isas:1},
la:{"^":"p:5;a",
$1:function(a){return this.a(a)}},
lb:{"^":"p:13;a",
$2:function(a,b){return this.a(a,b)}},
lc:{"^":"p:14;a",
$1:function(a){return this.a(H.v(a))}}}],["","",,H,{"^":"",
l0:function(a){return J.hN(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
bJ:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
c2:function(a){var z,y
if(!!J.C(a).$isw)return a
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)C.a.h(z,y,a[y])
return z},
ah:function(a,b,c){if(a>>>0!==a||a>=c)throw H.d(H.bi(b,a))},
ih:{"^":"k;",$isj6:1,"%":"DataView;ArrayBufferView;cy|e6|e7|dC|e8|e9|au"},
cy:{"^":"ih;",
gk:function(a){return a.length},
$isw:1,
$asw:I.bj,
$isz:1,
$asz:I.bj},
dC:{"^":"e7;",
i:function(a,b){H.ah(b,a,a.length)
return a[b]},
h:function(a,b,c){H.er(c)
H.ah(b,a,a.length)
a[b]=c},
$asbV:function(){return[P.al]},
$asq:function(){return[P.al]},
$ism:1,
$asm:function(){return[P.al]},
$isa:1,
$asa:function(){return[P.al]},
"%":"Float64Array"},
au:{"^":"e9;",
h:function(a,b,c){H.L(c)
H.ah(b,a,a.length)
a[b]=c},
$asbV:function(){return[P.x]},
$asq:function(){return[P.x]},
$ism:1,
$asm:function(){return[P.x]},
$isa:1,
$asa:function(){return[P.x]}},
ig:{"^":"dC;",$isac:1,"%":"Float32Array"},
mz:{"^":"au;",
i:function(a,b){H.ah(b,a,a.length)
return a[b]},
"%":"Int16Array"},
mA:{"^":"au;",
i:function(a,b){H.ah(b,a,a.length)
return a[b]},
$ishK:1,
"%":"Int32Array"},
mB:{"^":"au;",
i:function(a,b){H.ah(b,a,a.length)
return a[b]},
"%":"Int8Array"},
mC:{"^":"au;",
i:function(a,b){H.ah(b,a,a.length)
return a[b]},
"%":"Uint16Array"},
ii:{"^":"au;",
i:function(a,b){H.ah(b,a,a.length)
return a[b]},
$isnl:1,
"%":"Uint32Array"},
mD:{"^":"au;",
gk:function(a){return a.length},
i:function(a,b){H.ah(b,a,a.length)
return a[b]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
mE:{"^":"au;",
gk:function(a){return a.length},
i:function(a,b){H.ah(b,a,a.length)
return a[b]},
"%":";Uint8Array"},
e6:{"^":"cy+q;"},
e7:{"^":"e6+bV;"},
e8:{"^":"cy+q;"},
e9:{"^":"e8+bV;"}}],["","",,P,{"^":"",
jj:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.kW()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.bh(new P.jl(z),1)).observe(y,{childList:true})
return new P.jk(z,y,x)}else if(self.setImmediate!=null)return P.kX()
return P.kY()},
nw:[function(a){self.scheduleImmediate(H.bh(new P.jm(H.n(a,{func:1,ret:-1})),0))},"$1","kW",4,0,4],
nx:[function(a){self.setImmediate(H.bh(new P.jn(H.n(a,{func:1,ret:-1})),0))},"$1","kX",4,0,4],
ny:[function(a){H.n(a,{func:1,ret:-1})
P.kw(0,a)},"$1","kY",4,0,4],
kS:function(a,b){if(H.bF(a,{func:1,args:[P.c,P.a3]}))return H.n(a,{func:1,ret:null,args:[P.c,P.a3]})
if(H.bF(a,{func:1,args:[P.c]}))return H.n(a,{func:1,ret:null,args:[P.c]})
throw H.d(P.d9(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
kR:function(){var z,y
for(;z=$.aQ,z!=null;){$.bg=null
y=z.b
$.aQ=y
if(y==null)$.bf=null
z.a.$0()}},
nL:[function(){$.cH=!0
try{P.kR()}finally{$.bg=null
$.cH=!1
if($.aQ!=null)$.cT().$1(P.ep())}},"$0","ep",0,0,1],
ek:function(a){var z=new P.dZ(H.n(a,{func:1,ret:-1}))
if($.aQ==null){$.bf=z
$.aQ=z
if(!$.cH)$.cT().$1(P.ep())}else{$.bf.b=z
$.bf=z}},
kV:function(a){var z,y,x
H.n(a,{func:1,ret:-1})
z=$.aQ
if(z==null){P.ek(a)
$.bg=$.bf
return}y=new P.dZ(a)
x=$.bg
if(x==null){y.b=z
$.bg=y
$.aQ=y}else{y.b=x.b
x.b=y
$.bg=y
if(y.b==null)$.bf=y}},
lp:function(a){var z,y
z={func:1,ret:-1}
H.n(a,z)
y=$.K
if(C.f===y){P.c5(null,null,C.f,a)
return}y.toString
P.c5(null,null,y,H.n(y.bC(a),z))},
c4:function(a,b,c,d,e){var z={}
z.a=d
P.kV(new P.kT(z,e))},
ei:function(a,b,c,d,e){var z,y
H.n(d,{func:1,ret:e})
y=$.K
if(y===c)return d.$0()
$.K=c
z=y
try{y=d.$0()
return y}finally{$.K=z}},
ej:function(a,b,c,d,e,f,g){var z,y
H.n(d,{func:1,ret:f,args:[g]})
H.A(e,g)
y=$.K
if(y===c)return d.$1(e)
$.K=c
z=y
try{y=d.$1(e)
return y}finally{$.K=z}},
kU:function(a,b,c,d,e,f,g,h,i){var z,y
H.n(d,{func:1,ret:g,args:[h,i]})
H.A(e,h)
H.A(f,i)
y=$.K
if(y===c)return d.$2(e,f)
$.K=c
z=y
try{y=d.$2(e,f)
return y}finally{$.K=z}},
c5:function(a,b,c,d){var z
H.n(d,{func:1,ret:-1})
z=C.f!==c
if(z)d=!(!z||!1)?c.bC(d):c.dI(d,-1)
P.ek(d)},
jl:{"^":"p:6;a",
$1:function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()}},
jk:{"^":"p:15;a,b,c",
$1:function(a){var z,y
this.a.a=H.n(a,{func:1,ret:-1})
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
jm:{"^":"p:0;a",
$0:function(){this.a.$0()}},
jn:{"^":"p:0;a",
$0:function(){this.a.$0()}},
kv:{"^":"c;a,0b,c",
d7:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.bh(new P.kx(this,b),0),a)
else throw H.d(P.B("`setTimeout()` not found."))},
p:{
kw:function(a,b){var z=new P.kv(!0,0)
z.d7(a,b)
return z}}},
kx:{"^":"p:1;a,b",
$0:function(){var z=this.a
z.b=null
z.c=1
this.b.$0()}},
jq:{"^":"c;$ti"},
kq:{"^":"jq;a,$ti"},
aP:{"^":"c;0a,b,c,d,e,$ti",
e4:function(a){if(this.c!==6)return!0
return this.b.b.aR(H.n(this.d,{func:1,ret:P.V,args:[P.c]}),a.a,P.V,P.c)},
e0:function(a){var z,y,x,w
z=this.e
y=P.c
x={futureOr:1,type:H.o(this,1)}
w=this.b.b
if(H.bF(z,{func:1,args:[P.c,P.a3]}))return H.c8(w.e7(z,a.a,a.b,null,y,P.a3),x)
else return H.c8(w.aR(H.n(z,{func:1,args:[P.c]}),a.a,null,y),x)}},
ag:{"^":"c;bv:a<,b,0du:c<,$ti",
cd:function(a,b,c){var z,y,x,w
z=H.o(this,0)
H.n(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
y=$.K
if(y!==C.f){y.toString
H.n(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
if(b!=null)b=P.kS(b,y)}H.n(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
x=new P.ag(0,$.K,[c])
w=b==null?1:3
this.bl(new P.aP(x,w,a,b,[z,c]))
return x},
cc:function(a,b){return this.cd(a,null,b)},
bl:function(a){var z,y
z=this.a
if(z<=1){a.a=H.j(this.c,"$isaP")
this.c=a}else{if(z===2){y=H.j(this.c,"$isag")
z=y.a
if(z<4){y.bl(a)
return}this.a=z
this.c=y.c}z=this.b
z.toString
P.c5(null,null,z,H.n(new P.jF(this,a),{func:1,ret:-1}))}},
bs:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=H.j(this.c,"$isaP")
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){u=H.j(this.c,"$isag")
y=u.a
if(y<4){u.bs(a)
return}this.a=y
this.c=u.c}z.a=this.ah(a)
y=this.b
y.toString
P.c5(null,null,y,H.n(new P.jK(z,this),{func:1,ret:-1}))}},
aK:function(){var z=H.j(this.c,"$isaP")
this.c=null
return this.ah(z)},
ah:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
aB:function(a){var z,y,x
z=H.o(this,0)
H.c8(a,{futureOr:1,type:z})
y=this.$ti
if(H.aT(a,"$isb0",y,"$asb0"))if(H.aT(a,"$isag",y,null))P.e1(a,this)
else P.jG(a,this)
else{x=this.aK()
H.A(a,z)
this.a=4
this.c=a
P.be(this,x)}},
bn:function(a,b){var z
H.j(b,"$isa3")
z=this.aK()
this.a=8
this.c=new P.a_(a,b)
P.be(this,z)},
$isb0:1,
p:{
jG:function(a,b){var z,y,x
b.a=1
try{a.cd(new P.jH(b),new P.jI(b),null)}catch(x){z=H.a7(x)
y=H.bl(x)
P.lp(new P.jJ(b,z,y))}},
e1:function(a,b){var z,y
for(;z=a.a,z===2;)a=H.j(a.c,"$isag")
if(z>=4){y=b.aK()
b.a=a.a
b.c=a.c
P.be(b,y)}else{y=H.j(b.c,"$isaP")
b.a=2
b.c=a
a.bs(y)}},
be:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=H.j(y.c,"$isa_")
y=y.b
u=v.a
t=v.b
y.toString
P.c4(null,null,y,u,t)}return}for(;s=b.a,s!=null;b=s){b.a=null
P.be(z.a,b)}y=z.a
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
if(p){H.j(r,"$isa_")
y=y.b
u=r.a
t=r.b
y.toString
P.c4(null,null,y,u,t)
return}o=$.K
if(o!=q)$.K=q
else o=null
y=b.c
if(y===8)new P.jN(z,x,b,w).$0()
else if(u){if((y&1)!==0)new P.jM(x,b,r).$0()}else if((y&2)!==0)new P.jL(z,x,b).$0()
if(o!=null)$.K=o
y=x.b
if(!!J.C(y).$isb0){if(y.a>=4){n=H.j(t.c,"$isaP")
t.c=null
b=t.ah(n)
t.a=y.a
t.c=y.c
z.a=y
continue}else P.e1(y,t)
return}}m=b.b
n=H.j(m.c,"$isaP")
m.c=null
b=m.ah(n)
y=x.a
u=x.b
if(!y){H.A(u,H.o(m,0))
m.a=4
m.c=u}else{H.j(u,"$isa_")
m.a=8
m.c=u}z.a=m
y=m}}}},
jF:{"^":"p:0;a,b",
$0:function(){P.be(this.a,this.b)}},
jK:{"^":"p:0;a,b",
$0:function(){P.be(this.b,this.a.a)}},
jH:{"^":"p:6;a",
$1:function(a){var z=this.a
z.a=0
z.aB(a)}},
jI:{"^":"p:16;a",
$2:function(a,b){H.j(b,"$isa3")
this.a.bn(a,b)},
$1:function(a){return this.$2(a,null)}},
jJ:{"^":"p:0;a,b,c",
$0:function(){this.a.bn(this.b,this.c)}},
jN:{"^":"p:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.c8(H.n(w.d,{func:1}),null)}catch(v){y=H.a7(v)
x=H.bl(v)
if(this.d){w=H.j(this.a.a.c,"$isa_").a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=H.j(this.a.a.c,"$isa_")
else u.b=new P.a_(y,x)
u.a=!0
return}if(!!J.C(z).$isb0){if(z instanceof P.ag&&z.gbv()>=4){if(z.gbv()===8){w=this.b
w.b=H.j(z.gdu(),"$isa_")
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.cc(new P.jO(t),null)
w.a=!1}}},
jO:{"^":"p:17;a",
$1:function(a){return this.a}},
jM:{"^":"p:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t
try{x=this.b
w=H.o(x,0)
v=H.A(this.c,w)
u=H.o(x,1)
this.a.b=x.b.b.aR(H.n(x.d,{func:1,ret:{futureOr:1,type:u},args:[w]}),v,{futureOr:1,type:u},w)}catch(t){z=H.a7(t)
y=H.bl(t)
x=this.a
x.b=new P.a_(z,y)
x.a=!0}}},
jL:{"^":"p:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=H.j(this.a.a.c,"$isa_")
w=this.c
if(w.e4(z)&&w.e!=null){v=this.b
v.b=w.e0(z)
v.a=!1}}catch(u){y=H.a7(u)
x=H.bl(u)
w=H.j(this.a.a.c,"$isa_")
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.a_(y,x)
s.a=!0}}},
dZ:{"^":"c;a,0b"},
iY:{"^":"c;$ti",
gk:function(a){var z,y,x,w
z={}
y=new P.ag(0,$.K,[P.x])
z.a=0
x=H.o(this,0)
w=H.n(new P.j_(z,this),{func:1,ret:-1,args:[x]})
H.n(new P.j0(z,y),{func:1,ret:-1})
W.ak(this.a,this.b,w,!1,x)
return y}},
j_:{"^":"p;a,b",
$1:function(a){H.A(a,H.o(this.b,0));++this.a.a},
$S:function(){return{func:1,ret:P.G,args:[H.o(this.b,0)]}}},
j0:{"^":"p:0;a,b",
$0:function(){this.b.aB(this.a.a)}},
iZ:{"^":"c;"},
a_:{"^":"c;a,b",
l:function(a){return H.b(this.a)},
$isS:1},
kD:{"^":"c;",$isnu:1},
kT:{"^":"p:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.dF()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.d(z)
x=H.d(z)
x.stack=y.l(0)
throw x}},
k9:{"^":"kD;",
e8:function(a){var z,y,x
H.n(a,{func:1,ret:-1})
try{if(C.f===$.K){a.$0()
return}P.ei(null,null,this,a,-1)}catch(x){z=H.a7(x)
y=H.bl(x)
P.c4(null,null,this,z,H.j(y,"$isa3"))}},
e9:function(a,b,c){var z,y,x
H.n(a,{func:1,ret:-1,args:[c]})
H.A(b,c)
try{if(C.f===$.K){a.$1(b)
return}P.ej(null,null,this,a,b,-1,c)}catch(x){z=H.a7(x)
y=H.bl(x)
P.c4(null,null,this,z,H.j(y,"$isa3"))}},
dI:function(a,b){return new P.kb(this,H.n(a,{func:1,ret:b}),b)},
bC:function(a){return new P.ka(this,H.n(a,{func:1,ret:-1}))},
dJ:function(a,b){return new P.kc(this,H.n(a,{func:1,ret:-1,args:[b]}),b)},
i:function(a,b){return},
c8:function(a,b){H.n(a,{func:1,ret:b})
if($.K===C.f)return a.$0()
return P.ei(null,null,this,a,b)},
aR:function(a,b,c,d){H.n(a,{func:1,ret:c,args:[d]})
H.A(b,d)
if($.K===C.f)return a.$1(b)
return P.ej(null,null,this,a,b,c,d)},
e7:function(a,b,c,d,e,f){H.n(a,{func:1,ret:d,args:[e,f]})
H.A(b,e)
H.A(c,f)
if($.K===C.f)return a.$2(b,c)
return P.kU(null,null,this,a,b,c,d,e,f)}},
kb:{"^":"p;a,b,c",
$0:function(){return this.a.c8(this.b,this.c)},
$S:function(){return{func:1,ret:this.c}}},
ka:{"^":"p:1;a,b",
$0:function(){return this.a.e8(this.b)}},
kc:{"^":"p;a,b,c",
$1:function(a){var z=this.c
return this.a.e9(this.b,H.A(a,z),z)},
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
cv:function(a,b,c){H.bI(a)
return H.t(H.l1(a,new H.dw(0,0,[b,c])),"$isdx",[b,c],"$asdx")},
Q:function(a,b){return new H.dw(0,0,[a,b])},
a2:function(a,b,c,d){return new P.jV(0,0,[d])},
hL:function(a,b,c){var z,y
if(P.cI(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=H.h([],[P.e])
y=$.bm()
C.a.j(y,a)
try{P.kQ(a,z)}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=P.dO(b,H.lh(z,"$ism"),", ")+c
return y.charCodeAt(0)==0?y:y},
cr:function(a,b,c){var z,y,x
if(P.cI(a))return b+"..."+c
z=new P.cC(b)
y=$.bm()
C.a.j(y,a)
try{x=z
x.a=P.dO(x.gZ(),a,", ")}finally{if(0>=y.length)return H.f(y,-1)
y.pop()}y=z
y.a=y.gZ()+c
y=z.gZ()
return y.charCodeAt(0)==0?y:y},
cI:function(a){var z,y
for(z=0;y=$.bm(),z<y.length;++z)if(a===y[z])return!0
return!1},
kQ:function(a,b){var z,y,x,w,v,u,t,s,r,q
H.t(b,"$isa",[P.e],"$asa")
z=a.gw(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.t())return
w=H.b(z.gE(z))
C.a.j(b,w)
y+=w.length+2;++x}if(!z.t()){if(x<=5)return
if(0>=b.length)return H.f(b,-1)
v=b.pop()
if(0>=b.length)return H.f(b,-1)
u=b.pop()}else{t=z.gE(z);++x
if(!z.t()){if(x<=4){C.a.j(b,H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.f(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gE(z);++x
for(;z.t();t=s,s=r){r=z.gE(z);++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.f(b,-1)
y-=b.pop().length+2;--x}C.a.j(b,"...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.f(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)C.a.j(b,q)
C.a.j(b,u)
C.a.j(b,v)},
cw:function(a,b){var z,y,x
z=P.a2(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.E)(a),++x)z.j(0,H.A(a[x],b))
return z},
dA:function(a){var z,y,x
z={}
if(P.cI(a))return"{...}"
y=new P.cC("")
try{C.a.j($.bm(),a)
x=y
x.a=x.gZ()+"{"
z.a=!0
J.fy(a,new P.i0(z,y))
z=y
z.a=z.gZ()+"}"}finally{z=$.bm()
if(0>=z.length)return H.f(z,-1)
z.pop()}z=y.gZ()
return z.charCodeAt(0)==0?z:z},
jV:{"^":"jQ;a,0b,0c,0d,0e,0f,r,$ti",
gw:function(a){var z=new P.e5(this,this.r,this.$ti)
z.c=this.e
return z},
gk:function(a){return this.a},
A:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return H.j(z[b],"$isbE")!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return H.j(y[b],"$isbE")!=null}else return this.da(b)},
da:function(a){var z=this.d
if(z==null)return!1
return this.aF(this.bq(z,a),a)>=0},
j:function(a,b){var z,y
H.A(b,H.o(this,0))
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.cE()
this.b=z}return this.bk(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.cE()
this.c=y}return this.bk(y,b)}else return this.d8(0,b)},
d8:function(a,b){var z,y,x
H.A(b,H.o(this,0))
z=this.d
if(z==null){z=P.cE()
this.d=z}y=this.bo(b)
x=z[y]
if(x==null)z[y]=[this.aJ(b)]
else{if(this.aF(x,b)>=0)return!1
x.push(this.aJ(b))}return!0},
c7:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bt(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bt(this.c,b)
else return this.dn(0,b)},
dn:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=this.bq(z,b)
x=this.aF(y,b)
if(x<0)return!1
this.bx(y.splice(x,1)[0])
return!0},
aa:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.aH()}},
bk:function(a,b){H.A(b,H.o(this,0))
if(H.j(a[b],"$isbE")!=null)return!1
a[b]=this.aJ(b)
return!0},
bt:function(a,b){var z
if(a==null)return!1
z=H.j(a[b],"$isbE")
if(z==null)return!1
this.bx(z)
delete a[b]
return!0},
aH:function(){this.r=this.r+1&67108863},
aJ:function(a){var z,y
z=new P.bE(H.A(a,H.o(this,0)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.aH()
return z},
bx:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.aH()},
bo:function(a){return J.ao(a)&0x3ffffff},
bq:function(a,b){return a[this.bo(b)]},
aF:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.aG(a[y].a,b))return y
return-1},
p:{
cE:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
bE:{"^":"c;a,0b,0c"},
e5:{"^":"c;a,b,0c,0d,$ti",
sbm:function(a){this.d=H.A(a,H.o(this,0))},
gE:function(a){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.d(P.aI(z))
else{z=this.c
if(z==null){this.sbm(null)
return!1}else{this.sbm(H.A(z.a,H.o(this,0)))
this.c=this.c.b
return!0}}},
$isas:1,
p:{
jW:function(a,b,c){var z=new P.e5(a,b,[c])
z.c=a.e
return z}}},
jQ:{"^":"iN;"},
hY:{"^":"jX;",$ism:1,$isa:1},
q:{"^":"c;$ti",
gw:function(a){return new H.dy(a,this.gk(a),0,[H.aU(this,a,"q",0)])},
u:function(a,b){return this.i(a,b)},
e_:function(a,b,c,d){var z,y,x
H.A(b,d)
H.n(c,{func:1,ret:d,args:[d,H.aU(this,a,"q",0)]})
z=this.gk(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.i(a,x))
if(z!==this.gk(a))throw H.d(P.aI(a))}return y},
bX:function(a,b,c,d){var z
H.A(d,H.aU(this,a,"q",0))
P.iE(b,c,this.gk(a),null,null,null)
for(z=b;z<c;++z)this.h(a,z,d)},
l:function(a){return P.cr(a,"[","]")}},
dz:{"^":"W;"},
i0:{"^":"p:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
W:{"^":"c;$ti",
G:function(a,b){var z,y
H.n(b,{func:1,ret:-1,args:[H.aU(this,a,"W",0),H.aU(this,a,"W",1)]})
for(z=J.bP(this.gK(a));z.t();){y=z.gE(z)
b.$2(y,this.i(a,y))}},
gk:function(a){return J.aX(this.gK(a))},
l:function(a){return P.dA(a)},
$isN:1},
iO:{"^":"c;$ti",
H:function(a,b){var z
for(z=J.bP(H.t(b,"$ism",this.$ti,"$asm"));z.t();)this.j(0,z.gE(z))},
l:function(a){return P.cr(this,"{","}")},
$ism:1,
$ismV:1},
iN:{"^":"iO;"},
jX:{"^":"c+q;"}}],["","",,P,{"^":"",
ht:function(a){if(a instanceof H.p)return a.l(0)
return"Instance of '"+H.b8(a)+"'"},
bU:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.bq(a)
if(typeof a==="string")return JSON.stringify(a)
return P.ht(a)},
dq:function(a){return new P.jC(a)},
an:function(a){H.bJ(H.b(a))},
V:{"^":"c;"},
"+bool":0,
bT:{"^":"c;a,b",
F:function(a,b){if(b==null)return!1
return b instanceof P.bT&&this.a===b.a&&!0},
O:function(a,b){return C.d.O(this.a,H.j(b,"$isbT").a)},
gB:function(a){var z=this.a
return(z^C.d.bu(z,30))&1073741823},
l:function(a){var z,y,x,w,v,u,t,s
z=P.hg(H.iA(this))
y=P.br(H.iy(this))
x=P.br(H.iu(this))
w=P.br(H.iv(this))
v=P.br(H.ix(this))
u=P.br(H.iz(this))
t=P.hh(H.iw(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
$isZ:1,
$asZ:function(){return[P.bT]},
p:{
hg:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+z
if(z>=10)return y+"00"+z
return y+"000"+z},
hh:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
br:function(a){if(a>=10)return""+a
return"0"+a}}},
al:{"^":"H;"},
"+double":0,
aZ:{"^":"c;a",
W:function(a,b){return C.d.W(this.a,H.j(b,"$isaZ").a)},
F:function(a,b){if(b==null)return!1
return b instanceof P.aZ&&this.a===b.a},
gB:function(a){return this.a&0x1FFFFFFF},
O:function(a,b){return C.d.O(this.a,H.j(b,"$isaZ").a)},
l:function(a){var z,y,x,w,v
z=new P.hp()
y=this.a
if(y<0)return"-"+new P.aZ(0-y).l(0)
x=z.$1(C.d.a_(y,6e7)%60)
w=z.$1(C.d.a_(y,1e6)%60)
v=new P.ho().$1(y%1e6)
return""+C.d.a_(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
$isZ:1,
$asZ:function(){return[P.aZ]},
p:{
hn:function(a,b,c,d,e,f){return new P.aZ(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
ho:{"^":"p:8;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
hp:{"^":"p:8;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
S:{"^":"c;"},
dF:{"^":"S;",
l:function(a){return"Throw of null."}},
aH:{"^":"S;a,b,c,d",
gaD:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gaC:function(){return""},
l:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+z
w=this.gaD()+y+x
if(!this.a)return w
v=this.gaC()
u=P.bU(this.b)
return w+v+": "+H.b(u)},
p:{
d9:function(a,b,c){return new P.aH(!0,a,b,c)}}},
dH:{"^":"aH;e,f,a,b,c,d",
gaD:function(){return"RangeError"},
gaC:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
p:{
bZ:function(a,b,c){return new P.dH(null,null,!0,a,b,"Value not in range")},
b9:function(a,b,c,d,e){return new P.dH(b,c,!0,a,d,"Invalid value")},
iE:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.b9(a,0,c,"start",f))
if(a>b||b>c)throw H.d(P.b9(b,a,c,"end",f))
return b}}},
hJ:{"^":"aH;e,k:f>,a,b,c,d",
gaD:function(){return"RangeError"},
gaC:function(){var z,y
z=H.L(this.b)
if(typeof z!=="number")return z.ad()
if(z<0)return": index must not be negative"
y=this.f
if(y===0)return": no indices are valid"
return": index should be less than "+H.b(y)},
p:{
I:function(a,b,c,d,e){var z=H.L(e==null?J.aX(b):e)
return new P.hJ(b,z,!0,a,c,"Index out of range")}}},
ja:{"^":"S;a",
l:function(a){return"Unsupported operation: "+this.a},
p:{
B:function(a){return new P.ja(a)}}},
j8:{"^":"S;a",
l:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
p:{
dW:function(a){return new P.j8(a)}}},
cA:{"^":"S;a",
l:function(a){return"Bad state: "+this.a},
p:{
cB:function(a){return new P.cA(a)}}},
h9:{"^":"S;a",
l:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bU(z))+"."},
p:{
aI:function(a){return new P.h9(a)}}},
dN:{"^":"c;",
l:function(a){return"Stack Overflow"},
$isS:1},
hf:{"^":"S;a",
l:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
jC:{"^":"c;a",
l:function(a){return"Exception: "+this.a}},
bu:{"^":"c;"},
x:{"^":"H;"},
"+int":0,
m:{"^":"c;$ti",
aT:["cK",function(a,b){var z=H.cM(this,"m",0)
return new H.dX(this,H.n(b,{func:1,ret:P.V,args:[z]}),[z])}],
gk:function(a){var z,y
z=this.gw(this)
for(y=0;z.t();)++y
return y},
gX:function(a){var z,y
z=this.gw(this)
if(!z.t())throw H.d(H.dt())
y=z.gE(z)
if(z.t())throw H.d(H.hM())
return y},
u:function(a,b){var z,y,x
if(b<0)H.ai(P.b9(b,0,null,"index",null))
for(z=this.gw(this),y=0;z.t();){x=z.gE(z)
if(b===y)return x;++y}throw H.d(P.I(b,this,"index",null,y))},
l:function(a){return P.hL(this,"(",")")}},
as:{"^":"c;$ti"},
a:{"^":"c;$ti",$ism:1},
"+List":0,
N:{"^":"c;$ti"},
G:{"^":"c;",
gB:function(a){return P.c.prototype.gB.call(this,this)},
l:function(a){return"null"}},
"+Null":0,
H:{"^":"c;",$isZ:1,
$asZ:function(){return[P.H]}},
"+num":0,
c:{"^":";",
F:function(a,b){return this===b},
gB:function(a){return H.b7(this)},
l:function(a){return"Instance of '"+H.b8(this)+"'"},
toString:function(){return this.l(this)}},
a3:{"^":"c;"},
e:{"^":"c;",$isZ:1,
$asZ:function(){return[P.e]},
$isiq:1},
"+String":0,
cC:{"^":"c;Z:a<",
gk:function(a){return this.a.length},
l:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
p:{
dO:function(a,b,c){var z=J.bP(b)
if(!z.t())return a
if(c.length===0){do a+=H.b(z.gE(z))
while(z.t())}else{a+=H.b(z.gE(z))
for(;z.t();)a=a+c+H.b(z.gE(z))}return a}}}}],["","",,W,{"^":"",
hr:function(a,b,c){var z,y
z=document.body
y=(z&&C.q).P(z,a,b,c)
y.toString
z=W.u
z=new H.dX(new W.a5(y),H.n(new W.hs(),{func:1,ret:P.V,args:[z]}),[z])
return H.j(z.gX(z),"$isR")},
dp:function(a){H.j(a,"$isO")
return"wheel"},
b_:function(a){var z,y,x
z="element tag unavailable"
try{y=J.fC(a)
if(typeof y==="string")z=a.tagName}catch(x){H.a7(x)}return z},
jz:function(a,b){return document.createElement(a)},
c1:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
e4:function(a,b,c,d){var z,y
z=W.c1(W.c1(W.c1(W.c1(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
cF:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.jt(a)
if(!!J.C(z).$isO)return z
return}else return H.j(a,"$isO")},
em:function(a,b){var z
H.n(a,{func:1,ret:-1,args:[b]})
z=$.K
if(z===C.f)return a
return z.dJ(a,b)},
P:{"^":"R;","%":"HTMLBRElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTextAreaElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
lu:{"^":"k;0k:length=","%":"AccessibleNodeList"},
fW:{"^":"P;",
l:function(a){return String(a)},
$isfW:1,
"%":"HTMLAnchorElement"},
lv:{"^":"P;",
l:function(a){return String(a)},
"%":"HTMLAreaElement"},
da:{"^":"P;",$isda:1,"%":"HTMLBaseElement"},
h0:{"^":"k;","%":";Blob"},
bR:{"^":"P;",$isbR:1,"%":"HTMLBodyElement"},
cl:{"^":"P;0n:height=,0m:width=",
aV:function(a,b,c){if(c!=null)return this.dh(a,b,P.kZ(c,null))
return this.di(a,b)},
cw:function(a,b){return this.aV(a,b,null)},
dh:function(a,b,c){return a.getContext(b,c)},
di:function(a,b){return a.getContext(b)},
$iscl:1,
"%":"HTMLCanvasElement"},
cm:{"^":"k;",
dY:function(a,b,c,d,e){return a.fillRect(b,c,d,e)},
an:function(a){return P.a1(a.getContextAttributes())},
$iscm:1,
"%":"CanvasRenderingContext2D"},
lA:{"^":"u;0k:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
ha:{"^":"cn;",$isha:1,"%":"CSSNumericValue|CSSUnitValue"},
lK:{"^":"hd;0k:length=","%":"CSSPerspective"},
ap:{"^":"k;",$isap:1,"%":"CSSCharsetRule|CSSConditionRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
hb:{"^":"jr;0k:length=",
b_:function(a,b){var z=this.dj(a,this.az(a,b))
return z==null?"":z},
az:function(a,b){var z,y
z=$.eO()
y=z[b]
if(typeof y==="string")return y
y=this.dA(a,b)
z[b]=y
return y},
dA:function(a,b){var z
if(b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()}) in a)return b
z=P.hi()+b
if(z in a)return z
return b},
dj:function(a,b){return a.getPropertyValue(b)},
gn:function(a){return a.height},
gm:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
hc:{"^":"c;",
gn:function(a){return this.b_(a,"height")},
gm:function(a){return this.b_(a,"width")}},
cn:{"^":"k;","%":"CSSImageValue|CSSKeywordValue|CSSPositionValue|CSSResourceValue|CSSURLImageValue;CSSStyleValue"},
hd:{"^":"k;","%":"CSSMatrixComponent|CSSRotation|CSSScale|CSSSkew|CSSTranslation;CSSTransformComponent"},
lM:{"^":"cn;0k:length=","%":"CSSTransformValue"},
lN:{"^":"cn;0k:length=","%":"CSSUnparsedValue"},
lP:{"^":"k;0k:length=",
i:function(a,b){return a[b]},
"%":"DataTransferItemList"},
hj:{"^":"P;","%":"HTMLDivElement"},
hk:{"^":"u;",
dD:function(a,b){return a.adoptNode(b)},
dd:function(a,b){return a.createEvent(b)},
aW:function(a,b){return a.getElementsByTagName(b)},
cz:function(a,b){return a.getElementById(b)},
c6:function(a,b){return a.querySelector(b)},
gc1:function(a){return new W.bC(a,"mousedown",!1,[W.X])},
gc2:function(a){return new W.bC(a,"mousemove",!1,[W.X])},
gc3:function(a){return new W.bC(a,"mouseup",!1,[W.X])},
gc4:function(a){return new W.bC(a,H.v(W.dp(a)),!1,[W.aO])},
"%":"XMLDocument;Document"},
lQ:{"^":"k;",
l:function(a){return String(a)},
"%":"DOMException"},
hl:{"^":"k;",
dR:function(a,b){return a.createHTMLDocument(b)},
"%":"DOMImplementation"},
lR:{"^":"jv;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.t(c,"$isY",[P.H],"$asY")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[[P.Y,P.H]]},
$isz:1,
$asz:function(){return[[P.Y,P.H]]},
$asq:function(){return[[P.Y,P.H]]},
$ism:1,
$asm:function(){return[[P.Y,P.H]]},
$isa:1,
$asa:function(){return[[P.Y,P.H]]},
$asr:function(){return[[P.Y,P.H]]},
"%":"ClientRectList|DOMRectList"},
hm:{"^":"k;",
l:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(this.gm(a))+" x "+H.b(this.gn(a))},
F:function(a,b){var z
if(b==null)return!1
if(!H.aT(b,"$isY",[P.H],"$asY"))return!1
if(a.left===b.left)if(a.top===b.top){z=J.l(b)
z=this.gm(a)===z.gm(b)&&this.gn(a)===z.gn(b)}else z=!1
else z=!1
return z},
gB:function(a){return W.e4(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,this.gm(a)&0x1FFFFFFF,this.gn(a)&0x1FFFFFFF)},
gn:function(a){return a.height},
gm:function(a){return a.width},
$isY:1,
$asY:function(){return[P.H]},
"%":";DOMRectReadOnly"},
lS:{"^":"jx;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.v(c)
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[P.e]},
$isz:1,
$asz:function(){return[P.e]},
$asq:function(){return[P.e]},
$ism:1,
$asm:function(){return[P.e]},
$isa:1,
$asa:function(){return[P.e]},
$asr:function(){return[P.e]},
"%":"DOMStringList"},
lT:{"^":"k;0k:length=","%":"DOMTokenList"},
R:{"^":"u;0ea:tagName=",
gdG:function(a){return new W.jy(a)},
l:function(a){return a.localName},
P:["ar",function(a,b,c,d){var z,y,x,w
if(c==null){z=$.dn
if(z==null){z=H.h([],[W.ae])
y=new W.dD(z)
C.a.j(z,W.e2(null))
C.a.j(z,W.ed())
$.dn=y
d=y}else d=z
z=$.dm
if(z==null){z=new W.eg(d)
$.dm=z
c=z}else{z.a=d
c=z}}if($.aj==null){z=document
y=z.implementation
y=(y&&C.J).dR(y,"")
$.aj=y
$.co=y.createRange()
y=$.aj
y.toString
y=y.createElement("base")
H.j(y,"$isda")
y.href=z.baseURI
z=$.aj.head;(z&&C.K).L(z,y)}z=$.aj
if(z.body==null){z.toString
y=z.createElement("body")
z.body=H.j(y,"$isbR")}z=$.aj
if(!!this.$isbR)x=z.body
else{y=a.tagName
z.toString
x=z.createElement(y)
z=$.aj.body;(z&&C.q).L(z,x)}if("createContextualFragment" in window.Range.prototype&&!C.a.A(C.U,a.tagName)){z=$.co;(z&&C.C).cA(z,x)
z=$.co
w=(z&&C.C).dP(z,b)}else{x.innerHTML=b
w=$.aj.createDocumentFragment()
for(z=J.l(w);y=x.firstChild,y!=null;)z.L(w,y)}z=$.aj.body
if(x==null?z!=null:x!==z)J.d2(x)
c.b5(w)
C.i.dD(document,w)
return w},function(a,b,c){return this.P(a,b,c,null)},"dQ",null,null,"geh",5,5,null],
cD:function(a,b,c,d){a.textContent=null
this.L(a,this.P(a,b,c,d))},
cC:function(a,b){return this.cD(a,b,null,null)},
a2:function(a,b){return a.getAttribute(b)},
dq:function(a,b){return a.removeAttribute(b)},
gc0:function(a){return new W.bd(a,"change",!1,[W.T])},
gc1:function(a){return new W.bd(a,"mousedown",!1,[W.X])},
gc2:function(a){return new W.bd(a,"mousemove",!1,[W.X])},
gc3:function(a){return new W.bd(a,"mouseup",!1,[W.X])},
gc4:function(a){return new W.bd(a,H.v(W.dp(a)),!1,[W.aO])},
$isR:1,
"%":";Element"},
hs:{"^":"p:18;",
$1:function(a){return!!J.C(H.j(a,"$isu")).$isR}},
lV:{"^":"P;0n:height=,0m:width=","%":"HTMLEmbedElement"},
T:{"^":"k;",
gc9:function(a){return W.cF(a.target)},
dk:function(a,b,c,d){return a.initEvent(b,!0,!0)},
$isT:1,
"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
O:{"^":"k;",
dC:function(a,b,c,d){H.n(c,{func:1,args:[W.T]})
if(c!=null)this.d9(a,b,c,!1)},
d9:function(a,b,c,d){return a.addEventListener(b,H.bh(H.n(c,{func:1,args:[W.T]}),1),!1)},
dU:function(a,b){return a.dispatchEvent(b)},
$isO:1,
"%":"AbsoluteOrientationSensor|Accelerometer|AccessibleNode|AmbientLightSensor|AnalyserNode|Animation|ApplicationCache|AudioBufferSourceNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioNode|AudioPannerNode|AudioScheduledSourceNode|AudioWorkletNode|BackgroundFetchRegistration|BatteryManager|BiquadFilterNode|BluetoothDevice|BluetoothRemoteGATTCharacteristic|BroadcastChannel|CanvasCaptureMediaStreamTrack|ChannelMergerNode|ChannelSplitterNode|Clipboard|ConstantSourceNode|ConvolverNode|DOMApplicationCache|DataChannel|DedicatedWorkerGlobalScope|DelayNode|DynamicsCompressorNode|EventSource|FileReader|FontFaceSet|GainNode|Gyroscope|IDBDatabase|IDBTransaction|IIRFilterNode|JavaScriptAudioNode|LinearAccelerationSensor|MIDIAccess|MIDIInput|MIDIOutput|MIDIPort|Magnetometer|MediaDevices|MediaElementAudioSourceNode|MediaKeySession|MediaQueryList|MediaRecorder|MediaSource|MediaStream|MediaStreamAudioDestinationNode|MediaStreamAudioSourceNode|MediaStreamTrack|MessagePort|MojoInterfaceInterceptor|NetworkInformation|Notification|OfflineResourceList|OrientationSensor|Oscillator|OscillatorNode|PannerNode|PaymentRequest|Performance|PermissionStatus|PresentationAvailability|PresentationConnection|PresentationConnectionList|PresentationRequest|RTCDTMFSender|RTCDataChannel|RTCPeerConnection|RealtimeAnalyserNode|RelativeOrientationSensor|RemotePlayback|ScreenOrientation|ScriptProcessorNode|Sensor|ServiceWorker|ServiceWorkerContainer|ServiceWorkerGlobalScope|ServiceWorkerRegistration|SharedWorker|SharedWorkerGlobalScope|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|StereoPannerNode|USB|VR|VRDevice|VRDisplay|VRSession|WaveShaperNode|WebSocket|Worker|WorkerGlobalScope|WorkerPerformance|XMLHttpRequest|XMLHttpRequestEventTarget|XMLHttpRequestUpload|mozRTCPeerConnection|webkitAudioPannerNode|webkitRTCPeerConnection;EventTarget;ea|eb|ee|ef"},
aq:{"^":"h0;",$isaq:1,"%":"File"},
mb:{"^":"jE;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isaq")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.aq]},
$isz:1,
$asz:function(){return[W.aq]},
$asq:function(){return[W.aq]},
$ism:1,
$asm:function(){return[W.aq]},
$isa:1,
$asa:function(){return[W.aq]},
$asr:function(){return[W.aq]},
"%":"FileList"},
mc:{"^":"O;0k:length=","%":"FileWriter"},
mf:{"^":"P;0k:length=","%":"HTMLFormElement"},
ar:{"^":"k;",$isar:1,"%":"Gamepad"},
hD:{"^":"P;","%":"HTMLHeadElement"},
mg:{"^":"k;0k:length=","%":"History"},
mh:{"^":"jS;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isu")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.u]},
$isz:1,
$asz:function(){return[W.u]},
$asq:function(){return[W.u]},
$ism:1,
$asm:function(){return[W.u]},
$isa:1,
$asa:function(){return[W.u]},
$asr:function(){return[W.u]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
hE:{"^":"hk;","%":"HTMLDocument"},
mi:{"^":"P;0n:height=,0m:width=","%":"HTMLIFrameElement"},
ml:{"^":"k;0n:height=,0m:width=","%":"ImageBitmap"},
mm:{"^":"k;0n:height=,0m:width=","%":"ImageData"},
mn:{"^":"P;0n:height=,0m:width=","%":"HTMLImageElement"},
ds:{"^":"P;0n:height=,0m:width=",$isds:1,"%":"HTMLInputElement"},
b1:{"^":"dV;",$isb1:1,"%":"KeyboardEvent"},
hZ:{"^":"k;",
l:function(a){return String(a)},
$ishZ:1,
"%":"Location"},
i5:{"^":"P;","%":"HTMLAudioElement;HTMLMediaElement"},
mv:{"^":"k;0k:length=","%":"MediaList"},
mw:{"^":"jZ;",
i:function(a,b){return P.a1(a.get(H.v(b)))},
G:function(a,b){var z,y
H.n(b,{func:1,ret:-1,args:[P.e,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.a1(y.value[1]))}},
gK:function(a){var z=H.h([],[P.e])
this.G(a,new W.i7(z))
return z},
gk:function(a){return a.size},
$asW:function(){return[P.e,null]},
$isN:1,
$asN:function(){return[P.e,null]},
"%":"MIDIInputMap"},
i7:{"^":"p:2;a",
$2:function(a,b){return C.a.j(this.a,a)}},
mx:{"^":"k_;",
i:function(a,b){return P.a1(a.get(H.v(b)))},
G:function(a,b){var z,y
H.n(b,{func:1,ret:-1,args:[P.e,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.a1(y.value[1]))}},
gK:function(a){var z=H.h([],[P.e])
this.G(a,new W.i8(z))
return z},
gk:function(a){return a.size},
$asW:function(){return[P.e,null]},
$isN:1,
$asN:function(){return[P.e,null]},
"%":"MIDIOutputMap"},
i8:{"^":"p:2;a",
$2:function(a,b){return C.a.j(this.a,a)}},
at:{"^":"k;",$isat:1,"%":"MimeType"},
my:{"^":"k1;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isat")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.at]},
$isz:1,
$asz:function(){return[W.at]},
$asq:function(){return[W.at]},
$ism:1,
$asm:function(){return[W.at]},
$isa:1,
$asa:function(){return[W.at]},
$asr:function(){return[W.at]},
"%":"MimeTypeArray"},
X:{"^":"dV;",
gc_:function(a){var z,y,x,w,v,u
if(!!a.offsetX)return new P.b6(a.offsetX,a.offsetY,[P.H])
else{z=a.target
if(!J.C(W.cF(z)).$isR)throw H.d(P.B("offsetX is only supported on elements"))
y=H.j(W.cF(z),"$isR")
z=a.clientX
x=a.clientY
w=[P.H]
v=y.getBoundingClientRect()
u=v.left
v=v.top
H.t(new P.b6(u,v,w),"$isb6",w,"$asb6")
if(typeof z!=="number")return z.b8()
if(typeof x!=="number")return x.b8()
return new P.b6(C.k.ce(z-u),C.k.ce(x-v),w)}},
$isX:1,
"%":";DragEvent|MouseEvent"},
a5:{"^":"hY;a",
gX:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.d(P.cB("No elements"))
if(y>1)throw H.d(P.cB("More than one element"))
return z.firstChild},
H:function(a,b){var z,y,x,w,v
H.t(b,"$ism",[W.u],"$asm")
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=J.l(y),v=0;v<x;++v)w.L(y,z.firstChild)
return},
h:function(a,b,c){var z,y
H.j(c,"$isu")
z=this.a
y=z.childNodes
if(b<0||b>=y.length)return H.f(y,b)
J.fe(z,c,y[b])},
gw:function(a){var z=this.a.childNodes
return new W.dr(z,z.length,-1,[H.aU(C.W,z,"r",0)])},
gk:function(a){return this.a.childNodes.length},
i:function(a,b){var z=this.a.childNodes
if(b<0||b>=z.length)return H.f(z,b)
return z[b]},
$asq:function(){return[W.u]},
$asm:function(){return[W.u]},
$asa:function(){return[W.u]}},
u:{"^":"O;0e5:previousSibling=",
e6:function(a){var z=a.parentNode
if(z!=null)J.bM(z,a)},
l:function(a){var z=a.nodeValue
return z==null?this.cJ(a):z},
L:function(a,b){return a.appendChild(b)},
dr:function(a,b){return a.removeChild(b)},
ds:function(a,b,c){return a.replaceChild(b,c)},
$isu:1,
"%":"DocumentFragment|DocumentType|ShadowRoot;Node"},
ij:{"^":"k3;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isu")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.u]},
$isz:1,
$asz:function(){return[W.u]},
$asq:function(){return[W.u]},
$ism:1,
$asm:function(){return[W.u]},
$isa:1,
$asa:function(){return[W.u]},
$asr:function(){return[W.u]},
"%":"NodeList|RadioNodeList"},
mH:{"^":"P;0n:height=,0m:width=","%":"HTMLObjectElement"},
mJ:{"^":"O;0n:height=,0m:width=","%":"OffscreenCanvas"},
mK:{"^":"k;0n:height=,0m:width=","%":"PaintSize"},
av:{"^":"k;0k:length=",$isav:1,"%":"Plugin"},
mM:{"^":"k7;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isav")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.av]},
$isz:1,
$asz:function(){return[W.av]},
$asq:function(){return[W.av]},
$ism:1,
$asm:function(){return[W.av]},
$isa:1,
$asa:function(){return[W.av]},
$asr:function(){return[W.av]},
"%":"PluginArray"},
mO:{"^":"X;0n:height=,0m:width=","%":"PointerEvent"},
iD:{"^":"k;",
dP:function(a,b){return a.createContextualFragment(b)},
cA:function(a,b){return a.selectNodeContents(b)},
"%":"Range"},
mT:{"^":"kd;",
i:function(a,b){return P.a1(a.get(H.v(b)))},
G:function(a,b){var z,y
H.n(b,{func:1,ret:-1,args:[P.e,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.a1(y.value[1]))}},
gK:function(a){var z=H.h([],[P.e])
this.G(a,new W.iK(z))
return z},
gk:function(a){return a.size},
$asW:function(){return[P.e,null]},
$isN:1,
$asN:function(){return[P.e,null]},
"%":"RTCStatsReport"},
iK:{"^":"p:2;a",
$2:function(a,b){return C.a.j(this.a,a)}},
mU:{"^":"k;0n:height=,0m:width=","%":"Screen"},
dK:{"^":"P;0k:length=",$isdK:1,"%":"HTMLSelectElement"},
aw:{"^":"O;",$isaw:1,"%":"SourceBuffer"},
mW:{"^":"eb;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isaw")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.aw]},
$isz:1,
$asz:function(){return[W.aw]},
$asq:function(){return[W.aw]},
$ism:1,
$asm:function(){return[W.aw]},
$isa:1,
$asa:function(){return[W.aw]},
$asr:function(){return[W.aw]},
"%":"SourceBufferList"},
ax:{"^":"k;",$isax:1,"%":"SpeechGrammar"},
mX:{"^":"kj;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isax")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.ax]},
$isz:1,
$asz:function(){return[W.ax]},
$asq:function(){return[W.ax]},
$ism:1,
$asm:function(){return[W.ax]},
$isa:1,
$asa:function(){return[W.ax]},
$asr:function(){return[W.ax]},
"%":"SpeechGrammarList"},
ay:{"^":"k;0k:length=",$isay:1,"%":"SpeechRecognitionResult"},
n_:{"^":"km;",
i:function(a,b){return this.br(a,H.v(b))},
G:function(a,b){var z,y
H.n(b,{func:1,ret:-1,args:[P.e,P.e]})
for(z=0;!0;++z){y=this.dm(a,z)
if(y==null)return
b.$2(y,this.br(a,y))}},
gK:function(a){var z=H.h([],[P.e])
this.G(a,new W.iX(z))
return z},
gk:function(a){return a.length},
br:function(a,b){return a.getItem(b)},
dm:function(a,b){return a.key(b)},
$asW:function(){return[P.e,P.e]},
$isN:1,
$asN:function(){return[P.e,P.e]},
"%":"Storage"},
iX:{"^":"p:19;a",
$2:function(a,b){return C.a.j(this.a,a)}},
az:{"^":"k;",$isaz:1,"%":"CSSStyleSheet|StyleSheet"},
j1:{"^":"P;",
P:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.ar(a,b,c,d)
z=W.hr("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
z.toString
new W.a5(y).H(0,new W.a5(z))
return y},
"%":"HTMLTableElement"},
n2:{"^":"P;",
P:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.ar(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.H.P(z.createElement("table"),b,c,d)
z.toString
z=new W.a5(z)
x=z.gX(z)
x.toString
z=new W.a5(x)
w=z.gX(z)
y.toString
w.toString
new W.a5(y).H(0,new W.a5(w))
return y},
"%":"HTMLTableRowElement"},
n3:{"^":"P;",
P:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.ar(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.H.P(z.createElement("table"),b,c,d)
z.toString
z=new W.a5(z)
x=z.gX(z)
y.toString
x.toString
new W.a5(y).H(0,new W.a5(x))
return y},
"%":"HTMLTableSectionElement"},
dQ:{"^":"P;",$isdQ:1,"%":"HTMLTemplateElement"},
n4:{"^":"k;0m:width=","%":"TextMetrics"},
aA:{"^":"O;",$isaA:1,"%":"TextTrack"},
aB:{"^":"O;",$isaB:1,"%":"TextTrackCue|VTTCue"},
n5:{"^":"ku;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isaB")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.aB]},
$isz:1,
$asz:function(){return[W.aB]},
$asq:function(){return[W.aB]},
$ism:1,
$asm:function(){return[W.aB]},
$isa:1,
$asa:function(){return[W.aB]},
$asr:function(){return[W.aB]},
"%":"TextTrackCueList"},
n6:{"^":"ef;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isaA")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.aA]},
$isz:1,
$asz:function(){return[W.aA]},
$asq:function(){return[W.aA]},
$ism:1,
$asm:function(){return[W.aA]},
$isa:1,
$asa:function(){return[W.aA]},
$asr:function(){return[W.aA]},
"%":"TextTrackList"},
n7:{"^":"k;0k:length=","%":"TimeRanges"},
aC:{"^":"k;",$isaC:1,"%":"Touch"},
n8:{"^":"kz;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isaC")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.aC]},
$isz:1,
$asz:function(){return[W.aC]},
$asq:function(){return[W.aC]},
$ism:1,
$asm:function(){return[W.aC]},
$isa:1,
$asa:function(){return[W.aC]},
$asr:function(){return[W.aC]},
"%":"TouchList"},
n9:{"^":"k;0k:length=","%":"TrackDefaultList"},
dV:{"^":"T;","%":"CompositionEvent|FocusEvent|TextEvent|TouchEvent;UIEvent"},
nn:{"^":"k;",
l:function(a){return String(a)},
"%":"URL"},
nq:{"^":"i5;0n:height=,0m:width=","%":"HTMLVideoElement"},
nr:{"^":"O;0k:length=","%":"VideoTrackList"},
ns:{"^":"O;0n:height=,0m:width=","%":"VisualViewport"},
nt:{"^":"k;0m:width=","%":"VTTRegion"},
aO:{"^":"X;",
gdT:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.d(P.B("deltaY is not supported"))},
$isaO:1,
"%":"WheelEvent"},
jg:{"^":"O;",
gdF:function(a){var z,y,x
z=P.H
y=new P.ag(0,$.K,[z])
x=H.n(new W.jh(new P.kq(y,[z])),{func:1,ret:-1,args:[P.H]})
this.dg(a)
this.dt(a,W.em(x,z))
return y},
dt:function(a,b){return a.requestAnimationFrame(H.bh(H.n(b,{func:1,ret:-1,args:[P.H]}),1))},
dg:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isdY:1,
"%":"DOMWindow|Window"},
jh:{"^":"p:20;a",
$1:function(a){var z=this.a
a=H.c8(H.cP(a),{futureOr:1,type:H.o(z,0)})
z=z.a
if(z.a!==0)H.ai(P.cB("Future already completed"))
z.aB(a)}},
e_:{"^":"u;",$ise_:1,"%":"Attr"},
nz:{"^":"kF;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isap")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.ap]},
$isz:1,
$asz:function(){return[W.ap]},
$asq:function(){return[W.ap]},
$ism:1,
$asm:function(){return[W.ap]},
$isa:1,
$asa:function(){return[W.ap]},
$asr:function(){return[W.ap]},
"%":"CSSRuleList"},
nB:{"^":"hm;",
l:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
F:function(a,b){var z
if(b==null)return!1
if(!H.aT(b,"$isY",[P.H],"$asY"))return!1
if(a.left===b.left)if(a.top===b.top){z=J.l(b)
z=a.width===z.gm(b)&&a.height===z.gn(b)}else z=!1
else z=!1
return z},
gB:function(a){return W.e4(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gn:function(a){return a.height},
gm:function(a){return a.width},
"%":"ClientRect|DOMRect"},
nC:{"^":"kH;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isar")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.ar]},
$isz:1,
$asz:function(){return[W.ar]},
$asq:function(){return[W.ar]},
$ism:1,
$asm:function(){return[W.ar]},
$isa:1,
$asa:function(){return[W.ar]},
$asr:function(){return[W.ar]},
"%":"GamepadList"},
nH:{"^":"kJ;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isu")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.u]},
$isz:1,
$asz:function(){return[W.u]},
$asq:function(){return[W.u]},
$ism:1,
$asm:function(){return[W.u]},
$isa:1,
$asa:function(){return[W.u]},
$asr:function(){return[W.u]},
"%":"MozNamedAttrMap|NamedNodeMap"},
nI:{"^":"kL;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isay")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.ay]},
$isz:1,
$asz:function(){return[W.ay]},
$asq:function(){return[W.ay]},
$ism:1,
$asm:function(){return[W.ay]},
$isa:1,
$asa:function(){return[W.ay]},
$asr:function(){return[W.ay]},
"%":"SpeechRecognitionResultList"},
nJ:{"^":"kN;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return a[b]},
h:function(a,b,c){H.j(c,"$isaz")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b<0||b>=a.length)return H.f(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.az]},
$isz:1,
$asz:function(){return[W.az]},
$asq:function(){return[W.az]},
$ism:1,
$asm:function(){return[W.az]},
$isa:1,
$asa:function(){return[W.az]},
$asr:function(){return[W.az]},
"%":"StyleSheetList"},
jo:{"^":"dz;df:a<",
G:function(a,b){var z,y,x,w,v,u
H.n(b,{func:1,ret:-1,args:[P.e,P.e]})
for(z=this.gK(this),y=z.length,x=this.a,w=J.l(x),v=0;v<z.length;z.length===y||(0,H.E)(z),++v){u=z[v]
b.$2(u,w.a2(x,u))}},
gK:function(a){var z,y,x,w,v
z=this.a.attributes
y=H.h([],[P.e])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.f(z,w)
v=H.j(z[w],"$ise_")
if(v.namespaceURI==null)C.a.j(y,v.name)}return y},
$asW:function(){return[P.e,P.e]},
$asN:function(){return[P.e,P.e]}},
jy:{"^":"jo;a",
i:function(a,b){return J.ch(this.a,H.v(b))},
gk:function(a){return this.gK(this).length}},
bC:{"^":"iY;a,b,c,$ti"},
bd:{"^":"bC;a,b,c,$ti"},
jA:{"^":"iZ;a,b,c,d,e,$ti",p:{
ak:function(a,b,c,d,e){var z=W.em(new W.jB(c),W.T)
if(z!=null&&!0)J.ff(a,b,z,!1)
return new W.jA(0,a,b,z,!1,[e])}}},
jB:{"^":"p:21;a",
$1:function(a){return this.a.$1(H.j(a,"$isT"))}},
bD:{"^":"c;a",
d5:function(a){var z,y
z=$.cU()
if(z.a===0){for(y=0;y<262;++y)z.h(0,C.T[y],W.l7())
for(y=0;y<12;++y)z.h(0,C.v[y],W.l8())}},
a0:function(a){return $.f2().A(0,W.b_(a))},
U:function(a,b,c){var z,y,x
z=W.b_(a)
y=$.cU()
x=y.i(0,H.b(z)+"::"+b)
if(x==null)x=y.i(0,"*::"+b)
if(x==null)return!1
return H.c6(x.$4(a,b,c,this))},
$isae:1,
p:{
e2:function(a){var z,y
z=document.createElement("a")
y=new W.ke(z,window.location)
y=new W.bD(y)
y.d5(a)
return y},
nF:[function(a,b,c,d){H.j(a,"$isR")
H.v(b)
H.v(c)
H.j(d,"$isbD")
return!0},"$4","l7",16,0,12],
nG:[function(a,b,c,d){var z,y,x
H.j(a,"$isR")
H.v(b)
H.v(c)
z=H.j(d,"$isbD").a
y=z.a
y.href=c
x=y.hostname
z=z.b
if(!(x==z.hostname&&y.port==z.port&&y.protocol==z.protocol))if(x==="")if(y.port===""){z=y.protocol
z=z===":"||z===""}else z=!1
else z=!1
else z=!0
return z},"$4","l8",16,0,12]}},
r:{"^":"c;$ti",
gw:function(a){return new W.dr(a,this.gk(a),-1,[H.aU(this,a,"r",0)])}},
dD:{"^":"c;a",
a0:function(a){return C.a.bz(this.a,new W.il(a))},
U:function(a,b,c){return C.a.bz(this.a,new W.ik(a,b,c))},
$isae:1},
il:{"^":"p:9;a",
$1:function(a){return H.j(a,"$isae").a0(this.a)}},
ik:{"^":"p:9;a,b,c",
$1:function(a){return H.j(a,"$isae").U(this.a,this.b,this.c)}},
kf:{"^":"c;",
d6:function(a,b,c,d){var z,y,x
this.a.H(0,c)
z=b.aT(0,new W.kg())
y=b.aT(0,new W.kh())
this.b.H(0,z)
x=this.c
x.H(0,C.V)
x.H(0,y)},
a0:function(a){return this.a.A(0,W.b_(a))},
U:["cM",function(a,b,c){var z,y
z=W.b_(a)
y=this.c
if(y.A(0,H.b(z)+"::"+b))return this.d.dE(c)
else if(y.A(0,"*::"+b))return this.d.dE(c)
else{y=this.b
if(y.A(0,H.b(z)+"::"+b))return!0
else if(y.A(0,"*::"+b))return!0
else if(y.A(0,H.b(z)+"::*"))return!0
else if(y.A(0,"*::*"))return!0}return!1}],
$isae:1},
kg:{"^":"p:10;",
$1:function(a){return!C.a.A(C.v,H.v(a))}},
kh:{"^":"p:10;",
$1:function(a){return C.a.A(C.v,H.v(a))}},
kr:{"^":"kf;e,a,b,c,d",
U:function(a,b,c){if(this.cM(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(J.ch(a,"template")==="")return this.e.A(0,b)
return!1},
p:{
ed:function(){var z,y,x,w,v
z=P.e
y=P.cw(C.u,z)
x=H.o(C.u,0)
w=H.n(new W.ks(),{func:1,ret:z,args:[x]})
v=H.h(["TEMPLATE"],[z])
y=new W.kr(y,P.a2(null,null,null,z),P.a2(null,null,null,z),P.a2(null,null,null,z),null)
y.d6(null,new H.i3(C.u,w,[x,z]),v,null)
return y}}},
ks:{"^":"p:22;",
$1:function(a){return"TEMPLATE::"+H.b(H.v(a))}},
kp:{"^":"c;",
a0:function(a){var z=J.C(a)
if(!!z.$isdJ)return!1
z=!!z.$isJ
if(z&&W.b_(a)==="foreignObject")return!1
if(z)return!0
return!1},
U:function(a,b,c){if(b==="is"||C.j.cF(b,"on"))return!1
return this.a0(a)},
$isae:1},
dr:{"^":"c;a,b,c,0d,$ti",
sbp:function(a){this.d=H.A(a,H.o(this,0))},
t:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.sbp(J.bn(this.a,z))
this.c=z
return!0}this.sbp(null)
this.c=y
return!1},
gE:function(a){return this.d},
$isas:1},
js:{"^":"c;a",$isO:1,$isdY:1,p:{
jt:function(a){if(a===window)return H.j(a,"$isdY")
else return new W.js(a)}}},
ae:{"^":"c;"},
ke:{"^":"c;a,b",$isnm:1},
eg:{"^":"c;a",
b5:function(a){new W.kC(this).$2(a,null)},
a7:function(a,b){if(b==null)J.d2(a)
else J.bM(b,a)},
dw:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.fz(a)
x=J.ch(y.gdf(),"is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.a7(t)}v="element unprintable"
try{v=J.bq(a)}catch(t){H.a7(t)}try{u=W.b_(a)
this.dv(H.j(a,"$isR"),b,z,v,u,H.j(y,"$isN"),H.v(x))}catch(t){if(H.a7(t) instanceof P.aH)throw t
else{this.a7(a,b)
window
s="Removing corrupted element "+H.b(v)
if(typeof console!="undefined")window.console.warn(s)}}},
dv:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
if(c){this.a7(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")window.console.warn(z)
return}if(!this.a.a0(a)){this.a7(a,b)
window
z="Removing disallowed element <"+H.b(e)+"> from "+H.b(b)
if(typeof console!="undefined")window.console.warn(z)
return}if(g!=null)if(!this.a.U(a,"is",g)){this.a7(a,b)
window
z="Removing disallowed type extension <"+H.b(e)+' is="'+g+'">'
if(typeof console!="undefined")window.console.warn(z)
return}z=f.gK(f)
y=H.h(z.slice(0),[H.o(z,0)])
for(x=f.gK(f).length-1,z=f.a,w=J.l(z);x>=0;--x){if(x>=y.length)return H.f(y,x)
v=y[x]
if(!this.a.U(a,J.fN(v),w.a2(z,v))){window
u="Removing disallowed attribute <"+H.b(e)+" "+v+'="'+H.b(w.a2(z,v))+'">'
if(typeof console!="undefined")window.console.warn(u)
w.a2(z,v)
w.dq(z,v)}}if(!!J.C(a).$isdQ)this.b5(a.content)},
$ismF:1},
kC:{"^":"p:23;a",
$2:function(a,b){var z,y,x,w,v,u
x=this.a
switch(a.nodeType){case 1:x.dw(a,b)
break
case 8:case 11:case 3:case 4:break
default:x.a7(a,b)}z=a.lastChild
for(x=a==null;null!=z;){y=null
try{y=J.fB(z)}catch(w){H.a7(w)
v=H.j(z,"$isu")
if(x){u=v.parentNode
if(u!=null)J.bM(u,v)}else J.bM(a,v)
z=null
y=a.lastChild}if(z!=null)this.$2(z,a)
z=H.j(y,"$isu")}}},
jr:{"^":"k+hc;"},
ju:{"^":"k+q;"},
jv:{"^":"ju+r;"},
jw:{"^":"k+q;"},
jx:{"^":"jw+r;"},
jD:{"^":"k+q;"},
jE:{"^":"jD+r;"},
jR:{"^":"k+q;"},
jS:{"^":"jR+r;"},
jZ:{"^":"k+W;"},
k_:{"^":"k+W;"},
k0:{"^":"k+q;"},
k1:{"^":"k0+r;"},
k2:{"^":"k+q;"},
k3:{"^":"k2+r;"},
k6:{"^":"k+q;"},
k7:{"^":"k6+r;"},
kd:{"^":"k+W;"},
ea:{"^":"O+q;"},
eb:{"^":"ea+r;"},
ki:{"^":"k+q;"},
kj:{"^":"ki+r;"},
km:{"^":"k+W;"},
kt:{"^":"k+q;"},
ku:{"^":"kt+r;"},
ee:{"^":"O+q;"},
ef:{"^":"ee+r;"},
ky:{"^":"k+q;"},
kz:{"^":"ky+r;"},
kE:{"^":"k+q;"},
kF:{"^":"kE+r;"},
kG:{"^":"k+q;"},
kH:{"^":"kG+r;"},
kI:{"^":"k+q;"},
kJ:{"^":"kI+r;"},
kK:{"^":"k+q;"},
kL:{"^":"kK+r;"},
kM:{"^":"k+q;"},
kN:{"^":"kM+r;"}}],["","",,P,{"^":"",
a1:function(a){var z,y,x,w,v
if(a==null)return
z=P.Q(P.e,null)
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.E)(y),++w){v=H.v(y[w])
z.h(0,v,a[v])}return z},
kZ:function(a,b){var z={}
a.G(0,new P.l_(z))
return z},
dj:function(){var z=$.di
if(z==null){z=J.ce(window.navigator.userAgent,"Opera",0)
$.di=z}return z},
hi:function(){var z,y
z=$.df
if(z!=null)return z
y=$.dg
if(y==null){y=J.ce(window.navigator.userAgent,"Firefox",0)
$.dg=y}if(y)z="-moz-"
else{y=$.dh
if(y==null){y=!P.dj()&&J.ce(window.navigator.userAgent,"Trident/",0)
$.dh=y}if(y)z="-ms-"
else z=P.dj()?"-o-":"-webkit-"}$.df=z
return z},
l_:{"^":"p:7;a",
$2:function(a,b){this.a[a]=b}}}],["","",,P,{"^":"",io:{"^":"iJ;",$isio:1,"%":"IDBOpenDBRequest|IDBVersionChangeRequest"},iJ:{"^":"O;","%":";IDBRequest"},np:{"^":"T;0c9:target=","%":"IDBVersionChangeEvent"}}],["","",,P,{"^":"",
lq:function(a){return Math.sqrt(a)},
e3:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
b6:{"^":"c;a1:a>,V:b>,$ti",
l:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
F:function(a,b){if(b==null)return!1
return H.aT(b,"$isb6",[P.H],null)&&this.a==J.bQ(b)&&this.b==b.gV(b)},
gB:function(a){var z,y,x
z=J.ao(this.a)
y=J.ao(this.b)
y=P.e3(P.e3(0,z),y)
x=536870911&y+((67108863&y)<<3)
x^=x>>>11
return 536870911&x+((16383&x)<<15)}},
k8:{"^":"c;"},
Y:{"^":"k8;$ti"}}],["","",,P,{"^":"",fX:{"^":"k;",$isfX:1,"%":"SVGAnimatedLength"},lW:{"^":"J;0n:height=,0m:width=","%":"SVGFEBlendElement"},lX:{"^":"J;0n:height=,0m:width=","%":"SVGFEColorMatrixElement"},lY:{"^":"J;0n:height=,0m:width=","%":"SVGFEComponentTransferElement"},lZ:{"^":"J;0n:height=,0m:width=","%":"SVGFECompositeElement"},m_:{"^":"J;0n:height=,0m:width=","%":"SVGFEConvolveMatrixElement"},m0:{"^":"J;0n:height=,0m:width=","%":"SVGFEDiffuseLightingElement"},m1:{"^":"J;0n:height=,0m:width=","%":"SVGFEDisplacementMapElement"},m2:{"^":"J;0n:height=,0m:width=","%":"SVGFEFloodElement"},m3:{"^":"J;0n:height=,0m:width=","%":"SVGFEGaussianBlurElement"},m4:{"^":"J;0n:height=,0m:width=","%":"SVGFEImageElement"},m5:{"^":"J;0n:height=,0m:width=","%":"SVGFEMergeElement"},m6:{"^":"J;0n:height=,0m:width=","%":"SVGFEMorphologyElement"},m7:{"^":"J;0n:height=,0m:width=","%":"SVGFEOffsetElement"},m8:{"^":"J;0n:height=,0m:width=","%":"SVGFESpecularLightingElement"},m9:{"^":"J;0n:height=,0m:width=","%":"SVGFETileElement"},ma:{"^":"J;0n:height=,0m:width=","%":"SVGFETurbulenceElement"},md:{"^":"J;0n:height=,0m:width=","%":"SVGFilterElement"},me:{"^":"bv;0n:height=,0m:width=","%":"SVGForeignObjectElement"},hz:{"^":"bv;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},bv:{"^":"J;","%":"SVGAElement|SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement|SVGTSpanElement|SVGTextContentElement|SVGTextElement|SVGTextPathElement|SVGTextPositioningElement;SVGGraphicsElement"},mo:{"^":"bv;0n:height=,0m:width=","%":"SVGImageElement"},b2:{"^":"k;",$isb2:1,"%":"SVGLength"},mt:{"^":"jU;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return this.T(a,b)},
h:function(a,b,c){H.j(c,"$isb2")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){return this.i(a,b)},
T:function(a,b){return a.getItem(b)},
$asq:function(){return[P.b2]},
$ism:1,
$asm:function(){return[P.b2]},
$isa:1,
$asa:function(){return[P.b2]},
$asr:function(){return[P.b2]},
"%":"SVGLengthList"},mu:{"^":"J;0n:height=,0m:width=","%":"SVGMaskElement"},b5:{"^":"k;",$isb5:1,"%":"SVGNumber"},mG:{"^":"k5;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return this.T(a,b)},
h:function(a,b,c){H.j(c,"$isb5")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){return this.i(a,b)},
T:function(a,b){return a.getItem(b)},
$asq:function(){return[P.b5]},
$ism:1,
$asm:function(){return[P.b5]},
$isa:1,
$asa:function(){return[P.b5]},
$asr:function(){return[P.b5]},
"%":"SVGNumberList"},mL:{"^":"J;0n:height=,0m:width=","%":"SVGPatternElement"},mN:{"^":"k;0k:length=","%":"SVGPointList"},mP:{"^":"k;0n:height=,0m:width=","%":"SVGRect"},mQ:{"^":"hz;0n:height=,0m:width=","%":"SVGRectElement"},dJ:{"^":"J;",$isdJ:1,"%":"SVGScriptElement"},n0:{"^":"ko;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return this.T(a,b)},
h:function(a,b,c){H.v(c)
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){return this.i(a,b)},
T:function(a,b){return a.getItem(b)},
$asq:function(){return[P.e]},
$ism:1,
$asm:function(){return[P.e]},
$isa:1,
$asa:function(){return[P.e]},
$asr:function(){return[P.e]},
"%":"SVGStringList"},J:{"^":"R;",
P:function(a,b,c,d){var z,y,x,w,v,u
z=H.h([],[W.ae])
C.a.j(z,W.e2(null))
C.a.j(z,W.ed())
C.a.j(z,new W.kp())
c=new W.eg(new W.dD(z))
y='<svg version="1.1">'+b+"</svg>"
z=document
x=z.body
w=(x&&C.q).dQ(x,y,c)
v=z.createDocumentFragment()
w.toString
z=new W.a5(w)
u=z.gX(z)
for(z=J.l(v);x=u.firstChild,x!=null;)z.L(v,x)
return v},
gc0:function(a){return new W.bd(a,"change",!1,[W.T])},
$isJ:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGGradientElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMetadataElement|SVGRadialGradientElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSymbolElement|SVGTitleElement|SVGViewElement;SVGElement"},n1:{"^":"bv;0n:height=,0m:width=","%":"SVGSVGElement"},bb:{"^":"k;",$isbb:1,"%":"SVGTransform"},na:{"^":"kB;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return this.T(a,b)},
h:function(a,b,c){H.j(c,"$isbb")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){return this.i(a,b)},
T:function(a,b){return a.getItem(b)},
$asq:function(){return[P.bb]},
$ism:1,
$asm:function(){return[P.bb]},
$isa:1,
$asa:function(){return[P.bb]},
$asr:function(){return[P.bb]},
"%":"SVGTransformList"},no:{"^":"bv;0n:height=,0m:width=","%":"SVGUseElement"},jT:{"^":"k+q;"},jU:{"^":"jT+r;"},k4:{"^":"k+q;"},k5:{"^":"k4+r;"},kn:{"^":"k+q;"},ko:{"^":"kn+r;"},kA:{"^":"k+q;"},kB:{"^":"kA+r;"}}],["","",,P,{"^":"",ac:{"^":"c;",$ism:1,
$asm:function(){return[P.al]},
$isa:1,
$asa:function(){return[P.al]},
$isj6:1}}],["","",,P,{"^":"",lw:{"^":"k;0k:length=","%":"AudioBuffer"},lx:{"^":"jp;",
i:function(a,b){return P.a1(a.get(H.v(b)))},
G:function(a,b){var z,y
H.n(b,{func:1,ret:-1,args:[P.e,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.a1(y.value[1]))}},
gK:function(a){var z=H.h([],[P.e])
this.G(a,new P.fZ(z))
return z},
gk:function(a){return a.size},
$asW:function(){return[P.e,null]},
$isN:1,
$asN:function(){return[P.e,null]},
"%":"AudioParamMap"},fZ:{"^":"p:2;a",
$2:function(a,b){return C.a.j(this.a,a)}},ly:{"^":"O;0k:length=","%":"AudioTrackList"},h_:{"^":"O;","%":"AudioContext|webkitAudioContext;BaseAudioContext"},mI:{"^":"h_;0k:length=","%":"OfflineAudioContext"},jp:{"^":"k+W;"}}],["","",,P,{"^":"",h1:{"^":"k;",$ish1:1,"%":"WebGLBuffer"},hy:{"^":"k;",$ishy:1,"%":"WebGLFramebuffer"},iB:{"^":"k;",$isiB:1,"%":"WebGLProgram"},mR:{"^":"k;",
by:function(a,b){return a.activeTexture(b)},
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
an:function(a){return P.a1(a.getContextAttributes())},
aX:function(a){return a.getError()},
aY:function(a,b){return a.getProgramInfoLog(b)},
aZ:function(a,b,c){return a.getProgramParameter(b,c)},
b0:function(a,b){return a.getShaderInfoLog(b)},
b1:function(a,b,c){return a.getShaderParameter(b,c)},
b2:function(a,b,c){return a.getUniformLocation(b,c)},
bY:function(a,b){return a.linkProgram(b)},
c5:function(a,b,c){return a.pixelStorei(b,c)},
b6:function(a,b,c){return a.shaderSource(b,c)},
b7:function(a,b,c,d){return a.stencilFunc(b,c,d)},
aS:function(a,b,c,d,e,f,g,h,i,j){this.aM(a,b,c,d,e,f,g)
return},
ca:function(a,b,c,d,e,f,g){return this.aS(a,b,c,d,e,f,g,null,null,null)},
aM:function(a,b,c,d,e,f,g){return a.texImage2D(b,c,d,e,f,g)},
cb:function(a,b,c,d){return a.texParameteri(b,c,d)},
cf:function(a,b,c){return a.uniform1f(b,c)},
cg:function(a,b,c){return a.uniform1fv(b,c)},
ci:function(a,b,c){return a.uniform1i(b,c)},
cj:function(a,b,c){return a.uniform1iv(b,c)},
ck:function(a,b,c){return a.uniform2fv(b,c)},
cl:function(a,b,c){return a.uniform3fv(b,c)},
cm:function(a,b,c){return a.uniform4fv(b,c)},
cn:function(a,b,c,d){return a.uniformMatrix3fv(b,!1,d)},
co:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
cp:function(a,b){return a.useProgram(b)},
cr:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
ct:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
"%":"WebGLRenderingContext"},mS:{"^":"k;",
dH:function(a,b){return a.beginTransformFeedback(b)},
dK:function(a,b){return a.bindVertexArray(b)},
dS:function(a){return a.createVertexArray()},
dV:function(a,b,c,d,e){return a.drawArraysInstanced(b,c,d,e)},
dW:function(a,b,c,d,e,f){return a.drawElementsInstanced(b,c,d,e,f)},
dX:function(a){return a.endTransformFeedback()},
ed:function(a,b,c,d){this.dB(a,b,H.t(c,"$isa",[P.e],"$asa"),d)
return},
dB:function(a,b,c,d){return a.transformFeedbackVaryings(b,c,d)},
ee:function(a,b,c){return a.vertexAttribDivisor(b,c)},
by:function(a,b){return a.activeTexture(b)},
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
an:function(a){return P.a1(a.getContextAttributes())},
aX:function(a){return a.getError()},
aY:function(a,b){return a.getProgramInfoLog(b)},
aZ:function(a,b,c){return a.getProgramParameter(b,c)},
b0:function(a,b){return a.getShaderInfoLog(b)},
b1:function(a,b,c){return a.getShaderParameter(b,c)},
b2:function(a,b,c){return a.getUniformLocation(b,c)},
bY:function(a,b){return a.linkProgram(b)},
c5:function(a,b,c){return a.pixelStorei(b,c)},
b6:function(a,b,c){return a.shaderSource(b,c)},
b7:function(a,b,c,d){return a.stencilFunc(b,c,d)},
aS:function(a,b,c,d,e,f,g,h,i,j){this.aM(a,b,c,d,e,f,g)
return},
ca:function(a,b,c,d,e,f,g){return this.aS(a,b,c,d,e,f,g,null,null,null)},
aM:function(a,b,c,d,e,f,g){return a.texImage2D(b,c,d,e,f,g)},
cb:function(a,b,c,d){return a.texParameteri(b,c,d)},
cf:function(a,b,c){return a.uniform1f(b,c)},
cg:function(a,b,c){return a.uniform1fv(b,c)},
ci:function(a,b,c){return a.uniform1i(b,c)},
cj:function(a,b,c){return a.uniform1iv(b,c)},
ck:function(a,b,c){return a.uniform2fv(b,c)},
cl:function(a,b,c){return a.uniform3fv(b,c)},
cm:function(a,b,c){return a.uniform4fv(b,c)},
cn:function(a,b,c,d){return a.uniformMatrix3fv(b,!1,d)},
co:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
cp:function(a,b){return a.useProgram(b)},
cr:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
ct:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
"%":"WebGL2RenderingContext"},iP:{"^":"k;",$isiP:1,"%":"WebGLShader"},j2:{"^":"k;",$isj2:1,"%":"WebGLTexture"},j7:{"^":"k;",$isj7:1,"%":"WebGLUniformLocation"},je:{"^":"k;",$isje:1,"%":"WebGLVertexArrayObject"}}],["","",,P,{"^":"",mY:{"^":"kl;",
gk:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.I(b,a,null,null,null))
return P.a1(this.dl(a,b))},
h:function(a,b,c){H.j(c,"$isN")
throw H.d(P.B("Cannot assign element of immutable List."))},
u:function(a,b){return this.i(a,b)},
dl:function(a,b){return a.item(b)},
$asq:function(){return[[P.N,,,]]},
$ism:1,
$asm:function(){return[[P.N,,,]]},
$isa:1,
$asa:function(){return[[P.N,,,]]},
$asr:function(){return[[P.N,,,]]},
"%":"SQLResultSetRowList"},kk:{"^":"k+q;"},kl:{"^":"kk+r;"}}],["","",,G,{"^":"",
ji:function(a){var z,y,x,w
z=H.h(a.split("\n"),[P.e])
for(y=0;y<z.length;y=x){x=y+1
w=""+x+": "
if(y>=z.length)return H.f(z,y)
C.a.h(z,y,w+H.b(z[y]))}return C.a.ab(z,"\n")},
e0:function(a,b,c){var z,y,x,w
z=J.l(a)
y=z.bN(a,b)
z.b6(a,y,c)
z.bK(a,y)
x=H.c6(z.b1(a,y,35713))
if(x!=null&&!x){w=z.b0(a,y)
P.an("E:Compilation failed:")
P.an("E:"+G.ji(c))
P.an("E:Failure:")
P.an(C.j.I("E:",w))
throw H.d(w)}return y},
bt:function(a,b){var z,y,x
H.t(a,"$isa",[T.i],"$asa")
z=a.length
b=new Float32Array(z*3)
for(y=0;y<a.length;++y){z=y*3
C.e.h(b,z,J.bQ(a[y]))
if(y>=a.length)return H.f(a,y)
C.e.h(b,z+1,J.cg(a[y]))
z+=2
if(y>=a.length)return H.f(a,y)
x=J.d0(a[y])
if(z>=b.length)return H.f(b,z)
b[z]=x}return b},
hv:function(a,b){var z,y
H.t(a,"$isa",[T.y],"$asa")
z=a.length
b=new Float32Array(z*2)
for(y=0;y<a.length;++y){z=y*2
C.e.h(b,z,J.bQ(a[y]))
if(y>=a.length)return H.f(a,y)
C.e.h(b,z+1,J.cg(a[y]))}return b},
hw:function(a,b){var z,y,x,w,v
H.t(a,"$isa",[T.aN],"$asa")
z=a.length
b=new Float32Array(z*4)
for(y=0;y<a.length;++y){z=y*4
C.e.h(b,z,J.bQ(a[y]))
if(y>=a.length)return H.f(a,y)
C.e.h(b,z+1,J.cg(a[y]))
x=z+2
if(y>=a.length)return H.f(a,y)
w=J.d0(a[y])
v=b.length
if(x>=v)return H.f(b,x)
b[x]=w
z+=3
if(y>=a.length)return H.f(a,y)
w=J.fE(a[y])
if(z>=v)return H.f(b,z)
b[z]=w}return b},
hu:function(a,b){var z,y
H.t(a,"$isa",[[P.a,P.x]],"$asa")
z=a.length
b=new Uint32Array(z*4)
for(y=0;y<a.length;++y){z=y*4
C.o.h(b,z,J.bn(a[y],0))
if(y>=a.length)return H.f(a,y)
C.o.h(b,z+1,J.bn(a[y],1))
if(y>=a.length)return H.f(a,y)
C.o.h(b,z+2,J.bn(a[y],2))
if(y>=a.length)return H.f(a,y)
C.o.h(b,z+3,J.bn(a[y],3))}return b},
jP:function(a,b){var z,y,x,w,v,u,t,s,r,q
for(z=a.e,y=new H.ad(z,[H.o(z,0)]),y=y.gw(y),x=b.x,w=[[P.a,P.x]],v=[P.al],u=[T.aN],t=[T.i],s=[T.y];y.t();){r=y.d
if(!x.ak(0,r)){r="Dropping unnecessary attribute: "+H.b(r)
if($.et>0)H.bJ("I: "+r)
continue}q=z.i(0,r)
switch($.a8().i(0,r).a){case"vec2":b.a3(r,G.hv(H.bL(q,"$isa",s,"$asa"),null),2)
break
case"vec3":b.a3(r,G.bt(H.bL(q,"$isa",t,"$asa"),null),3)
break
case"vec4":b.a3(r,G.hw(H.bL(q,"$isa",u,"$asa"),null),4)
break
case"float":b.a3(r,new Float32Array(H.c2(H.bL(q,"$isa",v,"$asa"))),1)
break
case"uvec4":b.a3(r,G.hu(H.bL(q,"$isa",w,"$asa"),null),4)
break}}},
cq:function(a,b,c){var z=G.i6(a,b.d,4,b.e.x)
z.a4(G.bt(c.d,null))
z.cO(c.cV())
G.jP(c,z)
return z},
aK:{"^":"c;"},
aM:{"^":"aK;d,a,b,c",
aw:function(){return this.d},
l:function(a){var z,y,x,w
z=H.h(["{"+new H.dU(H.l4(this)).l(0)+"}["+H.b(this.a)+"]"],[P.e])
for(y=this.d,x=new H.ad(y,[H.o(y,0)]),x=x.gw(x);x.t();){w=x.d
C.a.j(z,H.b(w)+": "+H.b(y.i(0,w)))}return C.a.ab(z,"\n")}},
h2:{"^":"dL;"},
h4:{"^":"c;0a,b",
bW:function(a,b,c){J.fw(this.a,b)
if(c>0)J.fT(this.a,b,c)},
cs:function(a,b,c,d,e,f,g,h){J.cd(this.a,34962,b)
J.fU(this.a,c,d,e,!1,g,h)}},
hx:{"^":"c;a,b,c,d,e"},
ab:{"^":"c;aj:a>,a8:b>,a9:c>",p:{
M:function(a,b,c){return new G.ab(a,b,c)}}},
bs:{"^":"c;aj:a>,a8:b>,a9:c>,d"},
cp:{"^":"c;a,b,c,d,e",
Y:function(a){switch($.a8().i(0,a).a){case"vec2":this.e.h(0,a,H.h([],[T.y]))
break
case"vec3":this.e.h(0,a,H.h([],[T.i]))
break
case"vec4":this.e.h(0,a,H.h([],[T.aN]))
break
case"float":this.e.h(0,a,H.h([],[P.al]))
break
case"uvec4":this.e.h(0,a,H.h([],[[P.a,P.x]]))
break}},
cP:function(a){var z,y,x
z=this.d.length
for(y=this.c,x=0;x<a;++x,z+=4)C.a.j(y,new G.bs(z,z+1,z+2,z+3))},
a4:function(a){var z,y,x,w,v
H.t(a,"$isa",[T.i],"$asa")
for(z=a.length,y=this.d,x=0;x<a.length;a.length===z||(0,H.E)(a),++x){w=a[x]
w.toString
v=new T.i(new Float32Array(3))
v.C(w)
C.a.j(y,v)}},
cQ:function(a){var z,y,x,w,v
H.t(a,"$isa",[T.i],"$asa")
z=this.d
y=z.length
C.a.j(this.b,new G.ab(y,y+1,y+2))
for(x=0;x<3;++x){w=a[x]
v=new T.i(new Float32Array(3))
v.C(w)
C.a.j(z,v)}},
at:function(a,b){var z,y,x,w,v,u,t
z=[T.y]
H.t(b,"$isa",z,"$asa")
y=H.t(this.e.i(0,a),"$isa",z,"$asa")
for(z=b.length,x=y&&C.a,w=0;w<b.length;b.length===z||(0,H.E)(b),++w){v=b[w]
v.toString
u=new Float32Array(2)
t=v.a
u[1]=t[1]
u[0]=t[0]
x.j(y,new T.y(u))}},
au:function(a,b){var z,y,x,w,v,u
z=[T.i]
H.t(b,"$isa",z,"$asa")
y=H.t(this.e.i(0,a),"$isa",z,"$asa")
for(z=b.length,x=y&&C.a,w=0;w<b.length;b.length===z||(0,H.E)(b),++w){v=b[w]
v.toString
u=new T.i(new Float32Array(3))
u.C(v)
x.j(y,u)}},
cV:function(){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.c
x=new Array(z.length*3+y.length*6)
x.fixed$length=Array
w=H.h(x,[P.x])
for(x=z.length,v=0,u=0;u<z.length;z.length===x||(0,H.E)(z),++u){t=z[u]
C.a.h(w,v,t.a)
C.a.h(w,v+1,t.b)
C.a.h(w,v+2,t.c)
v+=3}for(z=y.length,u=0;u<y.length;y.length===z||(0,H.E)(y),++u){s=y[u]
x=s.a
C.a.h(w,v,x)
C.a.h(w,v+1,s.b)
r=s.c
C.a.h(w,v+2,r)
C.a.h(w,v+3,x)
C.a.h(w,v+4,r)
C.a.h(w,v+5,s.d)
v+=6}return w},
l:function(a){var z,y,x,w,v
z=H.h(["GB:","V["+this.d.length+"]","f3["+this.b.length+"]","f4["+this.c.length+"]"],[P.e])
for(y=this.e,x=new H.ad(y,[H.o(y,0)]),x=x.gw(x);x.t();){w=x.d
v=$.a8().i(0,w).a
C.a.j(z,H.b(w)+"["+v+","+y.i(0,w).length+"]")}return C.a.ab(z," ")}},
b3:{"^":"aK;"},
dG:{"^":"b3;x,y,z,Q,d,a,b,c",
av:function(a,b){var z,y,x,w
z=this.x.a
y=z[0]
x=a.length
if(b>=x)return H.f(a,b)
a[b]=y
y=b+1
w=z[1]
if(y>=x)return H.f(a,y)
a[y]=w
w=b+2
z=z[2]
if(w>=x)return H.f(a,w)
a[w]=z
z=b+8
w=this.y.a
y=w[0]
if(z>=x)return H.f(a,z)
a[z]=y
y=b+9
z=w[1]
if(y>=x)return H.f(a,y)
a[y]=z
z=b+10
w=w[2]
if(z>=x)return H.f(a,z)
a[z]=w
w=b+12
z=this.z.a
y=z[0]
if(w>=x)return H.f(a,w)
a[w]=y
y=b+13
w=z[1]
if(y>=x)return H.f(a,y)
a[y]=w
w=b+14
z=z[2]
if(w>=x)return H.f(a,w)
a[w]=z
z=b+7
if(z>=x)return H.f(a,z)
a[z]=this.Q},
l:function(a){return"PL: p:"+H.b(this.x)+"  r:"+this.Q}},
dk:{"^":"b3;x,y,z,Q,ch,cx,d,a,b,c",
av:function(a,b){var z,y,x,w
z=b+4
y=this.x.a
x=y[0]
w=a.length
if(z>=w)return H.f(a,z)
a[z]=x
x=b+5
z=y[1]
if(x>=w)return H.f(a,x)
a[x]=z
z=b+6
y=y[2]
if(z>=w)return H.f(a,z)
a[z]=y
y=b+8
z=this.y.a
x=z[0]
if(y>=w)return H.f(a,y)
a[y]=x
x=b+9
y=z[1]
if(x>=w)return H.f(a,x)
a[x]=y
y=b+10
z=z[2]
if(y>=w)return H.f(a,y)
a[y]=z
z=b+12
y=this.z.a
x=y[0]
if(z>=w)return H.f(a,z)
a[z]=x
x=b+13
z=y[1]
if(x>=w)return H.f(a,x)
a[x]=z
z=b+14
y=y[2]
if(z>=w)return H.f(a,z)
a[z]=y},
l:function(a){return"DL: p:"+H.b(this.x)}},
dM:{"^":"b3;x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,d,a,b,c",
av:function(a,b){var z,y,x,w
z=this.x.a
y=z[0]
x=a.length
if(b>=x)return H.f(a,b)
a[b]=y
y=b+1
w=z[1]
if(y>=x)return H.f(a,y)
a[y]=w
w=b+2
z=z[2]
if(w>=x)return H.f(a,w)
a[w]=z
z=b+4
w=this.y.a
y=w[0]
if(z>=x)return H.f(a,z)
a[z]=y
y=b+5
z=w[1]
if(y>=x)return H.f(a,y)
a[y]=z
z=b+6
w=w[2]
if(z>=x)return H.f(a,z)
a[z]=w
w=b+8
z=this.z.a
y=z[0]
if(w>=x)return H.f(a,w)
a[w]=y
y=b+9
w=z[1]
if(y>=x)return H.f(a,y)
a[y]=w
w=b+10
z=z[2]
if(w>=x)return H.f(a,w)
a[w]=z
z=b+12
w=this.Q.a
y=w[0]
if(z>=x)return H.f(a,z)
a[z]=y
y=b+13
z=w[1]
if(y>=x)return H.f(a,y)
a[y]=z
z=b+14
w=w[2]
if(z>=x)return H.f(a,z)
a[z]=w
w=b+7
if(w>=x)return H.f(a,w)
a[w]=this.ch
w=b+11
z=Math.cos(H.eq(this.cx))
if(w>=x)return H.f(a,w)
a[w]=z
z=b+15
if(z>=x)return H.f(a,z)
a[z]=this.cy},
l:function(a){return"SL: p:"+H.b(this.x)+"  d:"+H.b(this.y)+"  r:"+this.ch+"  a:"+H.b(this.cx)}},
hG:{"^":"aM;x,y,z,d,a,b,c",
aw:function(){var z,y,x
z=this.y
y=this.z
G.hH(z,y,this.x)
x=this.d
x.h(0,"uLightDescs",z)
x.h(0,"uLightTypes",y)
return x},
p:{
hH:function(a,b,c){var z,y,x,w,v
H.t(c,"$isa",[G.b3],"$asa")
C.e.bX(a,0,a.length,0)
C.e.bX(b,0,4,0)
for(z=c.length,y=0,x=0;x<c.length;c.length===z||(0,H.E)(c),++x){w=c[x]
if(w.c){w.av(a,y*16)
v=w.d
if(y>=4)return H.f(b,y)
b[y]=v;++y}}}}},
dS:{"^":"c;a,b,c"},
dR:{"^":"c;a,b,c"},
i4:{"^":"aM;d,a,b,c",p:{
bA:function(a){var z=P.Q(P.e,P.c)
z.h(0,"cDepthTest",!0)
z.h(0,"cDepthWrite",!0)
z.h(0,"cBlendEquation",$.eE())
z.h(0,"cStencilFunc",$.eR())
return new G.i4(z,a,!1,!0)}}},
dB:{"^":"aK;d,e,f,r,x,0y,z,Q,0ch,0cx,cy,a,b,c",
saE:function(a){this.cx=H.t(a,"$isa",[P.x],"$asa")},
ba:function(a,b,c){var z,y
C.j.aA(a,0)
H.j(b,"$isac")
this.cy.h(0,a,b)
z=this.d
y=this.r.i(0,a)
J.cd(z.a,34962,y)
J.cY(z.a,34962,b,35048)},
af:function(a){this.ch=a
this.ba("aPosition",a,3)},
cW:function(){var z=this.cx
if(z!=null)return z.length
return this.ch.length/3|0},
a3:function(a,b,c){var z,y,x,w,v
z=J.cV(a,0)===105
if(z&&this.z===0)this.z=C.d.cN(b.length,c)
y=this.r
x=this.d
y.h(0,a,J.bO(x.a))
this.ba(a,b,c)
w=$.a8().i(0,a)
if(w==null)throw H.d("Unknown canonical "+a)
v=this.x.i(0,a)
J.bN(x.a,this.e)
x.bW(0,v,z?1:0)
x.cs(0,y.i(0,a),v,w.bb(),5126,!1,0,0)},
a4:function(a){var z,y,x,w
z=this.r
y=this.d
z.h(0,"aPosition",J.bO(y.a))
this.af(a)
x=$.a8().i(0,"aPosition")
if(x==null)throw H.d("Unknown canonical aPosition")
w=this.x.i(0,"aPosition")
J.bN(y.a,this.e)
y.bW(0,w,0)
y.cs(0,z.i(0,"aPosition"),w,x.bb(),5126,!1,0,0)},
a5:function(a){var z,y,x
H.t(a,"$isa",[P.x],"$asa")
z=this.ch.length
if(z<768){this.saE(new Uint8Array(H.c2(a)))
this.Q=5121}else if(z<196608){this.saE(new Uint16Array(H.c2(a)))
this.Q=5123}else{this.saE(new Uint32Array(H.c2(a)))
this.Q=5125}z=this.d
J.bN(z.a,this.e)
y=this.y
x=this.cx
J.cd(z.a,34963,y)
J.cY(z.a,34963,x,35048)},
cO:function(a){H.t(a,"$isa",[P.x],"$asa")
this.y=J.bO(this.d.a)
this.a5(a)},
l:function(a){var z,y,x,w
z=this.cx
y=H.h(["Faces:"+(z==null?0:z.length)],[P.e])
for(z=this.cy,x=new H.ad(z,[H.o(z,0)]),x=x.gw(x);x.t();){w=x.d
C.a.j(y,H.b(w)+":"+z.i(0,w).length)}return"MESH["+H.b(this.a)+"] "+C.a.ab(y,"  ")},
p:{
i6:function(a,b,c,d){var z=P.e
return new G.dB(b,J.cZ(b.a),c,P.Q(z,P.c),d,0,-1,P.Q(z,P.ac),"meshdata:"+a,!1,!0)}}},
ir:{"^":"aM;x,y,z,Q,ch,cx,cy,db,d,a,b,c",
cR:function(a,b){var z
if(typeof a!=="number")return a.ef()
if(typeof b!=="number")return H.aE(b)
z=a/b
if(this.z===z)return
this.z=z
this.be()},
be:function(){var z,y,x,w,v,u
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
aw:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.x.d
y=z.a
x=y[12]
w=y[13]
v=y[14]
u=new T.i(new Float32Array(3))
u.q(x,w,v)
v=this.d
v.h(0,"uEyePosition",u)
u=this.cy
u.C(z)
z=u.a
z[12]=0
z[13]=0
z[14]=0
z[15]=1
t=-y[12]
s=-y[13]
r=-y[14]
y=J.C(t)
x=!!y.$isaN
q=x?t.gcu(t):1
if(!!y.$isi){p=t.ga1(t)
s=t.gV(t)
r=t.gam(t)
t=p}else if(x){p=t.ga1(t)
s=t.gV(t)
r=t.gam(t)
t=p}else if(!(typeof t==="number")){t=null
s=null
r=null}y=z[0]
if(typeof t!=="number")return H.aE(t)
x=z[4]
if(typeof s!=="number")return H.aE(s)
w=z[8]
if(typeof r!=="number")return H.aE(r)
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
c.C(this.db)
c.bZ(0,u)
v.h(0,"uPerspectiveViewMatrix",c)
return v}},
lU:{"^":"c;"},
iI:{"^":"aK;d,e,f,r,x,y,z,Q,0ch,a,b,c",
cZ:function(a,b,c,d){var z,y,x,w,v,u,t
for(z=this.e.d,y=z.length,x=this.y,w=this.d,v=this.r,u=0;u<z.length;z.length===y||(0,H.E)(z),++u){t=z[u]
x.h(0,t,J.d1(w.a,v,t))}for(z=this.f.d,y=z.length,u=0;u<z.length;z.length===y||(0,H.E)(z),++u){t=z[u]
x.h(0,t,J.d1(w.a,v,t))}},
d1:function(){var z,y,x,w
z=this.z
y=this.y
if(z.a===y.a&&this.Q.a===this.x.a)return H.h([],[P.e])
x=H.h([],[P.e])
for(y=new H.ad(y,[H.o(y,0)]),y=y.gw(y);y.t();){w=y.d
if(!z.ak(0,w))C.a.j(x,w)}for(z=this.x,z=P.jW(z,z.r,H.o(z,0)),y=this.Q;z.t();){w=z.d
if(!y.A(0,w))C.a.j(x,w)}return x},
d4:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
H.t(b,"$isN",[P.e,P.c],"$asN")
z=Date.now()
for(y=new H.ad(b,[H.o(b,0)]),y=y.gw(y),x=this.d,w=this.y,v=this.z,u=0;y.t();){t=y.d
switch(J.cV(t,0)){case 117:if(w.ak(0,t)){s=b.i(0,t)
if(v.ak(0,t))H.bJ("E:"+(t+" : group ["+H.b(a)+"] overwrites ["+t+"]"))
v.h(0,t,a)
r=$.a8().i(0,t)
if(r==null)H.ai("unknown "+t)
q=w.i(0,t)
t=r.a
switch(t){case"int":if(r.c===0){H.L(s)
J.ci(x.a,q,s)}else if(!!J.C(s).$ishK)J.fR(x.a,q,s)
break
case"float":if(r.c===0){H.er(s)
J.fP(x.a,q,s)}else if(!!J.C(s).$isac)J.fQ(x.a,q,s)
break
case"mat4":if(r.c===0){t=H.a6(s,"$isU").a
J.d8(x.a,q,!1,t)}else if(!!J.C(s).$isac)J.d8(x.a,q,!1,s)
break
case"mat3":if(r.c===0){t=H.a6(s,"$isaJ").a
J.d7(x.a,q,!1,t)}else if(!!J.C(s).$isac)J.d7(x.a,q,!1,s)
break
case"vec4":t=r.c
p=x.a
if(t===0)J.d6(p,q,H.a6(s,"$isaN").a)
else J.d6(p,q,H.j(s,"$isac"))
break
case"vec3":t=r.c
p=x.a
if(t===0)J.d5(p,q,H.a6(s,"$isi").a)
else J.d5(p,q,H.j(s,"$isac"))
break
case"vec2":t=r.c
p=x.a
if(t===0)J.d4(p,q,H.a6(s,"$isy").a)
else J.d4(p,q,H.j(s,"$isac"))
break
case"sampler2D":case"sampler2DShadow":t=this.ch
if(typeof t!=="number")return H.aE(t)
J.cW(x.a,33984+t)
t=H.a6(s,"$iscD").b
J.bo(x.a,3553,t)
t=this.ch
J.ci(x.a,q,t)
t=this.ch
if(typeof t!=="number")return t.I()
this.ch=t+1
break
case"samplerCube":t=this.ch
if(typeof t!=="number")return H.aE(t)
J.cW(x.a,33984+t)
t=H.a6(s,"$iscD").b
J.bo(x.a,34067,t)
t=this.ch
J.ci(x.a,q,t)
t=this.ch
if(typeof t!=="number")return t.I()
this.ch=t+1
break
default:H.bJ("Error: unknow uniform type: "+t)}++u}break
case 99:s=b.i(0,t)
switch(t){case"cDepthTest":t=J.aG(s,!0)
p=x.a
if(t)J.bp(p,2929)
else J.cf(p,2929)
break
case"cStencilFunc":H.a6(s,"$isdS")
t=s.a
p=x.a
if(t===1281)J.cf(p,2960)
else{J.bp(p,2960)
p=s.b
o=s.c
J.fL(x.a,t,p,o)}break
case"cDepthWrite":H.c6(s)
J.fp(x.a,s)
break
case"cBlendEquation":H.a6(s,"$isdR")
t=s.a
p=x.a
if(t===1281)J.cf(p,3042)
else{J.bp(p,3042)
p=s.b
o=s.c
J.fj(x.a,p,o)
J.fi(x.a,t)}break}++u
break}}n=P.hn(0,0,0,Date.now()-new P.bT(z,!1).a,0,0)
""+u
n.l(0)},
cU:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
H.t(b,"$isa",[G.aM],"$asa")
Date.now()
z=this.d
J.fS(z.a,this.r)
this.ch=0
y=this.z
if(y.a>0){y.f=null
y.e=null
y.d=null
y.c=null
y.b=null
y.a=0
y.bj()}for(y=b.length,x=0;x<b.length;b.length===y||(0,H.E)(b),++x){w=b[x]
this.d4(w.a,w.aw())}y=this.Q
y.aa(0)
for(v=a.cy,v=new H.ad(v,[H.o(v,0)]),v=v.gw(v);v.t();)y.j(0,v.d)
u=this.d1()
if(u.length!==0)P.an("E:"+(H.b(this.a)+" "+a.f+": uninitialized inputs: "+H.b(u)))
y=a.d
v=a.e
J.bN(y.a,v)
t=this.e.f.length>0
v=a.f
y=a.cW()
s=a.Q
r=a.z
if(t)J.fg(z.a,v)
if(s!==-1){q=z.a
if(r>1)J.fu(q,v,y,s,0,r)
else J.ft(q,v,y,s,0)}else{s=z.a
if(r>1)J.fs(s,v,0,y,r)
else J.fr(s,v,0,y)}if(t)J.fx(z.a)},
p:{
cz:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=P.e
y=P.a2(null,null,null,z)
x=c.b
w=d.b
v=H.t(c.f,"$isa",[z],"$asa")
u=J.fn(b.a)
t=G.e0(b.a,35633,x)
J.cX(b.a,u,t)
s=G.e0(b.a,35632,w)
J.cX(b.a,u,s)
if(v.length>0)J.fO(b.a,u,v,35980)
J.fJ(b.a,u)
if(!H.c6(J.fI(b.a,u,35714)))H.ai(J.fH(b.a,u))
z=new G.iI(b,c,d,u,P.cw(c.c,z),P.Q(z,P.c),P.Q(z,z),y,a,!1,!0)
z.cZ(a,b,c,d)
return z}}},
F:{"^":"c;a,b,c",
bb:function(){switch(this.a){case"float":return 1
case"vec2":return 2
case"vec3":case"uvec3":return 3
case"vec4":case"uvec4":return 4
default:return-1}}},
iQ:{"^":"c;a,0b,c,d,e,f,r,x",
as:function(a){var z,y,x,w,v
H.t(a,"$isa",[P.e],"$asa")
for(z=a.length,y=this.c,x=this.x,w=0;w<a.length;a.length===z||(0,H.E)(a),++w){v=a[w]
C.a.j(y,v)
x.h(0,v,this.r);++this.r}C.a.aq(y)},
S:function(a){var z,y,x
H.t(a,"$isa",[P.e],"$asa")
for(z=a.length,y=this.d,x=0;x<a.length;a.length===z||(0,H.E)(a),++x)C.a.j(y,a[x])
C.a.aq(y)},
ae:function(a){var z,y,x
H.t(a,"$isa",[P.e],"$asa")
for(z=a.length,y=this.e,x=0;x<a.length;a.length===z||(0,H.E)(a),++x)C.a.j(y,a[x])
C.a.aq(y)},
bd:function(a,b){var z=[P.e]
this.b=this.bf(!0,H.t(a,"$isa",z,"$asa"),H.t(b,"$isa",z,"$asa"))},
ax:function(a){return this.bd(a,null)},
bc:function(a,b){var z=[P.e]
this.b=this.bf(!1,H.t(a,"$isa",z,"$asa"),H.t(b,"$isa",z,"$asa"))},
d_:function(a){return this.bc(a,null)},
bf:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=[P.e]
H.t(b,"$isa",z,"$asa")
H.t(c,"$isa",z,"$asa")
y=this.c
x=y.length===0
w=H.h(["#version 300 es","precision highp float;","precision highp sampler2DShadow;",""],z)
for(z=y.length,v=this.x,u=0;u<y.length;y.length===z||(0,H.E)(y),++u){t=y[u]
s=$.a8().i(0,t)
C.a.j(w,"layout (location="+H.b(v.i(0,t))+") in "+s.a+" "+H.b(t)+";")}C.a.j(w,"")
r=x?"in":"out"
if(x)C.a.j(w,"out vec4 oFragColor;")
for(z=this.e,y=z.length,u=0;u<z.length;z.length===y||(0,H.E)(z),++u){q=z[u]
s=$.a8().i(0,q)
C.a.j(w,r+" "+s.a+" "+H.b(q)+";")}for(z=this.f,y=z.length,u=0;u<z.length;z.length===y||(0,H.E)(z),++u){q=z[u]
s=$.a8().i(0,q)
C.a.j(w,r+" "+s.a+" "+H.b(q)+";")}C.a.j(w,"")
for(z=this.d,y=z.length,u=0;u<z.length;z.length===y||(0,H.E)(z),++u){q=z[u]
s=$.a8().i(0,q)
v=s.c
p=v===0?"":"["+v+"]"
C.a.j(w,"uniform "+s.a+" "+H.b(q)+p+";")}C.a.j(w,"")
if(c!=null)C.a.H(w,c)
if(a)C.a.j(w,"void main(void) {")
C.a.H(w,b)
if(a)C.a.j(w,"}")
return C.a.ab(w,"\n")},
p:{
ba:function(a){var z,y
z=P.e
y=[z]
return new G.iQ(a,H.h([],y),H.h([],y),H.h([],y),H.h([],y),0,P.Q(z,P.x))}}},
dL:{"^":"aK;",
aU:function(){var z,y,x
z=this.f
y=this.d.a
x=z.a
x[0]=y[2]
x[1]=y[6]
x[2]=y[10]
return z},
b3:function(){var z,y,x
z=this.r
y=this.d.a
x=z.a
x[0]=y[1]
x[1]=y[5]
x[2]=y[9]
return z},
ap:function(a,b,c){var z=this.d.a
z[12]=a
z[13]=b
z[14]=c}},
j3:{"^":"c;a,b,c,d,e,f,r"},
cD:{"^":"c;",
l:function(a){return"Texture["+this.a+", "+this.c+"]"}},
hI:{"^":"cD;f,a,b,c,d,e"}}],["","",,R,{"^":"",
jY:function(a,b,c,d){var z,y,x,w,v
z=document.createElement("div")
y=z.style
x=""+c+"px"
y.width=x
x=""+d+"px"
y.height=x
y.color=a
y.background=a
for(w=0;w<c;++w){v=H.j(W.jz("span",null),"$isR")
y=v.style
y.width="1px"
x=""+d+"px"
y.height=x
x=(y&&C.y).az(y,"float")
y.setProperty(x,"left","")
x=C.y.az(y,"opacity")
y.setProperty(x,"0.9","")
y.background=b
C.r.L(z,v)}return z},
jb:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=d.a
if(z[1]===0)return
y=b*0.5
x=c*C.t.dZ(y/c)
w=-x
v=d.ao(y).ao(1/z[1])
u=H.h([],[T.i])
for(t=w;t<=x;t+=c)for(s=w;s<=x;s+=c){z=new Float32Array(3)
r=new T.i(z)
z[0]=t
z[1]=0
z[2]=s
r.j(0,v)
C.a.j(u,r)
z=new Float32Array(3)
r=new T.i(z)
z[0]=t
z[1]=0
z[2]=s
r.b9(0,v)
C.a.j(u,r)}for(q=0;q<8;++q){t=(q&1)===1?1:-1
p=(q&2)===2?1:-1
s=(q&4)===4?1:-1
if(t>0){z=p*y
r=s*y
o=new Float32Array(3)
o[0]=t*y
o[1]=z
o[2]=r
C.a.j(u,new T.i(o))
o=new Float32Array(3)
o[0]=-t*y
o[1]=z
o[2]=r
C.a.j(u,new T.i(o))}if(p>0){z=t*y
r=s*y
o=new Float32Array(3)
o[0]=z
o[1]=p*y
o[2]=r
C.a.j(u,new T.i(o))
o=new Float32Array(3)
o[0]=z
o[1]=-p*y
o[2]=r
C.a.j(u,new T.i(o))}if(s>0){z=t*y
r=p*y
o=new Float32Array(3)
o[0]=z
o[1]=r
o[2]=s*y
C.a.j(u,new T.i(o))
o=new Float32Array(3)
o[0]=z
o[1]=r
o[2]=-s*y
C.a.j(u,new T.i(o))}}a.af(G.bt(u,null))
z=new Array(u.length)
z.fixed$length=Array
n=H.h(z,[P.x])
for(q=0;q<u.length;++q)C.a.h(n,q,q)
a.a5(n)},
hA:function(a){var z,y,x
z=a.a
y=z[0]
if(y!==0){x=z[1]
if(x!==0){z=new T.i(new Float32Array(3))
z.q(-x,y,0)
return z}z=z[2]
if(z!==0){x=new T.i(new Float32Array(3))
x.q(-z,0,y)
return x}z=new T.i(new Float32Array(3))
z.q(0,1,1)
return z}else{y=z[1]
if(y===0){z=new T.i(new Float32Array(3))
z.q(1,1,0)
return z}z=z[2]
if(z===0){z=new T.i(new Float32Array(3))
z.q(1,0,1)
return z}x=new T.i(new Float32Array(3))
x.q(0,-z,y)
return x}},
jd:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
c.toString
z=new T.i(new Float32Array(3))
z.C(c)
z.D(0)
y=b.I(0,z.ao(d))
x=H.h([b,y],[T.i])
w=R.hA(c)
w.D(0)
w.N(0,Math.tan(H.eq(e))*d)
for(v=0;v<8;++v){z=new Float32Array(3)
u=new T.i(z)
u.C(w)
t=new Float32Array(4)
new T.iC(t).cB(c,v*2*3.141592653589793/8)
s=z[0]
r=z[1]
q=z[2]
p=t[0]
o=t[1]
n=t[2]
m=t[3]
l=m*s+o*q-n*r
k=m*r+n*s-p*q
j=m*q+p*r-o*s
t=-p
i=t*s-o*r-n*q
h=-n
g=-o
z[0]=l*m+i*t+k*h-j*g
z[1]=k*m+i*g+j*t-l*h
z[2]=j*m+i*h+l*g-k*t
u.j(0,y)
C.a.j(x,u)}f=H.h([],[P.x])
for(v=1;v<x.length;++v){C.a.j(f,0)
C.a.j(f,v)}for(v=3;z=x.length,v<z;++v){C.a.j(f,v-1)
C.a.j(f,v)}C.a.j(f,z-1)
C.a.j(f,2)
for(v=2;v<x.length;++v)if(v%2===0){C.a.j(f,1)
C.a.j(f,v)}a.af(G.bt(x,null))
a.a5(f)},
jc:function(a,b,c){var z,y,x,w,v,u,t
z=H.h([],[T.i])
y=H.h([],[P.x])
for(x=$.cR(),w=0;w<12;++w){v=x[w]
C.a.j(y,z.length)
C.a.j(y,12)
u=new T.i(new Float32Array(3))
u.C(v)
u.N(0,c)
b.toString
t=new T.i(new Float32Array(3))
t.C(b)
t.j(0,u)
C.a.j(z,t)}C.a.j(z,b)
a.af(G.bt(z,null))
a.a5(y)},
iV:{"^":"c;",
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
y.L(z,this.b)
y.L(z,this.d)
y.L(z,this.c)}},
iW:{"^":"iV;e,f,a,b,c,d",
d3:function(a,b){var z,y,x,w,v,u
z=++this.e
if(a-this.f<1000)return
y=z*1000/1000
this.e=0
this.f=a
this.b.textContent=C.t.ec(y,2)+" fps"
C.r.cC(this.c,b)
x=C.d.a_(30*C.t.dL(y),90)
if(x<0)x=0
if(x>30)x=30
z=this.d
w=H.j(z.firstChild,"$isR")
v=w.style
u=""+x+"px"
v.height=u
C.r.L(z,w)},
d2:function(a){return this.d3(a,"")}}}],["","",,A,{"^":"",
es:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
H.t(e,"$isa",[G.aM],"$asa")
if(!b.c)return
z=b.dx
z.C(c)
y=b.d
z.bZ(0,y)
x=b.ch
if(x!=null&&b.cx!=null){H.b(b)
w=C.a.ge3(e)
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
v.dO(new T.aJ(u))
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
w.h(0,"uTransformationMatrix",y)
w.h(0,"uModelMatrix",z)
w.h(0,"uNormalMatrix",v)
C.a.j(e,x)
a.cU(b.cx,e,d)
if(0>=e.length)return H.f(e,-1)
e.pop()}for(y=b.cy,x=y.length,r=0;r<y.length;y.length===x||(0,H.E)(y),++r)A.es(a,y[r],z,d,e)},
b4:{"^":"dL;ch,cx,cy,db,dx,d,e,f,r,x,a,b,c",
l:function(a){return"NODE["+H.b(this.a)+"]"}},
c_:{"^":"aK;d,e,f,a,b,c"},
iH:{"^":"aK;d,e,f,r,x,y,z,Q,a,b,c",
cT:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.d
y=this.r
x=this.z
w=this.Q
v=z.a
z=z.b
J.fh(v.a,36160,z)
J.fV(v.a,this.x,this.y,x,w)
if(y!==0)J.fk(v.a,y)
for(z=this.f,y=z.length,x=P.e,w=P.c,u=0;u<z.length;z.length===y||(0,H.E)(z),++u){t=z[u]
if(!t.c)continue
v=t.d
if(!v.c)continue
s=t.e
C.a.j(s,new G.aM(P.Q(x,w),"transforms",!1,!0))
r=new T.U(new Float32Array(16))
r.J()
for(q=t.f,p=q.length,o=0;o<q.length;q.length===p||(0,H.E)(q),++o)A.es(v,q[o],r,a,s)
if(0>=s.length)return H.f(s,-1)
s.pop()}},
cS:function(){return this.cT(null)},
p:{
dI:function(a,b,c){var z=new A.iH(c,b,H.h([],[A.c_]),17664,0,0,0,0,a,!1,!0)
z.d=new G.hx(b,null,null,null,null)
return z}}}}],["","",,V,{}],["","",,B,{"^":"",
he:function(a5,a6,a7,a8,a9,b0,b1,b2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
z=-b0
y=-b1
x=new T.i(new Float32Array(3))
x.q(z,y,b2)
w=new T.i(new Float32Array(3))
w.q(b0,y,b2)
v=new T.i(new Float32Array(3))
v.q(b0,b1,b2)
u=new T.i(new Float32Array(3))
u.q(z,b1,b2)
t=-b2
s=new T.i(new Float32Array(3))
s.q(z,y,t)
r=new T.i(new Float32Array(3))
r.q(z,b1,t)
q=new T.i(new Float32Array(3))
q.q(b0,b1,t)
p=new T.i(new Float32Array(3))
p.q(b0,y,t)
o=new T.i(new Float32Array(3))
o.q(z,b1,t)
n=new T.i(new Float32Array(3))
n.q(z,b1,b2)
m=new T.i(new Float32Array(3))
m.q(b0,b1,b2)
l=new T.i(new Float32Array(3))
l.q(b0,b1,t)
k=new T.i(new Float32Array(3))
k.q(b0,y,b2)
j=new T.i(new Float32Array(3))
j.q(z,y,b2)
i=new T.i(new Float32Array(3))
i.q(z,y,t)
h=new T.i(new Float32Array(3))
h.q(b0,y,t)
g=new T.i(new Float32Array(3))
g.q(b0,y,t)
f=new T.i(new Float32Array(3))
f.q(b0,b1,t)
e=new T.i(new Float32Array(3))
e.q(b0,b1,b2)
d=new T.i(new Float32Array(3))
d.q(b0,y,b2)
c=new T.i(new Float32Array(3))
c.q(z,y,t)
b=new T.i(new Float32Array(3))
b.q(z,y,b2)
y=new T.i(new Float32Array(3))
y.q(z,b1,b2)
a=new T.i(new Float32Array(3))
a.q(z,b1,t)
t=[T.i]
a0=H.h([x,w,v,u,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,y,a],t)
z=new T.y(new Float32Array(2))
z.v(a7,a9)
y=new T.y(new Float32Array(2))
y.v(a6,a9)
x=new T.y(new Float32Array(2))
x.v(a6,a8)
w=new T.y(new Float32Array(2))
w.v(a7,a8)
v=new T.y(new Float32Array(2))
v.v(a6,a9)
u=new T.y(new Float32Array(2))
u.v(a6,a8)
s=new T.y(new Float32Array(2))
s.v(a7,a8)
r=new T.y(new Float32Array(2))
r.v(a7,a9)
q=new T.y(new Float32Array(2))
q.v(a7,a8)
p=new T.y(new Float32Array(2))
p.v(a7,a9)
o=new T.y(new Float32Array(2))
o.v(a6,a9)
n=new T.y(new Float32Array(2))
n.v(a6,a8)
m=new T.y(new Float32Array(2))
m.v(a6,a8)
l=new T.y(new Float32Array(2))
l.v(a7,a8)
k=new T.y(new Float32Array(2))
k.v(a7,a9)
j=new T.y(new Float32Array(2))
j.v(a6,a9)
i=new T.y(new Float32Array(2))
i.v(a6,a9)
h=new T.y(new Float32Array(2))
h.v(a6,a8)
g=new T.y(new Float32Array(2))
g.v(a7,a8)
f=new T.y(new Float32Array(2))
f.v(a7,a9)
e=new T.y(new Float32Array(2))
e.v(a7,a9)
d=new T.y(new Float32Array(2))
d.v(a6,a9)
c=new T.y(new Float32Array(2))
c.v(a6,a8)
b=new T.y(new Float32Array(2))
b.v(a7,a8)
a1=H.h([z,y,x,w,v,u,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b],[T.y])
a2=new G.cp(!1,H.h([],[G.ab]),H.h([],[G.bs]),H.h([],t),P.Q(P.e,[P.a,,]))
a2.Y("aTexUV")
a2.Y("aNormal")
a2.cP(6)
a2.a4(a0)
a2.at("aTexUV",a1)
for(a3=0;z=$.f1(),a3<6;++a3){a4=z[a3]
a2.au("aNormal",H.h([a4,a4,a4,a4],t))}return a2},
hF:function(a,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=[G.ab]
y=H.h([],z)
x=[T.i]
w=H.h([],x)
C.a.H(y,$.eQ())
C.a.H(w,$.cR())
for(v=0;v<a;++v,y=u){u=H.h([],z)
for(t=y.length,s=0;s<y.length;y.length===t||(0,H.E)(y),++s){r=y[s]
q=J.d_(r)
if(q>=w.length)return H.f(w,q)
q=w[q]
p=new T.i(new Float32Array(3))
p.C(q)
q=r.ga8(r)
if(q>=w.length)return H.f(w,q)
p.j(0,w[q])
p.N(0,0.5)
p.D(0)
q=r.ga8(r)
if(q>=w.length)return H.f(w,q)
q=w[q]
o=new T.i(new Float32Array(3))
o.C(q)
q=r.ga9(r)
if(q>=w.length)return H.f(w,q)
o.j(0,w[q])
o.N(0,0.5)
o.D(0)
q=r.ga9(r)
if(q>=w.length)return H.f(w,q)
q=w[q]
n=new T.i(new Float32Array(3))
n.C(q)
q=r.gaj(r)
if(q>=w.length)return H.f(w,q)
n.j(0,w[q])
n.N(0,0.5)
n.D(0)
m=w.length
C.a.j(w,p)
l=w.length
C.a.j(w,o)
k=w.length
C.a.j(w,n)
C.a.j(u,new G.ab(r.gaj(r),m,k))
C.a.j(u,new G.ab(r.ga8(r),l,m))
C.a.j(u,new G.ab(r.ga9(r),k,l))
C.a.j(u,new G.ab(m,l,k))}}j=new G.cp(!1,H.h([],z),H.h([],[G.bs]),H.h([],x),P.Q(P.e,[P.a,,]))
j.Y("aTexUV")
j.Y("aNormal")
for(z=y.length,t=[T.y],s=0;s<y.length;y.length===z||(0,H.E)(y),++s){r=y[s]
q=J.d_(r)
if(q>=w.length)return H.f(w,q)
i=w[q]
q=r.ga8(r)
if(q>=w.length)return H.f(w,q)
h=w[q]
q=r.ga9(r)
if(q>=w.length)return H.f(w,q)
g=w[q]
q=i.a
f=Math.atan2(q[2],q[0])
q=Math.acos(q[1])
e=new Float32Array(2)
e[0]=0.5*(1+f*0.3183098861837907)
e[1]=q*0.3183098861837907
q=h.a
f=Math.atan2(q[2],q[0])
q=Math.acos(q[1])
d=new Float32Array(2)
d[0]=0.5*(1+f*0.3183098861837907)
d[1]=q*0.3183098861837907
q=g.a
f=Math.atan2(q[2],q[0])
q=Math.acos(q[1])
c=new Float32Array(2)
c[0]=0.5*(1+f*0.3183098861837907)
c[1]=q*0.3183098861837907
j.au("aNormal",H.h([i,h,g],x))
q=new T.i(new Float32Array(3))
q.C(i)
q.N(0,a0)
f=new T.i(new Float32Array(3))
f.C(h)
f.N(0,a0)
b=new T.i(new Float32Array(3))
b.C(g)
b.N(0,a0)
j.cQ(H.h([q,f,b],x))
j.at("aTexUV",H.h([new T.y(e),new T.y(d),new T.y(c)],t))}return j},
hB:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=c*0.5
y=d*0.5
x=c/a
w=c/b
v=new T.i(new Float32Array(3))
v.q(0,0,1)
u=(a+1)*(b+1)
t=new Array(u)
t.fixed$length=Array
s=T.i
r=[s]
q=H.h(t,r)
t=new Array(u)
t.fixed$length=Array
p=H.h(t,r)
u=new Array(u)
u.fixed$length=Array
o=H.h(u,[T.y])
n=new B.hC(a)
for(m=0;m<=a;++m)for(u=m/a,t=m*x-z,l=0;l<=b;++l){k=n.$2(m,l)
r=new Float32Array(3)
r[0]=t
r[1]=l*w-y
r[2]=0
C.a.h(q,k,new T.i(r))
C.a.h(p,k,v)
r=new Float32Array(2)
r[0]=u
r[1]=l/b
C.a.h(o,k,new T.y(r))}u=H.h([],[G.ab])
t=H.h([],[G.bs])
j=new G.cp(!1,u,t,H.h([],[s]),P.Q(P.e,[P.a,,]))
j.a4(q)
for(m=0;m<a;m=i)for(i=m+1,l=0;l<b;){u=n.$2(m,l)
s=n.$2(i,l);++l
r=n.$2(i,l)
h=n.$2(m,l)
C.a.j(t,new G.bs(H.L(u),H.L(s),H.L(r),H.L(h)))}j.Y("aTexUV")
j.at("aTexUV",o)
j.Y("aNormal")
j.au("aNormal",p)
return j},
hC:{"^":"p:24;a",
$2:function(a,b){return a*(this.a+1)+b}}}],["","",,D,{"^":"",
bX:function(a,b,c){var z,y,x,w,v,u
z=c.a
y=C.k.aQ(255*z[0])
x=C.k.aQ(255*z[1])
w=C.k.aQ(255*z[2])
z="rgb("+y+", "+x+", "+w+")"
v=document.createElement("canvas")
v.width=2
v.height=2
u=H.j(C.x.cw(v,"2d"),"$iscm")
u.fillStyle=z;(u&&C.I).dY(u,0,0,v.width,v.height)
z=J.fo(a.a)
J.bo(a.a,3553,z)
J.fK(a.a,37440,1)
J.bo(a.a,3553,z)
J.fM(a.a,3553,0,6408,6408,5121,v)
J.d3(a.a,3553,10240,9729)
J.d3(a.a,3553,10241,9729)
J.fG(a.a)
J.bo(a.a,3553,null)
return new G.hI(v,b,z,3553,a,new G.j3(!1,!1,!1,!0,1,9729,9729))},
hS:{"^":"c;a,b,c",
cX:function(a){var z,y
a=document
z=W.b1
y={func:1,ret:-1,args:[z]}
W.ak(a,"keydown",H.n(new D.hU(this),y),!1,z)
W.ak(a,"keyup",H.n(new D.hV(this),y),!1,z)},
p:{
hT:function(a){var z=P.x
z=new D.hS(P.a2(null,null,null,z),P.a2(null,null,null,z),P.a2(null,null,null,z))
z.cX(a)
return z}}},
hU:{"^":"p:11;a",
$1:function(a){var z
H.j(a,"$isb1")
z=this.a
z.a.j(0,a.which)
z.b.j(0,a.which)}},
hV:{"^":"p:11;a",
$1:function(a){var z
H.j(a,"$isb1")
z=this.a
z.a.c7(0,a.which)
z.c.j(0,a.which)}},
i9:{"^":"c;a,b,c,d,e,f,r,x",
cY:function(a){var z,y,x
if(a==null)a=document
z=J.l(a)
y=z.gc2(a)
x=H.o(y,0)
W.ak(y.a,y.b,H.n(new D.ib(this),{func:1,ret:-1,args:[x]}),!1,x)
x=z.gc1(a)
y=H.o(x,0)
W.ak(x.a,x.b,H.n(new D.ic(this),{func:1,ret:-1,args:[y]}),!1,y)
y=z.gc3(a)
x=H.o(y,0)
W.ak(y.a,y.b,H.n(new D.id(this),{func:1,ret:-1,args:[x]}),!1,x)
z=z.gc4(a)
x=H.o(z,0)
W.ak(z.a,z.b,H.n(new D.ie(this),{func:1,ret:-1,args:[x]}),!1,x)},
p:{
ia:function(a){var z=P.x
z=new D.i9(P.a2(null,null,null,z),P.a2(null,null,null,z),P.a2(null,null,null,z),0,0,0,0,0)
z.cY(a)
return z}}},
ib:{"^":"p:3;a",
$1:function(a){var z,y
H.j(a,"$isX")
a.preventDefault()
z=this.a
y=J.l(a)
z.r=H.L(y.gc_(a).a)
z.x=H.L(y.gc_(a).b)
z.d=a.movementX
z.e=a.movementY}},
ic:{"^":"p:3;a",
$1:function(a){var z
H.j(a,"$isX")
a.preventDefault()
P.an("BUTTON "+H.b(a.button))
z=this.a
z.a.j(0,a.button)
z.b.j(0,a.button)}},
id:{"^":"p:3;a",
$1:function(a){var z
H.j(a,"$isX")
a.preventDefault()
z=this.a
z.a.c7(0,a.button)
z.c.j(0,a.button)}},
ie:{"^":"p:25;a",
$1:function(a){H.j(a,"$isaO")
a.preventDefault()
this.a.f=H.L(C.ac.gdT(a))}},
ip:{"^":"h2;fy,go,id,k1,k2,k3,k4,r1,d,e,f,r,x,a,b,c"}}],["","",,A,{"^":"",
bH:function(a){var z,y
z=C.e.e_(H.t(a,"$ism",[P.c],"$asm"),0,new A.l6(),P.x)
if(typeof z!=="number")return H.aE(z)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
l6:{"^":"p:26;",
$2:function(a,b){var z,y
H.L(a)
z=J.ao(b)
if(typeof a!=="number")return a.I()
y=536870911&a+z
y=536870911&y+((524287&y)<<10)
return y^y>>>6}}}],["","",,T,{"^":"",aJ:{"^":"c;a",
C:function(a){var z,y
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
l:function(a){return"[0] "+this.R(0).l(0)+"\n[1] "+this.R(1).l(0)+"\n[2] "+this.R(2).l(0)+"\n"},
i:function(a,b){var z=this.a
if(b>=9)return H.f(z,b)
return z[b]},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.aJ){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]}else z=!1
return z},
gB:function(a){return A.bH(this.a)},
R:function(a){var z,y,x
z=new Float32Array(3)
y=this.a
if(a>=9)return H.f(y,a)
z[0]=y[a]
x=3+a
if(x>=9)return H.f(y,x)
z[1]=y[x]
x=6+a
if(x>=9)return H.f(y,x)
z[2]=y[x]
return new T.i(z)},
dO:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
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
if(m===0){this.C(a)
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
return m}},U:{"^":"c;a",
C:function(a){var z,y
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
l:function(a){return"[0] "+this.R(0).l(0)+"\n[1] "+this.R(1).l(0)+"\n[2] "+this.R(2).l(0)+"\n[3] "+this.R(3).l(0)+"\n"},
i:function(a,b){var z=this.a
if(b>=16)return H.f(z,b)
return z[b]},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.U){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]&&z[9]===x[9]&&z[10]===x[10]&&z[11]===x[11]&&z[12]===x[12]&&z[13]===x[13]&&z[14]===x[14]&&z[15]===x[15]}else z=!1
return z},
gB:function(a){return A.bH(this.a)},
R:function(a){var z,y,x
z=new Float32Array(4)
y=this.a
if(a>=16)return H.f(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.f(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.f(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.f(y,x)
z[3]=y[x]
return new T.aN(z)},
ac:function(a4,a5,a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=Math.sqrt(a5.gaP())
y=a5.a
x=y[0]/z
w=y[1]/z
v=y[2]/z
u=Math.cos(a6)
t=Math.sin(a6)
s=1-u
r=x*x*s+u
q=v*t
p=x*w*s-q
o=w*t
n=x*v*s+o
m=w*x*s+q
l=w*w*s+u
q=x*t
k=w*v*s-q
j=v*x*s-o
i=v*w*s+q
h=v*v*s+u
q=this.a
o=q[0]
g=q[4]
f=q[8]
e=q[1]
d=q[5]
c=q[9]
b=q[2]
a=q[6]
a0=q[10]
a1=q[3]
a2=q[7]
a3=q[11]
q[0]=o*r+g*m+f*j
q[1]=e*r+d*m+c*j
q[2]=b*r+a*m+a0*j
q[3]=a1*r+a2*m+a3*j
q[4]=o*p+g*l+f*i
q[5]=e*p+d*l+c*i
q[6]=b*p+a*l+a0*i
q[7]=a1*p+a2*l+a3*i
q[8]=o*n+g*k+f*h
q[9]=e*n+d*k+c*h
q[10]=b*n+a*k+a0*h
q[11]=a1*n+a2*k+a3*h},
J:function(){var z=this.a
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
bZ:function(a8,a9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
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
z[15]=m*e+l*a+k*a3+j*a7},
p:{
bY:function(){return new T.U(new Float32Array(16))}}},iC:{"^":"c;a",
cB:function(a,b){var z,y,x,w,v
z=Math.sqrt(a.gaP())
if(z===0)return
y=b*0.5
x=Math.sin(y)/z
w=a.a
v=this.a
v[0]=w[0]*x
v[1]=w[1]*x
v[2]=w[2]*x
v[3]=Math.cos(y)},
gk:function(a){var z,y,x,w,v
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
return Math.sqrt(y*y+x*x+w*w+v*v)},
i:function(a,b){var z=this.a
if(b>=4)return H.f(z,b)
return z[b]},
l:function(a){var z=this.a
return H.b(z[0])+", "+H.b(z[1])+", "+H.b(z[2])+" @ "+H.b(z[3])}},y:{"^":"c;a",
v:function(a,b){var z=this.a
z[0]=a
z[1]=b},
l:function(a){var z=this.a
return"["+H.b(z[0])+","+H.b(z[1])+"]"},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.y){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gB:function(a){return A.bH(this.a)},
i:function(a,b){var z=this.a
if(b>=2)return H.f(z,b)
return z[b]},
gk:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(y*y+z*z)},
ga1:function(a){return this.a[0]},
gV:function(a){return this.a[1]}},i:{"^":"c;a",
q:function(a,b,c){var z=this.a
C.e.h(z,0,a)
C.e.h(z,1,b)
C.e.h(z,2,c)},
C:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
l:function(a){var z=this.a
return"["+H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+"]"},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.i){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gB:function(a){return A.bH(this.a)},
I:function(a,b){var z=new T.i(new Float32Array(3))
z.C(this)
z.j(0,b)
return z},
i:function(a,b){var z=this.a
if(b>=3)return H.f(z,b)
return z[b]},
gk:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(y*y+x*x+z*z)},
gaP:function(){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return y*y+x*x+z*z},
D:function(a){var z,y,x
z=Math.sqrt(this.gaP())
if(z===0)return 0
y=1/z
x=this.a
x[0]=x[0]*y
x[1]=x[1]*y
x[2]=x[2]*y
return z},
aN:function(a){var z,y
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
z=new T.i(new Float32Array(3))
z.q(x*s-w*t,w*u-y*s,y*t-x*u)
return z},
j:function(a,b){var z,y
z=H.j(b,"$isi").a
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]},
b9:function(a,b){var z,y
z=b.a
y=this.a
y[0]=y[0]-z[0]
y[1]=y[1]-z[1]
y[2]=y[2]-z[2]},
N:function(a,b){var z=this.a
z[2]=z[2]*b
z[1]=z[1]*b
z[0]=z[0]*b},
ao:function(a){var z=new T.i(new Float32Array(3))
z.C(this)
z.N(0,a)
return z},
ga1:function(a){return this.a[0]},
gV:function(a){return this.a[1]},
gam:function(a){return this.a[2]},
p:{
D:function(a,b,c){var z=new T.i(new Float32Array(3))
z.q(a,b,c)
return z}}},aN:{"^":"c;a",
l:function(a){var z=this.a
return H.b(z[0])+","+H.b(z[1])+","+H.b(z[2])+","+H.b(z[3])},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.aN){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gB:function(a){return A.bH(this.a)},
i:function(a,b){var z=this.a
if(b>=4)return H.f(z,b)
return z[b]},
gk:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(y*y+x*x+w*w+z*z)},
ga1:function(a){return this.a[0]},
gV:function(a){return this.a[1]},
gam:function(a){return this.a[2]},
gcu:function(a){return this.a[3]}}}],["","",,K,{"^":"",
i_:function(a,b,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=G.cq("cube",b,B.he(!0,1,0,1,0,2,2,2))
y=G.cq("icosahedron-4",b,B.hF(4,1,!0))
x=G.bA("mat0")
w=x.d
w.h(0,"uTexture",D.bX(a,"gray",$.eH()))
w.h(0,"uShininess",10)
w=G.bA("mat1")
v=w.d
v.h(0,"uTexture",D.bX(a,"red",$.eL()))
v.h(0,"uShininess",10)
v=G.bA("mat2")
u=v.d
u.h(0,"uTexture",D.bX(a,"red",$.eG()))
u.h(0,"uShininess",10)
u=G.bA("mat3")
t=u.d
t.h(0,"uTexture",D.bX(a,"red",$.eI()))
t.h(0,"uShininess",10)
s=[x,w,v,u]
for(x=a0.cy,w=[A.b4],r=0;r<8;++r){q=(r&1)===0?-10:10
p=(r&2)===0?-10:10
o=(r&4)===0?-10:10
v=r%2===0?z:y
u=s[r%4]
t=H.h([],w)
n=new Float32Array(9)
m=new T.U(new Float32Array(16))
m.J()
l=new Float32Array(16)
k=new T.U(l)
k.J()
j=new Float32Array(3)
i=new Float32Array(3)
h=new Float32Array(3)
g=new Float32Array(3)
f=new T.i(g)
h=new A.b4(u,v,t,new T.aJ(n),m,k,new T.i(j),new T.i(i),new T.i(h),f,"mesh",!1,!0)
l[12]=q
l[13]=p
l[14]=o
g[0]=l[0]
g[1]=l[4]
g[2]=l[8]
k.ac(0,f,-1)
k.ac(0,h.b3(),-0.7)
C.a.j(x,h)}v=G.cq("strips",b,B.hB(20,20,80,80))
u=s[0]
w=H.h([],w)
t=new Float32Array(9)
n=new T.U(new Float32Array(16))
n.J()
m=new Float32Array(16)
l=new T.U(m)
l.J()
k=new Float32Array(3)
j=new Float32Array(3)
i=new Float32Array(3)
e=new A.b4(u,v,w,new T.aJ(t),n,l,new T.i(k),new T.i(j),new T.i(i),new T.i(new Float32Array(3)),"grid",!1,!0)
d=Math.cos(-1.5079644737231006)
c=Math.sin(-1.5079644737231006)
w=m[4]
v=m[8]
u=m[5]
t=m[9]
n=m[6]
l=m[10]
k=m[7]
j=m[11]
i=-c
m[4]=w*d+v*c
m[5]=u*d+t*c
m[6]=n*d+l*c
m[7]=k*d+j*c
m[8]=w*i+v*d
m[9]=u*i+t*d
m[10]=n*i+l*d
m[11]=k*i+j*d
e.ap(0,-20,20)
C.a.j(x,e)},
ez:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2
z={}
y=document
x=C.i.cz(y,"stats")
w=y.createElement("div")
v=w.style
v.fontWeight="bold"
w.textContent="@@@@"
u=new R.iW(0,0,x,w,y.createElement("div"),R.jY("blue","gray",90,30))
u.d0(x,"blue","gray")
t=H.j(C.i.c6(y,"#webgl-canvas"),"$iscl")
s=new G.h4(t)
x=P.e
v=P.c
r=(t&&C.x).aV(t,"webgl2",P.cv(["alpha",!1,"depth",!0,"stencil",!0,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1,"failIfMajorPerformanceCaveat",!1],x,v))
s.a=r
if(r==null)H.ai(P.dq('Calling canvas.getContext("webgl2") failed,\nmake sure you run on a computer that supports WebGL2.\n\nYou can test your browser\'s compatibility here: http://webglreport.com/\n\n(If you are using Dartium make sure you start it with the\noption: --enable-unsafe-es3-apis)\n'))
q="ChronosGL Config: "+H.b(J.fF(r))
if($.et>0)P.an("I: "+q)
J.fl(r,0,0,0,1)
J.bp(r,2929)
J.bp(r,2884)
r=new Float32Array(3)
q=D.hT(null)
p=D.ia(t)
o=new T.U(new Float32Array(16))
o.J()
n=new Float32Array(3)
m=new Float32Array(3)
l=new Float32Array(3)
k=new D.ip(50,10,0,0,new T.i(r),-0.02,q,p,o,new T.i(n),new T.i(m),new T.i(l),new T.i(new Float32Array(3)),"camera:orbit",!1,!0)
k.ap(0,0,56)
r=new T.U(new Float32Array(16))
r.J()
q=new T.U(new Float32Array(16))
q.J()
j=new G.ir(k,50,1,0.1,1e4,r,q,new T.U(new Float32Array(16)),P.Q(x,v),"perspective",!1,!0)
j.be()
r=H.h([],[G.b3])
q=new Float32Array(64)
i=new G.hG(r,q,new Float32Array(4),P.Q(x,v),"illumination",!1,!0)
for(q=$.cc(),q=q.gcq(q),p=q.a,q=new H.cx(p.gw(p),q.b,[H.o(q,0),H.o(q,1)]);q.t();)C.a.j(r,q.a)
r=G.cz("BlinnPhong",s,$.f6(),$.f4())
q=[G.aM]
p=H.h([j,i],q)
o=A.b4
n=[o]
m=H.h([],n)
h=new A.c_(r,p,m,"BlinnPhong",!1,!0)
r=G.cz("Gourad",s,$.f7(),$.f5())
p=H.h([j,i],q)
m=H.h([],n)
g=new A.c_(r,p,m,"Gourad",!1,!0)
r=G.cz("Fixed",s,$.fa(),$.f9())
q=H.h([j],q)
p=H.h([],n)
f=new A.c_(r,q,p,"Fixed",!1,!0)
e=A.dI("BlinnPhong",s,null)
q=e.f
C.a.j(q,h)
C.a.j(q,f)
d=A.dI("Gourad",s,null)
q=d.f
C.a.j(q,g)
C.a.j(q,f)
c=G.bA("light")
c.d.h(0,"uColor",$.eN())
b=P.Q(x,o)
for(q=$.cc(),p=new H.ad(q,[H.o(q,0)]),p=p.gw(p),o=[P.x],m=r.d,r=r.e,l=P.ac;p.t();){a=p.d
a0=q.i(0,a)
a1=r.x
a2=new G.dB(m,J.cZ(m.a),1,P.Q(x,v),a1,0,-1,P.Q(x,l),"meshdata:dirLightViz",!1,!0)
a2.a4(new Float32Array(3))
a1=H.t(H.h([0,0],o),"$isa",o,"$asa")
a2.y=J.bO(m.a)
a2.a5(a1)
a1=J.C(a0)
if(!!a1.$isdk){a1=a0.Q
R.jb(a2,a1,a1/4,a0.x)}else if(!!a1.$isdM)R.jd(a2,a0.x,a0.y,a0.ch,a0.cx)
else if(!!a1.$isdG)R.jc(a2,a0.x,a0.Q)
a1=H.h([],n)
a3=new Float32Array(9)
a4=new T.U(new Float32Array(16))
a4.J()
a5=new T.U(new Float32Array(16))
a5.J()
a6=new Float32Array(3)
a7=new Float32Array(3)
a8=new Float32Array(3)
b.h(0,a,new A.b4(c,a2,a1,new T.aJ(a3),a4,a5,new T.i(a6),new T.i(a7),new T.i(a8),new T.i(new Float32Array(3)),a,!1,!0))}for(x=b.gcq(b),v=x.a,x=new H.cx(v.gw(v),x.b,[H.o(x,0),H.o(x,1)]),v=f.f;x.t();)C.a.j(v,x.a)
x=H.h([],n)
v=new Float32Array(9)
r=new T.U(new Float32Array(16))
r.J()
q=new T.U(new Float32Array(16))
q.J()
p=new Float32Array(3)
o=new Float32Array(3)
n=new Float32Array(3)
a9=new A.b4(null,null,x,new T.aJ(v),r,q,new T.i(p),new T.i(o),new T.i(n),new T.i(new Float32Array(3)),"scene",!1,!0)
K.i_(s,h.d,a9)
C.a.j(g.f,a9)
C.a.j(h.f,a9)
b0=H.a6(C.i.c6(y,"#phase"),"$isdK")
b0.selectedIndex=0
for(x=C.i.aW(y,"input"),v=x.length,b1=0;b1<x.length;x.length===v||(0,H.E)(x),++b1){r=J.fA(H.j(x[b1],"$isR"))
q=H.o(r,0)
W.ak(r.a,r.b,H.n(new K.lk(b),{func:1,ret:-1,args:[q]}),!1,q)}for(x=C.i.aW(y,"input"),v=x.length,b1=0;b1<x.length;x.length===v||(0,H.E)(x),++b1){r=H.j(x[b1],"$isR")
H.bJ("initialize inputs "+H.b(r.id))
b2=C.i.dd(y,"Event")
J.fd(b2,"change",!0,!0)
J.fq(r,b2)}y=new K.ll(t,j,d,e)
y.$1(null)
x=W.T
W.ak(window,"resize",H.n(y,{func:1,ret:-1,args:[x]}),!1,x)
z.a=0
new K.lj(z,k,a9,b0,e,d,u).$1(0)},
lk:{"^":"p:27;a",
$1:function(a){var z=H.a6(J.fD(a),"$isds")
P.an(H.b(z.id)+" toggle "+H.b(z.checked))
$.cc().i(0,z.id).c=z.checked
this.a.i(0,z.id).c=z.checked}},
ll:{"^":"p:28;a,b,c,d",
$1:function(a){var z,y,x
z=this.a
y=z.clientWidth
x=z.clientHeight
z.width=y
z.height=x
P.an("size change "+H.b(y)+" "+H.b(x))
this.b.cR(y,x)
z=this.c
z.z=y
z.Q=x
z=this.d
z.z=y
z.Q=x}},
lj:{"^":"p:29;a,b,c,d,e,f,r",
$1:function(a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
H.cP(a3)
z=this.a
y=z.a
if(typeof a3!=="number")return a3.b8()
z.a=a3+0
x=this.b
x.go+=0.001
w=x.r1
v=w.a
if(v.A(0,0)||v.A(0,1)){v=x.go
u=w.d
if(typeof u!=="number")return u.b4()
x.go=v+u*0.01
u=x.id
v=w.e
if(typeof v!=="number")return v.b4()
x.id=u+v*0.01}v=x.k4
u=v.a
if(u.A(0,37))x.go+=0.03
else if(u.A(0,39))x.go-=0.03
if(u.A(0,38))x.id+=0.03
else if(u.A(0,40))x.id-=0.03
if(u.A(0,33))x.fy*=0.99
else if(u.A(0,34))x.fy*=1.01
if(u.A(0,32)){x.go=0
x.id=0}u=w.f
if(typeof u!=="number")return u.b4()
u=x.fy-u*x.k3
if(u>0)x.fy=u
u=C.k.dM(x.id,-1.4707963267948965,1.4707963267948965)
x.id=u
t=x.fy
s=x.go
r=t*Math.cos(u)
x.ap(r*Math.cos(s),t*Math.sin(u),r*Math.sin(s))
s=x.k2
u=x.d
t=u.a
q=s.a
t[12]=t[12]+q[0]
t[13]=t[13]+q[1]
t[14]=t[14]+q[2]
p=t[12]
o=t[13]
n=t[14]
m=new T.i(new Float32Array(3))
m.q(0,1,0)
q=x.e
l=q.a
l[0]=t[12]
l[1]=t[13]
l[2]=t[14]
l=new Float32Array(3)
k=new T.i(l)
k.C(q)
k.b9(0,s)
k.D(0)
j=m.bP(k)
j.D(0)
i=k.bP(j)
i.D(0)
s=j.aN(q)
h=i.aN(q)
q=k.aN(q)
g=j.a
f=g[0]
e=i.a
d=e[0]
c=l[0]
b=g[1]
a=e[1]
a0=l[1]
g=g[2]
e=e[2]
l=l[2]
t[15]=1
t[14]=-q
t[13]=-h
t[12]=-s
t[11]=0
t[10]=l
t[9]=e
t[8]=g
t[7]=0
t[6]=a0
t[5]=a
t[4]=b
t[3]=0
t[2]=c
t[1]=d
t[0]=f
t[12]=p
t[13]=o
t[14]=n
u.ac(0,x.aU(),-x.k1)
v.c.aa(0)
v.b.aa(0)
w.e=0
w.d=0
w.f=0
w.c.aa(0)
w.b.aa(0)
for(x=this.c.cy,w=x.length,y=-((a3-y)*0.0003),a1=0;a1<x.length;x.length===w||(0,H.E)(x),++a1){a2=x[a1]
if(a2.a!=="grid"){v=a2.d
v.ac(0,a2.aU(),y)
v.ac(0,a2.b3(),y)}}(this.d.selectedIndex===0?this.e:this.f).cS()
C.ad.gdF(window).cc(this,-1)
this.r.d2(z.a)}}},1]]
setupProgram(dart,0,0)
J.C=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dv.prototype
return J.du.prototype}if(typeof a=="string")return J.by.prototype
if(a==null)return J.hP.prototype
if(typeof a=="boolean")return J.hO.prototype
if(a.constructor==Array)return J.bw.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bz.prototype
return a}if(a instanceof P.c)return a
return J.c9(a)}
J.bk=function(a){if(typeof a=="string")return J.by.prototype
if(a==null)return a
if(a.constructor==Array)return J.bw.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bz.prototype
return a}if(a instanceof P.c)return a
return J.c9(a)}
J.eu=function(a){if(a==null)return a
if(a.constructor==Array)return J.bw.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bz.prototype
return a}if(a instanceof P.c)return a
return J.c9(a)}
J.l2=function(a){if(typeof a=="number")return J.bx.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bc.prototype
return a}
J.l3=function(a){if(typeof a=="number")return J.bx.prototype
if(typeof a=="string")return J.by.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bc.prototype
return a}
J.ev=function(a){if(typeof a=="string")return J.by.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bc.prototype
return a}
J.l=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bz.prototype
return a}if(a instanceof P.c)return a
return J.c9(a)}
J.bG=function(a){if(a==null)return a
if(!(a instanceof P.c))return J.bc.prototype
return a}
J.aG=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.C(a).F(a,b)}
J.a9=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.l2(a).W(a,b)}
J.bn=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.lg(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.bk(a).i(a,b)}
J.cV=function(a,b){return J.ev(a).aA(a,b)}
J.fd=function(a,b,c,d){return J.l(a).dk(a,b,c,d)}
J.bM=function(a,b){return J.l(a).dr(a,b)}
J.fe=function(a,b,c){return J.l(a).ds(a,b,c)}
J.cW=function(a,b){return J.l(a).by(a,b)}
J.ff=function(a,b,c,d){return J.l(a).dC(a,b,c,d)}
J.cX=function(a,b,c){return J.l(a).bA(a,b,c)}
J.fg=function(a,b){return J.l(a).dH(a,b)}
J.cd=function(a,b,c){return J.l(a).bB(a,b,c)}
J.fh=function(a,b,c){return J.l(a).bD(a,b,c)}
J.bo=function(a,b,c){return J.l(a).bE(a,b,c)}
J.bN=function(a,b){return J.l(a).dK(a,b)}
J.fi=function(a,b){return J.l(a).bF(a,b)}
J.fj=function(a,b,c){return J.l(a).bG(a,b,c)}
J.cY=function(a,b,c,d){return J.l(a).bH(a,b,c,d)}
J.fk=function(a,b){return J.l(a).bI(a,b)}
J.fl=function(a,b,c,d,e){return J.l(a).bJ(a,b,c,d,e)}
J.fm=function(a,b){return J.l3(a).O(a,b)}
J.ce=function(a,b,c){return J.bk(a).dN(a,b,c)}
J.bO=function(a){return J.l(a).bL(a)}
J.fn=function(a){return J.l(a).bM(a)}
J.fo=function(a){return J.l(a).bO(a)}
J.cZ=function(a){return J.l(a).dS(a)}
J.fp=function(a,b){return J.l(a).bQ(a,b)}
J.cf=function(a,b){return J.l(a).bR(a,b)}
J.fq=function(a,b){return J.l(a).dU(a,b)}
J.fr=function(a,b,c,d){return J.l(a).bS(a,b,c,d)}
J.fs=function(a,b,c,d,e){return J.l(a).dV(a,b,c,d,e)}
J.ft=function(a,b,c,d,e){return J.l(a).bT(a,b,c,d,e)}
J.fu=function(a,b,c,d,e,f){return J.l(a).dW(a,b,c,d,e,f)}
J.fv=function(a,b){return J.eu(a).u(a,b)}
J.bp=function(a,b){return J.l(a).bU(a,b)}
J.fw=function(a,b){return J.l(a).bV(a,b)}
J.fx=function(a){return J.l(a).dX(a)}
J.fy=function(a,b){return J.l(a).G(a,b)}
J.d_=function(a){return J.bG(a).gaj(a)}
J.fz=function(a){return J.l(a).gdG(a)}
J.ao=function(a){return J.C(a).gB(a)}
J.bP=function(a){return J.eu(a).gw(a)}
J.aX=function(a){return J.bk(a).gk(a)}
J.fA=function(a){return J.l(a).gc0(a)}
J.fB=function(a){return J.l(a).ge5(a)}
J.fC=function(a){return J.l(a).gea(a)}
J.fD=function(a){return J.l(a).gc9(a)}
J.fE=function(a){return J.bG(a).gcu(a)}
J.bQ=function(a){return J.bG(a).ga1(a)}
J.cg=function(a){return J.bG(a).gV(a)}
J.d0=function(a){return J.bG(a).gam(a)}
J.ch=function(a,b){return J.l(a).a2(a,b)}
J.fF=function(a){return J.l(a).an(a)}
J.fG=function(a){return J.l(a).aX(a)}
J.fH=function(a,b){return J.l(a).aY(a,b)}
J.fI=function(a,b,c){return J.l(a).aZ(a,b,c)}
J.d1=function(a,b,c){return J.l(a).b2(a,b,c)}
J.fJ=function(a,b){return J.l(a).bY(a,b)}
J.fK=function(a,b,c){return J.l(a).c5(a,b,c)}
J.d2=function(a){return J.l(a).e6(a)}
J.fL=function(a,b,c,d){return J.l(a).b7(a,b,c,d)}
J.fM=function(a,b,c,d,e,f,g){return J.l(a).ca(a,b,c,d,e,f,g)}
J.d3=function(a,b,c,d){return J.l(a).cb(a,b,c,d)}
J.fN=function(a){return J.ev(a).eb(a)}
J.bq=function(a){return J.C(a).l(a)}
J.fO=function(a,b,c,d){return J.l(a).ed(a,b,c,d)}
J.fP=function(a,b,c){return J.l(a).cf(a,b,c)}
J.fQ=function(a,b,c){return J.l(a).cg(a,b,c)}
J.ci=function(a,b,c){return J.l(a).ci(a,b,c)}
J.fR=function(a,b,c){return J.l(a).cj(a,b,c)}
J.d4=function(a,b,c){return J.l(a).ck(a,b,c)}
J.d5=function(a,b,c){return J.l(a).cl(a,b,c)}
J.d6=function(a,b,c){return J.l(a).cm(a,b,c)}
J.d7=function(a,b,c,d){return J.l(a).cn(a,b,c,d)}
J.d8=function(a,b,c,d){return J.l(a).co(a,b,c,d)}
J.fS=function(a,b){return J.l(a).cp(a,b)}
J.fT=function(a,b,c){return J.l(a).ee(a,b,c)}
J.fU=function(a,b,c,d,e,f,g){return J.l(a).cr(a,b,c,d,e,f,g)}
J.fV=function(a,b,c,d,e){return J.l(a).ct(a,b,c,d,e)}
I.aV=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.q=W.bR.prototype
C.x=W.cl.prototype
C.I=W.cm.prototype
C.y=W.hb.prototype
C.r=W.hj.prototype
C.J=W.hl.prototype
C.K=W.hD.prototype
C.i=W.hE.prototype
C.L=J.k.prototype
C.a=J.bw.prototype
C.t=J.du.prototype
C.d=J.dv.prototype
C.k=J.bx.prototype
C.j=J.by.prototype
C.S=J.bz.prototype
C.e=H.ig.prototype
C.o=H.ii.prototype
C.W=W.ij.prototype
C.B=J.is.prototype
C.C=W.iD.prototype
C.H=W.j1.prototype
C.w=J.bc.prototype
C.ac=W.aO.prototype
C.ad=W.jg.prototype
C.f=new P.k9()
C.M=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.N=function(hooks) {
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
C.z=function(hooks) { return hooks; }

C.O=function(getTagFallback) {
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
C.P=function() {
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
C.Q=function(hooks) {
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
C.R=function(hooks) {
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
C.A=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.T=H.h(I.aV(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.e])
C.U=H.h(I.aV(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"]),[P.e])
C.V=H.h(I.aV([]),[P.e])
C.u=H.h(I.aV(["bind","if","ref","repeat","syntax"]),[P.e])
C.v=H.h(I.aV(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.e])
C.X=new G.F("vec3","vertex btangents",0)
C.c=new G.F("vec3","",0)
C.Y=new G.F("vec4","delta from light",0)
C.p=new G.F("","",0)
C.D=new G.F("vec3","vertex coordinates",0)
C.Z=new G.F("vec3","vertex binormals",0)
C.E=new G.F("vec4","for wireframe",0)
C.a_=new G.F("vec4","per vertex color",0)
C.a0=new G.F("float","for normal maps",0)
C.l=new G.F("mat4","",0)
C.a2=new G.F("mat4","",4)
C.a1=new G.F("mat4","",128)
C.b=new G.F("float","",0)
C.a3=new G.F("float","",4)
C.a4=new G.F("float","depth for shadowmaps",0)
C.h=new G.F("sampler2D","",0)
C.a5=new G.F("float","for bump maps",0)
C.a6=new G.F("vec2","texture uvs",0)
C.a7=new G.F("float","time since program start in sec",0)
C.m=new G.F("vec2","",0)
C.a8=new G.F("samplerCube","",0)
C.n=new G.F("vec4","",0)
C.a9=new G.F("vec3","vertex normals",0)
C.aa=new G.F("sampler2DShadow","",0)
C.F=new G.F("vec3","per vertex color",0)
C.G=new G.F("mat3","",0)
C.ab=new G.F("vec3","vertex tangents",0)
$.aa=0
$.aY=null
$.db=null
$.cG=!1
$.ex=null
$.en=null
$.eC=null
$.c7=null
$.ca=null
$.cN=null
$.aQ=null
$.bf=null
$.bg=null
$.cH=!1
$.K=C.f
$.aj=null
$.co=null
$.dn=null
$.dm=null
$.di=null
$.dh=null
$.dg=null
$.df=null
$.et=0
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
I.$lazy(y,x,w)}})(["lO","eP",function(){return H.ew("_$dart_dartClosure")},"ms","cS",function(){return H.ew("_$dart_js")},"nb","eS",function(){return H.af(H.c0({
toString:function(){return"$receiver$"}}))},"nc","eT",function(){return H.af(H.c0({$method$:null,
toString:function(){return"$receiver$"}}))},"nd","eU",function(){return H.af(H.c0(null))},"ne","eV",function(){return H.af(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"nh","eY",function(){return H.af(H.c0(void 0))},"ni","eZ",function(){return H.af(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ng","eX",function(){return H.af(H.dT(null))},"nf","eW",function(){return H.af(function(){try{null.$method$}catch(z){return z.message}}())},"nk","f0",function(){return H.af(H.dT(void 0))},"nj","f_",function(){return H.af(function(){try{(void 0).$method$}catch(z){return z.message}}())},"nv","cT",function(){return P.jj()},"nM","bm",function(){return[]},"lL","eO",function(){return{}},"nD","f2",function(){return P.cw(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],P.e)},"nE","cU",function(){return P.Q(P.e,P.bu)},"mZ","eR",function(){return new G.dS(1281,0,4294967295)},"lz","eE",function(){return new G.dR(1281,1281,1281)},"nK","a8",function(){return P.cv(["cBlendEquation",C.p,"cDepthWrite",C.p,"cDepthTest",C.p,"cStencilFunc",C.p,"tPosition",C.c,"tSpeed",C.c,"tForce",C.c,"aColor",C.F,"aColorAlpha",C.a_,"aPosition",C.D,"aTexUV",C.a6,"aNormal",C.a9,"aBinormal",C.Z,"aCenter",C.E,"aPointSize",C.b,"aBoneIndex",C.n,"aBoneWeight",C.n,"aTangent",C.ab,"aBitangent",C.X,"iaRotation",C.n,"iaTranslation",C.c,"iaScale",C.b,"iaColor",C.c,"vColor",C.F,"vTexUV",C.m,"vLightWeighting",C.c,"vNormal",C.c,"vPosition",C.D,"vPositionFromLight",C.Y,"vCenter",C.E,"vDepth",C.a4,"uTransformationMatrix",C.l,"uModelMatrix",C.l,"uNormalMatrix",C.G,"uConvolutionMatrix",C.G,"uPerspectiveViewMatrix",C.l,"uLightPerspectiveViewMatrix",C.l,"uShadowMap",C.aa,"uTexture",C.h,"uTexture2",C.h,"uTexture3",C.h,"uTexture4",C.h,"uSpecularMap",C.h,"uNormalMap",C.h,"uBumpMap",C.h,"uDepthMap",C.h,"uCubeTexture",C.a8,"uAnimationTable",C.h,"uTime",C.a7,"uCameraNear",C.b,"uCameraFar",C.b,"uFogNear",C.b,"uFogFar",C.b,"uPointSize",C.b,"uScale",C.b,"uAngle",C.b,"uCanvasSize",C.m,"uCenter2",C.m,"uCutOff",C.b,"uShininess",C.b,"uShadowBias",C.b,"uOpacity",C.b,"uColor",C.c,"uAmbientDiffuse",C.c,"uColorEmissive",C.c,"uColorSpecular",C.c,"uColorDiffuse",C.c,"uColorAlpha",C.n,"uColorAlpha2",C.n,"uEyePosition",C.c,"uMaterial",C.l,"uRange",C.m,"uDirection",C.m,"uBoneMatrices",C.a1,"uLightDescs",C.a2,"uLightCount",C.b,"uLightTypes",C.a3,"uBumpScale",C.a5,"uNormalScale",C.a0],P.e,G.F)},"lI","eM",function(){return T.D(1,1,1)},"lD","eH",function(){return T.D(0.4,0.4,0.4)},"lB","eF",function(){return T.D(0,0,0)},"lC","eG",function(){return T.D(0,0,1)},"lF","eJ",function(){return T.D(0,0,0.5)},"lH","eL",function(){return T.D(1,0,0)},"lE","eI",function(){return T.D(0,1,0)},"lG","eK",function(){return T.D(0,0.5,0)},"lJ","eN",function(){return T.D(1,1,0)},"nV","f7",function(){var z,y
z=G.ba("LightGouradV")
y=[P.e]
z.as(H.h(["aPosition","aNormal","aTexUV"],y))
z.ae(H.h(["vColor"],y))
z.S(H.h(["uPerspectiveViewMatrix","uModelMatrix","uNormalMatrix"],y))
z.S(H.h(["uLightDescs","uLightTypes","uShininess"],y))
z.S(H.h(["uEyePosition","uTexture"],y))
z.bc(H.h(["void main() {\n    vec4 pos = uModelMatrix * vec4(aPosition, 1.0);\n    gl_Position = uPerspectiveViewMatrix * pos;\n    vec3 normal = uNormalMatrix * aNormal;\n\n    ColorComponents acc = CombinedLight(pos.xyz, normal, uEyePosition,\n                  uLightDescs,\n                  uLightTypes,\n                  uShininess);\n\n     vColor = acc.diffuse +\n                 acc.specular +\n                 texture(uTexture, aTexUV).rgb;\n}\n        "],y),H.h(["// ============================================================\n// MISC\n// ============================================================\n\nvec3 ColorFromPosition(vec3 pos) {\n    return vec3( sin(pos.x) / 2.0 + 0.5,\n                 cos(pos.y) / 2.0 + 0.5,\n                 sin(pos.z) / 2.0 + 0.5);\n}\n\nvec3 RangeToGray(float f, float a, float b) {\n    if (f > a) return vec3(1.0);\n    if (f < b) return vec3(0.0);\n    return vec3 ((f - b) / (a-b));\n}\n\nfloat useValueButReturnZero(float x) {\n    return (x + 1.0) * (x + 1.0) - x * x - 2.0 * x - 1.0;\n}\n\n// ============================================================\n// LIGHT\n// ============================================================\n\nfloat GetDiffuse(vec3 lightDir, vec3 normal) {\n    return max(dot(normal, lightDir), 0.0);\n}\n\nfloat GetSpecular(vec3 lightDir, vec3 viewDir, vec3 normal, float glossiness) {\n    vec3 angleW = normalize(viewDir + lightDir);\n    float specComp = max(0., dot(normal, angleW));\n    return pow(specComp, max(1.0, glossiness));\n}\n\nstruct ColorComponents {\n   vec3 diffuse;\n   vec3 specular;\n};\n\n// ============================================================\n// Spot Light\n// ============================================================\n\nstruct SpotLightInfo {\n    vec3 pos;      // for spot and point\n    vec3 dir;      // for spot and dir light\n    vec3 diffuseColor;\n    vec3 specularColor;\n    float range;        // for spot and point\n    float spotCutoff;   // for spot\n    float spotFocus;    // for spot\n    // float glossiness;   // Oddball: this comes from the material\n};\n\nSpotLightInfo UnpackSpotLightInfo(mat4 m) {\n    SpotLightInfo info;\n    info.pos = m[0].xyz;\n    info.dir = normalize(m[1].xyz);\n    info.diffuseColor = m[2].xyz;\n    info.specularColor = m[3].xyz;\n    // info.glossiness = m[0].a;\n    info.range = m[1].a;\n    info.spotCutoff = m[2].a;\n    info.spotFocus = m[3].a;\n    return info;\n}\n\nColorComponents SpotLightGetDiffuseAndSpecular(SpotLightInfo light,\n                                               vec3 vertexPos,\n                                               vec3 vertexNormal,\n                                               vec3 eyePos,\n                                               float uShininess) {\n    vec3 toSpot = light.pos - vertexPos;\n    vec3 spotDir = normalize(toSpot);\n    vec3 lightDirNorm = -normalize(light.dir);\n    float cosAngle = max(0., dot(lightDirNorm, spotDir));\n\t  if (cosAngle < light.spotCutoff) {\n        return ColorComponents(vec3(0.0), vec3(0.0));\n    }\n\n    cosAngle = max(0.0, pow(cosAngle, light.spotFocus));\n\t  float attenuation = max(0.0, 1.0 - length(toSpot) / light.range) * cosAngle;\n\t  vec3 viewDirNorm = normalize(eyePos - vertexPos);\n\t  return ColorComponents(\n\t           attenuation *\n             GetDiffuse(lightDirNorm, vertexNormal) *\n             light.diffuseColor,\n             attenuation *\n             GetSpecular(lightDirNorm, viewDirNorm, vertexNormal, uShininess) *\n             light.specularColor);\n}\n\n// ============================================================\n// Point Light\n// ============================================================\n\nstruct PointLightInfo {\n    vec3 pos;\n    vec3 diffuseColor;\n    vec3 specularColor;\n    float range;\n    // float glossiness;\n};\n\nPointLightInfo UnpackPointLightInfo(mat4 m) {\n    PointLightInfo info;\n    info.pos = m[0].xyz;\n    info.diffuseColor = m[2].xyz;\n    info.specularColor = m[3].xyz;\n    info.range = m[1].a;\n    // info.glossiness = m[0].a;\n    return info;\n}\n\nColorComponents PointLightGetDiffuseAndSpecular(PointLightInfo info,\n                                     vec3 vertexPos,\n                                     vec3 vertexNormal,\n                                     vec3 eyePos,\n                                     float uShininess) {\n    vec3 lightDir = info.pos - vertexPos;\n    float attenuation = max(0.0, 1.0 - length(lightDir) / info.range);\n    vec3 lightDirNorm = normalize(lightDir);\n    vec3 viewDirNorm = normalize(eyePos - vertexPos);\n    return ColorComponents(\n              attenuation *\n              GetDiffuse(lightDirNorm, vertexNormal) *\n              info.diffuseColor,\n               attenuation *\n               GetSpecular(lightDirNorm, viewDirNorm, vertexNormal, uShininess) *\n               info.specularColor);\n}\n\n// ============================================================\n// Directional Light\n// ============================================================\n\nstruct DirectionalLightInfo {\n    vec3 dir;      // for spot and dir light\n    vec3 diffuseColor;\n    vec3 specularColor;\n    // float glossiness;   // Oddball: this comes from the material\n};\n\nDirectionalLightInfo UnpackDirectionalLightInfo(mat4 m) {\n    DirectionalLightInfo info;\n    info.dir = normalize(m[1].xyz);\n    info.diffuseColor = m[2].xyz;\n    info.specularColor = m[3].xyz;\n    // info.glossiness = m[0].a;\n    return info;\n}\n\nColorComponents DirectionalLightGetDiffuseAndSpecular(DirectionalLightInfo info,\n                                                      vec3 vertexPos,\n                                                      vec3 vertexNormal,\n                                                      vec3 eyePos,\n                                                      float uShininess) {\n    vec3 viewDirNorm = normalize(eyePos - vertexPos);\n    return ColorComponents(\n              GetDiffuse(-info.dir, vertexNormal) *\n              info.diffuseColor,\n              GetSpecular(-info.dir, viewDirNorm, vertexNormal, uShininess) *\n              info.specularColor);\n}\n\n\nColorComponents CombinedLightSpot(\n    vec3 vVertexPosition, vec3 vNormal, vec3 uEyePosition, mat4 lightDesc,\n    float shininess) {\n    SpotLightInfo info = UnpackSpotLightInfo(lightDesc);\n    return SpotLightGetDiffuseAndSpecular(\n        info, vVertexPosition, vNormal, uEyePosition, shininess);\n}\n\nColorComponents CombinedLightPoint(\n    vec3 vVertexPosition, vec3 vNormal, vec3 uEyePosition, mat4 lightDesc,\n    float shininess) {\n    PointLightInfo info = UnpackPointLightInfo(lightDesc);\n    return PointLightGetDiffuseAndSpecular(\n        info, vVertexPosition, vNormal, uEyePosition, shininess);\n}\n\nColorComponents CombinedLightDirectional(\n    vec3 vVertexPosition, vec3 vNormal, vec3 uEyePosition, mat4 lightDesc,\n    float shininess) {\n    DirectionalLightInfo info = UnpackDirectionalLightInfo(lightDesc);\n    return DirectionalLightGetDiffuseAndSpecular(\n        info, vVertexPosition, vNormal, uEyePosition, shininess);\n}\n\n// ============================================================\n// Combined Light\n// ============================================================\nColorComponents CombinedLight(vec3 vVertexPosition,\n                   vec3 vNormal,\n                   vec3 uEyePosition,\n                   const mat4 uLightDescs[4],\n                   const float uLightTypes[4],\n                   float uShininess) {\n    ColorComponents acc = ColorComponents(vec3(0.0), vec3(0.0));\n\n    for (int i = 0; i < 4; ++i) {\n        ColorComponents curr;\n        float type = uLightTypes[i];\n        if (type == 2.0) {\n            curr = CombinedLightSpot(\n                       vVertexPosition, vNormal, uEyePosition, uLightDescs[i], \n                       uShininess);\n        } else if (type == 3.0) {\n            curr = CombinedLightPoint(\n                       vVertexPosition, vNormal, uEyePosition, uLightDescs[i], \n                       uShininess);\n        } else if (type == 1.0) {\n            curr = CombinedLightDirectional(\n                       vVertexPosition, vNormal, uEyePosition, uLightDescs[i], \n                       uShininess);\n        } else {\n            continue;\n        }\n        acc.diffuse = acc.diffuse + curr.diffuse;\n        acc.specular = acc.specular + curr.specular;\n    }\n    return acc;\n}\n"],y))
return z},"nT","f5",function(){var z,y
z=G.ba("LightGrouradV")
y=[P.e]
z.ae(H.h(["vColor"],y))
z.ax(H.h(["oFragColor = vec4(vColor, 1.0 );"],y))
return z},"nU","f6",function(){var z,y
z=G.ba("LightBlinnPhongV")
y=[P.e]
z.as(H.h(["aPosition","aNormal","aTexUV"],y))
z.ae(H.h(["vPosition","vNormal","vTexUV"],y))
z.S(H.h(["uPerspectiveViewMatrix","uModelMatrix","uNormalMatrix"],y))
z.d_(H.h(["void main() {\n    vec4 pos = uModelMatrix * vec4(aPosition, 1.0);\n    gl_Position = uPerspectiveViewMatrix * pos;\n    vPosition = pos.xyz;\n    vTexUV = aTexUV;\n    vNormal = uNormalMatrix * aNormal;\n}\n"],y))
return z},"nS","f4",function(){var z,y
z=G.ba("LightBlinnPhongF")
y=[P.e]
z.ae(H.h(["vPosition","vNormal","vTexUV"],y))
z.S(H.h(["uLightDescs","uLightTypes","uShininess"],y))
z.S(H.h(["uEyePosition","uTexture"],y))
z.bd(H.h(["ColorComponents acc = CombinedLight(vPosition,\n                                    vNormal,\n                                    uEyePosition,\n                                    uLightDescs,\n                                    uLightTypes,\n                                    uShininess);\n\noFragColor.rgb = acc.diffuse +\n                    acc.specular +\n                    texture(uTexture, vTexUV).rgb;\noFragColor.a = 1.0;\n"],y),H.h(["// ============================================================\n// MISC\n// ============================================================\n\nvec3 ColorFromPosition(vec3 pos) {\n    return vec3( sin(pos.x) / 2.0 + 0.5,\n                 cos(pos.y) / 2.0 + 0.5,\n                 sin(pos.z) / 2.0 + 0.5);\n}\n\nvec3 RangeToGray(float f, float a, float b) {\n    if (f > a) return vec3(1.0);\n    if (f < b) return vec3(0.0);\n    return vec3 ((f - b) / (a-b));\n}\n\nfloat useValueButReturnZero(float x) {\n    return (x + 1.0) * (x + 1.0) - x * x - 2.0 * x - 1.0;\n}\n\n// ============================================================\n// LIGHT\n// ============================================================\n\nfloat GetDiffuse(vec3 lightDir, vec3 normal) {\n    return max(dot(normal, lightDir), 0.0);\n}\n\nfloat GetSpecular(vec3 lightDir, vec3 viewDir, vec3 normal, float glossiness) {\n    vec3 angleW = normalize(viewDir + lightDir);\n    float specComp = max(0., dot(normal, angleW));\n    return pow(specComp, max(1.0, glossiness));\n}\n\nstruct ColorComponents {\n   vec3 diffuse;\n   vec3 specular;\n};\n\n// ============================================================\n// Spot Light\n// ============================================================\n\nstruct SpotLightInfo {\n    vec3 pos;      // for spot and point\n    vec3 dir;      // for spot and dir light\n    vec3 diffuseColor;\n    vec3 specularColor;\n    float range;        // for spot and point\n    float spotCutoff;   // for spot\n    float spotFocus;    // for spot\n    // float glossiness;   // Oddball: this comes from the material\n};\n\nSpotLightInfo UnpackSpotLightInfo(mat4 m) {\n    SpotLightInfo info;\n    info.pos = m[0].xyz;\n    info.dir = normalize(m[1].xyz);\n    info.diffuseColor = m[2].xyz;\n    info.specularColor = m[3].xyz;\n    // info.glossiness = m[0].a;\n    info.range = m[1].a;\n    info.spotCutoff = m[2].a;\n    info.spotFocus = m[3].a;\n    return info;\n}\n\nColorComponents SpotLightGetDiffuseAndSpecular(SpotLightInfo light,\n                                               vec3 vertexPos,\n                                               vec3 vertexNormal,\n                                               vec3 eyePos,\n                                               float uShininess) {\n    vec3 toSpot = light.pos - vertexPos;\n    vec3 spotDir = normalize(toSpot);\n    vec3 lightDirNorm = -normalize(light.dir);\n    float cosAngle = max(0., dot(lightDirNorm, spotDir));\n\t  if (cosAngle < light.spotCutoff) {\n        return ColorComponents(vec3(0.0), vec3(0.0));\n    }\n\n    cosAngle = max(0.0, pow(cosAngle, light.spotFocus));\n\t  float attenuation = max(0.0, 1.0 - length(toSpot) / light.range) * cosAngle;\n\t  vec3 viewDirNorm = normalize(eyePos - vertexPos);\n\t  return ColorComponents(\n\t           attenuation *\n             GetDiffuse(lightDirNorm, vertexNormal) *\n             light.diffuseColor,\n             attenuation *\n             GetSpecular(lightDirNorm, viewDirNorm, vertexNormal, uShininess) *\n             light.specularColor);\n}\n\n// ============================================================\n// Point Light\n// ============================================================\n\nstruct PointLightInfo {\n    vec3 pos;\n    vec3 diffuseColor;\n    vec3 specularColor;\n    float range;\n    // float glossiness;\n};\n\nPointLightInfo UnpackPointLightInfo(mat4 m) {\n    PointLightInfo info;\n    info.pos = m[0].xyz;\n    info.diffuseColor = m[2].xyz;\n    info.specularColor = m[3].xyz;\n    info.range = m[1].a;\n    // info.glossiness = m[0].a;\n    return info;\n}\n\nColorComponents PointLightGetDiffuseAndSpecular(PointLightInfo info,\n                                     vec3 vertexPos,\n                                     vec3 vertexNormal,\n                                     vec3 eyePos,\n                                     float uShininess) {\n    vec3 lightDir = info.pos - vertexPos;\n    float attenuation = max(0.0, 1.0 - length(lightDir) / info.range);\n    vec3 lightDirNorm = normalize(lightDir);\n    vec3 viewDirNorm = normalize(eyePos - vertexPos);\n    return ColorComponents(\n              attenuation *\n              GetDiffuse(lightDirNorm, vertexNormal) *\n              info.diffuseColor,\n               attenuation *\n               GetSpecular(lightDirNorm, viewDirNorm, vertexNormal, uShininess) *\n               info.specularColor);\n}\n\n// ============================================================\n// Directional Light\n// ============================================================\n\nstruct DirectionalLightInfo {\n    vec3 dir;      // for spot and dir light\n    vec3 diffuseColor;\n    vec3 specularColor;\n    // float glossiness;   // Oddball: this comes from the material\n};\n\nDirectionalLightInfo UnpackDirectionalLightInfo(mat4 m) {\n    DirectionalLightInfo info;\n    info.dir = normalize(m[1].xyz);\n    info.diffuseColor = m[2].xyz;\n    info.specularColor = m[3].xyz;\n    // info.glossiness = m[0].a;\n    return info;\n}\n\nColorComponents DirectionalLightGetDiffuseAndSpecular(DirectionalLightInfo info,\n                                                      vec3 vertexPos,\n                                                      vec3 vertexNormal,\n                                                      vec3 eyePos,\n                                                      float uShininess) {\n    vec3 viewDirNorm = normalize(eyePos - vertexPos);\n    return ColorComponents(\n              GetDiffuse(-info.dir, vertexNormal) *\n              info.diffuseColor,\n              GetSpecular(-info.dir, viewDirNorm, vertexNormal, uShininess) *\n              info.specularColor);\n}\n\n\nColorComponents CombinedLightSpot(\n    vec3 vVertexPosition, vec3 vNormal, vec3 uEyePosition, mat4 lightDesc,\n    float shininess) {\n    SpotLightInfo info = UnpackSpotLightInfo(lightDesc);\n    return SpotLightGetDiffuseAndSpecular(\n        info, vVertexPosition, vNormal, uEyePosition, shininess);\n}\n\nColorComponents CombinedLightPoint(\n    vec3 vVertexPosition, vec3 vNormal, vec3 uEyePosition, mat4 lightDesc,\n    float shininess) {\n    PointLightInfo info = UnpackPointLightInfo(lightDesc);\n    return PointLightGetDiffuseAndSpecular(\n        info, vVertexPosition, vNormal, uEyePosition, shininess);\n}\n\nColorComponents CombinedLightDirectional(\n    vec3 vVertexPosition, vec3 vNormal, vec3 uEyePosition, mat4 lightDesc,\n    float shininess) {\n    DirectionalLightInfo info = UnpackDirectionalLightInfo(lightDesc);\n    return DirectionalLightGetDiffuseAndSpecular(\n        info, vVertexPosition, vNormal, uEyePosition, shininess);\n}\n\n// ============================================================\n// Combined Light\n// ============================================================\nColorComponents CombinedLight(vec3 vVertexPosition,\n                   vec3 vNormal,\n                   vec3 uEyePosition,\n                   const mat4 uLightDescs[4],\n                   const float uLightTypes[4],\n                   float uShininess) {\n    ColorComponents acc = ColorComponents(vec3(0.0), vec3(0.0));\n\n    for (int i = 0; i < 4; ++i) {\n        ColorComponents curr;\n        float type = uLightTypes[i];\n        if (type == 2.0) {\n            curr = CombinedLightSpot(\n                       vVertexPosition, vNormal, uEyePosition, uLightDescs[i], \n                       uShininess);\n        } else if (type == 3.0) {\n            curr = CombinedLightPoint(\n                       vVertexPosition, vNormal, uEyePosition, uLightDescs[i], \n                       uShininess);\n        } else if (type == 1.0) {\n            curr = CombinedLightDirectional(\n                       vVertexPosition, vNormal, uEyePosition, uLightDescs[i], \n                       uShininess);\n        } else {\n            continue;\n        }\n        acc.diffuse = acc.diffuse + curr.diffuse;\n        acc.specular = acc.specular + curr.specular;\n    }\n    return acc;\n}\n"],y))
return z},"nY","fa",function(){var z,y
z=G.ba("SolidColor")
y=[P.e]
z.as(H.h(["aPosition"],y))
z.S(H.h(["uPerspectiveViewMatrix","uModelMatrix"],y))
z.ax(H.h(["gl_Position = uPerspectiveViewMatrix * uModelMatrix * vec4(aPosition, 1.0);"],y))
return z},"nX","f9",function(){var z,y
z=G.ba("SolidColorF")
y=[P.e]
z.S(H.h(["uColor"],y))
z.ax(H.h(["oFragColor = vec4( uColor, 1.0 );"],y))
return z},"nA","f1",function(){return H.h([T.D(0,0,1),T.D(0,0,-1),T.D(0,1,0),T.D(0,-1,0),T.D(1,0,0),T.D(-1,0,0)],[T.i])},"mj","eQ",function(){return H.h([G.M(0,11,5),G.M(0,5,1),G.M(0,1,7),G.M(0,7,10),G.M(0,10,11),G.M(1,5,9),G.M(5,11,4),G.M(11,10,2),G.M(10,7,6),G.M(7,1,8),G.M(3,9,4),G.M(3,4,2),G.M(3,2,6),G.M(3,6,8),G.M(3,8,9),G.M(4,9,5),G.M(2,4,11),G.M(6,2,10),G.M(8,6,7),G.M(9,8,1)],[G.ab])},"o_","fc",function(){return(1+P.lq(5))/2},"mk","cR",function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=$.fc()
y=T.D(-1,z,0)
y.D(0)
x=T.D(1,z,0)
x.D(0)
if(typeof z!=="number")return z.eg()
w=T.D(-1,-z,0)
w.D(0)
v=T.D(1,-z,0)
v.D(0)
u=T.D(0,-1,z)
u.D(0)
t=T.D(0,1,z)
t.D(0)
s=T.D(0,-1,-z)
s.D(0)
r=T.D(0,1,-z)
r.D(0)
q=T.D(z,0,-1)
q.D(0)
p=T.D(z,0,1)
p.D(0)
o=T.D(-z,0,-1)
o.D(0)
z=T.D(-z,0,1)
z.D(0)
return H.h([y,x,w,v,u,t,s,r,q,p,o,z],[T.i])},"nW","f8",function(){return T.D(11,20,0)},"nP","f3",function(){return T.D(0,-50,0)},"nZ","fb",function(){return T.D(-11,-30,0)},"nQ","cc",function(){var z,y,x,w,v,u
z=$.f3()
y=$.eF()
x=$.eM()
w=T.bY()
v=T.bY()
u=$.f8()
return P.cv(["idDirectional",new G.dk(z,y,x,40,w,v,1,"dir",!1,!0),"idPoint",new G.dG(u,$.eJ(),x,50,3,"point",!1,!0),"idSpot",new G.dM(u,$.fb(),$.eK(),x,50,0.4487989505128276,2,1,1,40,T.bY(),T.bY(),2,"spot",!1,!0)],P.e,G.b3)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,ret:P.G},{func:1,ret:-1},{func:1,ret:-1,args:[P.e,,]},{func:1,ret:P.G,args:[W.X]},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,args:[,]},{func:1,ret:P.G,args:[,]},{func:1,ret:P.G,args:[,,]},{func:1,ret:P.e,args:[P.x]},{func:1,ret:P.V,args:[W.ae]},{func:1,ret:P.V,args:[P.e]},{func:1,ret:P.G,args:[W.b1]},{func:1,ret:P.V,args:[W.R,P.e,P.e,W.bD]},{func:1,args:[,P.e]},{func:1,args:[P.e]},{func:1,ret:P.G,args:[{func:1,ret:-1}]},{func:1,ret:P.G,args:[,],opt:[P.a3]},{func:1,ret:[P.ag,,],args:[,]},{func:1,ret:P.V,args:[W.u]},{func:1,ret:-1,args:[P.e,P.e]},{func:1,ret:P.G,args:[P.H]},{func:1,args:[W.T]},{func:1,ret:P.e,args:[P.e]},{func:1,ret:-1,args:[W.u,W.u]},{func:1,ret:P.x,args:[P.x,P.x]},{func:1,ret:P.G,args:[W.aO]},{func:1,ret:P.x,args:[P.x,P.c]},{func:1,ret:P.G,args:[W.T]},{func:1,ret:-1,args:[W.T]},{func:1,ret:-1,args:[P.H]},{func:1,ret:P.x,args:[,,]}]
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
if(x==y)H.ls(d||a)
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
Isolate.aV=a.aV
Isolate.bj=a.bj
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
if(typeof dartMainRunner==="function")dartMainRunner(K.ez,[])
else K.ez([])})})()
//# sourceMappingURL=light.dart.js.map
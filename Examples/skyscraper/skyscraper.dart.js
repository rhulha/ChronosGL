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
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$ish)b6.$deferredAction()}var a4=Object.keys(a5.pending)
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
d.$callName=null}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(receiver) {"+"if (c === null) c = "+"H.cu"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, true, name);"+"return new c(this, funcs[0], receiver, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.cu"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, false, name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g=null
return a0?function(){if(g===null)g=H.cu(this,d,e,f,true,false,a1).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bd=function(){}
var dart=[["","",,H,{"^":"",lp:{"^":"b;a"}}],["","",,J,{"^":"",
cy:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bY:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cx==null){H.kk()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.c(P.dB("Return interceptor for "+H.e(y(a,z))))}w=a.constructor
v=w==null?null:w[$.cB()]
if(v!=null)return v
v=H.kp(a)
if(v!=null)return v
if(typeof a=="function")return C.R
y=Object.getPrototypeOf(a)
if(y==null)return C.B
if(y===Object.prototype)return C.B
if(typeof w=="function"){Object.defineProperty(w,$.cB(),{value:C.w,enumerable:false,writable:true,configurable:true})
return C.w}return C.w},
h:{"^":"b;",
F:function(a,b){return a===b},
gA:function(a){return H.b1(a)},
l:["cb",function(a){return"Instance of '"+H.b2(a)+"'"}],
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationEffectTimingReadOnly|AnimationTimeline|AnimationWorkletGlobalScope|ArrayBuffer|AudioListener|AudioParam|AudioTrack|AudioWorkletGlobalScope|AudioWorkletProcessor|AuthenticatorAssertionResponse|AuthenticatorAttestationResponse|AuthenticatorResponse|BackgroundFetchFetch|BackgroundFetchManager|BackgroundFetchSettledFetch|BarProp|BarcodeDetector|Bluetooth|BluetoothCharacteristicProperties|BluetoothRemoteGATTDescriptor|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|BudgetService|BudgetState|CSS|CSSVariableReferenceValue|Cache|CacheStorage|CanvasGradient|CanvasPattern|Client|Clients|CookieStore|Coordinates|Credential|CredentialUserData|CredentialsContainer|Crypto|CryptoKey|CustomElementRegistry|DOMError|DOMFileSystem|DOMFileSystemSync|DOMMatrix|DOMMatrixReadOnly|DOMParser|DOMPoint|DOMPointReadOnly|DOMQuad|DOMStringMap|DataTransfer|DataTransferItem|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeprecationReport|DetectedBarcode|DetectedFace|DetectedText|DeviceAcceleration|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|DocumentOrShadowRoot|DocumentTimeline|EXTBlendMinMax|EXTColorBufferFloat|EXTColorBufferHalfFloat|EXTDisjointTimerQuery|EXTDisjointTimerQueryWebGL2|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|Entry|EntrySync|External|FaceDetector|FederatedCredential|FileEntry|FileEntrySync|FileReaderSync|FileWriterSync|FontFace|FontFaceSource|FormData|GamepadButton|GamepadPose|Geolocation|HTMLAllCollection|HTMLHyperlinkElementUtils|Headers|IDBCursor|IDBCursorWithValue|IDBFactory|IDBIndex|IDBKeyRange|IDBObjectStore|IDBObservation|IDBObserver|IDBObserverChanges|IdleDeadline|ImageBitmapRenderingContext|ImageCapture|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|InterventionReport|Iterator|KeyframeEffect|KeyframeEffectReadOnly|MediaCapabilities|MediaCapabilitiesInfo|MediaDeviceInfo|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaKeysPolicy|MediaMetadata|MediaSession|MediaSettingsRange|MemoryInfo|MessageChannel|Metadata|Mojo|MojoHandle|MojoWatcher|MutationObserver|MutationRecord|NFC|NavigationPreloadManager|Navigator|NavigatorAutomationInformation|NavigatorConcurrentHardware|NavigatorCookies|NavigatorUserMediaError|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|NoncedElement|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvasRenderingContext2D|OverconstrainedError|PagePopupController|PaintRenderingContext2D|PaintWorkletGlobalScope|PasswordCredential|Path2D|PaymentAddress|PaymentInstruments|PaymentManager|PaymentResponse|PerformanceEntry|PerformanceLongTaskTiming|PerformanceMark|PerformanceMeasure|PerformanceNavigation|PerformanceNavigationTiming|PerformanceObserver|PerformanceObserverEntryList|PerformancePaintTiming|PerformanceResourceTiming|PerformanceServerTiming|PerformanceTiming|PeriodicWave|Permissions|PhotoCapabilities|Position|PositionError|Presentation|PresentationReceiver|PublicKeyCredential|PushManager|PushMessageData|PushSubscription|PushSubscriptionOptions|RTCCertificate|RTCIceCandidate|RTCLegacyStatsReport|RTCRtpContributingSource|RTCRtpReceiver|RTCRtpSender|RTCSessionDescription|RTCStatsResponse|RelatedApplication|Report|ReportBody|ReportingObserver|Request|ResizeObserver|ResizeObserverEntry|Response|SQLError|SQLResultSet|SQLTransaction|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGMatrix|SVGPoint|SVGPreserveAspectRatio|SVGUnitTypes|ScrollState|ScrollTimeline|Selection|SharedArrayBuffer|SpeechRecognitionAlternative|SpeechSynthesisVoice|StaticRange|StorageManager|StyleMedia|StylePropertyMap|StylePropertyMapReadonly|SubtleCrypto|SyncManager|TaskAttributionTiming|TextDetector|TrackDefault|TreeWalker|TrustedHTML|TrustedScriptURL|TrustedURL|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRCoordinateSystem|VRDisplayCapabilities|VREyeParameters|VRFrameData|VRFrameOfReference|VRPose|VRStageBounds|VRStageBoundsPoint|VRStageParameters|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGL|WebGL2RenderingContextBase|WebGLActiveInfo|WebGLCanvas|WebGLColorBufferFloat|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLCompressedTextureS3TCsRGB|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLGetBufferSubDataAsync|WebGLLoseContext|WebGLQuery|WebGLRenderbuffer|WebGLSampler|WebGLShaderPrecisionFormat|WebGLSync|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLVertexArrayObjectOES|WebKitMutationObserver|WindowClient|WorkerLocation|WorkerNavigator|Worklet|WorkletAnimation|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate|mozRTCSessionDescription"},
h3:{"^":"h;",
l:function(a){return String(a)},
gA:function(a){return a?519018:218159},
$isR:1},
h4:{"^":"h;",
F:function(a,b){return null==b},
l:function(a){return"null"},
gA:function(a){return 0},
$isG:1},
cg:{"^":"h;",
gA:function(a){return 0},
l:["cd",function(a){return String(a)}]},
hB:{"^":"cg;"},
b5:{"^":"cg;"},
bq:{"^":"cg;",
l:function(a){var z=a[$.el()]
if(z==null)return this.cd(a)
return"JavaScript function for "+H.e(J.bj(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$isbl:1},
bn:{"^":"h;$ti",
k:function(a,b){H.A(b,H.q(a,0))
if(!!a.fixed$length)H.W(P.z("add"))
a.push(b)},
H:function(a,b){var z,y
H.w(b,"$isk",[H.q(a,0)],"$ask")
if(!!a.fixed$length)H.W(P.z("addAll"))
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.J)(b),++y)a.push(b[y])},
a5:function(a,b){var z,y
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)this.i(z,y,H.e(a[y]))
return z.join(b)},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
gdt:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.c(H.da())},
bh:function(a,b){var z,y
H.m(b,{func:1,ret:P.R,args:[H.q(a,0)]})
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y]))return!0
if(a.length!==z)throw H.c(P.aI(a))}return!1},
c6:function(a,b){if(!!a.immutable$list)H.W(P.z("sort"))
H.i_(a,J.jW(),H.q(a,0))},
ai:function(a){return this.c6(a,null)},
w:function(a,b){var z
for(z=0;z<a.length;++z)if(J.aG(a[z],b))return!0
return!1},
l:function(a){return P.ce(a,"[","]")},
gC:function(a){return new J.fj(a,a.length,0,[H.q(a,0)])},
gA:function(a){return H.b1(a)},
gj:function(a){return a.length},
h:function(a,b){if(b>=a.length||b<0)throw H.c(H.bc(a,b))
return a[b]},
i:function(a,b,c){H.A(c,H.q(a,0))
if(!!a.immutable$list)H.W(P.z("indexed set"))
if(b>=a.length||b<0)throw H.c(H.bc(a,b))
a[b]=c},
$isu:1,
$asu:I.bd,
$isk:1,
$isa:1,
p:{
h2:function(a,b){return J.cf(H.i(a,[b]))},
cf:function(a){H.bx(a)
a.fixed$length=Array
return a},
ln:[function(a,b){return J.eO(H.ef(a,"$isV"),H.ef(b,"$isV"))},"$2","jW",8,0,28]}},
lo:{"^":"bn;$ti"},
fj:{"^":"b;a,b,c,0d,$ti",
saY:function(a){this.d=H.A(a,H.q(this,0))},
gD:function(a){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.J(z))
x=this.c
if(x>=y){this.saY(null)
return!1}this.saY(z[x]);++this.c
return!0},
$isaV:1},
bo:{"^":"h;",
M:function(a,b){var z
H.cz(b)
if(typeof b!=="number")throw H.c(H.ba(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gaf(b)
if(this.gaf(a)===z)return 0
if(this.gaf(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaf:function(a){return a===0?1/a<0:a<0},
bL:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.c(P.z(""+a+".toInt()"))},
da:function(a){var z,y
if(a>=0){if(a<=2147483647){z=a|0
return a===z?z:z+1}}else if(a>=-2147483648)return a|0
y=Math.ceil(a)
if(isFinite(y))return y
throw H.c(P.z(""+a+".ceil()"))},
dc:function(a,b,c){if(this.M(b,c)>0)throw H.c(H.ba(b))
if(this.M(a,b)<0)return b
if(this.M(a,c)>0)return c
return a},
dL:function(a,b){var z
if(b>20)throw H.c(P.bL(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0&&this.gaf(a))return"-"+z
return z},
l:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gA:function(a){return a&0x1FFFFFFF},
cf:function(a,b){if((a|0)===a)if(b>=1||!1)return a/b|0
return this.be(a,b)},
X:function(a,b){return(a|0)===a?a/b|0:this.be(a,b)},
be:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(P.z("Result of truncating division is "+H.e(z)+": "+H.e(a)+" ~/ "+b))},
bc:function(a,b){var z
if(a>0)z=this.cZ(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
cZ:function(a,b){return b>31?0:a>>>b},
U:function(a,b){if(typeof b!=="number")throw H.c(H.ba(b))
return a>b},
$isV:1,
$asV:function(){return[P.E]},
$isaj:1,
$isE:1},
dc:{"^":"bo;",$isD:1},
db:{"^":"bo;"},
bp:{"^":"h;",
an:function(a,b){if(b>=a.length)throw H.c(H.bc(a,b))
return a.charCodeAt(b)},
K:function(a,b){H.v(b)
if(typeof b!=="string")throw H.c(P.cS(b,null,null))
return a+b},
c8:function(a,b,c){var z
if(c>a.length)throw H.c(P.bL(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
c7:function(a,b){return this.c8(a,b,0)},
ca:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.c(P.bM(b,null,null))
if(b>c)throw H.c(P.bM(b,null,null))
if(c>a.length)throw H.c(P.bM(c,null,null))
return a.substring(b,c)},
c9:function(a,b){return this.ca(a,b,null)},
dK:function(a){return a.toLowerCase()},
dd:function(a,b,c){if(c>a.length)throw H.c(P.bL(c,0,a.length,null,null))
return H.kw(a,b,c)},
M:function(a,b){var z
H.v(b)
if(typeof b!=="string")throw H.c(H.ba(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
l:function(a){return a},
gA:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gj:function(a){return a.length},
h:function(a,b){if(b>=a.length||!1)throw H.c(H.bc(a,b))
return a[b]},
$isu:1,
$asu:I.bd,
$isV:1,
$asV:function(){return[P.d]},
$ishz:1,
$isd:1}}],["","",,H,{"^":"",
da:function(){return new P.cm("No element")},
h1:function(){return new P.cm("Too many elements")},
i_:function(a,b,c){H.w(a,"$isa",[c],"$asa")
H.m(b,{func:1,ret:P.D,args:[c,c]})
H.br(a,0,J.aQ(a)-1,b,c)},
br:function(a,b,c,d,e){H.w(a,"$isa",[e],"$asa")
H.m(d,{func:1,ret:P.D,args:[e,e]})
if(c-b<=32)H.hZ(a,b,c,d,e)
else H.hY(a,b,c,d,e)},
hZ:function(a,b,c,d,e){var z,y,x,w,v
H.w(a,"$isa",[e],"$asa")
H.m(d,{func:1,ret:P.D,args:[e,e]})
for(z=b+1,y=J.be(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.aa(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.i(a,w,y.h(a,v))
w=v}y.i(a,w,x)}},
hY:function(a,b,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
H.w(a,"$isa",[a2],"$asa")
H.m(a1,{func:1,ret:P.D,args:[a2,a2]})
z=C.d.X(a0-b+1,6)
y=b+z
x=a0-z
w=C.d.X(b+a0,2)
v=w-z
u=w+z
t=J.be(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.aa(a1.$2(s,r),0)){n=r
r=s
s=n}if(J.aa(a1.$2(p,o),0)){n=o
o=p
p=n}if(J.aa(a1.$2(s,q),0)){n=q
q=s
s=n}if(J.aa(a1.$2(r,q),0)){n=q
q=r
r=n}if(J.aa(a1.$2(s,p),0)){n=p
p=s
s=n}if(J.aa(a1.$2(q,p),0)){n=p
p=q
q=n}if(J.aa(a1.$2(r,o),0)){n=o
o=r
r=n}if(J.aa(a1.$2(r,q),0)){n=q
q=r
r=n}if(J.aa(a1.$2(p,o),0)){n=o
o=p
p=n}t.i(a,y,s)
t.i(a,w,q)
t.i(a,x,o)
t.i(a,v,t.h(a,b))
t.i(a,u,t.h(a,a0))
m=b+1
l=a0-1
if(J.aG(a1.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=a1.$2(j,r)
if(i===0)continue
if(typeof i!=="number")return i.a6()
if(i<0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else for(;!0;){i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.U()
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
if(typeof e!=="number")return e.a6()
if(e<0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else{d=a1.$2(j,p)
if(typeof d!=="number")return d.U()
if(d>0)for(;!0;){i=a1.$2(t.h(a,l),p)
if(typeof i!=="number")return i.U()
if(i>0){--l
if(l<k)break
continue}else{i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.a6()
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
H.br(a,b,m-2,a1,a2)
H.br(a,l+2,a0,a1,a2)
if(f)return
if(m<y&&l>x){for(;J.aG(a1.$2(t.h(a,m),r),0);)++m
for(;J.aG(a1.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(a1.$2(j,r)===0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else if(a1.$2(j,p)===0)for(;!0;)if(a1.$2(t.h(a,l),p)===0){--l
if(l<k)break
continue}else{i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.a6()
h=l-1
if(i<0){t.i(a,k,t.h(a,m))
g=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=g}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=h
break}}H.br(a,m,l,a1,a2)}else H.br(a,m,l,a1,a2)},
d2:{"^":"k;"},
bK:{"^":"d2;$ti",
gC:function(a){return new H.dg(this,this.gj(this),0,[H.cw(this,"bK",0)])},
aD:function(a,b){return this.cc(0,H.m(b,{func:1,ret:P.R,args:[H.cw(this,"bK",0)]}))}},
dg:{"^":"b;a,b,c,0d,$ti",
saZ:function(a){this.d=H.A(a,H.q(this,0))},
gD:function(a){return this.d},
u:function(){var z,y,x,w
z=this.a
y=J.be(z)
x=y.gj(z)
if(this.b!==x)throw H.c(P.aI(z))
w=this.c
if(w>=x){this.saZ(null)
return!1}this.saZ(y.t(z,w));++this.c
return!0},
$isaV:1},
hf:{"^":"bK;a,b,$ti",
gj:function(a){return J.aQ(this.a)},
t:function(a,b){return this.b.$1(J.eW(this.a,b))},
$asbK:function(a,b){return[b]},
$ask:function(a,b){return[b]}},
dC:{"^":"k;a,b,$ti",
gC:function(a){return new H.ik(J.bD(this.a),this.b,this.$ti)}},
ik:{"^":"aV;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gD(z)))return!0
return!1},
gD:function(a){var z=this.a
return z.gD(z)}},
bJ:{"^":"b;$ti"}}],["","",,H,{"^":"",
aF:function(a){var z,y
z=H.v(init.mangledGlobalNames[a])
if(typeof z==="string")return z
y="minified:"+a
return y},
kc:function(a){return init.types[H.P(a)]},
kn:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.B(a).$isx},
e:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.bj(a)
if(typeof z!=="string")throw H.c(H.ba(a))
return z},
b1:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
b2:function(a){return H.hC(a)+H.bS(H.ak(a),0,null)},
hC:function(a){var z,y,x,w,v,u,t,s,r
z=J.B(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
v=w==null
if(v||z===C.K||!!z.$isb5){u=C.A(a)
if(v)w=u
if(u==="Object"){t=a.constructor
if(typeof t=="function"){s=String(t).match(/^\s*function\s*([\w$]*)\s*\(/)
r=s==null?null:s[1]
if(typeof r==="string"&&/^\w+$/.test(r))w=r}}return w}w=w
return H.aF(w.length>1&&C.i.an(w,0)===36?C.i.c9(w,1):w)},
aJ:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
hJ:function(a){var z=H.aJ(a).getFullYear()+0
return z},
hH:function(a){var z=H.aJ(a).getMonth()+1
return z},
hD:function(a){var z=H.aJ(a).getDate()+0
return z},
hE:function(a){var z=H.aJ(a).getHours()+0
return z},
hG:function(a){var z=H.aJ(a).getMinutes()+0
return z},
hI:function(a){var z=H.aJ(a).getSeconds()+0
return z},
hF:function(a){var z=H.aJ(a).getMilliseconds()+0
return z},
a7:function(a){throw H.c(H.ba(a))},
j:function(a,b){if(a==null)J.aQ(a)
throw H.c(H.bc(a,b))},
bc:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aH(!0,b,"index",null)
z=H.P(J.aQ(a))
if(!(b<0)){if(typeof z!=="number")return H.a7(z)
y=b>=z}else y=!0
if(y)return P.F(b,a,"index",null,z)
return P.bM(b,"index",null)},
ba:function(a){return new P.aH(!0,a,null,null)},
c:function(a){var z
if(a==null)a=new P.dm()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.ei})
z.name=""}else z.toString=H.ei
return z},
ei:function(){return J.bj(this.dartException)},
W:function(a){throw H.c(a)},
J:function(a){throw H.c(P.aI(a))},
a8:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.ky(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.bc(x,16)&8191)===10)switch(w){case 438:return z.$1(H.ch(H.e(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.dl(H.e(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.ep()
u=$.eq()
t=$.er()
s=$.es()
r=$.ev()
q=$.ew()
p=$.eu()
$.et()
o=$.ey()
n=$.ex()
m=v.L(y)
if(m!=null)return z.$1(H.ch(H.v(y),m))
else{m=u.L(y)
if(m!=null){m.method="call"
return z.$1(H.ch(H.v(y),m))}else{m=t.L(y)
if(m==null){m=s.L(y)
if(m==null){m=r.L(y)
if(m==null){m=q.L(y)
if(m==null){m=p.L(y)
if(m==null){m=s.L(y)
if(m==null){m=o.L(y)
if(m==null){m=n.L(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.dl(H.v(y),m))}}return z.$1(new H.ih(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.ds()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aH(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.ds()
return a},
bg:function(a){var z
if(a==null)return new H.dS(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dS(a)},
k8:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.i(0,a[y],a[x])}return b},
km:function(a,b,c,d,e,f){H.f(a,"$isbl")
switch(H.P(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.c(P.d5("Unsupported number of arguments for wrapped closure"))},
bb:function(a,b){var z
H.P(b)
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.km)
a.$identity=z
return z},
fu:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b[0]
y=z.$callName
if(!!J.B(d).$isa){z.$reflectionInfo=d
x=H.hN(z).r}else x=d
w=e?Object.create(new H.i0().constructor.prototype):Object.create(new H.c8(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function static_tear_off(){this.$initialize()}
else{u=$.ab
if(typeof u!=="number")return u.K()
$.ab=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=H.cX(a,z,f)
t.$reflectionInfo=d}else{w.$static_name=g
t=z}if(typeof x=="number")s=function(h,i){return function(){return h(i)}}(H.kc,x)
else if(typeof x=="function")if(e)s=x
else{r=f?H.cV:H.c9
s=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,r)}else throw H.c("Error in reflectionInfo.")
w.$S=s
w[y]=t
for(q=t,p=1;p<b.length;++p){o=b[p]
n=o.$callName
if(n!=null){o=e?o:H.cX(a,o,f)
w[n]=o}if(p===c){o.$reflectionInfo=d
q=o}}w.$C=q
w.$R=z.$R
w.$D=z.$D
return v},
fr:function(a,b,c,d){var z=H.c9
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cX:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.ft(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.fr(y,!w,z,b)
if(y===0){w=$.ab
if(typeof w!=="number")return w.K()
$.ab=w+1
u="self"+w
w="return function(){var "+u+" = this."
v=$.aR
if(v==null){v=H.bG("self")
$.aR=v}return new Function(w+H.e(v)+";return "+u+"."+H.e(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.ab
if(typeof w!=="number")return w.K()
$.ab=w+1
t+=w
w="return function("+t+"){return this."
v=$.aR
if(v==null){v=H.bG("self")
$.aR=v}return new Function(w+H.e(v)+"."+H.e(z)+"("+t+");}")()},
fs:function(a,b,c,d){var z,y
z=H.c9
y=H.cV
switch(b?-1:a){case 0:throw H.c(H.hT("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
ft:function(a,b){var z,y,x,w,v,u,t,s
z=$.aR
if(z==null){z=H.bG("self")
$.aR=z}y=$.cU
if(y==null){y=H.bG("receiver")
$.cU=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fs(w,!u,x,b)
if(w===1){z="return function(){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+");"
y=$.ab
if(typeof y!=="number")return y.K()
$.ab=y+1
return new Function(z+y+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.e(z)+"."+H.e(x)+"(this."+H.e(y)+", "+s+");"
y=$.ab
if(typeof y!=="number")return y.K()
$.ab=y+1
return new Function(z+y+"}")()},
cu:function(a,b,c,d,e,f,g){return H.fu(a,b,H.P(c),d,!!e,!!f,g)},
v:function(a){if(a==null)return a
if(typeof a==="string")return a
throw H.c(H.a5(a,"String"))},
e6:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.c(H.a5(a,"double"))},
cz:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.c(H.a5(a,"num"))},
bV:function(a){if(a==null)return a
if(typeof a==="boolean")return a
throw H.c(H.a5(a,"bool"))},
P:function(a){if(a==null)return a
if(typeof a==="number"&&Math.floor(a)===a)return a
throw H.c(H.a5(a,"int"))},
cA:function(a,b){throw H.c(H.a5(a,H.aF(H.v(b).substring(3))))},
kt:function(a,b){throw H.c(H.cW(a,H.aF(H.v(b).substring(3))))},
f:function(a,b){if(a==null)return a
if((typeof a==="object"||typeof a==="function")&&J.B(a)[b])return a
H.cA(a,b)},
al:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.B(a)[b]
else z=!0
if(z)return a
H.kt(a,b)},
ef:function(a,b){if(a==null)return a
if(typeof a==="string")return a
if(typeof a==="number")return a
if(J.B(a)[b])return a
H.cA(a,b)},
bx:function(a){if(a==null)return a
if(!!J.B(a).$isa)return a
throw H.c(H.a5(a,"List<dynamic>"))},
ko:function(a,b){var z
if(a==null)return a
z=J.B(a)
if(!!z.$isa)return a
if(z[b])return a
H.cA(a,b)},
cv:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[H.P(z)]
else return a.$S()}return},
bu:function(a,b){var z
if(a==null)return!1
if(typeof a=="function")return!0
z=H.cv(J.B(a))
if(z==null)return!1
return H.dY(z,null,b,null)},
m:function(a,b){var z,y
if(a==null)return a
if($.cq)return a
$.cq=!0
try{if(H.bu(a,b))return a
z=H.by(b)
y=H.a5(a,z)
throw H.c(y)}finally{$.cq=!1}},
bX:function(a,b){if(a!=null&&!H.ct(a,b))H.W(H.a5(a,H.by(b)))
return a},
e1:function(a){var z,y
z=J.B(a)
if(!!z.$iso){y=H.cv(z)
if(y!=null)return H.by(y)
return"Closure"}return H.b2(a)},
kx:function(a){throw H.c(new P.fB(H.v(a)))},
eb:function(a){return init.getIsolateTag(a)},
i:function(a,b){a.$ti=b
return a},
ak:function(a){if(a==null)return
return a.$ti},
mP:function(a,b,c){return H.aP(a["$as"+H.e(c)],H.ak(b))},
bf:function(a,b,c,d){var z
H.v(c)
H.P(d)
z=H.aP(a["$as"+H.e(c)],H.ak(b))
return z==null?null:z[d]},
cw:function(a,b,c){var z
H.v(b)
H.P(c)
z=H.aP(a["$as"+H.e(b)],H.ak(a))
return z==null?null:z[c]},
q:function(a,b){var z
H.P(b)
z=H.ak(a)
return z==null?null:z[b]},
by:function(a){return H.aD(a,null)},
aD:function(a,b){var z,y
H.w(b,"$isa",[P.d],"$asa")
if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return H.aF(a[0].builtin$cls)+H.bS(a,1,b)
if(typeof a=="function")return H.aF(a.builtin$cls)
if(a===-2)return"dynamic"
if(typeof a==="number"){H.P(a)
if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+a
z=b.length
y=z-a-1
if(y<0||y>=z)return H.j(b,y)
return H.e(b[y])}if('func' in a)return H.jV(a,b)
if('futureOr' in a)return"FutureOr<"+H.aD("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
jV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=[P.d]
H.w(b,"$isa",z,"$asa")
if("bounds" in a){y=a.bounds
if(b==null){b=H.i([],z)
x=null}else x=b.length
w=b.length
for(v=y.length,u=v;u>0;--u)C.a.k(b,"T"+(w+u))
for(t="<",s="",u=0;u<v;++u,s=", "){t+=s
z=b.length
r=z-u-1
if(r<0)return H.j(b,r)
t=C.i.K(t,b[r])
q=y[u]
if(q!=null&&q!==P.b)t+=" extends "+H.aD(q,b)}t+=">"}else{t=""
x=null}p=!!a.v?"void":H.aD(a.ret,b)
if("args" in a){o=a.args
for(z=o.length,n="",m="",l=0;l<z;++l,m=", "){k=o[l]
n=n+m+H.aD(k,b)}}else{n=""
m=""}if("opt" in a){j=a.opt
n+=m+"["
for(z=j.length,m="",l=0;l<z;++l,m=", "){k=j[l]
n=n+m+H.aD(k,b)}n+="]"}if("named" in a){i=a.named
n+=m+"{"
for(z=H.k7(i),r=z.length,m="",l=0;l<r;++l,m=", "){h=H.v(z[l])
n=n+m+H.aD(i[h],b)+(" "+H.e(h))}n+="}"}if(x!=null)b.length=x
return t+"("+n+") => "+p},
bS:function(a,b,c){var z,y,x,w,v,u
H.w(c,"$isa",[P.d],"$asa")
if(a==null)return""
z=new P.co("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.aD(u,c)}return"<"+z.l(0)+">"},
kb:function(a){var z,y,x,w
z=J.B(a)
if(!!z.$iso){y=H.cv(z)
if(y!=null)return y}x=z.constructor
if(a==null)return x
if(typeof a!="object")return x
w=H.ak(a)
if(w!=null){w=w.slice()
w.splice(0,0,x)
x=w}return x},
aP:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aN:function(a,b,c,d){var z,y
H.v(b)
H.bx(c)
H.v(d)
if(a==null)return!1
z=H.ak(a)
y=J.B(a)
if(y[b]==null)return!1
return H.e4(H.aP(y[d],z),null,c,null)},
bz:function(a,b,c,d){H.v(b)
H.bx(c)
H.v(d)
if(a==null)return a
if(H.aN(a,b,c,d))return a
throw H.c(H.cW(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(H.aF(b.substring(3))+H.bS(c,0,null),init.mangledGlobalNames)))},
w:function(a,b,c,d){H.v(b)
H.bx(c)
H.v(d)
if(a==null)return a
if(H.aN(a,b,c,d))return a
throw H.c(H.a5(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(H.aF(b.substring(3))+H.bS(c,0,null),init.mangledGlobalNames)))},
e4:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.a_(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.a_(a[y],b,c[y],d))return!1
return!0},
mL:function(a,b,c){return a.apply(b,H.aP(J.B(b)["$as"+H.e(c)],H.ak(b)))},
ed:function(a){var z
if(typeof a==="number")return!1
if('futureOr' in a){z="type" in a?a.type:null
return a==null||a.builtin$cls==="b"||a.builtin$cls==="G"||a===-1||a===-2||H.ed(z)}return!1},
ct:function(a,b){var z,y
if(a==null)return b==null||b.builtin$cls==="b"||b.builtin$cls==="G"||b===-1||b===-2||H.ed(b)
if(b==null||b===-1||b.builtin$cls==="b"||b===-2)return!0
if(typeof b=="object"){if('futureOr' in b)if(H.ct(a,"type" in b?b.type:null))return!0
if('func' in b)return H.bu(a,b)}z=J.B(a).constructor
y=H.ak(a)
if(y!=null){y=y.slice()
y.splice(0,0,z)
z=y}return H.a_(z,null,b,null)},
A:function(a,b){if(a!=null&&!H.ct(a,b))throw H.c(H.a5(a,H.by(b)))
return a},
a_:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="b"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="b"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.a_(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="G")return!0
if('func' in c)return H.dY(a,b,c,d)
if('func' in a)return c.builtin$cls==="bl"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.a_("type" in a?a.type:null,b,x,d)
else if(H.a_(a,b,x,d))return!0
else{if(!('$is'+"aU" in y.prototype))return!1
w=y.prototype["$as"+"aU"]
v=H.aP(w,z?a.slice(1):null)
return H.a_(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=t.builtin$cls
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.e4(H.aP(r,z),b,u,d)},
dY:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.a_(a.ret,b,c.ret,d))return!1
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
for(p=0;p<t;++p)if(!H.a_(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.a_(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.a_(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.ks(m,b,l,d)},
ks:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.a_(c[w],d,a[w],b))return!1}return!0},
mM:function(a,b,c){Object.defineProperty(a,H.v(b),{value:c,enumerable:false,writable:true,configurable:true})},
kp:function(a){var z,y,x,w,v,u
z=H.v($.ec.$1(a))
y=$.bW[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bZ[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=H.v($.e3.$2(a,z))
if(z!=null){y=$.bW[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bZ[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.c_(x)
$.bW[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bZ[z]=x
return x}if(v==="-"){u=H.c_(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eg(a,x)
if(v==="*")throw H.c(P.dB(z))
if(init.leafTags[z]===true){u=H.c_(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eg(a,x)},
eg:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.cy(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
c_:function(a){return J.cy(a,!1,null,!!a.$isx)},
kr:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.c_(z)
else return J.cy(z,c,null,null)},
kk:function(){if(!0===$.cx)return
$.cx=!0
H.kl()},
kl:function(){var z,y,x,w,v,u,t,s
$.bW=Object.create(null)
$.bZ=Object.create(null)
H.kg()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.eh.$1(v)
if(u!=null){t=H.kr(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
kg:function(){var z,y,x,w,v,u,t
z=C.O()
z=H.aM(C.L,H.aM(C.Q,H.aM(C.z,H.aM(C.z,H.aM(C.P,H.aM(C.M,H.aM(C.N(C.A),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.ec=new H.kh(v)
$.e3=new H.ki(u)
$.eh=new H.kj(t)},
aM:function(a,b){return a(b)||b},
kw:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
hM:{"^":"b;a,b,c,d,e,f,r,0x",p:{
hN:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.cf(z)
y=z[0]
x=z[1]
return new H.hM(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
ib:{"^":"b;a,b,c,d,e,f",
L:function(a){var z,y,x
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
ad:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.i([],[P.d])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.ib(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bO:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
dy:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
hx:{"^":"Q;a,b",
l:function(a){var z=this.b
if(z==null)return"NoSuchMethodError: "+H.e(this.a)
return"NoSuchMethodError: method not found: '"+z+"' on null"},
p:{
dl:function(a,b){return new H.hx(a,b==null?null:b.method)}}},
h5:{"^":"Q;a,b,c",
l:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.e(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.e(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.e(this.a)+")"},
p:{
ch:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.h5(a,y,z?null:b.receiver)}}},
ih:{"^":"Q;a",
l:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
ky:{"^":"o:5;a",
$1:function(a){if(!!J.B(a).$isQ)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dS:{"^":"b;a,0b",
l:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isa4:1},
o:{"^":"b;",
l:function(a){return"Closure '"+H.b2(this).trim()+"'"},
gc_:function(){return this},
$isbl:1,
gc_:function(){return this}},
du:{"^":"o;"},
i0:{"^":"du;",
l:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+H.aF(z)+"'"}},
c8:{"^":"du;a,b,c,d",
F:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.c8))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gA:function(a){var z,y
z=this.c
if(z==null)y=H.b1(this.a)
else y=typeof z!=="object"?J.am(z):H.b1(z)
return(y^H.b1(this.b))>>>0},
l:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.e(this.d)+"' of "+("Instance of '"+H.b2(z)+"'")},
p:{
c9:function(a){return a.a},
cV:function(a){return a.c},
bG:function(a){var z,y,x,w,v
z=new H.c8("self","target","receiver","name")
y=J.cf(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
ic:{"^":"Q;a",
l:function(a){return this.a},
p:{
a5:function(a,b){return new H.ic("TypeError: "+H.e(P.bI(a))+": type '"+H.e1(a)+"' is not a subtype of type '"+b+"'")}}},
fp:{"^":"Q;a",
l:function(a){return this.a},
p:{
cW:function(a,b){return new H.fp("CastError: "+H.e(P.bI(a))+": type '"+H.e1(a)+"' is not a subtype of type '"+b+"'")}}},
hS:{"^":"Q;a",
l:function(a){return"RuntimeError: "+H.e(this.a)},
p:{
hT:function(a){return new H.hS(a)}}},
dz:{"^":"b;a,0b,0c,0d",
gac:function(){var z=this.b
if(z==null){z=H.by(this.a)
this.b=z}return z},
l:function(a){return this.gac()},
gA:function(a){var z=this.d
if(z==null){z=C.i.gA(this.gac())
this.d=z}return z},
F:function(a,b){if(b==null)return!1
return b instanceof H.dz&&this.gac()===b.gac()}},
dd:{"^":"dh;a,0b,0c,0d,0e,0f,r,$ti",
gj:function(a){return this.a},
gI:function(a){return new H.aq(this,[H.q(this,0)])},
ae:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.cJ(z,b)}else{y=this.dr(b)
return y}},
dr:function(a){var z=this.d
if(z==null)return!1
return this.aA(this.at(z,J.am(a)&0x3ffffff),a)>=0},
h:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.aa(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.aa(w,b)
x=y==null?null:y.b
return x}else return this.ds(b)},
ds:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.at(z,J.am(a)&0x3ffffff)
x=this.aA(y,a)
if(x<0)return
return y[x].b},
i:function(a,b,c){var z,y,x,w,v,u
H.A(b,H.q(this,0))
H.A(c,H.q(this,1))
if(typeof b==="string"){z=this.b
if(z==null){z=this.av()
this.b=z}this.b_(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.av()
this.c=y}this.b_(y,b,c)}else{x=this.d
if(x==null){x=this.av()
this.d=x}w=J.am(b)&0x3ffffff
v=this.at(x,w)
if(v==null)this.ay(x,w,[this.al(b,c)])
else{u=this.aA(v,b)
if(u>=0)v[u].b=c
else v.push(this.al(b,c))}}},
G:function(a,b){var z,y
H.m(b,{func:1,ret:-1,args:[H.q(this,0),H.q(this,1)]})
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(P.aI(this))
z=z.c}},
b_:function(a,b,c){var z
H.A(b,H.q(this,0))
H.A(c,H.q(this,1))
z=this.aa(a,b)
if(z==null)this.ay(a,b,this.al(b,c))
else z.b=c},
b1:function(){this.r=this.r+1&67108863},
al:function(a,b){var z,y
z=new H.ha(H.A(a,H.q(this,0)),H.A(b,H.q(this,1)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.b1()
return z},
aA:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.aG(a[y].a,b))return y
return-1},
l:function(a){return P.di(this)},
aa:function(a,b){return a[b]},
at:function(a,b){return a[b]},
ay:function(a,b,c){a[b]=c},
cK:function(a,b){delete a[b]},
cJ:function(a,b){return this.aa(a,b)!=null},
av:function(){var z=Object.create(null)
this.ay(z,"<non-identifier-key>",z)
this.cK(z,"<non-identifier-key>")
return z},
$isde:1},
ha:{"^":"b;a,b,0c,0d"},
aq:{"^":"d2;a,$ti",
gj:function(a){return this.a.a},
gC:function(a){var z,y
z=this.a
y=new H.hb(z,z.r,this.$ti)
y.c=z.e
return y}},
hb:{"^":"b;a,b,0c,0d,$ti",
sb0:function(a){this.d=H.A(a,H.q(this,0))},
gD:function(a){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(P.aI(z))
else{z=this.c
if(z==null){this.sb0(null)
return!1}else{this.sb0(z.a)
this.c=this.c.c
return!0}}},
$isaV:1},
kh:{"^":"o:5;a",
$1:function(a){return this.a(a)}},
ki:{"^":"o:13;a",
$2:function(a,b){return this.a(a,b)}},
kj:{"^":"o:14;a",
$1:function(a){return this.a(H.v(a))}}}],["","",,H,{"^":"",
k7:function(a){return J.h2(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
c0:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
bR:function(a){var z,y
if(!!J.B(a).$isu)return a
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)C.a.i(z,y,a[y])
return z},
af:function(a,b,c){if(a>>>0!==a||a>=c)throw H.c(H.bc(b,a))},
hs:{"^":"h;",$isid:1,"%":"DataView;ArrayBufferView;cj|dM|dN|dj|dO|dP|as"},
cj:{"^":"hs;",
gj:function(a){return a.length},
$isu:1,
$asu:I.bd,
$isx:1,
$asx:I.bd},
dj:{"^":"dN;",
h:function(a,b){H.af(b,a,a.length)
return a[b]},
i:function(a,b,c){H.e6(c)
H.af(b,a,a.length)
a[b]=c},
$asbJ:function(){return[P.aj]},
$asp:function(){return[P.aj]},
$isk:1,
$ask:function(){return[P.aj]},
$isa:1,
$asa:function(){return[P.aj]},
"%":"Float64Array"},
as:{"^":"dP;",
i:function(a,b,c){H.P(c)
H.af(b,a,a.length)
a[b]=c},
$asbJ:function(){return[P.D]},
$asp:function(){return[P.D]},
$isk:1,
$ask:function(){return[P.D]},
$isa:1,
$asa:function(){return[P.D]}},
hr:{"^":"dj;",$isai:1,"%":"Float32Array"},
lx:{"^":"as;",
h:function(a,b){H.af(b,a,a.length)
return a[b]},
"%":"Int16Array"},
ly:{"^":"as;",
h:function(a,b){H.af(b,a,a.length)
return a[b]},
$ish_:1,
"%":"Int32Array"},
lz:{"^":"as;",
h:function(a,b){H.af(b,a,a.length)
return a[b]},
"%":"Int8Array"},
lA:{"^":"as;",
h:function(a,b){H.af(b,a,a.length)
return a[b]},
"%":"Uint16Array"},
ht:{"^":"as;",
h:function(a,b){H.af(b,a,a.length)
return a[b]},
$ismk:1,
"%":"Uint32Array"},
lB:{"^":"as;",
gj:function(a){return a.length},
h:function(a,b){H.af(b,a,a.length)
return a[b]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
lC:{"^":"as;",
gj:function(a){return a.length},
h:function(a,b){H.af(b,a,a.length)
return a[b]},
"%":";Uint8Array"},
dM:{"^":"cj+p;"},
dN:{"^":"dM+bJ;"},
dO:{"^":"cj+p;"},
dP:{"^":"dO+bJ;"}}],["","",,P,{"^":"",
ip:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.k2()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.bb(new P.ir(z),1)).observe(y,{childList:true})
return new P.iq(z,y,x)}else if(self.setImmediate!=null)return P.k3()
return P.k4()},
mu:[function(a){self.scheduleImmediate(H.bb(new P.is(H.m(a,{func:1,ret:-1})),0))},"$1","k2",4,0,4],
mv:[function(a){self.setImmediate(H.bb(new P.it(H.m(a,{func:1,ret:-1})),0))},"$1","k3",4,0,4],
mw:[function(a){H.m(a,{func:1,ret:-1})
P.jD(0,a)},"$1","k4",4,0,4],
jZ:function(a,b){if(H.bu(a,{func:1,args:[P.b,P.a4]}))return H.m(a,{func:1,ret:null,args:[P.b,P.a4]})
if(H.bu(a,{func:1,args:[P.b]}))return H.m(a,{func:1,ret:null,args:[P.b]})
throw H.c(P.cS(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
jY:function(){var z,y
for(;z=$.aL,z!=null;){$.b9=null
y=z.b
$.aL=y
if(y==null)$.b8=null
z.a.$0()}},
mJ:[function(){$.cr=!0
try{P.jY()}finally{$.b9=null
$.cr=!1
if($.aL!=null)$.cC().$1(P.e5())}},"$0","e5",0,0,1],
e0:function(a){var z=new P.dE(H.m(a,{func:1,ret:-1}))
if($.aL==null){$.b8=z
$.aL=z
if(!$.cr)$.cC().$1(P.e5())}else{$.b8.b=z
$.b8=z}},
k1:function(a){var z,y,x
H.m(a,{func:1,ret:-1})
z=$.aL
if(z==null){P.e0(a)
$.b9=$.b8
return}y=new P.dE(a)
x=$.b9
if(x==null){y.b=z
$.b9=y
$.aL=y}else{y.b=x.b
x.b=y
$.b9=y
if(y.b==null)$.b8=y}},
ku:function(a){var z,y
z={func:1,ret:-1}
H.m(a,z)
y=$.I
if(C.e===y){P.bU(null,null,C.e,a)
return}y.toString
P.bU(null,null,y,H.m(y.bk(a),z))},
bT:function(a,b,c,d,e){var z={}
z.a=d
P.k1(new P.k_(z,e))},
dZ:function(a,b,c,d,e){var z,y
H.m(d,{func:1,ret:e})
y=$.I
if(y===c)return d.$0()
$.I=c
z=y
try{y=d.$0()
return y}finally{$.I=z}},
e_:function(a,b,c,d,e,f,g){var z,y
H.m(d,{func:1,ret:f,args:[g]})
H.A(e,g)
y=$.I
if(y===c)return d.$1(e)
$.I=c
z=y
try{y=d.$1(e)
return y}finally{$.I=z}},
k0:function(a,b,c,d,e,f,g,h,i){var z,y
H.m(d,{func:1,ret:g,args:[h,i]})
H.A(e,h)
H.A(f,i)
y=$.I
if(y===c)return d.$2(e,f)
$.I=c
z=y
try{y=d.$2(e,f)
return y}finally{$.I=z}},
bU:function(a,b,c,d){var z
H.m(d,{func:1,ret:-1})
z=C.e!==c
if(z)d=!(!z||!1)?c.bk(d):c.d7(d,-1)
P.e0(d)},
ir:{"^":"o:6;a",
$1:function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()}},
iq:{"^":"o:15;a,b,c",
$1:function(a){var z,y
this.a.a=H.m(a,{func:1,ret:-1})
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
is:{"^":"o:0;a",
$0:function(){this.a.$0()}},
it:{"^":"o:0;a",
$0:function(){this.a.$0()}},
jC:{"^":"b;a,0b,c",
cF:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.bb(new P.jE(this,b),0),a)
else throw H.c(P.z("`setTimeout()` not found."))},
p:{
jD:function(a,b){var z=new P.jC(!0,0)
z.cF(a,b)
return z}}},
jE:{"^":"o:1;a,b",
$0:function(){var z=this.a
z.b=null
z.c=1
this.b.$0()}},
iw:{"^":"b;$ti"},
jx:{"^":"iw;a,$ti"},
aK:{"^":"b;0a,b,c,d,e,$ti",
du:function(a){if(this.c!==6)return!0
return this.b.b.aC(H.m(this.d,{func:1,ret:P.R,args:[P.b]}),a.a,P.R,P.b)},
dq:function(a){var z,y,x,w
z=this.e
y=P.b
x={futureOr:1,type:H.q(this,1)}
w=this.b.b
if(H.bu(z,{func:1,args:[P.b,P.a4]}))return H.bX(w.dG(z,a.a,a.b,null,y,P.a4),x)
else return H.bX(w.aC(H.m(z,{func:1,args:[P.b]}),a.a,null,y),x)}},
ae:{"^":"b;bd:a<,b,0cW:c<,$ti",
bK:function(a,b,c){var z,y,x,w
z=H.q(this,0)
H.m(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
y=$.I
if(y!==C.e){y.toString
H.m(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
if(b!=null)b=P.jZ(b,y)}H.m(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
x=new P.ae(0,$.I,[c])
w=b==null?1:3
this.b3(new P.aK(x,w,a,b,[z,c]))
return x},
bJ:function(a,b){return this.bK(a,null,b)},
b3:function(a){var z,y
z=this.a
if(z<=1){a.a=H.f(this.c,"$isaK")
this.c=a}else{if(z===2){y=H.f(this.c,"$isae")
z=y.a
if(z<4){y.b3(a)
return}this.a=z
this.c=y.c}z=this.b
z.toString
P.bU(null,null,z,H.m(new P.iM(this,a),{func:1,ret:-1}))}},
ba:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=H.f(this.c,"$isaK")
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){u=H.f(this.c,"$isae")
y=u.a
if(y<4){u.ba(a)
return}this.a=y
this.c=u.c}z.a=this.ab(a)
y=this.b
y.toString
P.bU(null,null,y,H.m(new P.iR(z,this),{func:1,ret:-1}))}},
ax:function(){var z=H.f(this.c,"$isaK")
this.c=null
return this.ab(z)},
ab:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
ao:function(a){var z,y,x
z=H.q(this,0)
H.bX(a,{futureOr:1,type:z})
y=this.$ti
if(H.aN(a,"$isaU",y,"$asaU"))if(H.aN(a,"$isae",y,null))P.dH(a,this)
else P.iN(a,this)
else{x=this.ax()
H.A(a,z)
this.a=4
this.c=a
P.b7(this,x)}},
b5:function(a,b){var z
H.f(b,"$isa4")
z=this.ax()
this.a=8
this.c=new P.X(a,b)
P.b7(this,z)},
$isaU:1,
p:{
iN:function(a,b){var z,y,x
b.a=1
try{a.bK(new P.iO(b),new P.iP(b),null)}catch(x){z=H.a8(x)
y=H.bg(x)
P.ku(new P.iQ(b,z,y))}},
dH:function(a,b){var z,y
for(;z=a.a,z===2;)a=H.f(a.c,"$isae")
if(z>=4){y=b.ax()
b.a=a.a
b.c=a.c
P.b7(b,y)}else{y=H.f(b.c,"$isaK")
b.a=2
b.c=a
a.ba(y)}},
b7:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=H.f(y.c,"$isX")
y=y.b
u=v.a
t=v.b
y.toString
P.bT(null,null,y,u,t)}return}for(;s=b.a,s!=null;b=s){b.a=null
P.b7(z.a,b)}y=z.a
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
if(p){H.f(r,"$isX")
y=y.b
u=r.a
t=r.b
y.toString
P.bT(null,null,y,u,t)
return}o=$.I
if(o!=q)$.I=q
else o=null
y=b.c
if(y===8)new P.iU(z,x,b,w).$0()
else if(u){if((y&1)!==0)new P.iT(x,b,r).$0()}else if((y&2)!==0)new P.iS(z,x,b).$0()
if(o!=null)$.I=o
y=x.b
if(!!J.B(y).$isaU){if(y.a>=4){n=H.f(t.c,"$isaK")
t.c=null
b=t.ab(n)
t.a=y.a
t.c=y.c
z.a=y
continue}else P.dH(y,t)
return}}m=b.b
n=H.f(m.c,"$isaK")
m.c=null
b=m.ab(n)
y=x.a
u=x.b
if(!y){H.A(u,H.q(m,0))
m.a=4
m.c=u}else{H.f(u,"$isX")
m.a=8
m.c=u}z.a=m
y=m}}}},
iM:{"^":"o:0;a,b",
$0:function(){P.b7(this.a,this.b)}},
iR:{"^":"o:0;a,b",
$0:function(){P.b7(this.b,this.a.a)}},
iO:{"^":"o:6;a",
$1:function(a){var z=this.a
z.a=0
z.ao(a)}},
iP:{"^":"o:16;a",
$2:function(a,b){H.f(b,"$isa4")
this.a.b5(a,b)},
$1:function(a){return this.$2(a,null)}},
iQ:{"^":"o:0;a,b,c",
$0:function(){this.a.b5(this.b,this.c)}},
iU:{"^":"o:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.bI(H.m(w.d,{func:1}),null)}catch(v){y=H.a8(v)
x=H.bg(v)
if(this.d){w=H.f(this.a.a.c,"$isX").a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=H.f(this.a.a.c,"$isX")
else u.b=new P.X(y,x)
u.a=!0
return}if(!!J.B(z).$isaU){if(z instanceof P.ae&&z.gbd()>=4){if(z.gbd()===8){w=this.b
w.b=H.f(z.gcW(),"$isX")
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.bJ(new P.iV(t),null)
w.a=!1}}},
iV:{"^":"o:17;a",
$1:function(a){return this.a}},
iT:{"^":"o:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t
try{x=this.b
w=H.q(x,0)
v=H.A(this.c,w)
u=H.q(x,1)
this.a.b=x.b.b.aC(H.m(x.d,{func:1,ret:{futureOr:1,type:u},args:[w]}),v,{futureOr:1,type:u},w)}catch(t){z=H.a8(t)
y=H.bg(t)
x=this.a
x.b=new P.X(z,y)
x.a=!0}}},
iS:{"^":"o:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=H.f(this.a.a.c,"$isX")
w=this.c
if(w.du(z)&&w.e!=null){v=this.b
v.b=w.dq(z)
v.a=!1}}catch(u){y=H.a8(u)
x=H.bg(u)
w=H.f(this.a.a.c,"$isX")
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.X(y,x)
s.a=!0}}},
dE:{"^":"b;a,0b"},
i4:{"^":"b;$ti",
gj:function(a){var z,y,x,w
z={}
y=new P.ae(0,$.I,[P.D])
z.a=0
x=H.q(this,0)
w=H.m(new P.i6(z,this),{func:1,ret:-1,args:[x]})
H.m(new P.i7(z,y),{func:1,ret:-1})
W.aC(this.a,this.b,w,!1,x)
return y}},
i6:{"^":"o;a,b",
$1:function(a){H.A(a,H.q(this.b,0));++this.a.a},
$S:function(){return{func:1,ret:P.G,args:[H.q(this.b,0)]}}},
i7:{"^":"o:0;a,b",
$0:function(){this.b.ao(this.a.a)}},
i5:{"^":"b;"},
X:{"^":"b;a,b",
l:function(a){return H.e(this.a)},
$isQ:1},
jK:{"^":"b;",$isms:1},
k_:{"^":"o:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.dm()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=y.l(0)
throw x}},
jg:{"^":"jK;",
dH:function(a){var z,y,x
H.m(a,{func:1,ret:-1})
try{if(C.e===$.I){a.$0()
return}P.dZ(null,null,this,a,-1)}catch(x){z=H.a8(x)
y=H.bg(x)
P.bT(null,null,this,z,H.f(y,"$isa4"))}},
dI:function(a,b,c){var z,y,x
H.m(a,{func:1,ret:-1,args:[c]})
H.A(b,c)
try{if(C.e===$.I){a.$1(b)
return}P.e_(null,null,this,a,b,-1,c)}catch(x){z=H.a8(x)
y=H.bg(x)
P.bT(null,null,this,z,H.f(y,"$isa4"))}},
d7:function(a,b){return new P.ji(this,H.m(a,{func:1,ret:b}),b)},
bk:function(a){return new P.jh(this,H.m(a,{func:1,ret:-1}))},
d8:function(a,b){return new P.jj(this,H.m(a,{func:1,ret:-1,args:[b]}),b)},
h:function(a,b){return},
bI:function(a,b){H.m(a,{func:1,ret:b})
if($.I===C.e)return a.$0()
return P.dZ(null,null,this,a,b)},
aC:function(a,b,c,d){H.m(a,{func:1,ret:c,args:[d]})
H.A(b,d)
if($.I===C.e)return a.$1(b)
return P.e_(null,null,this,a,b,c,d)},
dG:function(a,b,c,d,e,f){H.m(a,{func:1,ret:d,args:[e,f]})
H.A(b,e)
H.A(c,f)
if($.I===C.e)return a.$2(b,c)
return P.k0(null,null,this,a,b,c,d,e,f)}},
ji:{"^":"o;a,b,c",
$0:function(){return this.a.bI(this.b,this.c)},
$S:function(){return{func:1,ret:this.c}}},
jh:{"^":"o:1;a,b",
$0:function(){return this.a.dH(this.b)}},
jj:{"^":"o;a,b,c",
$1:function(a){var z=this.c
return this.a.dI(this.b,H.A(a,z),z)},
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
df:function(a,b,c){H.bx(a)
return H.w(H.k8(a,new H.dd(0,0,[b,c])),"$isde",[b,c],"$asde")},
Y:function(a,b){return new H.dd(0,0,[a,b])},
a2:function(a,b,c,d){return new P.j1(0,0,[d])},
h0:function(a,b,c){var z,y
if(P.cs(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=H.i([],[P.d])
y=$.bh()
C.a.k(y,a)
try{P.jX(a,z)}finally{if(0>=y.length)return H.j(y,-1)
y.pop()}y=P.dt(b,H.ko(z,"$isk"),", ")+c
return y.charCodeAt(0)==0?y:y},
ce:function(a,b,c){var z,y,x
if(P.cs(a))return b+"..."+c
z=new P.co(b)
y=$.bh()
C.a.k(y,a)
try{x=z
x.a=P.dt(x.gW(),a,", ")}finally{if(0>=y.length)return H.j(y,-1)
y.pop()}y=z
y.a=y.gW()+c
y=z.gW()
return y.charCodeAt(0)==0?y:y},
cs:function(a){var z,y
for(z=0;y=$.bh(),z<y.length;++z)if(a===y[z])return!0
return!1},
jX:function(a,b){var z,y,x,w,v,u,t,s,r,q
H.w(b,"$isa",[P.d],"$asa")
z=a.gC(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.e(z.gD(z))
C.a.k(b,w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.j(b,-1)
v=b.pop()
if(0>=b.length)return H.j(b,-1)
u=b.pop()}else{t=z.gD(z);++x
if(!z.u()){if(x<=4){C.a.k(b,H.e(t))
return}v=H.e(t)
if(0>=b.length)return H.j(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gD(z);++x
for(;z.u();t=s,s=r){r=z.gD(z);++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.j(b,-1)
y-=b.pop().length+2;--x}C.a.k(b,"...")
return}}u=H.e(t)
v=H.e(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.j(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)C.a.k(b,q)
C.a.k(b,u)
C.a.k(b,v)},
ci:function(a,b){var z,y,x
z=P.a2(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.J)(a),++x)z.k(0,H.A(a[x],b))
return z},
di:function(a){var z,y,x
z={}
if(P.cs(a))return"{...}"
y=new P.co("")
try{C.a.k($.bh(),a)
x=y
x.a=x.gW()+"{"
z.a=!0
J.eZ(a,new P.he(z,y))
z=y
z.a=z.gW()+"}"}finally{z=$.bh()
if(0>=z.length)return H.j(z,-1)
z.pop()}z=y.gW()
return z.charCodeAt(0)==0?z:z},
j1:{"^":"iX;a,0b,0c,0d,0e,0f,r,$ti",
gC:function(a){var z=new P.dL(this,this.r,this.$ti)
z.c=this.e
return z},
gj:function(a){return this.a},
w:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return H.f(z[b],"$isbt")!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return H.f(y[b],"$isbt")!=null}else return this.cI(b)},
cI:function(a){var z=this.d
if(z==null)return!1
return this.as(this.b8(z,a),a)>=0},
k:function(a,b){var z,y
H.A(b,H.q(this,0))
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.cp()
this.b=z}return this.b2(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.cp()
this.c=y}return this.b2(y,b)}else return this.cG(0,b)},
cG:function(a,b){var z,y,x
H.A(b,H.q(this,0))
z=this.d
if(z==null){z=P.cp()
this.d=z}y=this.b6(b)
x=z[y]
if(x==null)z[y]=[this.aw(b)]
else{if(this.as(x,b)>=0)return!1
x.push(this.aw(b))}return!0},
bH:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.bb(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.bb(this.c,b)
else return this.cR(0,b)},
cR:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=this.b8(z,b)
x=this.as(y,b)
if(x<0)return!1
this.bf(y.splice(x,1)[0])
return!0},
a4:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.au()}},
b2:function(a,b){H.A(b,H.q(this,0))
if(H.f(a[b],"$isbt")!=null)return!1
a[b]=this.aw(b)
return!0},
bb:function(a,b){var z
if(a==null)return!1
z=H.f(a[b],"$isbt")
if(z==null)return!1
this.bf(z)
delete a[b]
return!0},
au:function(){this.r=this.r+1&67108863},
aw:function(a){var z,y
z=new P.bt(H.A(a,H.q(this,0)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.au()
return z},
bf:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.au()},
b6:function(a){return J.am(a)&0x3ffffff},
b8:function(a,b){return a[this.b6(b)]},
as:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.aG(a[y].a,b))return y
return-1},
p:{
cp:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
bt:{"^":"b;a,0b,0c"},
dL:{"^":"b;a,b,0c,0d,$ti",
sb4:function(a){this.d=H.A(a,H.q(this,0))},
gD:function(a){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(P.aI(z))
else{z=this.c
if(z==null){this.sb4(null)
return!1}else{this.sb4(H.A(z.a,H.q(this,0)))
this.c=this.c.b
return!0}}},
$isaV:1,
p:{
j2:function(a,b,c){var z=new P.dL(a,b,[c])
z.c=a.e
return z}}},
iX:{"^":"hU;"},
hc:{"^":"j3;",$isk:1,$isa:1},
p:{"^":"b;$ti",
gC:function(a){return new H.dg(a,this.gj(a),0,[H.bf(this,a,"p",0)])},
t:function(a,b){return this.h(a,b)},
dn:function(a,b,c,d){var z,y,x
H.A(b,d)
H.m(c,{func:1,ret:d,args:[d,H.bf(this,a,"p",0)]})
z=this.gj(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.h(a,x))
if(z!==this.gj(a))throw H.c(P.aI(a))}return y},
l:function(a){return P.ce(a,"[","]")}},
dh:{"^":"T;"},
he:{"^":"o:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.e(a)
z.a=y+": "
z.a+=H.e(b)}},
T:{"^":"b;$ti",
G:function(a,b){var z,y
H.m(b,{func:1,ret:-1,args:[H.bf(this,a,"T",0),H.bf(this,a,"T",1)]})
for(z=J.bD(this.gI(a));z.u();){y=z.gD(z)
b.$2(y,this.h(a,y))}},
gj:function(a){return J.aQ(this.gI(a))},
l:function(a){return P.di(a)},
$isL:1},
hV:{"^":"b;$ti",
H:function(a,b){var z
for(z=J.bD(H.w(b,"$isk",this.$ti,"$ask"));z.u();)this.k(0,z.gD(z))},
l:function(a){return P.ce(this,"{","}")},
$isk:1,
$islU:1},
hU:{"^":"hV;"},
j3:{"^":"b+p;"}}],["","",,P,{"^":"",
fP:function(a){if(a instanceof H.o)return a.l(0)
return"Instance of '"+H.b2(a)+"'"},
bI:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.bj(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fP(a)},
d5:function(a){return new P.iJ(a)},
aE:function(a){H.c0(H.e(a))},
R:{"^":"b;"},
"+bool":0,
bH:{"^":"b;a,b",
F:function(a,b){if(b==null)return!1
return b instanceof P.bH&&this.a===b.a&&!0},
M:function(a,b){return C.d.M(this.a,H.f(b,"$isbH").a)},
gA:function(a){var z=this.a
return(z^C.d.bc(z,30))&1073741823},
l:function(a){var z,y,x,w,v,u,t,s
z=P.fC(H.hJ(this))
y=P.bk(H.hH(this))
x=P.bk(H.hD(this))
w=P.bk(H.hE(this))
v=P.bk(H.hG(this))
u=P.bk(H.hI(this))
t=P.fD(H.hF(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
$isV:1,
$asV:function(){return[P.bH]},
p:{
fC:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+z
if(z>=10)return y+"00"+z
return y+"000"+z},
fD:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bk:function(a){if(a>=10)return""+a
return"0"+a}}},
aj:{"^":"E;"},
"+double":0,
aS:{"^":"b;a",
U:function(a,b){return C.d.U(this.a,H.f(b,"$isaS").a)},
F:function(a,b){if(b==null)return!1
return b instanceof P.aS&&this.a===b.a},
gA:function(a){return this.a&0x1FFFFFFF},
M:function(a,b){return C.d.M(this.a,H.f(b,"$isaS").a)},
l:function(a){var z,y,x,w,v
z=new P.fL()
y=this.a
if(y<0)return"-"+new P.aS(0-y).l(0)
x=z.$1(C.d.X(y,6e7)%60)
w=z.$1(C.d.X(y,1e6)%60)
v=new P.fK().$1(y%1e6)
return""+C.d.X(y,36e8)+":"+H.e(x)+":"+H.e(w)+"."+H.e(v)},
$isV:1,
$asV:function(){return[P.aS]},
p:{
fJ:function(a,b,c,d,e,f){return new P.aS(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
fK:{"^":"o:8;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fL:{"^":"o:8;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
Q:{"^":"b;"},
dm:{"^":"Q;",
l:function(a){return"Throw of null."}},
aH:{"^":"Q;a,b,c,d",
gaq:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gap:function(){return""},
l:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+z
w=this.gaq()+y+x
if(!this.a)return w
v=this.gap()
u=P.bI(this.b)
return w+v+": "+H.e(u)},
p:{
cS:function(a,b,c){return new P.aH(!0,a,b,c)}}},
dn:{"^":"aH;e,f,a,b,c,d",
gaq:function(){return"RangeError"},
gap:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.e(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.e(z)
else if(x>z)y=": Not in range "+H.e(z)+".."+H.e(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.e(z)}return y},
p:{
bM:function(a,b,c){return new P.dn(null,null,!0,a,b,"Value not in range")},
bL:function(a,b,c,d,e){return new P.dn(b,c,!0,a,d,"Invalid value")}}},
fZ:{"^":"aH;e,j:f>,a,b,c,d",
gaq:function(){return"RangeError"},
gap:function(){var z,y
z=H.P(this.b)
if(typeof z!=="number")return z.a6()
if(z<0)return": index must not be negative"
y=this.f
if(y===0)return": no indices are valid"
return": index should be less than "+H.e(y)},
p:{
F:function(a,b,c,d,e){var z=H.P(e==null?J.aQ(b):e)
return new P.fZ(b,z,!0,a,c,"Index out of range")}}},
ii:{"^":"Q;a",
l:function(a){return"Unsupported operation: "+this.a},
p:{
z:function(a){return new P.ii(a)}}},
ig:{"^":"Q;a",
l:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
p:{
dB:function(a){return new P.ig(a)}}},
cm:{"^":"Q;a",
l:function(a){return"Bad state: "+this.a},
p:{
cn:function(a){return new P.cm(a)}}},
fv:{"^":"Q;a",
l:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.e(P.bI(z))+"."},
p:{
aI:function(a){return new P.fv(a)}}},
ds:{"^":"b;",
l:function(a){return"Stack Overflow"},
$isQ:1},
fB:{"^":"Q;a",
l:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
iJ:{"^":"b;a",
l:function(a){return"Exception: "+this.a}},
bl:{"^":"b;"},
D:{"^":"E;"},
"+int":0,
k:{"^":"b;$ti",
aD:["cc",function(a,b){var z=H.cw(this,"k",0)
return new H.dC(this,H.m(b,{func:1,ret:P.R,args:[z]}),[z])}],
gj:function(a){var z,y
z=this.gC(this)
for(y=0;z.u();)++y
return y},
t:function(a,b){var z,y,x
if(b<0)H.W(P.bL(b,0,null,"index",null))
for(z=this.gC(this),y=0;z.u();){x=z.gD(z)
if(b===y)return x;++y}throw H.c(P.F(b,this,"index",null,y))},
l:function(a){return P.h0(this,"(",")")}},
aV:{"^":"b;$ti"},
a:{"^":"b;$ti",$isk:1},
"+List":0,
L:{"^":"b;$ti"},
G:{"^":"b;",
gA:function(a){return P.b.prototype.gA.call(this,this)},
l:function(a){return"null"}},
"+Null":0,
E:{"^":"b;",$isV:1,
$asV:function(){return[P.E]}},
"+num":0,
b:{"^":";",
F:function(a,b){return this===b},
gA:function(a){return H.b1(this)},
l:function(a){return"Instance of '"+H.b2(this)+"'"},
toString:function(){return this.l(this)}},
a4:{"^":"b;"},
d:{"^":"b;",$isV:1,
$asV:function(){return[P.d]},
$ishz:1},
"+String":0,
co:{"^":"b;W:a<",
gj:function(a){return this.a.length},
l:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
p:{
dt:function(a,b,c){var z=J.bD(b)
if(!z.u())return a
if(c.length===0){do a+=H.e(z.gD(z))
while(z.u())}else{a+=H.e(z.gD(z))
for(;z.u();)a=a+c+H.e(z.gD(z))}return a}}}}],["","",,W,{"^":"",
fM:function(a,b,c){var z,y,x,w
z=document.body
y=(z&&C.p).N(z,a,b,c)
y.toString
z=W.t
z=new H.dC(new W.a6(y),H.m(new W.fN(),{func:1,ret:P.R,args:[z]}),[z])
x=z.gC(z)
if(!x.u())H.W(H.da())
w=x.gD(x)
if(x.u())H.W(H.h1())
return H.f(w,"$isS")},
fO:function(a){H.f(a,"$isN")
return"wheel"},
aT:function(a){var z,y,x
z="element tag unavailable"
try{y=J.f1(a)
if(typeof y==="string")z=a.tagName}catch(x){H.a8(x)}return z},
iF:function(a,b){return document.createElement(a)},
bQ:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
dK:function(a,b,c,d){var z,y
z=W.bQ(W.bQ(W.bQ(W.bQ(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
dX:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.iz(a)
if(!!J.B(z).$isN)return z
return}else return H.f(a,"$isN")},
e2:function(a,b){var z
H.m(a,{func:1,ret:-1,args:[b]})
z=$.I
if(z===C.e)return a
return z.d8(a,b)},
M:{"^":"S;","%":"HTMLBRElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTextAreaElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
kz:{"^":"h;0j:length=","%":"AccessibleNodeList"},
fh:{"^":"M;",
l:function(a){return String(a)},
$isfh:1,
"%":"HTMLAnchorElement"},
kA:{"^":"M;",
l:function(a){return String(a)},
"%":"HTMLAreaElement"},
cT:{"^":"M;",$iscT:1,"%":"HTMLBaseElement"},
fm:{"^":"h;","%":";Blob"},
bF:{"^":"M;",$isbF:1,"%":"HTMLBodyElement"},
ca:{"^":"M;0n:height=,0m:width=",
c0:function(a,b,c){var z=this.cN(a,b,P.k5(c,null))
return z},
cN:function(a,b,c){return a.getContext(b,c)},
$isca:1,
"%":"HTMLCanvasElement"},
kF:{"^":"h;",
ah:function(a){return P.a0(a.getContextAttributes())},
"%":"CanvasRenderingContext2D"},
kG:{"^":"t;0j:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
fw:{"^":"cb;",$isfw:1,"%":"CSSNumericValue|CSSUnitValue"},
kH:{"^":"fz;0j:length=","%":"CSSPerspective"},
an:{"^":"h;",$isan:1,"%":"CSSCharsetRule|CSSConditionRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
fx:{"^":"ix;0j:length=",
aG:function(a,b){var z=this.cO(a,this.am(a,b))
return z==null?"":z},
am:function(a,b){var z,y
z=$.ek()
y=z[b]
if(typeof y==="string")return y
y=this.d_(a,b)
z[b]=y
return y},
d_:function(a,b){var z
if(b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()}) in a)return b
z=P.fE()+b
if(z in a)return z
return b},
cO:function(a,b){return a.getPropertyValue(b)},
gn:function(a){return a.height},
gm:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
fy:{"^":"b;",
gn:function(a){return this.aG(a,"height")},
gm:function(a){return this.aG(a,"width")}},
cb:{"^":"h;","%":"CSSImageValue|CSSKeywordValue|CSSPositionValue|CSSResourceValue|CSSURLImageValue;CSSStyleValue"},
fz:{"^":"h;","%":"CSSMatrixComponent|CSSRotation|CSSScale|CSSSkew|CSSTranslation;CSSTransformComponent"},
kJ:{"^":"cb;0j:length=","%":"CSSTransformValue"},
kK:{"^":"cb;0j:length=","%":"CSSUnparsedValue"},
kM:{"^":"h;0j:length=",
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
fF:{"^":"M;","%":"HTMLDivElement"},
fG:{"^":"t;",
d2:function(a,b){return a.adoptNode(b)},
c1:function(a,b){return a.getElementById(b)},
dC:function(a,b){return a.querySelector(b)},
"%":"XMLDocument;Document"},
kN:{"^":"h;",
l:function(a){return String(a)},
"%":"DOMException"},
fH:{"^":"h;",
dh:function(a,b){return a.createHTMLDocument(b)},
"%":"DOMImplementation"},
kO:{"^":"iB;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.w(c,"$isU",[P.E],"$asU")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[[P.U,P.E]]},
$isx:1,
$asx:function(){return[[P.U,P.E]]},
$asp:function(){return[[P.U,P.E]]},
$isk:1,
$ask:function(){return[[P.U,P.E]]},
$isa:1,
$asa:function(){return[[P.U,P.E]]},
$asr:function(){return[[P.U,P.E]]},
"%":"ClientRectList|DOMRectList"},
fI:{"^":"h;",
l:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(this.gm(a))+" x "+H.e(this.gn(a))},
F:function(a,b){var z
if(b==null)return!1
if(!H.aN(b,"$isU",[P.E],"$asU"))return!1
if(a.left===b.left)if(a.top===b.top){z=J.n(b)
z=this.gm(a)===z.gm(b)&&this.gn(a)===z.gn(b)}else z=!1
else z=!1
return z},
gA:function(a){return W.dK(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,this.gm(a)&0x1FFFFFFF,this.gn(a)&0x1FFFFFFF)},
gn:function(a){return a.height},
gm:function(a){return a.width},
$isU:1,
$asU:function(){return[P.E]},
"%":";DOMRectReadOnly"},
kP:{"^":"iD;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.v(c)
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[P.d]},
$isx:1,
$asx:function(){return[P.d]},
$asp:function(){return[P.d]},
$isk:1,
$ask:function(){return[P.d]},
$isa:1,
$asa:function(){return[P.d]},
$asr:function(){return[P.d]},
"%":"DOMStringList"},
kQ:{"^":"h;0j:length=","%":"DOMTokenList"},
S:{"^":"t;0dJ:tagName=",
gd5:function(a){return new W.iE(a)},
l:function(a){return a.localName},
N:["aj",function(a,b,c,d){var z,y,x,w
if(c==null){z=$.d4
if(z==null){z=H.i([],[W.ac])
y=new W.dk(z)
C.a.k(z,W.dI(null))
C.a.k(z,W.dT())
$.d4=y
d=y}else d=z
z=$.d3
if(z==null){z=new W.dW(d)
$.d3=z
c=z}else{z.a=d
c=z}}if($.ag==null){z=document
y=z.implementation
y=(y&&C.I).dh(y,"")
$.ag=y
$.cc=y.createRange()
y=$.ag
y.toString
y=y.createElement("base")
H.f(y,"$iscT")
y.href=z.baseURI
z=$.ag.head;(z&&C.J).J(z,y)}z=$.ag
if(z.body==null){z.toString
y=z.createElement("body")
z.body=H.f(y,"$isbF")}z=$.ag
if(!!this.$isbF)x=z.body
else{y=a.tagName
z.toString
x=z.createElement(y)
z=$.ag.body;(z&&C.p).J(z,x)}if("createContextualFragment" in window.Range.prototype&&!C.a.w(C.T,a.tagName)){z=$.cc;(z&&C.C).c2(z,x)
z=$.cc
w=(z&&C.C).df(z,b)}else{x.innerHTML=b
w=$.ag.createDocumentFragment()
for(z=J.n(w);y=x.firstChild,y!=null;)z.J(w,y)}z=$.ag.body
if(x==null?z!=null:x!==z)J.cM(x)
c.aL(w)
C.r.d2(document,w)
return w},function(a,b,c){return this.N(a,b,c,null)},"dg",null,null,"gdQ",5,5,null],
c4:function(a,b,c,d){a.textContent=null
this.J(a,this.N(a,b,c,d))},
c3:function(a,b){return this.c4(a,b,null,null)},
a_:function(a,b){return a.getAttribute(b)},
cS:function(a,b){return a.removeAttribute(b)},
gdv:function(a){return new W.bP(a,"mousedown",!1,[W.a3])},
gdw:function(a){return new W.bP(a,"mousemove",!1,[W.a3])},
gdz:function(a){return new W.bP(a,"mouseup",!1,[W.a3])},
gdA:function(a){return new W.bP(a,H.v(W.fO(a)),!1,[W.b6])},
$isS:1,
"%":";Element"},
fN:{"^":"o:18;",
$1:function(a){return!!J.B(H.f(a,"$ist")).$isS}},
kS:{"^":"M;0n:height=,0m:width=","%":"HTMLEmbedElement"},
a1:{"^":"h;",$isa1:1,"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
N:{"^":"h;",
d1:function(a,b,c,d){H.m(c,{func:1,args:[W.a1]})
if(c!=null)this.cH(a,b,c,!1)},
cH:function(a,b,c,d){return a.addEventListener(b,H.bb(H.m(c,{func:1,args:[W.a1]}),1),!1)},
$isN:1,
"%":"AbsoluteOrientationSensor|Accelerometer|AccessibleNode|AmbientLightSensor|AnalyserNode|Animation|ApplicationCache|AudioBufferSourceNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioNode|AudioPannerNode|AudioScheduledSourceNode|AudioWorkletNode|BackgroundFetchRegistration|BatteryManager|BiquadFilterNode|BluetoothDevice|BluetoothRemoteGATTCharacteristic|BroadcastChannel|CanvasCaptureMediaStreamTrack|ChannelMergerNode|ChannelSplitterNode|Clipboard|ConstantSourceNode|ConvolverNode|DOMApplicationCache|DataChannel|DedicatedWorkerGlobalScope|DelayNode|DynamicsCompressorNode|EventSource|FileReader|FontFaceSet|GainNode|Gyroscope|IDBDatabase|IDBOpenDBRequest|IDBRequest|IDBTransaction|IDBVersionChangeRequest|IIRFilterNode|JavaScriptAudioNode|LinearAccelerationSensor|MIDIAccess|MIDIInput|MIDIOutput|MIDIPort|Magnetometer|MediaDevices|MediaElementAudioSourceNode|MediaKeySession|MediaQueryList|MediaRecorder|MediaSource|MediaStream|MediaStreamAudioDestinationNode|MediaStreamAudioSourceNode|MediaStreamTrack|MessagePort|MojoInterfaceInterceptor|NetworkInformation|Notification|OfflineResourceList|OrientationSensor|Oscillator|OscillatorNode|PannerNode|PaymentRequest|Performance|PermissionStatus|PresentationAvailability|PresentationConnection|PresentationConnectionList|PresentationRequest|RTCDTMFSender|RTCDataChannel|RTCPeerConnection|RealtimeAnalyserNode|RelativeOrientationSensor|RemotePlayback|ScreenOrientation|ScriptProcessorNode|Sensor|ServiceWorker|ServiceWorkerContainer|ServiceWorkerGlobalScope|ServiceWorkerRegistration|SharedWorker|SharedWorkerGlobalScope|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|StereoPannerNode|USB|VR|VRDevice|VRDisplay|VRSession|WaveShaperNode|WebSocket|Worker|WorkerGlobalScope|WorkerPerformance|XMLHttpRequest|XMLHttpRequestEventTarget|XMLHttpRequestUpload|mozRTCPeerConnection|webkitAudioPannerNode|webkitRTCPeerConnection;EventTarget;dQ|dR|dU|dV"},
ao:{"^":"fm;",$isao:1,"%":"File"},
l8:{"^":"iL;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$isao")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.ao]},
$isx:1,
$asx:function(){return[W.ao]},
$asp:function(){return[W.ao]},
$isk:1,
$ask:function(){return[W.ao]},
$isa:1,
$asa:function(){return[W.ao]},
$asr:function(){return[W.ao]},
"%":"FileList"},
l9:{"^":"N;0j:length=","%":"FileWriter"},
lc:{"^":"M;0j:length=","%":"HTMLFormElement"},
ap:{"^":"h;",$isap:1,"%":"Gamepad"},
fW:{"^":"M;","%":"HTMLHeadElement"},
ld:{"^":"h;0j:length=","%":"History"},
le:{"^":"iZ;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$ist")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.t]},
$isx:1,
$asx:function(){return[W.t]},
$asp:function(){return[W.t]},
$isk:1,
$ask:function(){return[W.t]},
$isa:1,
$asa:function(){return[W.t]},
$asr:function(){return[W.t]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
fX:{"^":"fG;","%":"HTMLDocument"},
lf:{"^":"M;0n:height=,0m:width=","%":"HTMLIFrameElement"},
li:{"^":"h;0n:height=,0m:width=","%":"ImageBitmap"},
lj:{"^":"h;0n:height=,0m:width=","%":"ImageData"},
lk:{"^":"M;0n:height=,0m:width=","%":"HTMLImageElement"},
lm:{"^":"M;0n:height=,0m:width=","%":"HTMLInputElement"},
aW:{"^":"dA;",$isaW:1,"%":"KeyboardEvent"},
hd:{"^":"h;",
l:function(a){return String(a)},
$ishd:1,
"%":"Location"},
hh:{"^":"M;","%":"HTMLAudioElement;HTMLMediaElement"},
lt:{"^":"h;0j:length=","%":"MediaList"},
lu:{"^":"j5;",
h:function(a,b){return P.a0(a.get(H.v(b)))},
G:function(a,b){var z,y
H.m(b,{func:1,ret:-1,args:[P.d,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.a0(y.value[1]))}},
gI:function(a){var z=H.i([],[P.d])
this.G(a,new W.hj(z))
return z},
gj:function(a){return a.size},
$asT:function(){return[P.d,null]},
$isL:1,
$asL:function(){return[P.d,null]},
"%":"MIDIInputMap"},
hj:{"^":"o:2;a",
$2:function(a,b){return C.a.k(this.a,a)}},
lv:{"^":"j6;",
h:function(a,b){return P.a0(a.get(H.v(b)))},
G:function(a,b){var z,y
H.m(b,{func:1,ret:-1,args:[P.d,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.a0(y.value[1]))}},
gI:function(a){var z=H.i([],[P.d])
this.G(a,new W.hk(z))
return z},
gj:function(a){return a.size},
$asT:function(){return[P.d,null]},
$isL:1,
$asL:function(){return[P.d,null]},
"%":"MIDIOutputMap"},
hk:{"^":"o:2;a",
$2:function(a,b){return C.a.k(this.a,a)}},
ar:{"^":"h;",$isar:1,"%":"MimeType"},
lw:{"^":"j8;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$isar")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.ar]},
$isx:1,
$asx:function(){return[W.ar]},
$asp:function(){return[W.ar]},
$isk:1,
$ask:function(){return[W.ar]},
$isa:1,
$asa:function(){return[W.ar]},
$asr:function(){return[W.ar]},
"%":"MimeTypeArray"},
a3:{"^":"dA;",
gbG:function(a){var z,y,x,w,v,u
if(!!a.offsetX)return new P.b0(a.offsetX,a.offsetY,[P.E])
else{z=a.target
if(!J.B(W.dX(z)).$isS)throw H.c(P.z("offsetX is only supported on elements"))
y=H.f(W.dX(z),"$isS")
z=a.clientX
x=a.clientY
w=[P.E]
v=y.getBoundingClientRect()
u=v.left
v=v.top
H.w(new P.b0(u,v,w),"$isb0",w,"$asb0")
if(typeof z!=="number")return z.aO()
if(typeof x!=="number")return x.aO()
return new P.b0(C.t.bL(z-u),C.t.bL(x-v),w)}},
$isa3:1,
"%":";DragEvent|MouseEvent"},
a6:{"^":"hc;a",
ga7:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.c(P.cn("No elements"))
if(y>1)throw H.c(P.cn("More than one element"))
return z.firstChild},
H:function(a,b){var z,y,x,w,v
H.w(b,"$isk",[W.t],"$ask")
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=J.n(y),v=0;v<x;++v)w.J(y,z.firstChild)
return},
i:function(a,b,c){var z,y
H.f(c,"$ist")
z=this.a
y=z.childNodes
if(b<0||b>=y.length)return H.j(y,b)
J.eG(z,c,y[b])},
gC:function(a){var z=this.a.childNodes
return new W.d6(z,z.length,-1,[H.bf(C.V,z,"r",0)])},
gj:function(a){return this.a.childNodes.length},
h:function(a,b){var z=this.a.childNodes
if(b<0||b>=z.length)return H.j(z,b)
return z[b]},
$asp:function(){return[W.t]},
$ask:function(){return[W.t]},
$asa:function(){return[W.t]}},
t:{"^":"N;0dB:previousSibling=",
dD:function(a){var z=a.parentNode
if(z!=null)J.bA(z,a)},
l:function(a){var z=a.nodeValue
return z==null?this.cb(a):z},
J:function(a,b){return a.appendChild(b)},
cT:function(a,b){return a.removeChild(b)},
cU:function(a,b,c){return a.replaceChild(b,c)},
$ist:1,
"%":"DocumentFragment|DocumentType|ShadowRoot;Node"},
hu:{"^":"ja;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$ist")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.t]},
$isx:1,
$asx:function(){return[W.t]},
$asp:function(){return[W.t]},
$isk:1,
$ask:function(){return[W.t]},
$isa:1,
$asa:function(){return[W.t]},
$asr:function(){return[W.t]},
"%":"NodeList|RadioNodeList"},
lF:{"^":"M;0n:height=,0m:width=","%":"HTMLObjectElement"},
lH:{"^":"N;0n:height=,0m:width=","%":"OffscreenCanvas"},
lI:{"^":"h;0n:height=,0m:width=","%":"PaintSize"},
at:{"^":"h;0j:length=",$isat:1,"%":"Plugin"},
lK:{"^":"je;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$isat")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.at]},
$isx:1,
$asx:function(){return[W.at]},
$asp:function(){return[W.at]},
$isk:1,
$ask:function(){return[W.at]},
$isa:1,
$asa:function(){return[W.at]},
$asr:function(){return[W.at]},
"%":"PluginArray"},
lM:{"^":"a3;0n:height=,0m:width=","%":"PointerEvent"},
hL:{"^":"h;",
df:function(a,b){return a.createContextualFragment(b)},
c2:function(a,b){return a.selectNodeContents(b)},
"%":"Range"},
lR:{"^":"jk;",
h:function(a,b){return P.a0(a.get(H.v(b)))},
G:function(a,b){var z,y
H.m(b,{func:1,ret:-1,args:[P.d,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.a0(y.value[1]))}},
gI:function(a){var z=H.i([],[P.d])
this.G(a,new W.hR(z))
return z},
gj:function(a){return a.size},
$asT:function(){return[P.d,null]},
$isL:1,
$asL:function(){return[P.d,null]},
"%":"RTCStatsReport"},
hR:{"^":"o:2;a",
$2:function(a,b){return C.a.k(this.a,a)}},
lS:{"^":"h;0n:height=,0m:width=","%":"Screen"},
lT:{"^":"M;0j:length=","%":"HTMLSelectElement"},
au:{"^":"N;",$isau:1,"%":"SourceBuffer"},
lV:{"^":"dR;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$isau")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.au]},
$isx:1,
$asx:function(){return[W.au]},
$asp:function(){return[W.au]},
$isk:1,
$ask:function(){return[W.au]},
$isa:1,
$asa:function(){return[W.au]},
$asr:function(){return[W.au]},
"%":"SourceBufferList"},
av:{"^":"h;",$isav:1,"%":"SpeechGrammar"},
lW:{"^":"jq;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$isav")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.av]},
$isx:1,
$asx:function(){return[W.av]},
$asp:function(){return[W.av]},
$isk:1,
$ask:function(){return[W.av]},
$isa:1,
$asa:function(){return[W.av]},
$asr:function(){return[W.av]},
"%":"SpeechGrammarList"},
aw:{"^":"h;0j:length=",$isaw:1,"%":"SpeechRecognitionResult"},
lZ:{"^":"jt;",
h:function(a,b){return this.b9(a,H.v(b))},
G:function(a,b){var z,y
H.m(b,{func:1,ret:-1,args:[P.d,P.d]})
for(z=0;!0;++z){y=this.cQ(a,z)
if(y==null)return
b.$2(y,this.b9(a,y))}},
gI:function(a){var z=H.i([],[P.d])
this.G(a,new W.i3(z))
return z},
gj:function(a){return a.length},
b9:function(a,b){return a.getItem(b)},
cQ:function(a,b){return a.key(b)},
$asT:function(){return[P.d,P.d]},
$isL:1,
$asL:function(){return[P.d,P.d]},
"%":"Storage"},
i3:{"^":"o:19;a",
$2:function(a,b){return C.a.k(this.a,a)}},
ax:{"^":"h;",$isax:1,"%":"CSSStyleSheet|StyleSheet"},
i8:{"^":"M;",
N:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.aj(a,b,c,d)
z=W.fM("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
z.toString
new W.a6(y).H(0,new W.a6(z))
return y},
"%":"HTMLTableElement"},
m1:{"^":"M;",
N:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.aj(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.H.N(z.createElement("table"),b,c,d)
z.toString
z=new W.a6(z)
x=z.ga7(z)
x.toString
z=new W.a6(x)
w=z.ga7(z)
y.toString
w.toString
new W.a6(y).H(0,new W.a6(w))
return y},
"%":"HTMLTableRowElement"},
m2:{"^":"M;",
N:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.aj(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.H.N(z.createElement("table"),b,c,d)
z.toString
z=new W.a6(z)
x=z.ga7(z)
y.toString
x.toString
new W.a6(y).H(0,new W.a6(x))
return y},
"%":"HTMLTableSectionElement"},
dv:{"^":"M;",$isdv:1,"%":"HTMLTemplateElement"},
m3:{"^":"h;0m:width=","%":"TextMetrics"},
ay:{"^":"N;",$isay:1,"%":"TextTrack"},
az:{"^":"N;",$isaz:1,"%":"TextTrackCue|VTTCue"},
m4:{"^":"jB;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$isaz")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.az]},
$isx:1,
$asx:function(){return[W.az]},
$asp:function(){return[W.az]},
$isk:1,
$ask:function(){return[W.az]},
$isa:1,
$asa:function(){return[W.az]},
$asr:function(){return[W.az]},
"%":"TextTrackCueList"},
m5:{"^":"dV;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$isay")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.ay]},
$isx:1,
$asx:function(){return[W.ay]},
$asp:function(){return[W.ay]},
$isk:1,
$ask:function(){return[W.ay]},
$isa:1,
$asa:function(){return[W.ay]},
$asr:function(){return[W.ay]},
"%":"TextTrackList"},
m6:{"^":"h;0j:length=","%":"TimeRanges"},
aA:{"^":"h;",$isaA:1,"%":"Touch"},
m7:{"^":"jG;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$isaA")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.aA]},
$isx:1,
$asx:function(){return[W.aA]},
$asp:function(){return[W.aA]},
$isk:1,
$ask:function(){return[W.aA]},
$isa:1,
$asa:function(){return[W.aA]},
$asr:function(){return[W.aA]},
"%":"TouchList"},
m8:{"^":"h;0j:length=","%":"TrackDefaultList"},
dA:{"^":"a1;","%":"CompositionEvent|FocusEvent|TextEvent|TouchEvent;UIEvent"},
mm:{"^":"h;",
l:function(a){return String(a)},
"%":"URL"},
mo:{"^":"hh;0n:height=,0m:width=","%":"HTMLVideoElement"},
mp:{"^":"N;0j:length=","%":"VideoTrackList"},
mq:{"^":"N;0n:height=,0m:width=","%":"VisualViewport"},
mr:{"^":"h;0m:width=","%":"VTTRegion"},
b6:{"^":"a3;",
gdj:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.c(P.z("deltaY is not supported"))},
$isb6:1,
"%":"WheelEvent"},
il:{"^":"N;",
gd4:function(a){var z,y,x
z=P.E
y=new P.ae(0,$.I,[z])
x=H.m(new W.im(new P.jx(y,[z])),{func:1,ret:-1,args:[P.E]})
this.cM(a)
this.cV(a,W.e2(x,z))
return y},
cV:function(a,b){return a.requestAnimationFrame(H.bb(H.m(b,{func:1,ret:-1,args:[P.E]}),1))},
cM:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isdD:1,
"%":"DOMWindow|Window"},
im:{"^":"o:20;a",
$1:function(a){var z=this.a
a=H.bX(H.cz(a),{futureOr:1,type:H.q(z,0)})
z=z.a
if(z.a!==0)H.W(P.cn("Future already completed"))
z.ao(a)}},
dF:{"^":"t;",$isdF:1,"%":"Attr"},
mx:{"^":"jM;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$isan")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.an]},
$isx:1,
$asx:function(){return[W.an]},
$asp:function(){return[W.an]},
$isk:1,
$ask:function(){return[W.an]},
$isa:1,
$asa:function(){return[W.an]},
$asr:function(){return[W.an]},
"%":"CSSRuleList"},
mz:{"^":"fI;",
l:function(a){return"Rectangle ("+H.e(a.left)+", "+H.e(a.top)+") "+H.e(a.width)+" x "+H.e(a.height)},
F:function(a,b){var z
if(b==null)return!1
if(!H.aN(b,"$isU",[P.E],"$asU"))return!1
if(a.left===b.left)if(a.top===b.top){z=J.n(b)
z=a.width===z.gm(b)&&a.height===z.gn(b)}else z=!1
else z=!1
return z},
gA:function(a){return W.dK(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gn:function(a){return a.height},
gm:function(a){return a.width},
"%":"ClientRect|DOMRect"},
mA:{"^":"jO;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$isap")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.ap]},
$isx:1,
$asx:function(){return[W.ap]},
$asp:function(){return[W.ap]},
$isk:1,
$ask:function(){return[W.ap]},
$isa:1,
$asa:function(){return[W.ap]},
$asr:function(){return[W.ap]},
"%":"GamepadList"},
mF:{"^":"jQ;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$ist")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.t]},
$isx:1,
$asx:function(){return[W.t]},
$asp:function(){return[W.t]},
$isk:1,
$ask:function(){return[W.t]},
$isa:1,
$asa:function(){return[W.t]},
$asr:function(){return[W.t]},
"%":"MozNamedAttrMap|NamedNodeMap"},
mG:{"^":"jS;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$isaw")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.aw]},
$isx:1,
$asx:function(){return[W.aw]},
$asp:function(){return[W.aw]},
$isk:1,
$ask:function(){return[W.aw]},
$isa:1,
$asa:function(){return[W.aw]},
$asr:function(){return[W.aw]},
"%":"SpeechRecognitionResultList"},
mH:{"^":"jU;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.f(c,"$isax")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){if(b<0||b>=a.length)return H.j(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.ax]},
$isx:1,
$asx:function(){return[W.ax]},
$asp:function(){return[W.ax]},
$isk:1,
$ask:function(){return[W.ax]},
$isa:1,
$asa:function(){return[W.ax]},
$asr:function(){return[W.ax]},
"%":"StyleSheetList"},
iu:{"^":"dh;cL:a<",
G:function(a,b){var z,y,x,w,v,u
H.m(b,{func:1,ret:-1,args:[P.d,P.d]})
for(z=this.gI(this),y=z.length,x=this.a,w=J.n(x),v=0;v<z.length;z.length===y||(0,H.J)(z),++v){u=z[v]
b.$2(u,w.a_(x,u))}},
gI:function(a){var z,y,x,w,v
z=this.a.attributes
y=H.i([],[P.d])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.j(z,w)
v=H.f(z[w],"$isdF")
if(v.namespaceURI==null)C.a.k(y,v.name)}return y},
$asT:function(){return[P.d,P.d]},
$asL:function(){return[P.d,P.d]}},
iE:{"^":"iu;a",
h:function(a,b){return J.c6(this.a,H.v(b))},
gj:function(a){return this.gI(this).length}},
iG:{"^":"i4;a,b,c,$ti"},
bP:{"^":"iG;a,b,c,$ti"},
iH:{"^":"i5;a,b,c,d,e,$ti",p:{
aC:function(a,b,c,d,e){var z=W.e2(new W.iI(c),W.a1)
if(z!=null&&!0)J.eH(a,b,z,!1)
return new W.iH(0,a,b,z,!1,[e])}}},
iI:{"^":"o:21;a",
$1:function(a){return this.a.$1(H.f(a,"$isa1"))}},
bs:{"^":"b;a",
cD:function(a){var z,y
z=$.cD()
if(z.a===0){for(y=0;y<262;++y)z.i(0,C.S[y],W.ke())
for(y=0;y<12;++y)z.i(0,C.v[y],W.kf())}},
Y:function(a){return $.eA().w(0,W.aT(a))},
S:function(a,b,c){var z,y,x
z=W.aT(a)
y=$.cD()
x=y.h(0,H.e(z)+"::"+b)
if(x==null)x=y.h(0,"*::"+b)
if(x==null)return!1
return H.bV(x.$4(a,b,c,this))},
$isac:1,
p:{
dI:function(a){var z,y
z=document.createElement("a")
y=new W.jl(z,window.location)
y=new W.bs(y)
y.cD(a)
return y},
mD:[function(a,b,c,d){H.f(a,"$isS")
H.v(b)
H.v(c)
H.f(d,"$isbs")
return!0},"$4","ke",16,0,12],
mE:[function(a,b,c,d){var z,y,x
H.f(a,"$isS")
H.v(b)
H.v(c)
z=H.f(d,"$isbs").a
y=z.a
y.href=c
x=y.hostname
z=z.b
if(!(x==z.hostname&&y.port==z.port&&y.protocol==z.protocol))if(x==="")if(y.port===""){z=y.protocol
z=z===":"||z===""}else z=!1
else z=!1
else z=!0
return z},"$4","kf",16,0,12]}},
r:{"^":"b;$ti",
gC:function(a){return new W.d6(a,this.gj(a),-1,[H.bf(this,a,"r",0)])}},
dk:{"^":"b;a",
Y:function(a){return C.a.bh(this.a,new W.hw(a))},
S:function(a,b,c){return C.a.bh(this.a,new W.hv(a,b,c))},
$isac:1},
hw:{"^":"o:9;a",
$1:function(a){return H.f(a,"$isac").Y(this.a)}},
hv:{"^":"o:9;a,b,c",
$1:function(a){return H.f(a,"$isac").S(this.a,this.b,this.c)}},
jm:{"^":"b;",
cE:function(a,b,c,d){var z,y,x
this.a.H(0,c)
z=b.aD(0,new W.jn())
y=b.aD(0,new W.jo())
this.b.H(0,z)
x=this.c
x.H(0,C.U)
x.H(0,y)},
Y:function(a){return this.a.w(0,W.aT(a))},
S:["ce",function(a,b,c){var z,y
z=W.aT(a)
y=this.c
if(y.w(0,H.e(z)+"::"+b))return this.d.d3(c)
else if(y.w(0,"*::"+b))return this.d.d3(c)
else{y=this.b
if(y.w(0,H.e(z)+"::"+b))return!0
else if(y.w(0,"*::"+b))return!0
else if(y.w(0,H.e(z)+"::*"))return!0
else if(y.w(0,"*::*"))return!0}return!1}],
$isac:1},
jn:{"^":"o:10;",
$1:function(a){return!C.a.w(C.v,H.v(a))}},
jo:{"^":"o:10;",
$1:function(a){return C.a.w(C.v,H.v(a))}},
jy:{"^":"jm;e,a,b,c,d",
S:function(a,b,c){if(this.ce(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(J.c6(a,"template")==="")return this.e.w(0,b)
return!1},
p:{
dT:function(){var z,y,x,w,v
z=P.d
y=P.ci(C.u,z)
x=H.q(C.u,0)
w=H.m(new W.jz(),{func:1,ret:z,args:[x]})
v=H.i(["TEMPLATE"],[z])
y=new W.jy(y,P.a2(null,null,null,z),P.a2(null,null,null,z),P.a2(null,null,null,z),null)
y.cE(null,new H.hf(C.u,w,[x,z]),v,null)
return y}}},
jz:{"^":"o:22;",
$1:function(a){return"TEMPLATE::"+H.e(H.v(a))}},
jw:{"^":"b;",
Y:function(a){var z=J.B(a)
if(!!z.$isdq)return!1
z=!!z.$isH
if(z&&W.aT(a)==="foreignObject")return!1
if(z)return!0
return!1},
S:function(a,b,c){if(b==="is"||C.i.c7(b,"on"))return!1
return this.Y(a)},
$isac:1},
d6:{"^":"b;a,b,c,0d,$ti",
sb7:function(a){this.d=H.A(a,H.q(this,0))},
u:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.sb7(J.bi(this.a,z))
this.c=z
return!0}this.sb7(null)
this.c=y
return!1},
gD:function(a){return this.d},
$isaV:1},
iy:{"^":"b;a",$isN:1,$isdD:1,p:{
iz:function(a){if(a===window)return H.f(a,"$isdD")
else return new W.iy(a)}}},
ac:{"^":"b;"},
jl:{"^":"b;a,b",$isml:1},
dW:{"^":"b;a",
aL:function(a){new W.jJ(this).$2(a,null)},
a1:function(a,b){if(b==null)J.cM(a)
else J.bA(b,a)},
cY:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.f_(a)
x=J.c6(y.gcL(),"is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.a8(t)}v="element unprintable"
try{v=J.bj(a)}catch(t){H.a8(t)}try{u=W.aT(a)
this.cX(H.f(a,"$isS"),b,z,v,u,H.f(y,"$isL"),H.v(x))}catch(t){if(H.a8(t) instanceof P.aH)throw t
else{this.a1(a,b)
window
s="Removing corrupted element "+H.e(v)
if(typeof console!="undefined")window.console.warn(s)}}},
cX:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
if(c){this.a1(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")window.console.warn(z)
return}if(!this.a.Y(a)){this.a1(a,b)
window
z="Removing disallowed element <"+H.e(e)+"> from "+H.e(b)
if(typeof console!="undefined")window.console.warn(z)
return}if(g!=null)if(!this.a.S(a,"is",g)){this.a1(a,b)
window
z="Removing disallowed type extension <"+H.e(e)+' is="'+g+'">'
if(typeof console!="undefined")window.console.warn(z)
return}z=f.gI(f)
y=H.i(z.slice(0),[H.q(z,0)])
for(x=f.gI(f).length-1,z=f.a,w=J.n(z);x>=0;--x){if(x>=y.length)return H.j(y,x)
v=y[x]
if(!this.a.S(a,J.f8(v),w.a_(z,v))){window
u="Removing disallowed attribute <"+H.e(e)+" "+v+'="'+H.e(w.a_(z,v))+'">'
if(typeof console!="undefined")window.console.warn(u)
w.a_(z,v)
w.cS(z,v)}}if(!!J.B(a).$isdv)this.aL(a.content)},
$islD:1},
jJ:{"^":"o:23;a",
$2:function(a,b){var z,y,x,w,v,u
x=this.a
switch(a.nodeType){case 1:x.cY(a,b)
break
case 8:case 11:case 3:case 4:break
default:x.a1(a,b)}z=a.lastChild
for(x=a==null;null!=z;){y=null
try{y=J.f0(z)}catch(w){H.a8(w)
v=H.f(z,"$ist")
if(x){u=v.parentNode
if(u!=null)J.bA(u,v)}else J.bA(a,v)
z=null
y=a.lastChild}if(z!=null)this.$2(z,a)
z=H.f(y,"$ist")}}},
ix:{"^":"h+fy;"},
iA:{"^":"h+p;"},
iB:{"^":"iA+r;"},
iC:{"^":"h+p;"},
iD:{"^":"iC+r;"},
iK:{"^":"h+p;"},
iL:{"^":"iK+r;"},
iY:{"^":"h+p;"},
iZ:{"^":"iY+r;"},
j5:{"^":"h+T;"},
j6:{"^":"h+T;"},
j7:{"^":"h+p;"},
j8:{"^":"j7+r;"},
j9:{"^":"h+p;"},
ja:{"^":"j9+r;"},
jd:{"^":"h+p;"},
je:{"^":"jd+r;"},
jk:{"^":"h+T;"},
dQ:{"^":"N+p;"},
dR:{"^":"dQ+r;"},
jp:{"^":"h+p;"},
jq:{"^":"jp+r;"},
jt:{"^":"h+T;"},
jA:{"^":"h+p;"},
jB:{"^":"jA+r;"},
dU:{"^":"N+p;"},
dV:{"^":"dU+r;"},
jF:{"^":"h+p;"},
jG:{"^":"jF+r;"},
jL:{"^":"h+p;"},
jM:{"^":"jL+r;"},
jN:{"^":"h+p;"},
jO:{"^":"jN+r;"},
jP:{"^":"h+p;"},
jQ:{"^":"jP+r;"},
jR:{"^":"h+p;"},
jS:{"^":"jR+r;"},
jT:{"^":"h+p;"},
jU:{"^":"jT+r;"}}],["","",,P,{"^":"",
a0:function(a){var z,y,x,w,v
if(a==null)return
z=P.Y(P.d,null)
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.J)(y),++w){v=H.v(y[w])
z.i(0,v,a[v])}return z},
k5:function(a,b){var z={}
a.G(0,new P.k6(z))
return z},
d1:function(){var z=$.d0
if(z==null){z=J.c2(window.navigator.userAgent,"Opera",0)
$.d0=z}return z},
fE:function(){var z,y
z=$.cY
if(z!=null)return z
y=$.cZ
if(y==null){y=J.c2(window.navigator.userAgent,"Firefox",0)
$.cZ=y}if(y)z="-moz-"
else{y=$.d_
if(y==null){y=!P.d1()&&J.c2(window.navigator.userAgent,"Trident/",0)
$.d_=y}if(y)z="-ms-"
else z=P.d1()?"-o-":"-webkit-"}$.cY=z
return z},
k6:{"^":"o:7;a",
$2:function(a,b){this.a[a]=b}}}],["","",,P,{"^":""}],["","",,P,{"^":"",
kv:function(a){return Math.sqrt(a)},
dJ:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
b0:{"^":"b;Z:a>,T:b>,$ti",
l:function(a){return"Point("+H.e(this.a)+", "+H.e(this.b)+")"},
F:function(a,b){if(b==null)return!1
return H.aN(b,"$isb0",[P.E],null)&&this.a==J.bE(b)&&this.b==b.gT(b)},
gA:function(a){var z,y,x
z=J.am(this.a)
y=J.am(this.b)
y=P.dJ(P.dJ(0,z),y)
x=536870911&y+((67108863&y)<<3)
x^=x>>>11
return 536870911&x+((16383&x)<<15)}},
jf:{"^":"b;"},
U:{"^":"jf;$ti"}}],["","",,P,{"^":"",fi:{"^":"h;",$isfi:1,"%":"SVGAnimatedLength"},kT:{"^":"H;0n:height=,0m:width=","%":"SVGFEBlendElement"},kU:{"^":"H;0n:height=,0m:width=","%":"SVGFEColorMatrixElement"},kV:{"^":"H;0n:height=,0m:width=","%":"SVGFEComponentTransferElement"},kW:{"^":"H;0n:height=,0m:width=","%":"SVGFECompositeElement"},kX:{"^":"H;0n:height=,0m:width=","%":"SVGFEConvolveMatrixElement"},kY:{"^":"H;0n:height=,0m:width=","%":"SVGFEDiffuseLightingElement"},kZ:{"^":"H;0n:height=,0m:width=","%":"SVGFEDisplacementMapElement"},l_:{"^":"H;0n:height=,0m:width=","%":"SVGFEFloodElement"},l0:{"^":"H;0n:height=,0m:width=","%":"SVGFEGaussianBlurElement"},l1:{"^":"H;0n:height=,0m:width=","%":"SVGFEImageElement"},l2:{"^":"H;0n:height=,0m:width=","%":"SVGFEMergeElement"},l3:{"^":"H;0n:height=,0m:width=","%":"SVGFEMorphologyElement"},l4:{"^":"H;0n:height=,0m:width=","%":"SVGFEOffsetElement"},l5:{"^":"H;0n:height=,0m:width=","%":"SVGFESpecularLightingElement"},l6:{"^":"H;0n:height=,0m:width=","%":"SVGFETileElement"},l7:{"^":"H;0n:height=,0m:width=","%":"SVGFETurbulenceElement"},la:{"^":"H;0n:height=,0m:width=","%":"SVGFilterElement"},lb:{"^":"bm;0n:height=,0m:width=","%":"SVGForeignObjectElement"},fV:{"^":"bm;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},bm:{"^":"H;","%":"SVGAElement|SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement|SVGTSpanElement|SVGTextContentElement|SVGTextElement|SVGTextPathElement|SVGTextPositioningElement;SVGGraphicsElement"},ll:{"^":"bm;0n:height=,0m:width=","%":"SVGImageElement"},aX:{"^":"h;",$isaX:1,"%":"SVGLength"},lr:{"^":"j0;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return this.R(a,b)},
i:function(a,b,c){H.f(c,"$isaX")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){return this.h(a,b)},
R:function(a,b){return a.getItem(b)},
$asp:function(){return[P.aX]},
$isk:1,
$ask:function(){return[P.aX]},
$isa:1,
$asa:function(){return[P.aX]},
$asr:function(){return[P.aX]},
"%":"SVGLengthList"},ls:{"^":"H;0n:height=,0m:width=","%":"SVGMaskElement"},b_:{"^":"h;",$isb_:1,"%":"SVGNumber"},lE:{"^":"jc;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return this.R(a,b)},
i:function(a,b,c){H.f(c,"$isb_")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){return this.h(a,b)},
R:function(a,b){return a.getItem(b)},
$asp:function(){return[P.b_]},
$isk:1,
$ask:function(){return[P.b_]},
$isa:1,
$asa:function(){return[P.b_]},
$asr:function(){return[P.b_]},
"%":"SVGNumberList"},lJ:{"^":"H;0n:height=,0m:width=","%":"SVGPatternElement"},lL:{"^":"h;0j:length=","%":"SVGPointList"},lN:{"^":"h;0n:height=,0m:width=","%":"SVGRect"},lO:{"^":"fV;0n:height=,0m:width=","%":"SVGRectElement"},dq:{"^":"H;",$isdq:1,"%":"SVGScriptElement"},m_:{"^":"jv;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return this.R(a,b)},
i:function(a,b,c){H.v(c)
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){return this.h(a,b)},
R:function(a,b){return a.getItem(b)},
$asp:function(){return[P.d]},
$isk:1,
$ask:function(){return[P.d]},
$isa:1,
$asa:function(){return[P.d]},
$asr:function(){return[P.d]},
"%":"SVGStringList"},H:{"^":"S;",
N:function(a,b,c,d){var z,y,x,w,v,u
z=H.i([],[W.ac])
C.a.k(z,W.dI(null))
C.a.k(z,W.dT())
C.a.k(z,new W.jw())
c=new W.dW(new W.dk(z))
y='<svg version="1.1">'+b+"</svg>"
z=document
x=z.body
w=(x&&C.p).dg(x,y,c)
v=z.createDocumentFragment()
w.toString
z=new W.a6(w)
u=z.ga7(z)
for(z=J.n(v);x=u.firstChild,x!=null;)z.J(v,x)
return v},
$isH:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGGradientElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMetadataElement|SVGRadialGradientElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSymbolElement|SVGTitleElement|SVGViewElement;SVGElement"},m0:{"^":"bm;0n:height=,0m:width=","%":"SVGSVGElement"},b3:{"^":"h;",$isb3:1,"%":"SVGTransform"},m9:{"^":"jI;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return this.R(a,b)},
i:function(a,b,c){H.f(c,"$isb3")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){return this.h(a,b)},
R:function(a,b){return a.getItem(b)},
$asp:function(){return[P.b3]},
$isk:1,
$ask:function(){return[P.b3]},
$isa:1,
$asa:function(){return[P.b3]},
$asr:function(){return[P.b3]},
"%":"SVGTransformList"},mn:{"^":"bm;0n:height=,0m:width=","%":"SVGUseElement"},j_:{"^":"h+p;"},j0:{"^":"j_+r;"},jb:{"^":"h+p;"},jc:{"^":"jb+r;"},ju:{"^":"h+p;"},jv:{"^":"ju+r;"},jH:{"^":"h+p;"},jI:{"^":"jH+r;"}}],["","",,P,{"^":"",ai:{"^":"b;",$isk:1,
$ask:function(){return[P.aj]},
$isa:1,
$asa:function(){return[P.aj]},
$isid:1}}],["","",,P,{"^":"",kB:{"^":"h;0j:length=","%":"AudioBuffer"},kC:{"^":"iv;",
h:function(a,b){return P.a0(a.get(H.v(b)))},
G:function(a,b){var z,y
H.m(b,{func:1,ret:-1,args:[P.d,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.a0(y.value[1]))}},
gI:function(a){var z=H.i([],[P.d])
this.G(a,new P.fk(z))
return z},
gj:function(a){return a.size},
$asT:function(){return[P.d,null]},
$isL:1,
$asL:function(){return[P.d,null]},
"%":"AudioParamMap"},fk:{"^":"o:2;a",
$2:function(a,b){return C.a.k(this.a,a)}},kD:{"^":"N;0j:length=","%":"AudioTrackList"},fl:{"^":"N;","%":"AudioContext|webkitAudioContext;BaseAudioContext"},lG:{"^":"fl;0j:length=","%":"OfflineAudioContext"},iv:{"^":"h+T;"}}],["","",,P,{"^":"",fn:{"^":"h;",$isfn:1,"%":"WebGLBuffer"},fU:{"^":"h;",$isfU:1,"%":"WebGLFramebuffer"},hK:{"^":"h;",$ishK:1,"%":"WebGLProgram"},lP:{"^":"h;",
bg:function(a,b){return a.activeTexture(b)},
bi:function(a,b,c){return a.attachShader(b,c)},
bj:function(a,b,c){return a.bindBuffer(b,c)},
bl:function(a,b,c){return a.bindFramebuffer(b,c)},
bm:function(a,b,c){return a.bindTexture(b,c)},
bn:function(a,b){return a.blendEquation(b)},
bo:function(a,b,c){return a.blendFunc(b,c)},
bp:function(a,b,c,d){return a.bufferData(b,c,d)},
bq:function(a,b){return a.clear(b)},
br:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
bs:function(a,b){return a.compileShader(b)},
bt:function(a){return a.createBuffer()},
bu:function(a){return a.createProgram()},
bv:function(a,b){return a.createShader(b)},
bx:function(a,b){return a.depthMask(b)},
by:function(a,b){return a.disable(b)},
bz:function(a,b,c,d){return a.drawArrays(b,c,d)},
bA:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
bB:function(a,b){return a.enable(b)},
bC:function(a,b){return a.enableVertexAttribArray(b)},
ah:function(a){return P.a0(a.getContextAttributes())},
aE:function(a,b){return a.getProgramInfoLog(b)},
aF:function(a,b,c){return a.getProgramParameter(b,c)},
aH:function(a,b){return a.getShaderInfoLog(b)},
aI:function(a,b,c){return a.getShaderParameter(b,c)},
aJ:function(a,b,c){return a.getUniformLocation(b,c)},
bE:function(a,b){return a.linkProgram(b)},
aM:function(a,b,c){return a.shaderSource(b,c)},
aN:function(a,b,c,d){return a.stencilFunc(b,c,d)},
bM:function(a,b,c){return a.uniform1f(b,c)},
bN:function(a,b,c){return a.uniform1fv(b,c)},
bO:function(a,b,c){return a.uniform1i(b,c)},
bP:function(a,b,c){return a.uniform1iv(b,c)},
bQ:function(a,b,c){return a.uniform2fv(b,c)},
bR:function(a,b,c){return a.uniform3fv(b,c)},
bS:function(a,b,c){return a.uniform4fv(b,c)},
bT:function(a,b,c,d){return a.uniformMatrix3fv(b,!1,d)},
bU:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
bV:function(a,b){return a.useProgram(b)},
bW:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
bY:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
"%":"WebGLRenderingContext"},lQ:{"^":"h;",
d6:function(a,b){return a.beginTransformFeedback(b)},
d9:function(a,b){return a.bindVertexArray(b)},
di:function(a){return a.createVertexArray()},
dk:function(a,b,c,d,e){return a.drawArraysInstanced(b,c,d,e)},
dl:function(a,b,c,d,e,f){return a.drawElementsInstanced(b,c,d,e,f)},
dm:function(a){return a.endTransformFeedback()},
dM:function(a,b,c,d){this.d0(a,b,H.w(c,"$isa",[P.d],"$asa"),d)
return},
d0:function(a,b,c,d){return a.transformFeedbackVaryings(b,c,d)},
dN:function(a,b,c){return a.vertexAttribDivisor(b,c)},
bg:function(a,b){return a.activeTexture(b)},
bi:function(a,b,c){return a.attachShader(b,c)},
bj:function(a,b,c){return a.bindBuffer(b,c)},
bl:function(a,b,c){return a.bindFramebuffer(b,c)},
bm:function(a,b,c){return a.bindTexture(b,c)},
bn:function(a,b){return a.blendEquation(b)},
bo:function(a,b,c){return a.blendFunc(b,c)},
bp:function(a,b,c,d){return a.bufferData(b,c,d)},
bq:function(a,b){return a.clear(b)},
br:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
bs:function(a,b){return a.compileShader(b)},
bt:function(a){return a.createBuffer()},
bu:function(a){return a.createProgram()},
bv:function(a,b){return a.createShader(b)},
bx:function(a,b){return a.depthMask(b)},
by:function(a,b){return a.disable(b)},
bz:function(a,b,c,d){return a.drawArrays(b,c,d)},
bA:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
bB:function(a,b){return a.enable(b)},
bC:function(a,b){return a.enableVertexAttribArray(b)},
ah:function(a){return P.a0(a.getContextAttributes())},
aE:function(a,b){return a.getProgramInfoLog(b)},
aF:function(a,b,c){return a.getProgramParameter(b,c)},
aH:function(a,b){return a.getShaderInfoLog(b)},
aI:function(a,b,c){return a.getShaderParameter(b,c)},
aJ:function(a,b,c){return a.getUniformLocation(b,c)},
bE:function(a,b){return a.linkProgram(b)},
aM:function(a,b,c){return a.shaderSource(b,c)},
aN:function(a,b,c,d){return a.stencilFunc(b,c,d)},
bM:function(a,b,c){return a.uniform1f(b,c)},
bN:function(a,b,c){return a.uniform1fv(b,c)},
bO:function(a,b,c){return a.uniform1i(b,c)},
bP:function(a,b,c){return a.uniform1iv(b,c)},
bQ:function(a,b,c){return a.uniform2fv(b,c)},
bR:function(a,b,c){return a.uniform3fv(b,c)},
bS:function(a,b,c){return a.uniform4fv(b,c)},
bT:function(a,b,c,d){return a.uniformMatrix3fv(b,!1,d)},
bU:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
bV:function(a,b){return a.useProgram(b)},
bW:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
bY:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
"%":"WebGL2RenderingContext"},hW:{"^":"h;",$ishW:1,"%":"WebGLShader"},ia:{"^":"h;",$isia:1,"%":"WebGLTexture"},ie:{"^":"h;",$isie:1,"%":"WebGLUniformLocation"},ij:{"^":"h;",$isij:1,"%":"WebGLVertexArrayObject"}}],["","",,P,{"^":"",lX:{"^":"js;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.F(b,a,null,null,null))
return P.a0(this.cP(a,b))},
i:function(a,b,c){H.f(c,"$isL")
throw H.c(P.z("Cannot assign element of immutable List."))},
t:function(a,b){return this.h(a,b)},
cP:function(a,b){return a.item(b)},
$asp:function(){return[[P.L,,,]]},
$isk:1,
$ask:function(){return[[P.L,,,]]},
$isa:1,
$asa:function(){return[[P.L,,,]]},
$asr:function(){return[[P.L,,,]]},
"%":"SQLResultSetRowList"},jr:{"^":"h+p;"},js:{"^":"jr+r;"}}],["","",,G,{"^":"",
io:function(a){var z,y,x,w
z=H.i(a.split("\n"),[P.d])
for(y=0;y<z.length;y=x){x=y+1
w=""+x+": "
if(y>=z.length)return H.j(z,y)
C.a.i(z,y,w+H.e(z[y]))}return C.a.a5(z,"\n")},
dG:function(a,b,c){var z,y,x,w
z=J.n(a)
y=z.bv(a,b)
z.aM(a,y,c)
z.bs(a,y)
x=H.bV(z.aI(a,y,35713))
if(x!=null&&!x){w=z.aH(a,y)
P.aE("E:Compilation failed:")
P.aE("E:"+G.io(c))
P.aE("E:Failure:")
P.aE(C.i.K("E:",w))
throw H.c(w)}return y},
d7:function(a,b){var z,y,x
H.w(a,"$isa",[T.l],"$asa")
z=a.length
b=new Float32Array(z*3)
for(y=0;y<a.length;++y){z=y*3
C.f.i(b,z,J.bE(a[y]))
if(y>=a.length)return H.j(a,y)
C.f.i(b,z+1,J.c5(a[y]))
z+=2
if(y>=a.length)return H.j(a,y)
x=J.cK(a[y])
if(z>=b.length)return H.j(b,z)
b[z]=x}return b},
fR:function(a,b){var z,y
H.w(a,"$isa",[T.y],"$asa")
z=a.length
b=new Float32Array(z*2)
for(y=0;y<a.length;++y){z=y*2
C.f.i(b,z,J.bE(a[y]))
if(y>=a.length)return H.j(a,y)
C.f.i(b,z+1,J.c5(a[y]))}return b},
fS:function(a,b){var z,y,x,w,v
H.w(a,"$isa",[T.aB],"$asa")
z=a.length
b=new Float32Array(z*4)
for(y=0;y<a.length;++y){z=y*4
C.f.i(b,z,J.bE(a[y]))
if(y>=a.length)return H.j(a,y)
C.f.i(b,z+1,J.c5(a[y]))
x=z+2
if(y>=a.length)return H.j(a,y)
w=J.cK(a[y])
v=b.length
if(x>=v)return H.j(b,x)
b[x]=w
z+=3
if(y>=a.length)return H.j(a,y)
w=J.f2(a[y])
if(z>=v)return H.j(b,z)
b[z]=w}return b},
fQ:function(a,b){var z,y
H.w(a,"$isa",[[P.a,P.D]],"$asa")
z=a.length
b=new Uint32Array(z*4)
for(y=0;y<a.length;++y){z=y*4
C.n.i(b,z,J.bi(a[y],0))
if(y>=a.length)return H.j(a,y)
C.n.i(b,z+1,J.bi(a[y],1))
if(y>=a.length)return H.j(a,y)
C.n.i(b,z+2,J.bi(a[y],2))
if(y>=a.length)return H.j(a,y)
C.n.i(b,z+3,J.bi(a[y],3))}return b},
iW:function(a,b){var z,y,x,w,v,u,t,s,r,q
for(z=a.e,y=new H.aq(z,[H.q(z,0)]),y=y.gC(y),x=b.x,w=[[P.a,P.D]],v=[P.aj],u=[T.aB],t=[T.l],s=[T.y];y.u();){r=y.d
if(!x.ae(0,r)){r="Dropping unnecessary attribute: "+H.e(r)
if($.e8>0)H.c0("I: "+r)
continue}q=z.h(0,r)
switch($.a9().h(0,r).a){case"vec2":b.a0(r,G.fR(H.bz(q,"$isa",s,"$asa"),null),2)
break
case"vec3":b.a0(r,G.d7(H.bz(q,"$isa",t,"$asa"),null),3)
break
case"vec4":b.a0(r,G.fS(H.bz(q,"$isa",u,"$asa"),null),4)
break
case"float":b.a0(r,new Float32Array(H.bR(H.bz(q,"$isa",v,"$asa"))),1)
break
case"uvec4":b.a0(r,G.fQ(H.bz(q,"$isa",w,"$asa"),null),4)
break}}},
d9:function(a,b,c){var z,y,x,w,v,u,t,s
z=b.d
y=b.e.x
x=P.d
w=P.Y(x,P.b)
v=J.eQ(z.a)
u=new G.hi(z,v,4,w,y,0,-1,P.Y(x,P.ai),"meshdata:"+a,!1,!0)
x=G.d7(c.d,null)
w.i(0,"aPosition",J.c3(z.a))
u.ch=x
u.aT("aPosition",x,3)
t=$.a9().h(0,"aPosition")
if(t==null)H.W("Unknown canonical aPosition")
s=y.h(0,"aPosition")
J.bB(z.a,v)
z.bD(0,s,0)
z.bX(0,w.h(0,"aPosition"),s,t.aU(),5126,!1,0,0)
y=H.w(c.co(),"$isa",[P.D],"$asa")
u.y=J.c3(z.a)
x=u.ch.length
if(x<768){u.sar(new Uint8Array(H.bR(y)))
u.Q=5121}else if(x<196608){u.sar(new Uint16Array(H.bR(y)))
u.Q=5123}else{u.sar(new Uint32Array(H.bR(y)))
u.Q=5125}J.bB(z.a,v)
y=u.y
x=u.cx
J.c1(z.a,34963,y)
J.cI(z.a,34963,x,35048)
G.iW(c,u)
return u},
aZ:{"^":"b;"},
b4:{"^":"aZ;d,a,b,c",
aV:function(){return this.d},
l:function(a){var z,y,x,w
z=H.i(["{"+new H.dz(H.kb(this)).l(0)+"}["+this.a+"]"],[P.d])
for(y=this.d,x=new H.aq(y,[H.q(y,0)]),x=x.gC(x);x.u();){w=x.d
C.a.k(z,H.e(w)+": "+H.e(y.h(0,w)))}return C.a.a5(z,"\n")}},
fo:{"^":"dr;"},
fq:{"^":"b;0a,b",
bD:function(a,b,c){J.eX(this.a,b)
if(c>0)J.fe(this.a,b,c)},
bX:function(a,b,c,d,e,f,g,h){J.c1(this.a,34962,b)
J.ff(this.a,c,d,e,!1,g,h)}},
fT:{"^":"b;a,b,c,d,e"},
ah:{"^":"b;ad:a>,a2:b>,a3:c>",p:{
K:function(a,b,c){return new G.ah(a,b,c)}}},
cd:{"^":"b;ad:a>,a2:b>,a3:c>,d"},
d8:{"^":"b;a,b,c,d,e",
a9:function(a){switch($.a9().h(0,a).a){case"vec2":this.e.i(0,a,H.i([],[T.y]))
break
case"vec3":this.e.i(0,a,H.i([],[T.l]))
break
case"vec4":this.e.i(0,a,H.i([],[T.aB]))
break
case"float":this.e.i(0,a,H.i([],[P.aj]))
break
case"uvec4":this.e.i(0,a,H.i([],[[P.a,P.D]]))
break}},
cg:function(a){var z,y,x
z=this.d.length
for(y=this.c,x=0;x<a;++x,z+=4)C.a.k(y,new G.cd(z,z+1,z+2,z+3))},
ci:function(a){var z,y,x,w
H.w(a,"$isa",[T.l],"$asa")
for(z=this.d,y=0;y<24;++y){x=a[y]
w=new T.l(new Float32Array(3))
w.B(x)
C.a.k(z,w)}},
cj:function(a){var z,y,x,w,v
H.w(a,"$isa",[T.l],"$asa")
z=this.d
y=z.length
C.a.k(this.b,new G.ah(y,y+1,y+2))
for(x=0;x<3;++x){w=a[x]
v=new T.l(new Float32Array(3))
v.B(w)
C.a.k(z,v)}},
aQ:function(a,b){var z,y,x,w,v,u,t
z=[T.y]
H.w(b,"$isa",z,"$asa")
y=H.w(this.e.h(0,a),"$isa",z,"$asa")
for(z=b.length,x=y&&C.a,w=0;w<b.length;b.length===z||(0,H.J)(b),++w){v=b[w]
u=new Float32Array(2)
t=v.a
u[1]=t[1]
u[0]=t[0]
x.k(y,new T.y(u))}},
aR:function(a,b){var z,y,x,w,v,u
z=[T.l]
H.w(b,"$isa",z,"$asa")
y=H.w(this.e.h(0,a),"$isa",z,"$asa")
for(z=b.length,x=y&&C.a,w=0;w<b.length;b.length===z||(0,H.J)(b),++w){v=b[w]
u=new T.l(new Float32Array(3))
u.B(v)
x.k(y,u)}},
co:function(){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.c
x=new Array(z.length*3+y.length*6)
x.fixed$length=Array
w=H.i(x,[P.D])
for(x=z.length,v=0,u=0;u<z.length;z.length===x||(0,H.J)(z),++u){t=z[u]
C.a.i(w,v,t.a)
C.a.i(w,v+1,t.b)
C.a.i(w,v+2,t.c)
v+=3}for(z=y.length,u=0;u<y.length;y.length===z||(0,H.J)(y),++u){s=y[u]
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
z=H.i(["GB:","V["+this.d.length+"]","f3["+this.b.length+"]","f4["+this.c.length+"]"],[P.d])
for(y=this.e,x=new H.aq(y,[H.q(y,0)]),x=x.gC(x);x.u();){w=x.d
v=$.a9().h(0,w).a
C.a.k(z,H.e(w)+"["+v+","+y.h(0,w).length+"]")}return C.a.a5(z," ")}},
dx:{"^":"b;a,b,c"},
dw:{"^":"b;a,b,c"},
hg:{"^":"b4;d,a,b,c"},
hi:{"^":"aZ;d,e,f,r,x,0y,z,Q,0ch,0cx,cy,a,b,c",
sar:function(a){this.cx=H.w(a,"$isa",[P.D],"$asa")},
aT:function(a,b,c){var z,y
C.i.an(a,0)
H.f(b,"$isai")
this.cy.i(0,a,b)
z=this.d
y=this.r.h(0,a)
J.c1(z.a,34962,y)
J.cI(z.a,34962,b,35048)},
cp:function(){var z=this.cx
if(z!=null)return z.length
return this.ch.length/3|0},
a0:function(a,b,c){var z,y,x,w,v
z=J.cE(a,0)===105
if(z&&this.z===0)this.z=C.d.cf(b.length,c)
y=this.r
x=this.d
y.i(0,a,J.c3(x.a))
this.aT(a,b,c)
w=$.a9().h(0,a)
if(w==null)throw H.c("Unknown canonical "+a)
v=this.x.h(0,a)
J.bB(x.a,this.e)
x.bD(0,v,z?1:0)
x.bX(0,y.h(0,a),v,w.aU(),5126,!1,0,0)},
l:function(a){var z,y,x,w
z=this.cx
y=H.i(["Faces:"+(z==null?0:z.length)],[P.d])
for(z=this.cy,x=new H.aq(z,[H.q(z,0)]),x=x.gC(x);x.u();){w=x.d
C.a.k(y,H.e(w)+":"+z.h(0,w).length)}return"MESH["+this.a+"] "+C.a.a5(y,"  ")}},
hA:{"^":"b4;x,y,z,Q,ch,cx,cy,db,d,a,b,c",
ck:function(a,b){var z
if(typeof a!=="number")return a.dO()
if(typeof b!=="number")return H.a7(b)
z=a/b
if(this.z===z)return
this.z=z
this.aX()},
aX:function(){var z,y,x,w,v,u
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
aV:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.x.d
y=z.a
x=y[12]
w=y[13]
v=y[14]
u=new T.l(new Float32Array(3))
u.q(x,w,v)
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
y=J.B(t)
x=!!y.$isaB
q=x?t.gbZ(t):1
if(!!y.$isl){p=t.gZ(t)
s=t.gT(t)
r=t.gag(t)
t=p}else if(x){p=t.gZ(t)
s=t.gT(t)
r=t.gag(t)
t=p}else if(!(typeof t==="number")){t=null
s=null
r=null}y=z[0]
if(typeof t!=="number")return H.a7(t)
x=z[4]
if(typeof s!=="number")return H.a7(s)
w=z[8]
if(typeof r!=="number")return H.a7(r)
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
c.bF(0,u)
v.i(0,"uPerspectiveViewMatrix",c)
return v}},
kR:{"^":"b;"},
hQ:{"^":"aZ;d,e,f,r,x,y,z,Q,0ch,a,b,c",
cu:function(a,b,c,d){var z,y,x,w,v,u,t
for(z=this.e.d,y=z.length,x=this.y,w=this.d,v=this.r,u=0;u<z.length;z.length===y||(0,H.J)(z),++u){t=z[u]
x.i(0,t,J.cL(w.a,v,t))}for(z=this.f.d,y=z.length,u=0;u<z.length;z.length===y||(0,H.J)(z),++u){t=z[u]
x.i(0,t,J.cL(w.a,v,t))}},
cw:function(){var z,y,x,w
z=this.z
y=this.y
if(z.a===y.a&&this.Q.a===this.x.a)return H.i([],[P.d])
x=H.i([],[P.d])
for(y=new H.aq(y,[H.q(y,0)]),y=y.gC(y);y.u();){w=y.d
if(!z.ae(0,w))C.a.k(x,w)}for(z=this.x,z=P.j2(z,z.r,H.q(z,0)),y=this.Q;z.u();){w=z.d
if(!y.w(0,w))C.a.k(x,w)}return x},
cB:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
H.w(b,"$isL",[P.d,P.b],"$asL")
z=Date.now()
for(y=new H.aq(b,[H.q(b,0)]),y=y.gC(y),x=this.d,w=this.y,v=this.z,u=0;y.u();){t=y.d
switch(J.cE(t,0)){case 117:if(w.ae(0,t)){s=b.h(0,t)
if(v.ae(0,t))H.c0("E:"+(t+" : group ["+a+"] overwrites ["+t+"]"))
v.i(0,t,a)
r=$.a9().h(0,t)
if(r==null)H.W("unknown "+t)
q=w.h(0,t)
t=r.a
switch(t){case"int":if(r.c===0){H.P(s)
J.c7(x.a,q,s)}else if(!!J.B(s).$ish_)J.fc(x.a,q,s)
break
case"float":if(r.c===0){H.e6(s)
J.fa(x.a,q,s)}else if(!!J.B(s).$isai)J.fb(x.a,q,s)
break
case"mat4":if(r.c===0){t=H.al(s,"$isZ").a
J.cR(x.a,q,!1,t)}else if(!!J.B(s).$isai)J.cR(x.a,q,!1,s)
break
case"mat3":if(r.c===0){t=H.al(s,"$isaY").a
J.cQ(x.a,q,!1,t)}else if(!!J.B(s).$isai)J.cQ(x.a,q,!1,s)
break
case"vec4":t=r.c
p=x.a
if(t===0)J.cP(p,q,H.al(s,"$isaB").a)
else J.cP(p,q,H.f(s,"$isai"))
break
case"vec3":t=r.c
p=x.a
if(t===0)J.cO(p,q,H.al(s,"$isl").a)
else J.cO(p,q,H.f(s,"$isai"))
break
case"vec2":t=r.c
p=x.a
if(t===0)J.cN(p,q,H.al(s,"$isy").a)
else J.cN(p,q,H.f(s,"$isai"))
break
case"sampler2D":case"sampler2DShadow":t=this.ch
if(typeof t!=="number")return H.a7(t)
J.cF(x.a,33984+t)
t=H.al(s,"$isi9").cq()
J.cH(x.a,3553,t)
t=this.ch
J.c7(x.a,q,t)
t=this.ch
if(typeof t!=="number")return t.K()
this.ch=t+1
break
case"samplerCube":t=this.ch
if(typeof t!=="number")return H.a7(t)
J.cF(x.a,33984+t)
t=H.al(s,"$isi9").cq()
J.cH(x.a,34067,t)
t=this.ch
J.c7(x.a,q,t)
t=this.ch
if(typeof t!=="number")return t.K()
this.ch=t+1
break
default:H.c0("Error: unknow uniform type: "+t)}++u}break
case 99:s=b.h(0,t)
switch(t){case"cDepthTest":t=J.aG(s,!0)
p=x.a
if(t)J.bC(p,2929)
else J.c4(p,2929)
break
case"cStencilFunc":H.al(s,"$isdx")
t=s.a
p=x.a
if(t===1281)J.c4(p,2960)
else{J.bC(p,2960)
p=s.b
o=s.c
J.f7(x.a,t,p,o)}break
case"cDepthWrite":H.bV(s)
J.eR(x.a,s)
break
case"cBlendEquation":H.al(s,"$isdw")
t=s.a
p=x.a
if(t===1281)J.c4(p,3042)
else{J.bC(p,3042)
p=s.b
o=s.c
J.eL(x.a,p,o)
J.eK(x.a,t)}break}++u
break}}n=P.fJ(0,0,0,Date.now()-new P.bH(z,!1).a,0,0)
""+u
n.l(0)},
cn:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
H.w(b,"$isa",[G.b4],"$asa")
Date.now()
z=this.d
J.fd(z.a,this.r)
this.ch=0
y=this.z
if(y.a>0){y.f=null
y.e=null
y.d=null
y.c=null
y.b=null
y.a=0
y.b1()}for(y=b.length,x=0;x<b.length;b.length===y||(0,H.J)(b),++x){w=b[x]
this.cB(w.a,w.aV())}y=this.Q
y.a4(0)
for(v=a.cy,v=new H.aq(v,[H.q(v,0)]),v=v.gC(v);v.u();)y.k(0,v.d)
u=this.cw()
if(u.length!==0)P.aE("E:"+(this.a+" "+a.f+": uninitialized inputs: "+H.e(u)))
J.bB(a.d.a,a.e)
t=this.e.f.length>0
y=a.f
v=a.cp()
s=a.Q
r=a.z
if(t)J.eI(z.a,y)
if(s!==-1){q=z.a
if(r>1)J.eV(q,y,v,s,0,r)
else J.eU(q,y,v,s,0)}else{s=z.a
if(r>1)J.eT(s,y,0,v,r)
else J.eS(s,y,0,v)}if(t)J.eY(z.a)},
p:{
dp:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=P.d
y=P.a2(null,null,null,z)
x=c.b
w=d.b
v=H.w(c.f,"$isa",[z],"$asa")
u=J.eP(b.a)
t=G.dG(b.a,35633,x)
J.cG(b.a,u,t)
s=G.dG(b.a,35632,w)
J.cG(b.a,u,s)
if(v.length>0)J.f9(b.a,u,v,35980)
J.f6(b.a,u)
if(!H.bV(J.f5(b.a,u,35714)))H.W(J.f4(b.a,u))
z=new G.hQ(b,c,d,u,P.ci(c.c,z),P.Y(z,P.b),P.Y(z,z),y,a,!1,!0)
z.cu(a,b,c,d)
return z}}},
C:{"^":"b;a,b,c",
aU:function(){switch(this.a){case"float":return 1
case"vec2":return 2
case"vec3":case"uvec3":return 3
case"vec4":case"uvec4":return 4
default:return-1}}},
hX:{"^":"b;a,0b,c,d,e,f,r,x",
aP:function(a){var z,y,x,w,v
H.w(a,"$isa",[P.d],"$asa")
for(z=a.length,y=this.c,x=this.x,w=0;w<a.length;a.length===z||(0,H.J)(a),++w){v=a[w]
C.a.k(y,v)
x.i(0,v,this.r);++this.r}C.a.ai(y)},
aS:function(a){var z,y
H.w(a,"$isa",[P.d],"$asa")
for(z=this.d,y=0;y<2;++y)C.a.k(z,a[y])
C.a.ai(z)},
a8:function(a){var z,y,x
H.w(a,"$isa",[P.d],"$asa")
for(z=a.length,y=this.e,x=0;x<a.length;a.length===z||(0,H.J)(a),++x)C.a.k(y,a[x])
C.a.ai(y)},
aW:function(a,b){var z=[P.d]
this.b=this.cC(!0,H.w(a,"$isa",z,"$asa"),H.w(b,"$isa",z,"$asa"))},
ak:function(a){return this.aW(a,null)},
cC:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=[P.d]
H.w(b,"$isa",z,"$asa")
H.w(c,"$isa",z,"$asa")
y=this.c
x=y.length===0
w=H.i(["#version 300 es","precision highp float;","precision highp sampler2DShadow;",""],z)
for(z=y.length,v=this.x,u=0;u<y.length;y.length===z||(0,H.J)(y),++u){t=y[u]
s=$.a9().h(0,t)
C.a.k(w,"layout (location="+H.e(v.h(0,t))+") in "+s.a+" "+H.e(t)+";")}C.a.k(w,"")
r=x?"in":"out"
if(x)C.a.k(w,"out vec4 oFragColor;")
for(z=this.e,y=z.length,u=0;u<z.length;z.length===y||(0,H.J)(z),++u){q=z[u]
s=$.a9().h(0,q)
C.a.k(w,r+" "+s.a+" "+H.e(q)+";")}for(z=this.f,y=z.length,u=0;u<z.length;z.length===y||(0,H.J)(z),++u){q=z[u]
s=$.a9().h(0,q)
C.a.k(w,r+" "+s.a+" "+H.e(q)+";")}C.a.k(w,"")
for(z=this.d,y=z.length,u=0;u<z.length;z.length===y||(0,H.J)(z),++u){q=z[u]
s=$.a9().h(0,q)
v=s.c
p=v===0?"":"["+v+"]"
C.a.k(w,"uniform "+s.a+" "+H.e(q)+p+";")}C.a.k(w,"")
if(c!=null)C.a.H(w,c)
C.a.k(w,"void main(void) {")
C.a.H(w,b)
C.a.k(w,"}")
return C.a.a5(w,"\n")},
p:{
bN:function(a){var z,y
z=P.d
y=[z]
return new G.hX(a,H.i([],y),H.i([],y),H.i([],y),H.i([],y),0,P.Y(z,P.D))}}},
dr:{"^":"aZ;",
c5:function(a,b,c){var z=this.d.a
z[12]=a
z[13]=b
z[14]=c}}}],["","",,R,{"^":"",
j4:function(a,b,c,d){var z,y,x,w,v
z=document.createElement("div")
y=z.style
x=""+c+"px"
y.width=x
x=""+d+"px"
y.height=x
y.color=a
y.background=a
for(w=0;w<c;++w){v=H.f(W.iF("span",null),"$isS")
y=v.style
y.width="1px"
x=""+d+"px"
y.height=x
x=(y&&C.x).am(y,"float")
y.setProperty(x,"left","")
x=C.x.am(y,"opacity")
y.setProperty(x,"0.9","")
y.background=b
C.q.J(z,v)}return z},
hP:{"^":"hO;db,dx,d,e,f,r,x,y,z,Q,a,b,c",
dF:[function(a){var z,y,x
z=this.db
y=z.clientWidth
x=z.clientHeight
z.width=y
z.height=x
P.aE("size change "+H.e(y)+" "+H.e(x))
this.dx.ck(y,x)
this.z=y
this.Q=x},"$1","gdE",4,0,24]},
i1:{"^":"b;",
cv:function(a,b,c){var z,y
z=this.a
if(z==null)throw H.c("no element provided")
y=z.style
y.color=b
y.fontFamily="Helvetica,Arial,sans-serif"
y.fontSize="9px"
y.lineHeight="15px"
y.padding="0 0 3px 3px"
y.textAlign="left"
y.background=c
y=J.n(z)
y.J(z,this.b)
y.J(z,this.d)
y.J(z,this.c)}},
i2:{"^":"i1;e,f,a,b,c,d",
cA:function(a,b){var z,y,x,w,v,u
z=++this.e
if(a-this.f<1000)return
y=z*1000/1000
this.e=0
this.f=a
this.b.textContent=C.y.dL(y,2)+" fps"
C.q.c3(this.c,b)
x=C.d.X(30*C.y.da(y),90)
if(x<0)x=0
if(x>30)x=30
z=this.d
w=H.f(z.firstChild,"$isS")
v=w.style
u=""+x+"px"
v.height=u
C.q.J(z,w)},
cz:function(a){return this.cA(a,"")}}}],["","",,A,{"^":"",
e7:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
H.w(e,"$isa",[G.b4],"$asa")
z=b.dx
z.B(c)
y=b.d
z.bF(0,y)
x=b.cx
H.e(b)
w=C.a.gdt(e)
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
v.de(new T.aY(u))
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
C.a.k(e,b.ch)
a.cn(x,e,d)
if(0>=e.length)return H.j(e,-1)
e.pop()
for(y=b.cy,r=0;!1;++r){if(r>=0)return H.j(y,r)
A.e7(a,y[r],z,d,e)}},
ck:{"^":"dr;ch,cx,cy,db,dx,d,e,f,r,x,a,b,c",
l:function(a){return"NODE["+this.a+"]"}},
cl:{"^":"aZ;d,e,f,a,b,c"},
hO:{"^":"aZ;",
ct:function(a,b,c){if(this.d==null)this.d=new G.fT(this.e,null,null,null,null)},
cm:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.d
y=this.r
x=this.z
w=this.Q
v=z.a
z=z.b
J.eJ(v.a,36160,z)
J.fg(v.a,this.x,this.y,x,w)
if(y!==0)J.eM(v.a,y)
for(z=this.f,y=z.length,x=P.d,w=P.b,u=0;u<z.length;z.length===y||(0,H.J)(z),++u){t=z[u]
s=t.e
C.a.k(s,new G.b4(P.Y(x,w),"transforms",!1,!0))
r=new T.Z(new Float32Array(16))
r.P()
for(v=t.f,q=v.length,p=t.d,o=0;o<v.length;v.length===q||(0,H.J)(v),++o)A.e7(p,v[o],r,a,s)
if(0>=s.length)return H.j(s,-1)
s.pop()}},
cl:function(){return this.cm(null)}}}],["","",,V,{}],["","",,B,{"^":"",
fA:function(a5,a6,a7,a8,a9,b0,b1,b2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
z=-b0
y=-b1
x=new T.l(new Float32Array(3))
x.q(z,y,b2)
w=new T.l(new Float32Array(3))
w.q(b0,y,b2)
v=new T.l(new Float32Array(3))
v.q(b0,b1,b2)
u=new T.l(new Float32Array(3))
u.q(z,b1,b2)
t=-b2
s=new T.l(new Float32Array(3))
s.q(z,y,t)
r=new T.l(new Float32Array(3))
r.q(z,b1,t)
q=new T.l(new Float32Array(3))
q.q(b0,b1,t)
p=new T.l(new Float32Array(3))
p.q(b0,y,t)
o=new T.l(new Float32Array(3))
o.q(z,b1,t)
n=new T.l(new Float32Array(3))
n.q(z,b1,b2)
m=new T.l(new Float32Array(3))
m.q(b0,b1,b2)
l=new T.l(new Float32Array(3))
l.q(b0,b1,t)
k=new T.l(new Float32Array(3))
k.q(b0,y,b2)
j=new T.l(new Float32Array(3))
j.q(z,y,b2)
i=new T.l(new Float32Array(3))
i.q(z,y,t)
h=new T.l(new Float32Array(3))
h.q(b0,y,t)
g=new T.l(new Float32Array(3))
g.q(b0,y,t)
f=new T.l(new Float32Array(3))
f.q(b0,b1,t)
e=new T.l(new Float32Array(3))
e.q(b0,b1,b2)
d=new T.l(new Float32Array(3))
d.q(b0,y,b2)
c=new T.l(new Float32Array(3))
c.q(z,y,t)
b=new T.l(new Float32Array(3))
b.q(z,y,b2)
y=new T.l(new Float32Array(3))
y.q(z,b1,b2)
a=new T.l(new Float32Array(3))
a.q(z,b1,t)
t=[T.l]
a0=H.i([x,w,v,u,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,y,a],t)
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
a1=H.i([z,y,x,w,v,u,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b],[T.y])
a2=new G.d8(!1,H.i([],[G.ah]),H.i([],[G.cd]),H.i([],t),P.Y(P.d,[P.a,,]))
a2.a9("aTexUV")
a2.a9("aNormal")
a2.cg(6)
a2.ci(a0)
a2.aQ("aTexUV",a1)
for(a3=0;z=$.ez(),a3<6;++a3){a4=z[a3]
a2.aR("aNormal",H.i([a4,a4,a4,a4],t))}return a2},
fY:function(a,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=[G.ah]
y=H.i([],z)
x=[T.l]
w=H.i([],x)
C.a.H(y,$.em())
C.a.H(w,$.en())
for(v=0;v<a;++v,y=u){u=H.i([],z)
for(t=y.length,s=0;s<y.length;y.length===t||(0,H.J)(y),++s){r=y[s]
q=J.cJ(r)
if(q>=w.length)return H.j(w,q)
q=w[q]
p=new T.l(new Float32Array(3))
p.B(q)
q=r.ga2(r)
if(q>=w.length)return H.j(w,q)
p.k(0,w[q])
p.V(0,0.5)
p.E(0)
q=r.ga2(r)
if(q>=w.length)return H.j(w,q)
q=w[q]
o=new T.l(new Float32Array(3))
o.B(q)
q=r.ga3(r)
if(q>=w.length)return H.j(w,q)
o.k(0,w[q])
o.V(0,0.5)
o.E(0)
q=r.ga3(r)
if(q>=w.length)return H.j(w,q)
q=w[q]
n=new T.l(new Float32Array(3))
n.B(q)
q=r.gad(r)
if(q>=w.length)return H.j(w,q)
n.k(0,w[q])
n.V(0,0.5)
n.E(0)
m=w.length
C.a.k(w,p)
l=w.length
C.a.k(w,o)
k=w.length
C.a.k(w,n)
C.a.k(u,new G.ah(r.gad(r),m,k))
C.a.k(u,new G.ah(r.ga2(r),l,m))
C.a.k(u,new G.ah(r.ga3(r),k,l))
C.a.k(u,new G.ah(m,l,k))}}j=new G.d8(!1,H.i([],z),H.i([],[G.cd]),H.i([],x),P.Y(P.d,[P.a,,]))
j.a9("aTexUV")
j.a9("aNormal")
for(z=y.length,t=[T.y],s=0;s<y.length;y.length===z||(0,H.J)(y),++s){r=y[s]
q=J.cJ(r)
if(q>=w.length)return H.j(w,q)
i=w[q]
q=r.ga2(r)
if(q>=w.length)return H.j(w,q)
h=w[q]
q=r.ga3(r)
if(q>=w.length)return H.j(w,q)
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
j.aR("aNormal",H.i([i,h,g],x))
q=new T.l(new Float32Array(3))
q.B(i)
q.V(0,a0)
f=new T.l(new Float32Array(3))
f.B(h)
f.V(0,a0)
b=new T.l(new Float32Array(3))
b.B(g)
b.V(0,a0)
j.cj(H.i([q,f,b],x))
j.aQ("aTexUV",H.i([new T.y(e),new T.y(d),new T.y(c)],t))}return j}}],["","",,D,{"^":"",h6:{"^":"b;a,b,c",
cr:function(a){var z,y
a=document
z=W.aW
y={func:1,ret:-1,args:[z]}
W.aC(a,"keydown",H.m(new D.h8(this),y),!1,z)
W.aC(a,"keyup",H.m(new D.h9(this),y),!1,z)},
p:{
h7:function(a){var z=P.D
z=new D.h6(P.a2(null,null,null,z),P.a2(null,null,null,z),P.a2(null,null,null,z))
z.cr(a)
return z}}},h8:{"^":"o:11;a",
$1:function(a){var z
H.f(a,"$isaW")
z=this.a
z.a.k(0,a.which)
z.b.k(0,a.which)}},h9:{"^":"o:11;a",
$1:function(a){var z
H.f(a,"$isaW")
z=this.a
z.a.bH(0,a.which)
z.c.k(0,a.which)}},hl:{"^":"b;a,b,c,d,e,f,r,x",
cs:function(a){var z,y
z=C.j.gdw(a)
y=H.q(z,0)
W.aC(z.a,z.b,H.m(new D.hn(this),{func:1,ret:-1,args:[y]}),!1,y)
y=C.j.gdv(a)
z=H.q(y,0)
W.aC(y.a,y.b,H.m(new D.ho(this),{func:1,ret:-1,args:[z]}),!1,z)
z=C.j.gdz(a)
y=H.q(z,0)
W.aC(z.a,z.b,H.m(new D.hp(this),{func:1,ret:-1,args:[y]}),!1,y)
y=C.j.gdA(a)
z=H.q(y,0)
W.aC(y.a,y.b,H.m(new D.hq(this),{func:1,ret:-1,args:[z]}),!1,z)},
p:{
hm:function(a){var z=P.D
z=new D.hl(P.a2(null,null,null,z),P.a2(null,null,null,z),P.a2(null,null,null,z),0,0,0,0,0)
z.cs(a)
return z}}},hn:{"^":"o:3;a",
$1:function(a){var z,y
H.f(a,"$isa3")
a.preventDefault()
z=this.a
y=J.n(a)
z.r=H.P(y.gbG(a).a)
z.x=H.P(y.gbG(a).b)
z.d=a.movementX
z.e=a.movementY}},ho:{"^":"o:3;a",
$1:function(a){var z
H.f(a,"$isa3")
a.preventDefault()
P.aE("BUTTON "+H.e(a.button))
z=this.a
z.a.k(0,a.button)
z.b.k(0,a.button)}},hp:{"^":"o:3;a",
$1:function(a){var z
H.f(a,"$isa3")
a.preventDefault()
z=this.a
z.a.bH(0,a.button)
z.c.k(0,a.button)}},hq:{"^":"o:25;a",
$1:function(a){H.f(a,"$isb6")
a.preventDefault()
this.a.f=H.P(C.ab.gdj(a))}},hy:{"^":"fo;fy,go,id,k1,k2,k3,k4,r1,d,e,f,r,x,a,b,c"}}],["","",,A,{"^":"",
bw:function(a){var z,y
z=C.f.dn(H.w(a,"$isk",[P.b],"$ask"),0,new A.kd(),P.D)
if(typeof z!=="number")return H.a7(z)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
kd:{"^":"o:26;",
$2:function(a,b){var z,y
H.P(a)
z=J.am(b)
if(typeof a!=="number")return a.K()
y=536870911&a+z
y=536870911&y+((524287&y)<<10)
return y^y>>>6}}}],["","",,T,{"^":"",aY:{"^":"b;a",
B:function(a){var z,y
z=H.f(a,"$isaY").a
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
l:function(a){return"[0] "+this.O(0).l(0)+"\n[1] "+this.O(1).l(0)+"\n[2] "+this.O(2).l(0)+"\n"},
h:function(a,b){var z=this.a
if(b>=9)return H.j(z,b)
return z[b]},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.aY){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]}else z=!1
return z},
gA:function(a){return A.bw(this.a)},
O:function(a){var z,y,x
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
return new T.l(z)},
de:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
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
return m}},Z:{"^":"b;a",
B:function(a){var z,y
z=H.f(a,"$isZ").a
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
l:function(a){return"[0] "+this.O(0).l(0)+"\n[1] "+this.O(1).l(0)+"\n[2] "+this.O(2).l(0)+"\n[3] "+this.O(3).l(0)+"\n"},
h:function(a,b){var z=this.a
if(b>=16)return H.j(z,b)
return z[b]},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.Z){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]&&z[9]===x[9]&&z[10]===x[10]&&z[11]===x[11]&&z[12]===x[12]&&z[13]===x[13]&&z[14]===x[14]&&z[15]===x[15]}else z=!1
return z},
gA:function(a){return A.bw(this.a)},
O:function(a){var z,y,x
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
return new T.aB(z)},
P:function(){var z=this.a
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
bF:function(a8,a9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
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
z[15]=m*e+l*a+k*a3+j*a7}},y:{"^":"b;a",
v:function(a,b){var z=this.a
z[0]=a
z[1]=b},
B:function(a){var z,y
z=a.a
y=this.a
y[1]=z[1]
y[0]=z[0]},
l:function(a){var z=this.a
return"["+H.e(z[0])+","+H.e(z[1])+"]"},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.y){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gA:function(a){return A.bw(this.a)},
h:function(a,b){var z=this.a
if(b>=2)return H.j(z,b)
return z[b]},
gj:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(y*y+z*z)},
gZ:function(a){return this.a[0]},
gT:function(a){return this.a[1]}},l:{"^":"b;a",
q:function(a,b,c){var z=this.a
C.f.i(z,0,a)
C.f.i(z,1,b)
C.f.i(z,2,c)},
B:function(a){var z,y
z=H.f(a,"$isl").a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
l:function(a){var z=this.a
return"["+H.e(z[0])+","+H.e(z[1])+","+H.e(z[2])+"]"},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.l){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gA:function(a){return A.bw(this.a)},
h:function(a,b){var z=this.a
if(b>=3)return H.j(z,b)
return z[b]},
gj:function(a){return Math.sqrt(this.gaB())},
gaB:function(){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return y*y+x*x+z*z},
E:function(a){var z,y,x
z=Math.sqrt(this.gaB())
if(z===0)return 0
y=1/z
x=this.a
x[0]=x[0]*y
x[1]=x[1]*y
x[2]=x[2]*y
return z},
az:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[0]+y[1]*z[1]+y[2]*z[2]},
bw:function(a){var z,y,x,w,v,u,t,s
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=a.a
u=v[0]
t=v[1]
s=v[2]
z=new T.l(new Float32Array(3))
z.q(x*s-w*t,w*u-y*s,y*t-x*u)
return z},
k:function(a,b){var z,y
z=H.f(b,"$isl").a
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]},
V:function(a,b){var z=this.a
z[2]=z[2]*b
z[1]=z[1]*b
z[0]=z[0]*b},
gZ:function(a){return this.a[0]},
gT:function(a){return this.a[1]},
gag:function(a){return this.a[2]},
p:{
O:function(a,b,c){var z=new T.l(new Float32Array(3))
z.q(a,b,c)
return z}}},aB:{"^":"b;a",
B:function(a){var z,y
z=H.f(a,"$isaB").a
y=this.a
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
l:function(a){var z=this.a
return H.e(z[0])+","+H.e(z[1])+","+H.e(z[2])+","+H.e(z[3])},
F:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.aB){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gA:function(a){return A.bw(this.a)},
h:function(a,b){var z=this.a
if(b>=4)return H.j(z,b)
return z[b]},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(y*y+x*x+w*w+z*z)},
gZ:function(a){return this.a[0]},
gT:function(a){return this.a[1]},
gag:function(a){return this.a[2]},
gbZ:function(a){return this.a[3]}}}],["","",,Q,{"^":"",
ee:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
z={}
y=document
x=C.r.c1(y,"stats")
w=y.createElement("div")
v=w.style
v.fontWeight="bold"
w.textContent="@@@@"
u=new R.i2(0,0,x,w,y.createElement("div"),R.j4("blue","gray",90,30))
u.cv(x,"blue","gray")
t=H.f(C.r.dC(y,"#webgl-canvas"),"$isca")
s=t.clientWidth
r=t.clientHeight
t.width=s
t.height=r
q=new G.fq(t)
y=P.d
x=P.b
v=(t&&C.j).c0(t,"webgl2",P.df(["alpha",!1,"depth",!0,"stencil",!0,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1,"failIfMajorPerformanceCaveat",!1],y,x))
q.a=v
if(v==null)H.W(P.d5('Calling canvas.getContext("webgl2") failed,\nmake sure you run on a computer that supports WebGL2.\n\nYou can test your browser\'s compatibility here: http://webglreport.com/\n\n(If you are using Dartium make sure you start it with the\noption: --enable-unsafe-es3-apis)\n'))
p="ChronosGL Config: "+H.e(J.f3(v))
if($.e8>0)P.aE("I: "+p)
J.eN(v,0,0,0,1)
J.bC(v,2929)
v=new Float32Array(3)
p=D.h7(null)
o=D.hm(t)
n=new T.Z(new Float32Array(16))
n.P()
m=new Float32Array(3)
l=new Float32Array(3)
k=new Float32Array(3)
j=new D.hy(25,0,0,0,new T.l(v),-0.02,p,o,n,new T.l(m),new T.l(l),new T.l(k),new T.l(new Float32Array(3)),"camera:orbit",!1,!0)
v=new T.Z(new Float32Array(16))
v.P()
p=new T.Z(new Float32Array(16))
p.P()
i=new G.hA(j,50,1,0.1,1000,v,p,new T.Z(new Float32Array(16)),P.Y(y,x),"perspective",!1,!0)
i.aX()
v=H.i([],[A.cl])
h=new R.hP(t,i,null,q,v,17664,0,0,0,0,"main",!1,!0)
h.ct("main",q,null)
h.dF(null)
p=W.a1
W.aC(window,"resize",H.m(h.gdE(),{func:1,ret:-1,args:[p]}),!1,p)
p=G.dp("building",q,$.eE(),$.eD())
o=[G.b4]
n=H.i([i],o)
m=[A.ck]
l=H.i([],m)
g=new A.cl(p,n,l,"building",!1,!0)
C.a.k(v,g)
p=G.dp("sky",q,$.eC(),$.eB())
o=H.i([i],o)
n=H.i([],m)
C.a.k(v,new A.cl(p,o,n,"sky",!1,!0))
y=P.Y(y,x)
f=new G.hg(y,"mat",!1,!0)
y.i(0,"cDepthTest",!0)
y.i(0,"cDepthWrite",!0)
y.i(0,"cBlendEquation",$.ej())
y.i(0,"cStencilFunc",$.eo())
e=G.d9("icosahedron-3",p,B.fY(3,1,!0))
p=H.i([],m)
y=new Float32Array(9)
x=new T.Z(new Float32Array(16))
x.P()
v=new Float32Array(16)
o=new T.Z(v)
o.P()
l=new Float32Array(3)
k=new Float32Array(3)
d=new Float32Array(3)
c=new Float32Array(3)
if(typeof 100==="number"){b=100
a=100
a0=100}else{b=null
a=null
a0=null}a1=v[0]
if(typeof b!=="number")return H.a7(b)
v[0]=a1*b
v[1]=v[1]*b
v[2]=v[2]*b
v[3]=v[3]*b
a1=v[4]
if(typeof a!=="number")return H.a7(a)
v[4]=a1*a
v[5]=v[5]*a
v[6]=v[6]*a
v[7]=v[7]*a
a1=v[8]
if(typeof a0!=="number")return H.a7(a0)
v[8]=a1*a0
v[9]=v[9]*a0
v[10]=v[10]*a0
v[11]=v[11]*a0
v[12]=v[12]
v[13]=v[13]
v[14]=v[14]
v[15]=v[15]
C.a.k(n,new A.ck(f,e,p,new T.aY(y),x,o,new T.l(l),new T.l(k),new T.l(d),new T.l(c),e.a,!1,!0))
a2=new T.y(new Float32Array(2))
a2.v(0.01,0.01)
a3=B.fA(!0,0.99,0.01,0.99,0.01,1,2,1)
a4=a3.e.h(0,"aTexUV")
for(a5=8;a5<16;++a5){if(a5>=a4.length)return H.j(a4,a5)
a4[a5].B(a2)}a6=G.d9("house",g.d,a3)
for(y=g.f,x=a6.a,a7=-10;a7<10;a7+=4)for(a8=-10;a8<10;a8+=4){v=H.i([],m)
p=new Float32Array(9)
o=new T.Z(new Float32Array(16))
o.P()
n=new Float32Array(16)
l=new T.Z(n)
l.P()
k=new Float32Array(3)
d=new Float32Array(3)
c=new Float32Array(3)
a1=new Float32Array(3)
n[12]=a7
n[13]=0
n[14]=a8
C.a.k(y,new A.ck(f,a6,v,new T.aY(p),o,l,new T.l(k),new T.l(d),new T.l(c),new T.l(a1),x,!1,!0))}z.a=0
new Q.kq(z,j,h,u).$1(0)},
kq:{"^":"o:27;a,b,c,d",
$1:function(b2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1
H.cz(b2)
if(typeof b2!=="number")return b2.aO()
z=this.a
z.a=b2+0
y=this.b
y.go+=0.001
x=y.r1
w=x.a
if(w.w(0,0)||w.w(0,1)){w=y.go
v=x.d
if(typeof v!=="number")return v.aK()
y.go=w+v*0.01
v=y.id
w=x.e
if(typeof w!=="number")return w.aK()
y.id=v+w*0.01}w=y.k4
v=w.a
if(v.w(0,37))y.go+=0.03
else if(v.w(0,39))y.go-=0.03
if(v.w(0,38))y.id+=0.03
else if(v.w(0,40))y.id-=0.03
if(v.w(0,33))y.fy*=0.99
else if(v.w(0,34))y.fy*=1.01
if(v.w(0,32)){y.go=0
y.id=0}v=x.f
if(typeof v!=="number")return v.aK()
v=y.fy-v*y.k3
if(v>0)y.fy=v
v=C.t.dc(y.id,-1.4707963267948965,1.4707963267948965)
y.id=v
u=y.fy
t=y.go
s=u*Math.cos(v)
y.c5(s*Math.cos(t),u*Math.sin(v),s*Math.sin(t))
t=y.d.a
v=y.k2.a
t[12]=t[12]+v[0]
t[13]=t[13]+v[1]
t[14]=t[14]+v[2]
r=t[12]
q=t[13]
p=t[14]
o=new T.l(new Float32Array(3))
o.q(0,1,0)
u=y.e
n=u.a
n[0]=t[12]
n[1]=t[13]
n[2]=t[14]
n=new Float32Array(3)
m=new T.l(n)
m.B(u)
n[0]=n[0]-v[0]
n[1]=n[1]-v[1]
n[2]=n[2]-v[2]
m.E(0)
l=o.bw(m)
l.E(0)
k=m.bw(l)
k.E(0)
v=l.az(u)
j=k.az(u)
u=m.az(u)
i=l.a
h=i[0]
g=k.a
f=g[0]
e=n[0]
d=i[1]
c=g[1]
b=n[1]
i=i[2]
g=g[2]
n=n[2]
t[15]=1
t[14]=-u
t[13]=-j
t[12]=-v
t[11]=0
t[10]=n
t[9]=g
t[8]=i
t[7]=0
t[6]=b
t[5]=c
t[4]=d
t[3]=0
t[2]=e
t[1]=f
t[0]=h
t[12]=r
t[13]=q
t[14]=p
h=y.f
f=h.a
f[0]=t[2]
f[1]=t[6]
f[2]=t[10]
y=-y.k1
a=Math.sqrt(h.gaB())
r=f[0]/a
q=f[1]/a
p=f[2]/a
a0=Math.cos(y)
a1=Math.sin(y)
a2=1-a0
a3=r*r*a2+a0
y=p*a1
a4=r*q*a2-y
f=q*a1
a5=r*p*a2+f
a6=q*r*a2+y
a7=q*q*a2+a0
y=r*a1
a8=q*p*a2-y
a9=p*r*a2-f
b0=p*q*a2+y
b1=p*p*a2+a0
y=t[0]
f=t[4]
h=t[8]
e=t[1]
d=t[5]
c=t[9]
b=t[2]
i=t[6]
g=t[10]
n=t[3]
v=t[7]
j=t[11]
t[0]=y*a3+f*a6+h*a9
t[1]=e*a3+d*a6+c*a9
t[2]=b*a3+i*a6+g*a9
t[3]=n*a3+v*a6+j*a9
t[4]=y*a4+f*a7+h*b0
t[5]=e*a4+d*a7+c*b0
t[6]=b*a4+i*a7+g*b0
t[7]=n*a4+v*a7+j*b0
t[8]=y*a5+f*a8+h*b1
t[9]=e*a5+d*a8+c*b1
t[10]=b*a5+i*a8+g*b1
t[11]=n*a5+v*a8+j*b1
w.c.a4(0)
w.b.a4(0)
x.e=0
x.d=0
x.f=0
x.c.a4(0)
x.b.a4(0)
this.c.cl()
C.ac.gd4(window).bJ(this,-1)
this.d.cz(z.a)}}},1]]
setupProgram(dart,0,0)
J.B=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dc.prototype
return J.db.prototype}if(typeof a=="string")return J.bp.prototype
if(a==null)return J.h4.prototype
if(typeof a=="boolean")return J.h3.prototype
if(a.constructor==Array)return J.bn.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bq.prototype
return a}if(a instanceof P.b)return a
return J.bY(a)}
J.be=function(a){if(typeof a=="string")return J.bp.prototype
if(a==null)return a
if(a.constructor==Array)return J.bn.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bq.prototype
return a}if(a instanceof P.b)return a
return J.bY(a)}
J.e9=function(a){if(a==null)return a
if(a.constructor==Array)return J.bn.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bq.prototype
return a}if(a instanceof P.b)return a
return J.bY(a)}
J.k9=function(a){if(typeof a=="number")return J.bo.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.b5.prototype
return a}
J.ka=function(a){if(typeof a=="number")return J.bo.prototype
if(typeof a=="string")return J.bp.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.b5.prototype
return a}
J.ea=function(a){if(typeof a=="string")return J.bp.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.b5.prototype
return a}
J.n=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bq.prototype
return a}if(a instanceof P.b)return a
return J.bY(a)}
J.bv=function(a){if(a==null)return a
if(!(a instanceof P.b))return J.b5.prototype
return a}
J.aG=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.B(a).F(a,b)}
J.aa=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.k9(a).U(a,b)}
J.bi=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.kn(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.be(a).h(a,b)}
J.cE=function(a,b){return J.ea(a).an(a,b)}
J.bA=function(a,b){return J.n(a).cT(a,b)}
J.eG=function(a,b,c){return J.n(a).cU(a,b,c)}
J.cF=function(a,b){return J.n(a).bg(a,b)}
J.eH=function(a,b,c,d){return J.n(a).d1(a,b,c,d)}
J.cG=function(a,b,c){return J.n(a).bi(a,b,c)}
J.eI=function(a,b){return J.n(a).d6(a,b)}
J.c1=function(a,b,c){return J.n(a).bj(a,b,c)}
J.eJ=function(a,b,c){return J.n(a).bl(a,b,c)}
J.cH=function(a,b,c){return J.n(a).bm(a,b,c)}
J.bB=function(a,b){return J.n(a).d9(a,b)}
J.eK=function(a,b){return J.n(a).bn(a,b)}
J.eL=function(a,b,c){return J.n(a).bo(a,b,c)}
J.cI=function(a,b,c,d){return J.n(a).bp(a,b,c,d)}
J.eM=function(a,b){return J.n(a).bq(a,b)}
J.eN=function(a,b,c,d,e){return J.n(a).br(a,b,c,d,e)}
J.eO=function(a,b){return J.ka(a).M(a,b)}
J.c2=function(a,b,c){return J.be(a).dd(a,b,c)}
J.c3=function(a){return J.n(a).bt(a)}
J.eP=function(a){return J.n(a).bu(a)}
J.eQ=function(a){return J.n(a).di(a)}
J.eR=function(a,b){return J.n(a).bx(a,b)}
J.c4=function(a,b){return J.n(a).by(a,b)}
J.eS=function(a,b,c,d){return J.n(a).bz(a,b,c,d)}
J.eT=function(a,b,c,d,e){return J.n(a).dk(a,b,c,d,e)}
J.eU=function(a,b,c,d,e){return J.n(a).bA(a,b,c,d,e)}
J.eV=function(a,b,c,d,e,f){return J.n(a).dl(a,b,c,d,e,f)}
J.eW=function(a,b){return J.e9(a).t(a,b)}
J.bC=function(a,b){return J.n(a).bB(a,b)}
J.eX=function(a,b){return J.n(a).bC(a,b)}
J.eY=function(a){return J.n(a).dm(a)}
J.eZ=function(a,b){return J.n(a).G(a,b)}
J.cJ=function(a){return J.bv(a).gad(a)}
J.f_=function(a){return J.n(a).gd5(a)}
J.am=function(a){return J.B(a).gA(a)}
J.bD=function(a){return J.e9(a).gC(a)}
J.aQ=function(a){return J.be(a).gj(a)}
J.f0=function(a){return J.n(a).gdB(a)}
J.f1=function(a){return J.n(a).gdJ(a)}
J.f2=function(a){return J.bv(a).gbZ(a)}
J.bE=function(a){return J.bv(a).gZ(a)}
J.c5=function(a){return J.bv(a).gT(a)}
J.cK=function(a){return J.bv(a).gag(a)}
J.c6=function(a,b){return J.n(a).a_(a,b)}
J.f3=function(a){return J.n(a).ah(a)}
J.f4=function(a,b){return J.n(a).aE(a,b)}
J.f5=function(a,b,c){return J.n(a).aF(a,b,c)}
J.cL=function(a,b,c){return J.n(a).aJ(a,b,c)}
J.f6=function(a,b){return J.n(a).bE(a,b)}
J.cM=function(a){return J.n(a).dD(a)}
J.f7=function(a,b,c,d){return J.n(a).aN(a,b,c,d)}
J.f8=function(a){return J.ea(a).dK(a)}
J.bj=function(a){return J.B(a).l(a)}
J.f9=function(a,b,c,d){return J.n(a).dM(a,b,c,d)}
J.fa=function(a,b,c){return J.n(a).bM(a,b,c)}
J.fb=function(a,b,c){return J.n(a).bN(a,b,c)}
J.c7=function(a,b,c){return J.n(a).bO(a,b,c)}
J.fc=function(a,b,c){return J.n(a).bP(a,b,c)}
J.cN=function(a,b,c){return J.n(a).bQ(a,b,c)}
J.cO=function(a,b,c){return J.n(a).bR(a,b,c)}
J.cP=function(a,b,c){return J.n(a).bS(a,b,c)}
J.cQ=function(a,b,c,d){return J.n(a).bT(a,b,c,d)}
J.cR=function(a,b,c,d){return J.n(a).bU(a,b,c,d)}
J.fd=function(a,b){return J.n(a).bV(a,b)}
J.fe=function(a,b,c){return J.n(a).dN(a,b,c)}
J.ff=function(a,b,c,d,e,f,g){return J.n(a).bW(a,b,c,d,e,f,g)}
J.fg=function(a,b,c,d,e){return J.n(a).bY(a,b,c,d,e)}
I.aO=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.p=W.bF.prototype
C.j=W.ca.prototype
C.x=W.fx.prototype
C.q=W.fF.prototype
C.I=W.fH.prototype
C.J=W.fW.prototype
C.r=W.fX.prototype
C.K=J.h.prototype
C.a=J.bn.prototype
C.y=J.db.prototype
C.d=J.dc.prototype
C.t=J.bo.prototype
C.i=J.bp.prototype
C.R=J.bq.prototype
C.f=H.hr.prototype
C.n=H.ht.prototype
C.V=W.hu.prototype
C.B=J.hB.prototype
C.C=W.hL.prototype
C.H=W.i8.prototype
C.w=J.b5.prototype
C.ab=W.b6.prototype
C.ac=W.il.prototype
C.e=new P.jg()
C.L=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.M=function(hooks) {
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

C.N=function(getTagFallback) {
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
C.O=function() {
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
C.P=function(hooks) {
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
C.Q=function(hooks) {
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
C.S=H.i(I.aO(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.d])
C.T=H.i(I.aO(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"]),[P.d])
C.U=H.i(I.aO([]),[P.d])
C.u=H.i(I.aO(["bind","if","ref","repeat","syntax"]),[P.d])
C.v=H.i(I.aO(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.d])
C.W=new G.C("vec3","vertex btangents",0)
C.c=new G.C("vec3","",0)
C.X=new G.C("vec4","delta from light",0)
C.o=new G.C("","",0)
C.D=new G.C("vec3","vertex coordinates",0)
C.Y=new G.C("vec3","vertex binormals",0)
C.E=new G.C("vec4","for wireframe",0)
C.Z=new G.C("vec4","per vertex color",0)
C.a_=new G.C("float","for normal maps",0)
C.k=new G.C("mat4","",0)
C.a1=new G.C("mat4","",4)
C.a0=new G.C("mat4","",128)
C.b=new G.C("float","",0)
C.a2=new G.C("float","",4)
C.a3=new G.C("float","depth for shadowmaps",0)
C.h=new G.C("sampler2D","",0)
C.a4=new G.C("float","for bump maps",0)
C.a5=new G.C("vec2","texture uvs",0)
C.a6=new G.C("float","time since program start in sec",0)
C.l=new G.C("vec2","",0)
C.a7=new G.C("samplerCube","",0)
C.m=new G.C("vec4","",0)
C.a8=new G.C("vec3","vertex normals",0)
C.a9=new G.C("sampler2DShadow","",0)
C.F=new G.C("vec3","per vertex color",0)
C.G=new G.C("mat3","",0)
C.aa=new G.C("vec3","vertex tangents",0)
$.ab=0
$.aR=null
$.cU=null
$.cq=!1
$.ec=null
$.e3=null
$.eh=null
$.bW=null
$.bZ=null
$.cx=null
$.aL=null
$.b8=null
$.b9=null
$.cr=!1
$.I=C.e
$.ag=null
$.cc=null
$.d4=null
$.d3=null
$.d0=null
$.d_=null
$.cZ=null
$.cY=null
$.e8=0
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
I.$lazy(y,x,w)}})(["kL","el",function(){return H.eb("_$dart_dartClosure")},"lq","cB",function(){return H.eb("_$dart_js")},"ma","ep",function(){return H.ad(H.bO({
toString:function(){return"$receiver$"}}))},"mb","eq",function(){return H.ad(H.bO({$method$:null,
toString:function(){return"$receiver$"}}))},"mc","er",function(){return H.ad(H.bO(null))},"md","es",function(){return H.ad(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"mg","ev",function(){return H.ad(H.bO(void 0))},"mh","ew",function(){return H.ad(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"mf","eu",function(){return H.ad(H.dy(null))},"me","et",function(){return H.ad(function(){try{null.$method$}catch(z){return z.message}}())},"mj","ey",function(){return H.ad(H.dy(void 0))},"mi","ex",function(){return H.ad(function(){try{(void 0).$method$}catch(z){return z.message}}())},"mt","cC",function(){return P.ip()},"mK","bh",function(){return[]},"kI","ek",function(){return{}},"mB","eA",function(){return P.ci(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],P.d)},"mC","cD",function(){return P.Y(P.d,P.bl)},"lY","eo",function(){return new G.dx(1281,0,4294967295)},"kE","ej",function(){return new G.dw(1281,1281,1281)},"mI","a9",function(){return P.df(["cBlendEquation",C.o,"cDepthWrite",C.o,"cDepthTest",C.o,"cStencilFunc",C.o,"tPosition",C.c,"tSpeed",C.c,"tForce",C.c,"aColor",C.F,"aColorAlpha",C.Z,"aPosition",C.D,"aTexUV",C.a5,"aNormal",C.a8,"aBinormal",C.Y,"aCenter",C.E,"aPointSize",C.b,"aBoneIndex",C.m,"aBoneWeight",C.m,"aTangent",C.aa,"aBitangent",C.W,"iaRotation",C.m,"iaTranslation",C.c,"iaScale",C.b,"iaColor",C.c,"vColor",C.F,"vTexUV",C.l,"vLightWeighting",C.c,"vNormal",C.c,"vPosition",C.D,"vPositionFromLight",C.X,"vCenter",C.E,"vDepth",C.a3,"uTransformationMatrix",C.k,"uModelMatrix",C.k,"uNormalMatrix",C.G,"uConvolutionMatrix",C.G,"uPerspectiveViewMatrix",C.k,"uLightPerspectiveViewMatrix",C.k,"uShadowMap",C.a9,"uTexture",C.h,"uTexture2",C.h,"uTexture3",C.h,"uTexture4",C.h,"uSpecularMap",C.h,"uNormalMap",C.h,"uBumpMap",C.h,"uDepthMap",C.h,"uCubeTexture",C.a7,"uAnimationTable",C.h,"uTime",C.a6,"uCameraNear",C.b,"uCameraFar",C.b,"uFogNear",C.b,"uFogFar",C.b,"uPointSize",C.b,"uScale",C.b,"uAngle",C.b,"uCanvasSize",C.l,"uCenter2",C.l,"uCutOff",C.b,"uShininess",C.b,"uShadowBias",C.b,"uOpacity",C.b,"uColor",C.c,"uAmbientDiffuse",C.c,"uColorEmissive",C.c,"uColorSpecular",C.c,"uColorDiffuse",C.c,"uColorAlpha",C.m,"uColorAlpha2",C.m,"uEyePosition",C.c,"uMaterial",C.k,"uRange",C.l,"uDirection",C.l,"uBoneMatrices",C.a0,"uLightDescs",C.a1,"uLightCount",C.b,"uLightTypes",C.a2,"uBumpScale",C.a4,"uNormalScale",C.a_],P.d,G.C)},"mO","eC",function(){var z,y
z=G.bN("FixedVertexColorV")
y=[P.d]
z.aP(H.i(["aPosition"],y))
z.aS(H.i(["uPerspectiveViewMatrix","uModelMatrix"],y))
z.a8(H.i(["vColor"],y))
z.aW(H.i(["gl_Position = uPerspectiveViewMatrix * uModelMatrix * vec4(aPosition, 1.0);","vColor = ColorFromPosition(aPosition);"],y),H.i(["// ============================================================\n// MISC\n// ============================================================\n\nvec3 ColorFromPosition(vec3 pos) {\n    return vec3( sin(pos.x) / 2.0 + 0.5,\n                 cos(pos.y) / 2.0 + 0.5,\n                 sin(pos.z) / 2.0 + 0.5);\n}\n\nvec3 RangeToGray(float f, float a, float b) {\n    if (f > a) return vec3(1.0);\n    if (f < b) return vec3(0.0);\n    return vec3 ((f - b) / (a-b));\n}\n\nfloat useValueButReturnZero(float x) {\n    return (x + 1.0) * (x + 1.0) - x * x - 2.0 * x - 1.0;\n}\n\n// ============================================================\n// LIGHT\n// ============================================================\n\nfloat GetDiffuse(vec3 lightDir, vec3 normal) {\n    return max(dot(normal, lightDir), 0.0);\n}\n\nfloat GetSpecular(vec3 lightDir, vec3 viewDir, vec3 normal, float glossiness) {\n    vec3 angleW = normalize(viewDir + lightDir);\n    float specComp = max(0., dot(normal, angleW));\n    return pow(specComp, max(1.0, glossiness));\n}\n\nstruct ColorComponents {\n   vec3 diffuse;\n   vec3 specular;\n};\n\n// ============================================================\n// Spot Light\n// ============================================================\n\nstruct SpotLightInfo {\n    vec3 pos;      // for spot and point\n    vec3 dir;      // for spot and dir light\n    vec3 diffuseColor;\n    vec3 specularColor;\n    float range;        // for spot and point\n    float spotCutoff;   // for spot\n    float spotFocus;    // for spot\n    // float glossiness;   // Oddball: this comes from the material\n};\n\nSpotLightInfo UnpackSpotLightInfo(mat4 m) {\n    SpotLightInfo info;\n    info.pos = m[0].xyz;\n    info.dir = normalize(m[1].xyz);\n    info.diffuseColor = m[2].xyz;\n    info.specularColor = m[3].xyz;\n    // info.glossiness = m[0].a;\n    info.range = m[1].a;\n    info.spotCutoff = m[2].a;\n    info.spotFocus = m[3].a;\n    return info;\n}\n\nColorComponents SpotLightGetDiffuseAndSpecular(SpotLightInfo light,\n                                               vec3 vertexPos,\n                                               vec3 vertexNormal,\n                                               vec3 eyePos,\n                                               float uShininess) {\n    vec3 toSpot = light.pos - vertexPos;\n    vec3 spotDir = normalize(toSpot);\n    vec3 lightDirNorm = -normalize(light.dir);\n    float cosAngle = max(0., dot(lightDirNorm, spotDir));\n\t  if (cosAngle < light.spotCutoff) {\n        return ColorComponents(vec3(0.0), vec3(0.0));\n    }\n\n    cosAngle = max(0.0, pow(cosAngle, light.spotFocus));\n\t  float attenuation = max(0.0, 1.0 - length(toSpot) / light.range) * cosAngle;\n\t  vec3 viewDirNorm = normalize(eyePos - vertexPos);\n\t  return ColorComponents(\n\t           attenuation *\n             GetDiffuse(lightDirNorm, vertexNormal) *\n             light.diffuseColor,\n             attenuation *\n             GetSpecular(lightDirNorm, viewDirNorm, vertexNormal, uShininess) *\n             light.specularColor);\n}\n\n// ============================================================\n// Point Light\n// ============================================================\n\nstruct PointLightInfo {\n    vec3 pos;\n    vec3 diffuseColor;\n    vec3 specularColor;\n    float range;\n    // float glossiness;\n};\n\nPointLightInfo UnpackPointLightInfo(mat4 m) {\n    PointLightInfo info;\n    info.pos = m[0].xyz;\n    info.diffuseColor = m[2].xyz;\n    info.specularColor = m[3].xyz;\n    info.range = m[1].a;\n    // info.glossiness = m[0].a;\n    return info;\n}\n\nColorComponents PointLightGetDiffuseAndSpecular(PointLightInfo info,\n                                     vec3 vertexPos,\n                                     vec3 vertexNormal,\n                                     vec3 eyePos,\n                                     float uShininess) {\n    vec3 lightDir = info.pos - vertexPos;\n    float attenuation = max(0.0, 1.0 - length(lightDir) / info.range);\n    vec3 lightDirNorm = normalize(lightDir);\n    vec3 viewDirNorm = normalize(eyePos - vertexPos);\n    return ColorComponents(\n              attenuation *\n              GetDiffuse(lightDirNorm, vertexNormal) *\n              info.diffuseColor,\n               attenuation *\n               GetSpecular(lightDirNorm, viewDirNorm, vertexNormal, uShininess) *\n               info.specularColor);\n}\n\n// ============================================================\n// Directional Light\n// ============================================================\n\nstruct DirectionalLightInfo {\n    vec3 dir;      // for spot and dir light\n    vec3 diffuseColor;\n    vec3 specularColor;\n    // float glossiness;   // Oddball: this comes from the material\n};\n\nDirectionalLightInfo UnpackDirectionalLightInfo(mat4 m) {\n    DirectionalLightInfo info;\n    info.dir = normalize(m[1].xyz);\n    info.diffuseColor = m[2].xyz;\n    info.specularColor = m[3].xyz;\n    // info.glossiness = m[0].a;\n    return info;\n}\n\nColorComponents DirectionalLightGetDiffuseAndSpecular(DirectionalLightInfo info,\n                                                      vec3 vertexPos,\n                                                      vec3 vertexNormal,\n                                                      vec3 eyePos,\n                                                      float uShininess) {\n    vec3 viewDirNorm = normalize(eyePos - vertexPos);\n    return ColorComponents(\n              GetDiffuse(-info.dir, vertexNormal) *\n              info.diffuseColor,\n              GetSpecular(-info.dir, viewDirNorm, vertexNormal, uShininess) *\n              info.specularColor);\n}\n\n\nColorComponents CombinedLightSpot(\n    vec3 vVertexPosition, vec3 vNormal, vec3 uEyePosition, mat4 lightDesc,\n    float shininess) {\n    SpotLightInfo info = UnpackSpotLightInfo(lightDesc);\n    return SpotLightGetDiffuseAndSpecular(\n        info, vVertexPosition, vNormal, uEyePosition, shininess);\n}\n\nColorComponents CombinedLightPoint(\n    vec3 vVertexPosition, vec3 vNormal, vec3 uEyePosition, mat4 lightDesc,\n    float shininess) {\n    PointLightInfo info = UnpackPointLightInfo(lightDesc);\n    return PointLightGetDiffuseAndSpecular(\n        info, vVertexPosition, vNormal, uEyePosition, shininess);\n}\n\nColorComponents CombinedLightDirectional(\n    vec3 vVertexPosition, vec3 vNormal, vec3 uEyePosition, mat4 lightDesc,\n    float shininess) {\n    DirectionalLightInfo info = UnpackDirectionalLightInfo(lightDesc);\n    return DirectionalLightGetDiffuseAndSpecular(\n        info, vVertexPosition, vNormal, uEyePosition, shininess);\n}\n\n// ============================================================\n// Combined Light\n// ============================================================\nColorComponents CombinedLight(vec3 vVertexPosition,\n                   vec3 vNormal,\n                   vec3 uEyePosition,\n                   const mat4 uLightDescs[4],\n                   const float uLightTypes[4],\n                   float uShininess) {\n    ColorComponents acc = ColorComponents(vec3(0.0), vec3(0.0));\n\n    for (int i = 0; i < 4; ++i) {\n        ColorComponents curr;\n        float type = uLightTypes[i];\n        if (type == 2.0) {\n            curr = CombinedLightSpot(\n                       vVertexPosition, vNormal, uEyePosition, uLightDescs[i], \n                       uShininess);\n        } else if (type == 3.0) {\n            curr = CombinedLightPoint(\n                       vVertexPosition, vNormal, uEyePosition, uLightDescs[i], \n                       uShininess);\n        } else if (type == 1.0) {\n            curr = CombinedLightDirectional(\n                       vVertexPosition, vNormal, uEyePosition, uLightDescs[i], \n                       uShininess);\n        } else {\n            continue;\n        }\n        acc.diffuse = acc.diffuse + curr.diffuse;\n        acc.specular = acc.specular + curr.specular;\n    }\n    return acc;\n}\n"],y))
return z},"mN","eB",function(){var z,y
z=G.bN("FixedVertexColorF")
y=[P.d]
z.a8(H.i(["vColor"],y))
z.ak(H.i(["oFragColor = vec4( vColor, 1.0 );"],y))
return z},"my","ez",function(){return H.i([T.O(0,0,1),T.O(0,0,-1),T.O(0,1,0),T.O(0,-1,0),T.O(1,0,0),T.O(-1,0,0)],[T.l])},"lg","em",function(){return H.i([G.K(0,11,5),G.K(0,5,1),G.K(0,1,7),G.K(0,7,10),G.K(0,10,11),G.K(1,5,9),G.K(5,11,4),G.K(11,10,2),G.K(10,7,6),G.K(7,1,8),G.K(3,9,4),G.K(3,4,2),G.K(3,2,6),G.K(3,6,8),G.K(3,8,9),G.K(4,9,5),G.K(2,4,11),G.K(6,2,10),G.K(8,6,7),G.K(9,8,1)],[G.ah])},"mS","eF",function(){return(1+P.kv(5))/2},"lh","en",function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=$.eF()
y=T.O(-1,z,0)
y.E(0)
x=T.O(1,z,0)
x.E(0)
if(typeof z!=="number")return z.dP()
w=T.O(-1,-z,0)
w.E(0)
v=T.O(1,-z,0)
v.E(0)
u=T.O(0,-1,z)
u.E(0)
t=T.O(0,1,z)
t.E(0)
s=T.O(0,-1,-z)
s.E(0)
r=T.O(0,1,-z)
r.E(0)
q=T.O(z,0,-1)
q.E(0)
p=T.O(z,0,1)
p.E(0)
o=T.O(-z,0,-1)
o.E(0)
z=T.O(-z,0,1)
z.E(0)
return H.i([y,x,w,v,u,t,s,r,q,p,o,z],[T.l])},"mR","eE",function(){var z,y
z=G.bN("SkyScraperV")
y=[P.d]
z.aP(H.i(["aPosition","aTexUV"],y))
z.a8(H.i(["vPosition","vTexUV"],y))
z.aS(H.i(["uPerspectiveViewMatrix","uModelMatrix"],y))
z.ak(H.i(["gl_Position = uPerspectiveViewMatrix * uModelMatrix * vec4(aPosition, 1.0);","vPosition = aPosition;","vTexUV = aTexUV;"],y))
return z},"mQ","eD",function(){var z,y
z=G.bN("SkyScraperF")
y=[P.d]
z.a8(H.i(["vPosition","vTexUV"],y))
z.ak(H.i(["      // the step finds the windows\n      // multiplying the tex coord with 11 gives it a black column on the right side but with artifacts\n      // multiplying the tex coord with 10.9 gives it a black column on the right side WITHOUT the\n      // artifacts on the right side\n      float s1 = step(mod(vTexUV.x*11.+1., 2.), 1.);\n      float s2 = step(mod(vTexUV.y*21.+1., 2.), 1.);\n      float s3 = step( s1+s2, 1.1);\n\n      oFragColor = vec4( 1.-s3, 1.-s3, 1.-s3, 1. );\n\n      //gl_FragColor = vec4( mod(vPosition.x*10.0,2.0) ,\n      //                       mod(vPosition.y*20.0,2.0),\n      //                       mod(vPosition.z*10.0,2.0), 1. );\n"],y))
return z}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,ret:P.G},{func:1,ret:-1},{func:1,ret:-1,args:[P.d,,]},{func:1,ret:P.G,args:[W.a3]},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,args:[,]},{func:1,ret:P.G,args:[,]},{func:1,ret:P.G,args:[,,]},{func:1,ret:P.d,args:[P.D]},{func:1,ret:P.R,args:[W.ac]},{func:1,ret:P.R,args:[P.d]},{func:1,ret:P.G,args:[W.aW]},{func:1,ret:P.R,args:[W.S,P.d,P.d,W.bs]},{func:1,args:[,P.d]},{func:1,args:[P.d]},{func:1,ret:P.G,args:[{func:1,ret:-1}]},{func:1,ret:P.G,args:[,],opt:[P.a4]},{func:1,ret:[P.ae,,],args:[,]},{func:1,ret:P.R,args:[W.t]},{func:1,ret:-1,args:[P.d,P.d]},{func:1,ret:P.G,args:[P.E]},{func:1,args:[W.a1]},{func:1,ret:P.d,args:[P.d]},{func:1,ret:-1,args:[W.t,W.t]},{func:1,ret:-1,args:[W.a1]},{func:1,ret:P.G,args:[W.b6]},{func:1,ret:P.D,args:[P.D,P.b]},{func:1,ret:-1,args:[P.E]},{func:1,ret:P.D,args:[,,]}]
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
if(x==y)H.kx(d||a)
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
Isolate.aO=a.aO
Isolate.bd=a.bd
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
if(typeof dartMainRunner==="function")dartMainRunner(Q.ee,[])
else Q.ee([])})})()
//# sourceMappingURL=skyscraper.dart.js.map
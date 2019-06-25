let aParams = location.search.substr(1).split('&')
let len = aParams.length
let ret = {}
for (var i = 0; i < len; i++) {
  var aParam = aParams[i].split('=')
  var sParamName = decodeURIComponent(aParam[0])
  var sParamValue = decodeURIComponent(aParam[1])
  ret[sParamName] = sParamValue
}
window.query = ret;

(function setRootFont() {
    var _self = window;

    _self.selfFontSize  = undefined;
    _self.width = 1920; //设置默认最大宽度
    _self.fontSize = 100;  //默认字体大小

    _self.widthProportion = function () {
        var p = (document.body && document.documentElement.clientWidth ||
            document.getElementsByTagName("html")[0].offsetWidth) / _self.width;

        return p > 1 ? 1 : p < 0.25 ? 0.25 : p;
    };
	
    _self.changePage = function () {
        _self.selfFontSize = _self.widthProportion() * _self.fontSize;
        document.getElementsByTagName("html")[0].setAttribute("style",
            "font-size:" + _self.selfFontSize + "px");
    };

    _self.changePage();
    window.addEventListener('resize', function () {
        _self.changePage();
    }, false);
})(); 
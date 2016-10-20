(function (window, document) {


    setTimeout(change,10);
    /**
     * 兼容 firefox 浏览器 table 宽度 bug
     */
    function change() {
        var p = document.getElementsByClassName("text-vertical");
        for(var i = 0;i<p.length;i++){
            p[i].style.cssText = "float:left;color:#4874b6;-webkit-writing-mode: vertical-lr;-o-writing-mode: vertical-lr;-ms-writing-mode: tb-lr;writing-mode: vertical-lr;writing-mode: tb-lr;-moz-writing-mode: vertical-lr;-webkit-text-orientation: sideways-right;layout-flow: vertical-ideographic;white-space: nowrap;font-family: Oyun Garqag Tig,chagaan;font-size:22.01px;margin: 0;";
        }
    }
}(this, this.document));

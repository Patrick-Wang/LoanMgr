var authority;
(function (authority) {
    var ec;
    (function (ec) {
        var exporter;
        (function (exporter_1) {
            var ADDR = "/ec/export";
            authority.register(ADDR, function () {
                var html = ReactDOMServer.renderToStaticMarkup(React.createElement("form", {"id": "lm-exportForm", "method": "post", "style": { display: "none" }}, React.createElement("input", {"id": "lm-export", "type": "submit", "value": "导出"})));
                pages.PageUtil.jqPage(pages.PageType.loansMgr).find(".buttons-preview").append(html);
                pages.PageUtil.jqPage(pages.PageType.loansMgr).find(".buttons-preview").append(ReactDOMServer.renderToStaticMarkup(React.createElement("a", {"id": "lm-export-Btn", "className": "btn btn-default"}, "导出")));
                var exporter = new Export();
            });
            var Export = (function () {
                function Export() {
                    var _this = this;
                    pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-export-Btn").click(function () {
                        _this.onClickExport();
                        return false;
                    });
                }
                Export.prototype.onClickExport = function () {
                    var qOpt = route.router.to("loansMgr").send(route.MSG.LOANMGR_GET_QOPT);
                    var type = route.router.to("loansMgr").send(route.MSG.LOANMGR_GET_TYPE);
                    var action = collection.Net.BASE_URL + "/entrusted_case/download.do?type=" + type + "&query=" + JSON.stringify(qOpt);
                    pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-exportForm").attr("action", action);
                    pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-exportForm")[0].submit();
                };
                return Export;
            })();
            exporter_1.Export = Export;
        })(exporter = ec.exporter || (ec.exporter = {}));
    })(ec = authority.ec || (authority.ec = {}));
})(authority || (authority = {}));

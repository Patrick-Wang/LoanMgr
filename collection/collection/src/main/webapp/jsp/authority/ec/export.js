var authority;
(function (authority) {
    var ec;
    (function (ec_1) {
        var exporter;
        (function (exporter_1) {
            var Toast = pages.Toast;
            var PageType = pages.PageType;
            var EntrustedCase = collection.EntrustedCase;
            var ADDR = "/ec/export";
            authority.register(ADDR, function () {
                var html = ReactDOMServer.renderToStaticMarkup(React.createElement("form", {"id": "lm-exportForm", "method": "post", "style": { display: "none" }}, React.createElement("input", {"id": "lm-type", "name": "type", "type": "text"}), React.createElement("input", {"id": "lm-query", "name": "query", "type": "text"})));
                pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-export").append(html);
                html = ReactDOMServer.renderToStaticMarkup(React.createElement("a", {"id": "lm-export-Btn", "className": "btn btn-default", "style": { float: "right", marginRight: 5 }}, "导出"));
                pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-export").append(html);
                html = ReactDOMServer.renderToStaticMarkup(React.createElement("a", {"id": "lm-delete-Btn", "className": "btn btn-default", "style": { float: "right", marginRight: 5 }}, "删除"));
                pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-export").append(html);
                var exporter = new Export();
            });
            var Export = (function () {
                function Export() {
                    var _this = this;
                    pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-export-Btn").click(function () {
                        _this.onClickExport();
                        return false;
                    });
                    pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-delete-Btn").click(function () {
                        _this.onClickDelete();
                        return false;
                    });
                }
                Export.prototype.onClickExport = function () {
                    var qOpt = route.router.to(pages.PageUtil.getPageId(pages.PageType.loansMgr)).send(route.MSG.LOANMGR_GET_QOPT);
                    var type = route.router.to(pages.PageUtil.getPageId(pages.PageType.loansMgr)).send(route.MSG.LOANMGR_GET_TYPE);
                    var action = collection.Net.BASE_URL + "/entrusted_case/download.do";
                    pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-type").val(type);
                    pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-query").val(JSON.stringify(qOpt));
                    pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-exportForm").attr("action", action);
                    pages.PageUtil.jqPage(pages.PageType.loansMgr).find("#lm-exportForm")[0].submit();
                };
                Export.prototype.onClickDelete = function () {
                    var ec = route.router.to(pages.PageUtil.getPageId(pages.PageType.loansMgr)).send(route.MSG.LOANMGR_GET_SELECTED);
                    if (ec.ids.length > 0) {
                        bootbox.confirm("是否要删除委案?", function (result) {
                            if (result) {
                                EntrustedCase.delete(ec.type, ec.ids).done(function (r) {
                                    if (r.code == 0) {
                                        Toast.success("委案删除成功");
                                        sidebar.switchPage(PageType.loansMgr);
                                    }
                                    else {
                                        Toast.failed("委案删除失败");
                                    }
                                });
                            }
                        });
                    }
                    else {
                        Toast.warning("请选择要删除的委案");
                    }
                };
                return Export;
            })();
            exporter_1.Export = Export;
        })(exporter = ec_1.exporter || (ec_1.exporter = {}));
    })(ec = authority.ec || (authority.ec = {}));
})(authority || (authority = {}));

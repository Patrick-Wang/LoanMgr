///<reference path="pages/pages.ts"/>
var sidebar;
(function (sidebar) {
    var PageType = pages.PageType;
    function registerPage(type, page) {
        SiderBar.registerPage(type, page);
    }
    sidebar.registerPage = registerPage;
    var SiderBar = (function () {
        function SiderBar() {
            var _this = this;
            this.pages = [];
            this.items = [];
            for (var i = 0; i < PageType.end; ++i) {
                this.pages.push(null);
                this.items.push(null);
            }
            $(document).ready(function () {
                for (var i = 0; i < _this.pages.length; ++i) {
                    if (_this.pages[i] != null && _this.pages[i].isShown()) {
                        _this.pages[i].refresh();
                    }
                }
            });
            $("body").children().eq(0).before("<div id='mloading' style='z-index:999;position:absolute;width:100%;height:100%'></div>");
            $("#mloading").mLoading({});
            var startTime = Date.now();
            $(document).bind("ajaxSend", function () {
                $("#mloading").show();
                $("#mloading").mLoading("show");
                startTime = Date.now();
            }).bind("ajaxComplete", function () {
                var endTime = Date.now();
                if (endTime - startTime < 1500) {
                    setTimeout(function () {
                        $("#mloading").mLoading("hide");
                        $("#mloading").hide();
                    }, 1500 - (endTime - startTime));
                }
                else {
                    $("#mloading").mLoading("hide");
                    $("#mloading").hide();
                }
            });
        }
        SiderBar.refreshPage = function (type) {
            SiderBar.ins.pages[type].refresh();
        };
        SiderBar.registerPage = function (type, page) {
            SiderBar.ins.pages[type] = page;
            if (page.isShown()) {
                SiderBar.ins.items[type] = new SiderItemEvent(type, true);
            }
            else {
                SiderBar.ins.items[type] = new SiderItemEvent(type);
            }
        };
        SiderBar.showPage = function (type) {
            if (SiderBar.ins.pages[type] != null) {
                SiderBar.ins.pages[type].show();
            }
        };
        SiderBar.hideAllBut = function (but) {
            for (var i = 0; i < SiderBar.ins.pages.length; ++i) {
                if (i != but && SiderBar.ins.pages[i] != null) {
                    SiderBar.ins.pages[i].hide();
                }
            }
        };
        SiderBar.ins = new SiderBar();
        return SiderBar;
    })();
    var SiderItemEvent = (function () {
        function SiderItemEvent(page, inited) {
            var _this = this;
            if (inited === void 0) { inited = false; }
            this.inited = inited;
            this.page = page;
            $("#" + PageType[page]).click(function () {
                SiderBar.hideAllBut(_this.page);
                if (!inited) {
                    SiderBar.refreshPage(page);
                    inited = true;
                }
                SiderBar.showPage(_this.page);
                return false;
            });
        }
        return SiderItemEvent;
    })();
})(sidebar || (sidebar = {}));

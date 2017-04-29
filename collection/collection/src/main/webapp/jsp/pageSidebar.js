///<reference path="pages/pages.ts"/>
var sidebar;
(function (sidebar) {
    var PageType = pages.PageType;
    var Loading = pages.Loading;
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
            Loading.init();
            $(document).bind("ajaxStart ", function (e, xhr, o) {
                Loading.start();
            }).bind("ajaxComplete", function (e, xhr, o) {
                Loading.stop();
                console.log(o.url);
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

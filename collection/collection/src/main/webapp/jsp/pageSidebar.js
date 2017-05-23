///<reference path="pages/pages.ts"/>
var sidebar;
(function (sidebar) {
    var PageType = pages.PageType;
    var Loading = pages.Loading;
    function registerPage(type, page) {
        SiderBar.registerPage(type, page);
    }
    sidebar.registerPage = registerPage;
    function switchPage(type) {
        $("#" + PageType[type]).click();
    }
    sidebar.switchPage = switchPage;
    function getLastPage() {
        return SiderBar.ins.lastPage;
    }
    sidebar.getLastPage = getLastPage;
    function refreshPage() {
        $(SiderBar.ins.pages).each(function (i, e) {
            if (e && e.isShown()) {
                e.refresh();
                return false;
            }
        });
    }
    sidebar.refreshPage = refreshPage;
    function disable() {
        $(SiderBar.ins.items).each(function (i, e) {
            e && e.disable();
        });
    }
    sidebar.disable = disable;
    function enable() {
        $(SiderBar.ins.items).each(function (i, e) {
            e && e.enable();
        });
    }
    sidebar.enable = enable;
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
                        _this.lastPage = i;
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
            var ret;
            for (var i = 0; i < SiderBar.ins.pages.length; ++i) {
                if (i != but && SiderBar.ins.pages[i] != null) {
                    if (SiderBar.ins.pages[i].isShown()) {
                        ret = i;
                        SiderBar.ins.pages[i].hide();
                    }
                }
            }
            return ret;
        };
        SiderBar.ins = new SiderBar();
        return SiderBar;
    })();
    var SiderItemEvent = (function () {
        function SiderItemEvent(page, inited) {
            var _this = this;
            if (inited === void 0) { inited = false; }
            this.disabled = false;
            this.inited = inited;
            this.page = page;
            $("#" + PageType[page]).click(function () {
                if (!_this.disabled) {
                    var pgLast = SiderBar.hideAllBut(_this.page);
                    if (pgLast) {
                        SiderBar.ins.lastPage = pgLast;
                    }
                    if (!inited) {
                        SiderBar.refreshPage(_this.page);
                        inited = true;
                    }
                    SiderBar.showPage(_this.page);
                }
                return false;
            });
        }
        SiderItemEvent.prototype.disable = function () {
            this.disabled = true;
        };
        SiderItemEvent.prototype.enable = function () {
            this.disabled = false;
        };
        return SiderItemEvent;
    })();
})(sidebar || (sidebar = {}));

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
            this.pages = [];
            this.items = [];
            for (var i = 0; i < PageType.end; ++i) {
                this.pages.push(null);
                this.items.push(null);
            }
        }
        SiderBar.registerPage = function (type, page) {
            SiderBar.ins.pages[type] = page;
            SiderBar.ins.items[type] = new SiderItemEvent(type);
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
        function SiderItemEvent(page) {
            var _this = this;
            this.page = page;
            $("#" + PageType[page]).click(function () {
                SiderBar.hideAllBut(_this.page);
                SiderBar.showPage(_this.page);
                return false;
            });
        }
        return SiderItemEvent;
    })();
})(sidebar || (sidebar = {}));

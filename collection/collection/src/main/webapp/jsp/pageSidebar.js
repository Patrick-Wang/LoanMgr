///<reference path="pages/pages.ts"/>
var sidebar;
(function (sidebar) {
    var PageType = pages.PageType;
    function registerPage(type, page) {
        SiderBar.registerPage(type, page);
    }
    sidebar.registerPage = registerPage;
    class SiderBar {
        constructor() {
            this.pages = [];
            this.items = [];
            for (let i = 0; i < PageType.end; ++i) {
                this.pages.push(null);
                this.items.push(null);
            }
        }
        static registerPage(type, page) {
            SiderBar.ins.pages[type] = page;
            SiderBar.ins.items[type] = new SiderItemEvent(type);
        }
        static showPage(type) {
            if (SiderBar.ins.pages[type] != null) {
                SiderBar.ins.pages[type].show();
            }
        }
        static hideAllBut(but) {
            for (let i = 0; i < SiderBar.ins.pages.length; ++i) {
                if (i != but && SiderBar.ins.pages[i] != null) {
                    SiderBar.ins.pages[i].hide();
                }
            }
        }
    }
    SiderBar.ins = new SiderBar();
    class SiderItemEvent {
        constructor(page) {
            this.page = page;
            $("#" + PageType[page]).click(() => {
                SiderBar.hideAllBut(this.page);
                SiderBar.showPage(this.page);
                return false;
            });
        }
    }
})(sidebar || (sidebar = {}));

///<reference path="pages/pages.ts"/>
module sidebar {

    import PageType = pages.PageType;
    export function  registerPage(type:PageType, page:pages.Page) {
        SiderBar.registerPage(type, page);
    }

    class SiderBar {
        pages:pages.Page[] = [];
        items:SiderItemEvent[] = [];
        static ins:SiderBar = new SiderBar();

        constructor() {
            for (let i = 0; i < PageType.end; ++i) {
                this.pages.push(null);
                this.items.push(null);
            }
        }

        static registerPage(type:PageType, page:pages.Page) {
            SiderBar.ins.pages[type] = page;
            SiderBar.ins.items[type] = new SiderItemEvent(type);
        }

        static showPage(type:PageType) {
            if (SiderBar.ins.pages[type] != null){
                SiderBar.ins.pages[type].show();
            }
        }

        static hideAllBut(but:PageType) {
            for (let i = 0; i < SiderBar.ins.pages.length; ++i) {
                if (i != but && SiderBar.ins.pages[i] != null) {
                    SiderBar.ins.pages[i].hide();
                }
            }
        }
    }

    class SiderItemEvent {
        page : PageType;
        constructor(page : PageType) {
            this.page = page;
            $("#" + PageType[page]).click(()=> {
                SiderBar.hideAllBut(this.page);
                SiderBar.showPage(this.page);
                return false;
            });
        }
    }


}

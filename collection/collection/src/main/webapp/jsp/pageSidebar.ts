///<reference path="pages/pages.ts"/>
module sidebar {

    import PageType = pages.PageType;
    import Loading = pages.Loading;
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
            $(document).ready(()=>{
                for (let i = 0; i < this.pages.length; ++i){
                    if (this.pages[i] != null && this.pages[i].isShown()) {
                        this.pages[i].refresh();
                    }
                }
            });

            Loading.init();

            $(document).bind("ajaxStart ", function(e,xhr,o){
                Loading.start();
            }).bind("ajaxComplete", function(e,xhr,o){
                Loading.stop();
                console.log(o.url);
            });
        }

        static refreshPage(type:PageType){
            SiderBar.ins.pages[type].refresh();
        }

        static registerPage(type:PageType, page:pages.Page) {
            SiderBar.ins.pages[type] = page;
            if (page.isShown()){
                SiderBar.ins.items[type] = new SiderItemEvent(type, true);
            }else{
                SiderBar.ins.items[type] = new SiderItemEvent(type);
            }
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
        inited:boolean;
        constructor(page : PageType,inited:boolean = false) {
            this.inited = inited;
            this.page = page;
            $("#" + PageType[page]).click(()=> {
                SiderBar.hideAllBut(this.page);
                if (!inited){
                    SiderBar.refreshPage(page);
                    inited = true;
                }
                SiderBar.showPage(this.page);
                return false;
            });
        }
    }


}

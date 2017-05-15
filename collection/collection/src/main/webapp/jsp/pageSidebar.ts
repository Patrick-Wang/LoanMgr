///<reference path="pages/pages.ts"/>
module sidebar {

    import PageType = pages.PageType;
    import Loading = pages.Loading;
    export function  registerPage(type:PageType, page:pages.Page) {
        SiderBar.registerPage(type, page);
    }

    export function switchPage(type:PageType){
        $("#" + PageType[type]).click();
    }

    export function getLastPage():PageType{
        return SiderBar.ins.lastPage;
    }


    export function disable(){
        $(SiderBar.ins.items).each((i,e)=>{
            e && e.disable();
        });
    }

    export function enable(){
        $(SiderBar.ins.items).each((i,e)=>{
            e && e.enable();
        });
    }

    class SiderBar {
        pages:pages.Page[] = [];
        items:SiderItemEvent[] = [];
        lastPage : pages.PageType;
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
                        this.lastPage = i;
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

        static hideAllBut(but:PageType):pages.PageType {
            let ret : pages.PageType;
            for (let i = 0; i < SiderBar.ins.pages.length; ++i) {
                if (i != but && SiderBar.ins.pages[i] != null) {
                    if (SiderBar.ins.pages[i].isShown()){
                        ret = i;
                        SiderBar.ins.pages[i].hide();
                    }
                }
            }
            return ret;
        }
    }

    class SiderItemEvent {
        page : PageType;
        inited:boolean;
        disabled:boolean=false;

        disable(){
            this.disabled = true;
        }
        enable(){
            this.disabled = false;
        }

        constructor(page : PageType,inited:boolean = false) {
            this.inited = inited;
            this.page = page;
            $("#" + PageType[page]).click(()=> {
                if (!this.disabled){
                    let pgLast = SiderBar.hideAllBut(this.page);
                    if (pgLast){
                        SiderBar.ins.lastPage = pgLast;
                    }
                    if (!inited){
                        SiderBar.refreshPage(this.page);
                        inited = true;
                    }
                    SiderBar.showPage(this.page);
                }
                return false;
            });
        }
    }


}

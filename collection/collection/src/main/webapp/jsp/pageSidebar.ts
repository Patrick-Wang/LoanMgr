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
            $(document).ready(()=>{
                for (let i = 0; i < this.pages.length; ++i){
                    if (this.pages[i] != null && this.pages[i].isShown()) {
                        this.pages[i].refresh();
                    }
                }
            });
            $("body").children().eq(0).before("<div id='mloading' style='z-index:999;position:absolute;width:100%;height:100%'></div>")
            $("#mloading").mLoading({
                //text:"",//加载文字，默认值：加载中...
               // icon:"",//加载图标，默认值：一个小型的base64的gif图片
               // html:false,//设置加载内容是否是html格式，默认值是false
                //content:"",//忽略icon和text的值，直接在加载框中显示此值
               // mask:true//是否显示遮罩效果，默认显示
            });

            let startTime = Date.now();

            $(document).bind("ajaxSend", function(){
                $("#mloading").show();
                $("#mloading").mLoading("show");
                startTime = Date.now();
            }).bind("ajaxComplete", function(){
                let endTime = Date.now();

                if (endTime - startTime < 1500){
                    setTimeout(()=>{
                        $("#mloading").mLoading("hide");
                        $("#mloading").hide();
                    }, 1500 - (endTime - startTime));
                }else{
                    $("#mloading").mLoading("hide");
                    $("#mloading").hide();
                }

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

///<reference path="../pageSidebar.ts"/>

//eg. 'You Must Worry', 'top-right', '5000', 'warning', 'fa-warning', true
declare let Notify:(message:string, position:string, timeout:string, theme:string, icon:string, closable:boolean)=>void;
declare let bootbox:any;
module pages{
    export enum PageType{
        reportTask,
        askSth,
        console,
        importLoans,
        assignLoans,
        loansMgr,
        exportLoans,
        callCenter,
        userMgr,
        backup,
        rearangeOffice,
        loansDetail,
        end
    }

    export interface Page{
        show() : void;
        hide() : void;
        isShown():boolean;
        refresh():void;
    }

    export class Toast{
        static success(msg:string, closeAble:boolean = true):void{
            Notify(msg, 'top-right', '3000', 'success', 'fa-check', closeAble);
        }

        static warning(msg:string, closeAble:boolean = true):void{
            Notify(msg, 'top-right', '3000', 'warning', 'fa-warning', closeAble);
        }

        static failed(msg:string, closeAble:boolean = true):void{
            Notify(msg, 'top-right', '3000', 'danger', 'fa-bolt', closeAble);
        }
    }

    export class Loading{
        static startTime:number = 0;

        static init(){
            if ($("#mloading").length == 0){
                $("body").children().eq(0).before("<div id='mloading' style='z-index:999;position:absolute;width:100%;height:100%'></div>")
                $("#mloading").mLoading({
                    //text:"",//加载文字，默认值：加载中...
                    // icon:"",//加载图标，默认值：一个小型的base64的gif图片
                    // html:false,//设置加载内容是否是html格式，默认值是false
                    //content:"",//忽略icon和text的值，直接在加载框中显示此值
                    // mask:true//是否显示遮罩效果，默认显示
                });
            }
        }

        static start(){
            Loading.startTime = Date.now();
            $("#mloading").show();
            $("#mloading").mLoading("show");
        }

        static stop(){
            let endTime = Date.now();
            if (endTime - Loading.startTime < 1200){
                setTimeout(()=>{
                    $("#mloading").mLoading("hide");
                    $("#mloading").hide();
                }, 1500 - (endTime - Loading.startTime));
            }else{
                $("#mloading").mLoading("hide");
                $("#mloading").hide();
            }
        }
    }

    export class PageUtil{
        static getPageId(type:PageType):string{
            return PageType[type] + "Page";
        }

        static jqPage(type:PageType):any{
            return $("#" + PageUtil.getPageId(type));
        }

        static randomNum(min:number,max:number){
            var rg = max - min;
            var rd = Math.random();
            return (min + Math.round(rd * rg));
        }

        static shuffle(arr:any[]){
            for(let i = arr.length - 1; i > 0; --i){
                let j = PageUtil.randomNum(0, i);
                let tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }

    export class JQGridAssistantFactory {
        public static createTable(gridName:string, titles:string[], width:number = 80, align:JQTable.TextAlign = JQTable.TextAlign.Right):JQTable.JQGridAssistant {
            let nodes = [];
            for (let i = 0; i < titles.length; ++i) {
                nodes.push(JQTable.Node.create({
                    name: titles[i],
                    width: width,
                    isSortable: true,
                    align: align,
                }));
            }
            return new JQTable.JQGridAssistant(nodes, gridName);
        }

        public static createTableAssist(pName:string, type:collection.protocol.EntrustedCaseType, preTitle:string[] = []):JQTable.JQGridAssistant {
            var parent = $("#" + pName);
            parent.empty();
            parent.append("<table id='" + pName + "Table'></table><div id='" + pName + "Pager'></div>");
            let tableAssist:JQTable.JQGridAssistant = null;
            if (type == collection.protocol.EntrustedCaseType.carLoan) {
                tableAssist = JQGridAssistantFactory.createTable(pName + "Table", preTitle.concat(collection.protocol.carLoanTitle));
            } else if (type == collection.protocol.EntrustedCaseType.creditCard) {
                tableAssist = JQGridAssistantFactory.createTable(pName + "Table", preTitle.concat(collection.protocol.creditCardTitle));
            } else {
                tableAssist = JQGridAssistantFactory.createTable(pName + "Table", preTitle.concat(collection.protocol.creditLoanTitle));
            }
            return tableAssist;
        }

    }



    export abstract class PageImpl implements Page{
        page : PageType;
        html: string;
        constructor(page:PageType){
            this.page = page;
            sidebar.registerPage(page, this);
            //PageUtil.jqPage(this.page).css("display", "none");
            //$("script").remove();
            //this.html = PageUtil.jqPage(this.page).html();
            //PageUtil.jqPage(this.page).empty();
            $("#" + PageUtil.getPageId(this.page) + " #refresh-toggler").click(()=> {
                this.refresh();
                return false;
            });
            route.router.broadcast(route.MSG.PAGE_REFRESH, this.page, route.DELAY_READY);
        }

        refresh():void{
            route.router.broadcast(route.MSG.PAGE_REFRESH, this.page);
            this.onRefresh();
        }

        protected pageName():string{
            return PageUtil.getPageId(this.page);
        }

        protected find(q:any){
            return PageUtil.jqPage(this.page).find(q);
        }

        show():void {
            this.refresh();
            if (!this.isShown()) {
                //PageUtil.jqPage(this.page).append(this.html);
                //init();
                PageUtil.jqPage(this.page).css("display", "");
                this.onShown();
            }
        }

        hide():void {
            if (this.isShown()){
                PageUtil.jqPage(this.page).css("display", "none");
                //this.html = PageUtil.jqPage(this.page).html();
                //PageUtil.jqPage(this.page).empty();
            }
        }

        isShown():boolean{
            return "none" != PageUtil.jqPage(this.page).css("display");
        }

        protected onShown():void{

        }
        protected abstract onRefresh():void;
    }

}
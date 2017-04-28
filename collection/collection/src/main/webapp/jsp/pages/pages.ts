///<reference path="../pageSidebar.ts"/>

//eg. 'You Must Worry', 'top-right', '5000', 'warning', 'fa-warning', true
declare let Notify:(message:string, position:string, timeout:string, theme:string, icon:string, closable:boolean)=>void;

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
        propertyMgr,
        backup,
        rearangeOffice,
        rearangeBussiness,
        end
    }

    export interface Page{
        show() : void;
        hide() : void;
        isShown():boolean;
        refresh():void;
    }

    export class PageUtil{
        static getPageId(type:PageType):string{
            return PageType[type] + "Page";
        }

        static jqPage(type:PageType):any{
            return $("#" + PageUtil.getPageId(type));
        }
    }

    export class JQGridAssistantFactory {
        public static createTable(gridName:string, titles:string[], width:number = 80):JQTable.JQGridAssistant {
            let nodes = [];
            for (let i = 0; i < titles.length; ++i) {
                nodes.push(JQTable.Node.create({
                    name: titles[i],
                    width: width,
                    isSortable: true
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
                route.router.broadcast(route.MSG.PAGE_REFRESH, this.page);
                this.refresh();
                return false;
            });
            route.router.broadcast(route.MSG.PAGE_REFRESH, this.page, route.DELAY_READY);
        }

        refresh():void{
            this.onRefresh();
        }

        protected find(q:any){
            return PageUtil.jqPage(this.page).find(q);
        }

        show():void {
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
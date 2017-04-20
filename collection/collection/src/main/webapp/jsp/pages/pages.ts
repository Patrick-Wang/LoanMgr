///<reference path="../pageSidebar.ts"/>
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

        show():void {
            if (!this.isShown()) {
                //PageUtil.jqPage(this.page).append(this.html);
                //init();
                PageUtil.jqPage(this.page).css("display", "");
                //$("#" + PageUtil.getPageId(this.page) + " #refresh-toggler").click(()=> {
                //    this.refresh();
                //    return false;
                //});
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

        protected abstract onRefresh():void;
    }

}
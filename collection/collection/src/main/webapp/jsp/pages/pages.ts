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

        constructor(page:PageType){
            this.page = page;
            sidebar.registerPage(page, this);
        }

        show():void {
            PageUtil.jqPage(this.page).css("display", "");
        }

        hide():void {
            PageUtil.jqPage(this.page).css("display", "none");
        }

        isShown():boolean{
            return "none" != PageUtil.jqPage(this.page).css("display");
        }
    }

}
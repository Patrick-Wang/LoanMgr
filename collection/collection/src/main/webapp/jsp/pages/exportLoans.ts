///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class ExportLoans extends PageImpl{
        static ins = new ExportLoans(PageType.exportLoans);

        constructor(page:pages.PageType) {
            super(page);
        }

        protected onRefresh():void {

        }
    }


}
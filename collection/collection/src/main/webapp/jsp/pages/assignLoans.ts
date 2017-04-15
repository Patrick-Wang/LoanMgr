///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class AssignLoans extends PageImpl{
        static ins = new AssignLoans(PageType.assignLoans);

        constructor(page:pages.PageType) {
            super(page);
        }

        protected onRefresh():void {

        }
    }
}
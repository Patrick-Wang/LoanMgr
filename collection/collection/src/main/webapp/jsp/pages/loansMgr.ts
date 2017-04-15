///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class LoansMgr extends PageImpl{
        static ins = new LoansMgr(PageType.loansMgr);

        constructor(page:pages.PageType) {
            super(page);
        }

        protected onRefresh():void {

        }
    }
}
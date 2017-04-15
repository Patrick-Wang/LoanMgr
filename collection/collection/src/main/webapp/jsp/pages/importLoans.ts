///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{

    class ImportLoans extends PageImpl{
        static ins = new ImportLoans(PageType.importLoans);

        constructor(page:pages.PageType) {
            super(page);
        }
    }
}
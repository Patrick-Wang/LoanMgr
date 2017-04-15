///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
module pages{
    class ReportTask extends PageImpl{
        static ins = new ReportTask(PageType.reportTask);

        constructor(page:pages.PageType) {
            super(page);
        }
    }
}
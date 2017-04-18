///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    class ReportTask extends pages.PageImpl {
        constructor(page) {
            super(page);
        }
        onRefresh() {
        }
    }
    ReportTask.ins = new ReportTask(pages.PageType.reportTask);
})(pages || (pages = {}));

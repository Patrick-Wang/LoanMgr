var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var ReportTask = (function (_super) {
        __extends(ReportTask, _super);
        function ReportTask(page) {
            _super.call(this, page);
        }
        ReportTask.prototype.onRefresh = function () {
        };
        ReportTask.ins = new ReportTask(pages.PageType.reportTask);
        return ReportTask;
    })(pages.PageImpl);
})(pages || (pages = {}));

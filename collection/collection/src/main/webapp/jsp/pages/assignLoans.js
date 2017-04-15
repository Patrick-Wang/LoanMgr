var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var AssignLoans = (function (_super) {
        __extends(AssignLoans, _super);
        function AssignLoans(page) {
            _super.call(this, page);
        }
        AssignLoans.ins = new AssignLoans(pages.PageType.assignLoans);
        return AssignLoans;
    })(pages.PageImpl);
})(pages || (pages = {}));

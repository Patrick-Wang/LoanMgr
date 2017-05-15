var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var Backup = (function (_super) {
        __extends(Backup, _super);
        function Backup(page) {
            _super.call(this, page);
        }
        Backup.prototype.onRefresh = function () {
            collection.EntrustedCaseManager.getBatchNOs().done(function (batchNOs) {
            });
        };
        Backup.ins = new Backup(pages.PageType.backup);
        return Backup;
    })(pages.PageImpl);
})(pages || (pages = {}));

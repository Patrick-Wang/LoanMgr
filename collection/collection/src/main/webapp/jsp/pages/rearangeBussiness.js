var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var RearangeBussiness = (function (_super) {
        __extends(RearangeBussiness, _super);
        function RearangeBussiness(page) {
            _super.call(this, page);
        }
        RearangeBussiness.ins = new RearangeBussiness(pages.PageType.rearangeBussiness);
        return RearangeBussiness;
    })(pages.PageImpl);
})(pages || (pages = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var RearangeOffice = (function (_super) {
        __extends(RearangeOffice, _super);
        function RearangeOffice(page) {
            _super.call(this, page);
        }
        RearangeOffice.ins = new RearangeOffice(pages.PageType.rearangeOffice);
        return RearangeOffice;
    })(pages.PageImpl);
})(pages || (pages = {}));

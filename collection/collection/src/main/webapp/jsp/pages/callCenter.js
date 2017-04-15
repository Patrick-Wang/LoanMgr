var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var CallCenter = (function (_super) {
        __extends(CallCenter, _super);
        function CallCenter(page) {
            _super.call(this, page);
        }
        CallCenter.ins = new CallCenter(pages.PageType.callCenter);
        return CallCenter;
    })(pages.PageImpl);
})(pages || (pages = {}));

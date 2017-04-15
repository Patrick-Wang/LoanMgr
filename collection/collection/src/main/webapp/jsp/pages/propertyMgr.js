var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var PropertyMgr = (function (_super) {
        __extends(PropertyMgr, _super);
        function PropertyMgr(page) {
            _super.call(this, page);
        }
        PropertyMgr.prototype.onRefresh = function () {
        };
        PropertyMgr.ins = new PropertyMgr(pages.PageType.propertyMgr);
        return PropertyMgr;
    })(pages.PageImpl);
})(pages || (pages = {}));

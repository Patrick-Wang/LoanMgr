var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var AskSth = (function (_super) {
        __extends(AskSth, _super);
        function AskSth(page) {
            _super.call(this, page);
        }
        AskSth.ins = new AskSth(pages.PageType.askSth);
        return AskSth;
    })(pages.PageImpl);
})(pages || (pages = {}));

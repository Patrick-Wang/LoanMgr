var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var Console = (function (_super) {
        __extends(Console, _super);
        function Console(page) {
            _super.call(this, page);
        }
        Console.prototype.onRefresh = function () {
            alert("refresh");
        };
        Console.ins = new Console(pages.PageType.console);
        return Console;
    })(pages.PageImpl);
})(pages || (pages = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="pages.ts"/>
///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var UserMgr = (function (_super) {
        __extends(UserMgr, _super);
        function UserMgr(page) {
            _super.call(this, page);
        }
        UserMgr.ins = new UserMgr(pages.PageType.userMgr);
        return UserMgr;
    })(pages.PageImpl);
})(pages || (pages = {}));

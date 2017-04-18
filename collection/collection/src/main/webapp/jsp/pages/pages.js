///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    (function (PageType) {
        PageType[PageType["reportTask"] = 0] = "reportTask";
        PageType[PageType["askSth"] = 1] = "askSth";
        PageType[PageType["console"] = 2] = "console";
        PageType[PageType["importLoans"] = 3] = "importLoans";
        PageType[PageType["assignLoans"] = 4] = "assignLoans";
        PageType[PageType["loansMgr"] = 5] = "loansMgr";
        PageType[PageType["exportLoans"] = 6] = "exportLoans";
        PageType[PageType["callCenter"] = 7] = "callCenter";
        PageType[PageType["userMgr"] = 8] = "userMgr";
        PageType[PageType["propertyMgr"] = 9] = "propertyMgr";
        PageType[PageType["backup"] = 10] = "backup";
        PageType[PageType["rearangeOffice"] = 11] = "rearangeOffice";
        PageType[PageType["rearangeBussiness"] = 12] = "rearangeBussiness";
        PageType[PageType["end"] = 13] = "end";
    })(pages.PageType || (pages.PageType = {}));
    var PageType = pages.PageType;
    var PageUtil = (function () {
        function PageUtil() {
        }
        PageUtil.getPageId = function (type) {
            return PageType[type] + "Page";
        };
        PageUtil.jqPage = function (type) {
            return $("#" + PageUtil.getPageId(type));
        };
        return PageUtil;
    })();
    pages.PageUtil = PageUtil;
    var PageImpl = (function () {
        function PageImpl(page) {
            var _this = this;
            this.page = page;
            sidebar.registerPage(page, this);
            //PageUtil.jqPage(this.page).css("display", "none");
            //$("script").remove();
            //this.html = PageUtil.jqPage(this.page).html();
            //PageUtil.jqPage(this.page).empty();
            $("#" + PageUtil.getPageId(this.page) + " #refresh-toggler").click(function () {
                _this.refresh();
                return false;
            });
        }
        PageImpl.prototype.refresh = function () {
            this.onRefresh();
        };
        PageImpl.prototype.show = function () {
            if (!this.isShown()) {
                //PageUtil.jqPage(this.page).append(this.html);
                //init();
                PageUtil.jqPage(this.page).css("display", "");
            }
        };
        PageImpl.prototype.hide = function () {
            if (this.isShown()) {
                PageUtil.jqPage(this.page).css("display", "none");
            }
        };
        PageImpl.prototype.isShown = function () {
            return "none" != PageUtil.jqPage(this.page).css("display");
        };
        return PageImpl;
    })();
    pages.PageImpl = PageImpl;
})(pages || (pages = {}));

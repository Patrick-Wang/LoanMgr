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
    var Toast = (function () {
        function Toast() {
        }
        Toast.success = function (msg, closeAble) {
            if (closeAble === void 0) { closeAble = true; }
            Notify(msg, 'top-right', '3000', 'success', 'fa-check', closeAble);
        };
        Toast.warning = function (msg, closeAble) {
            if (closeAble === void 0) { closeAble = true; }
            Notify(msg, 'top-right', '3000', 'warning', 'fa-warning', closeAble);
        };
        Toast.failed = function (msg, closeAble) {
            if (closeAble === void 0) { closeAble = true; }
            Notify(msg, 'top-right', '3000', 'danger', 'fa-bolt', closeAble);
        };
        return Toast;
    })();
    pages.Toast = Toast;
    var Loading = (function () {
        function Loading() {
        }
        Loading.init = function () {
            if ($("#mloading").length == 0) {
                $("body").children().eq(0).before("<div id='mloading' style='z-index:999;position:absolute;width:100%;height:100%'></div>");
                $("#mloading").mLoading({});
            }
        };
        Loading.start = function () {
            Loading.startTime = Date.now();
            $("#mloading").show();
            $("#mloading").mLoading("show");
        };
        Loading.stop = function () {
            var endTime = Date.now();
            if (endTime - Loading.startTime < 1500) {
                setTimeout(function () {
                    $("#mloading").mLoading("hide");
                    $("#mloading").hide();
                }, 1500 - (endTime - Loading.startTime));
            }
            else {
                $("#mloading").mLoading("hide");
                $("#mloading").hide();
            }
        };
        Loading.startTime = 0;
        return Loading;
    })();
    pages.Loading = Loading;
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
    var JQGridAssistantFactory = (function () {
        function JQGridAssistantFactory() {
        }
        JQGridAssistantFactory.createTable = function (gridName, titles, width, align) {
            if (width === void 0) { width = 80; }
            if (align === void 0) { align = JQTable.TextAlign.Right; }
            var nodes = [];
            for (var i = 0; i < titles.length; ++i) {
                nodes.push(JQTable.Node.create({
                    name: titles[i],
                    width: width,
                    isSortable: true,
                    align: align,
                }));
            }
            return new JQTable.JQGridAssistant(nodes, gridName);
        };
        JQGridAssistantFactory.createTableAssist = function (pName, type, preTitle) {
            if (preTitle === void 0) { preTitle = []; }
            var parent = $("#" + pName);
            parent.empty();
            parent.append("<table id='" + pName + "Table'></table><div id='" + pName + "Pager'></div>");
            var tableAssist = null;
            if (type == collection.protocol.EntrustedCaseType.carLoan) {
                tableAssist = JQGridAssistantFactory.createTable(pName + "Table", preTitle.concat(collection.protocol.carLoanTitle));
            }
            else if (type == collection.protocol.EntrustedCaseType.creditCard) {
                tableAssist = JQGridAssistantFactory.createTable(pName + "Table", preTitle.concat(collection.protocol.creditCardTitle));
            }
            else {
                tableAssist = JQGridAssistantFactory.createTable(pName + "Table", preTitle.concat(collection.protocol.creditLoanTitle));
            }
            return tableAssist;
        };
        return JQGridAssistantFactory;
    })();
    pages.JQGridAssistantFactory = JQGridAssistantFactory;
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
                route.router.broadcast(route.MSG.PAGE_REFRESH, _this.page);
                _this.refresh();
                return false;
            });
            route.router.broadcast(route.MSG.PAGE_REFRESH, this.page, route.DELAY_READY);
        }
        PageImpl.prototype.refresh = function () {
            this.onRefresh();
        };
        PageImpl.prototype.find = function (q) {
            return PageUtil.jqPage(this.page).find(q);
        };
        PageImpl.prototype.show = function () {
            if (!this.isShown()) {
                //PageUtil.jqPage(this.page).append(this.html);
                //init();
                PageUtil.jqPage(this.page).css("display", "");
                this.onShown();
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
        PageImpl.prototype.onShown = function () {
        };
        return PageImpl;
    })();
    pages.PageImpl = PageImpl;
})(pages || (pages = {}));

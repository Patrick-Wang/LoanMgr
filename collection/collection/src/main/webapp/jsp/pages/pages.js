///<reference path="../pageSidebar.ts"/>
var pages;
(function (pages) {
    var Timer = (function () {
        function Timer() {
        }
        Timer.prototype.start = function (interval, onTimer) {
            this.kill();
            this.startTime = Date.now();
            this.tid = setInterval(onTimer, interval);
        };
        Timer.prototype.kill = function () {
            if (this.tid) {
                clearInterval(this.tid);
                this.tid = undefined;
            }
        };
        Timer.prototype.format = function (second) {
            var h = second / 3600;
            var m = ((second % 3600) / 60);
            var s = second % 60;
            if (h < 10) {
                h = "0" + h;
            }
            if (m < 10) {
                m = "0" + m;
            }
            if (s < 10) {
                s = "0" + s;
            }
            return ("" + h).substring(0, 2) + ":" + ("" + m).substring(0, 2) + ":" + ("" + s).substring(0, 2);
        };
        Timer.prototype.secFmt = function () {
            return this.format((Date.now() - this.startTime) / 1000);
        };
        return Timer;
    })();
    pages.Timer = Timer;
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
        PageType[PageType["backup"] = 9] = "backup";
        PageType[PageType["rearangeOffice"] = 10] = "rearangeOffice";
        PageType[PageType["loansDetail"] = 11] = "loansDetail";
        PageType[PageType["end"] = 12] = "end";
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
            if (endTime - Loading.startTime < 1200) {
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
        PageUtil.randomNum = function (min, max) {
            var rg = max - min;
            var rd = Math.random();
            return (min + Math.round(rd * rg));
        };
        PageUtil.shuffle = function (arr) {
            for (var i = arr.length - 1; i > 0; --i) {
                var j = PageUtil.randomNum(0, i);
                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
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
                    isSortable: false,
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
                _this.refresh();
                return false;
            });
            $("#" + PageUtil.getPageId(this.page) + " .sidebar-toggler").click(function () {
                _this.refresh();
                return false;
            });
            route.router.broadcast(route.MSG.PAGE_REFRESH, this.page, route.DELAY_READY);
        }
        PageImpl.prototype.refresh = function () {
            route.router.broadcast(route.MSG.PAGE_REFRESH, this.page);
            this.onRefresh();
        };
        PageImpl.prototype.pageName = function () {
            return PageUtil.getPageId(this.page);
        };
        PageImpl.prototype.find = function (q) {
            return PageUtil.jqPage(this.page).find(q);
        };
        PageImpl.prototype.show = function () {
            this.refresh();
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

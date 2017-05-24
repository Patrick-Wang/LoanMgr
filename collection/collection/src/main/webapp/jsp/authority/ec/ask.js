var pages;
(function (pages) {
    var detail;
    (function (detail) {
        authority.register("/ec/ask", function () {
            route.router.register(new route.AnonymousReceiver(function (e) {
                switch (e.id) {
                    case route.MSG.EC_DETAIL_REFRESH:
                        Ask.update();
                        break;
                }
            }));
            var txt = pages.PageUtil.jqPage(pages.PageType.loansDetail).find("#bootbox-loans-consulting-timeline").text();
            pages.PageUtil.jqPage(pages.PageType.loansDetail).find("#bootbox-loans-consulting-timeline").text(txt.replace("+", "") + " +");
            txt = pages.PageUtil.jqPage(pages.PageType.loansDetail).find("#bootbox-record-work-timeline").text();
            pages.PageUtil.jqPage(pages.PageType.loansDetail).find("#bootbox-record-work-timeline").text(txt.replace("+", "") + " +");
            var handler = $._data(pages.PageUtil.jqPage(pages.PageType.loansDetail).find("#bootbox-loans-consulting")[0], "events").click[0];
            pages.PageUtil.jqPage(pages.PageType.loansDetail).find("#bootbox-loans-consulting-timeline").click(handler);
            handler = $._data(pages.PageUtil.jqPage(pages.PageType.loansDetail).find("#bootbox-record-work")[0], "events").click[0];
            pages.PageUtil.jqPage(pages.PageType.loansDetail).find("#bootbox-record-work-timeline").click(handler);
        });
        var Ask = (function () {
            function Ask() {
            }
            Ask.update = function () {
                pages.PageUtil.jqPage(pages.PageType.loansDetail).find("#bootbox-record-work," +
                    "#bootbox-record-work-by-phone, " +
                    "#bootbox-loans-consulting").show();
                //PageUtil.jqPage(PageType.loansDetail).find("#bootbox-loans-consulting-timeline, " +
                //    "#bootbox-record-work-timeline").parent().show();
            };
            return Ask;
        })();
    })(detail = pages.detail || (pages.detail = {}));
})(pages || (pages = {}));

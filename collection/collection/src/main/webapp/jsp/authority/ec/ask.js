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
        });
        var Ask = (function () {
            function Ask() {
            }
            Ask.update = function () {
                pages.PageUtil.jqPage(pages.PageType.loansDetail).find("#bootbox-record-work," +
                    "#bootbox-record-work-by-phone, " +
                    "#bootbox-loans-consulting").show();
                pages.PageUtil.jqPage(pages.PageType.loansDetail).find("#bootbox-loans-consulting-timeline, " +
                    "#bootbox-record-work-timeline").parent().show();
            };
            return Ask;
        })();
    })(detail = pages.detail || (pages.detail = {}));
})(pages || (pages = {}));

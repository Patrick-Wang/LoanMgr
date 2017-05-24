var pages;
(function (pages) {
    var detail;
    (function (detail) {
        authority.register("/ec/answer", function () {
            route.router.register(new route.AnonymousReceiver(function (e) {
                switch (e.id) {
                    case route.MSG.EC_DETAIL_REFRESH:
                        Answer.update();
                        break;
                }
            }));
        });
        var Answer = (function () {
            function Answer() {
            }
            Answer.update = function () {
                pages.PageUtil.jqPage(pages.PageType.loansDetail).find("#bootbox-click-to-working, " +
                    "#bootbox-click-to-done, " +
                    "#bootbox-modify-repayment, " +
                    "#bootbox-modify-attachment-property").show();
                //PageUtil.jqPage(PageType.loansDetail).find("#bootbox-loans-consulting-timeline, " +
                //    "#bootbox-record-work-timeline").off("click").parent().show();
                //let txt = PageUtil.jqPage(PageType.loansDetail).find("#bootbox-loans-consulting-timeline").text();
                //PageUtil.jqPage(PageType.loansDetail).find("#bootbox-loans-consulting-timeline").text(txt.replace("+", ""));
                //txt = PageUtil.jqPage(PageType.loansDetail).find("#bootbox-record-work-timeline").text();
                //PageUtil.jqPage(PageType.loansDetail).find("#bootbox-record-work-timeline").text(txt.replace("+", ""));
            };
            return Answer;
        })();
    })(detail = pages.detail || (pages.detail = {}));
})(pages || (pages = {}));

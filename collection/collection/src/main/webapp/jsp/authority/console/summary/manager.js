var pages;
(function (pages) {
    var console;
    (function (console) {
        var EntrustedCase = collection.EntrustedCase;
        var Receiver = route.Receiver;
        authority.register("/console/summary/manager", function () {
            route.router.register(new Receiver("/console/summary", function (e) {
                switch (e.id) {
                    case route.MSG.PAGE_REFRESH:
                        if (e.data == pages.PageType.console) {
                            Manager.update();
                        }
                        break;
                }
            }));
        });
        var Manager = (function () {
            function Manager() {
            }
            Manager.update = function () {
                EntrustedCase.getManagerSummary()
                    .done(function (ms) {
                    if (ms.ljje) {
                        $("#console-status>div:eq(0)>div").eq(0)
                            .text(ms.ljje).next().text("累计委案金额");
                        if (ms.yhje) {
                            $("#console-status>div:eq(1)>div").eq(0)
                                .text(ms.ljje - ms.yhje).next().text("未完成委案金额");
                        }
                        if (ms.ljje != 0) {
                            $("#completeRate")
                                .text(parseFloat("" + (ms.yhje / ms.ljje * 100)).toFixed(1) + "%");
                        }
                    }
                    $("#console-status>div:eq(2)>div").eq(0)
                        .text(ms.ygs).next().text("员工数");
                });
            };
            return Manager;
        })();
    })(console = pages.console || (pages.console = {}));
})(pages || (pages = {}));

module pages.console {

    import Message = collection.Message;
    import AssignSummary = collection.protocol.AssignSummary;
    import EntrustedCase = collection.EntrustedCase;
    import PageUtil = pages.PageUtil;
    import Receiver = route.Receiver;
    import ManagerSummary = collection.protocol.ManagerSummary;
    authority.register("/console/summary/manager", () => {
        route.router.register(new Receiver("/console/summary", (e:route.Event)=> {
            switch (e.id) {
                case route.MSG.PAGE_REFRESH:
                    if (e.data == pages.PageType.console) {
                        Manager.update();
                    }
                    break;
            }
        }));
        route.router.broadcast(route.MSG.CONSOLE_IS_MANAGER);
        $(".header-pic").attr("src", collection.Net.BASE_URL + "/jsp/assets/img/avatars/divyia.jpg");
        $("#console-status>div:eq(0)>div").eq(0).text("--").next().text("累计委案金额");
        $("#console-status>div:eq(1)>div").eq(0).text("--").next().text("未完成委案金额");
        $("#console-status>div:eq(2)>div").eq(0).text("--").next().text("员工数");
    });

    class Manager {
        static update() {
            EntrustedCase.getManagerSummary()
                .done((ms:ManagerSummary)=> {
                    if (ms.ljje){
                        $("#console-status>div:eq(0)>div").eq(0)
                            .text(ms.ljje).next();
                        if (ms.yhje){
                            $("#console-status>div:eq(1)>div").eq(0)
                                .text(ms.ljje - ms.yhje).next();
                        }
                        if (ms.ljje != 0) {
                            $("#completeRate")
                                .text(parseFloat("" + (ms.yhje / ms.ljje * 100)).toFixed(1) + "%");
                        }
                    }
                    $("#console-status>div:eq(2)>div").eq(0)
                        .text(ms.ygs).next();
                });
        }
    }
}
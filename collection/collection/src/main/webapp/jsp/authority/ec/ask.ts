

module pages.detail {

    authority.register("/ec/ask", () => {
        route.router.register(new route.AnonymousReceiver((e:route.Event)=>{
            switch (e.id){
                case route.MSG.EC_DETAIL_REFRESH:
                    Ask.update();
                    break;
            }
        }));
    });

    class Ask {
        static update() {
            PageUtil.jqPage(PageType.loansDetail).find(
                "#bootbox-record-work," +
                "#bootbox-record-work-by-phone, " +
                "#bootbox-loans-consulting").show();
            PageUtil.jqPage(PageType.loansDetail).find("#bootbox-loans-consulting-timeline, " +
                "#bootbox-record-work-timeline").parent().show();
        }
    }
}
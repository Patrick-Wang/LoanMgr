

module pages.detail {

    authority.register("/ec/ask", () => {
        route.router.register(new route.AnonymousReceiver((e:route.Event)=>{
            switch (e.id){
                case route.MSG.EC_DETAIL_REFRESH:
                    Ask.update();
                    break;
            }
        }));
        let txt = PageUtil.jqPage(PageType.loansDetail).find("#bootbox-loans-consulting-timeline").text();
        PageUtil.jqPage(PageType.loansDetail).find("#bootbox-loans-consulting-timeline").text(txt.replace("+", "") + " +");
        txt = PageUtil.jqPage(PageType.loansDetail).find("#bootbox-record-work-timeline").text();
        PageUtil.jqPage(PageType.loansDetail).find("#bootbox-record-work-timeline").text(txt.replace("+", "") + " +");
        let handler = $._data(pages.PageUtil.jqPage(pages.PageType.loansDetail).find("#bootbox-loans-consulting")[0], "events").click[0];
        PageUtil.jqPage(PageType.loansDetail).find("#bootbox-loans-consulting-timeline").click(handler);
        handler = $._data(pages.PageUtil.jqPage(pages.PageType.loansDetail).find("#bootbox-record-work")[0], "events").click[0];
        PageUtil.jqPage(PageType.loansDetail).find("#bootbox-record-work-timeline").click(handler);
    });

    class Ask {
        static update() {
            PageUtil.jqPage(PageType.loansDetail).find(
                "#bootbox-record-work," +
                "#bootbox-record-work-by-phone, " +
                "#bootbox-loans-consulting").show();
            //PageUtil.jqPage(PageType.loansDetail).find("#bootbox-loans-consulting-timeline, " +
            //    "#bootbox-record-work-timeline").parent().show();
        }
    }
}
module pages.detail {

    authority.register("/ec/answer", () => {
        route.router.register(new route.AnonymousReceiver((e:route.Event)=>{
            switch (e.id){
                case route.MSG.EC_DETAIL_REFRESH:
                    Answer.update();
                    break;
            }
        }));
    });

    class Answer {
        static update() {
            PageUtil.jqPage(PageType.loansDetail).find("#bootbox-click-to-working, " +
                "#bootbox-click-to-done, " +
                "#bootbox-modify-repayment, " +
                "#bootbox-modify-attachment-property").show();

            //PageUtil.jqPage(PageType.loansDetail).find("#bootbox-loans-consulting-timeline, " +
            //    "#bootbox-record-work-timeline").off("click").parent().show();
            //let txt = PageUtil.jqPage(PageType.loansDetail).find("#bootbox-loans-consulting-timeline").text();
            //PageUtil.jqPage(PageType.loansDetail).find("#bootbox-loans-consulting-timeline").text(txt.replace("+", ""));
            //txt = PageUtil.jqPage(PageType.loansDetail).find("#bootbox-record-work-timeline").text();
            //PageUtil.jqPage(PageType.loansDetail).find("#bootbox-record-work-timeline").text(txt.replace("+", ""));
        }
    }
}
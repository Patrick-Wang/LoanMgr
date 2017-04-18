authority.register("/console/summary/assigner", function() {
    function update(){
        $("#console-status>div:eq(0)>div").eq(0)
            .text("manager").next().text("已接受委案");
        $("#console-status>div:eq(1)>div").eq(0)
            .text("manager").next().text("未完成委案");

        Message.getUnreadMessages()
            .done(function(messages){
            $("#console-status>div:eq(2)>div").eq(0)
                .text(messages.length).next().text("未回复委案咨询");
        });
    }
    route.router.register({
        getAddr : function(){
            return "/console/summary"
        },
        onEvent: function(e){
            switch (e.id){
                case pages.Console.ON_PANEL_REFRESH:
                    update();
                    break;
            }
        }
    });
});
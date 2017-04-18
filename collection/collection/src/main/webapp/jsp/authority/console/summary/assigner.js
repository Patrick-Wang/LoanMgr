authority.register("/console/summary/assigner", function() {
    function update(){
        $("#console-status>div:eq(0)>div").eq(0)
            .text("manager").next().text("manager text");
        $("#console-status>div:eq(1)>div").eq(0)
            .text("manager").next().text("manager text");
        $("#console-status>div:eq(2)>div").eq(0)
            .text("manager").next().text("manager text");
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
authority.register("/console/summary/owner", function () {
    $("#console-status>div:eq(0)>div").children().eq(0)
        .text("manager").next().text("manager text");
    $("#console-status>div:eq(1)>div").children().eq(0)
        .text("manager").next().text("manager text");
    $("#console-status>div:eq(2)>div").children().eq(0)
        .text("manager").next().text("manager text");
});

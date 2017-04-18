authority.register("/nav/tips/missed_call", function() {
    $("#accountarea").children(":first").before(ReactDOMServer.renderToStaticMarkup(
        React.createElement("li", null, 
            React.createElement("a", {className: " dropdown-toggle", "data-toggle": "dropdown", title: "Notifications", href: "#"}, 
                React.createElement("i", {className: "icon fa fa-warning red"}), 
                React.createElement("span", {id: "navCallCount", className: "badge"}, "0")
            ), 
            React.createElement("ul", {id: "navCallDetail", className: "pull-right dropdown-menu dropdown-arrow dropdown-notifications"}, 
                React.createElement("li", {className: "dropdown-footer "}, 
                    React.createElement("div", {id: "navCallCenter"}, 
			                        "前往呼叫中心"
                    )
                )
            )
        )
    ));
    navbar.NavBar.openCallTips();
});

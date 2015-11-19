var koa = require("koa");
var serve = require("koa-static");
// var route = require("koa-route");
// var views = require("co-views");
var app = koa();

// var render = views("");
app.use(serve("public/"));

// app.use(route.get("/", function*() {
// 	this.redirect("index.html");
// }));

app.listen(3000);

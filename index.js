const express = require("express");
const path = require("path");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// We have set the app to listen to PORT 3001 in the package,json file
const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);

module.exports = app;

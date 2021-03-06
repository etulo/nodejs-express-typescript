import {Request, Response} from "express";

import {heroRouter} from "./routes/heroes";
import {indexRouter} from "./routes/index";

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "static/views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "static")));

app.use("/", indexRouter);
app.use("/heroes", heroRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: Function) => {
  var err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err: any, req: Request, res: Response, next: Function) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err: any, req: Request, res: Response, next: Function) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});


module.exports = app;
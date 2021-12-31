"use strict";
var name = "World!";
(function () {
  console.log(name);
  if (typeof name === "undefined") {
    var name = "Jack";
    console.log("Goodbye " + name);
  } else {
    console.log("Hello " + name);
  }
})();

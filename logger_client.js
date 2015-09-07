logger = (function(c) {
  "use strict";
  var m = {
    log: function(a, t) {
      if(!c) {
        return;
        /* return or call your custom function here */
      }
      var l = c.log,
        f = t === undefined ? l : (this.__dict__[t] || l);
      f.apply(c, a)
    },
    __dict__: {
      "trace": c.trace,
      "debug": c.debug,
      "info": c.info,
      "warn": c.warn,
      "error": c.error
    }
  };

  return {
    trace: function() {
      m.log(arguments, "trace");
    },
    debug: function() {
      m.log(arguments, "debug");
    },
    info: function() {
      m.log(arguments, "info");
    },
    warn: function() {
      m.log(arguments, "warn");
    },
    error: function() {
      m.log(arguments, "error");
    },
    log: function() {
      m.log(arguments, undefined);
    }
  };
}(window.console));

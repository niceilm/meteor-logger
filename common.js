Logger = {
  $LogProvider: $LogProvider
};


function $LogProvider(consoleParent, ColorType) {
  var debug = true,
    self = this;

  /**
   * @ngdoc method
   * @name $logProvider#debugEnabled
   * @description
   * @param {boolean=} flag enable or disable debug level messages
   * @returns {*} current value if used as getter or itself (chaining) if used as setter
   */
  this.debugEnabled = function(flag) {
    if(typeof flag !== 'undefined') {
      debug = flag;
      return this;
    } else {
      return debug;
    }
  };

  this.$get = function() {
    return {
      /**
       * @ngdoc method
       * @name $log#log
       *
       * @description
       * Write a log message
       */
      log: consoleLog('log'),

      /**
       * @ngdoc method
       * @name $log#info
       *
       * @description
       * Write an information message
       */
      info: consoleLog('info'),

      /**
       * @ngdoc method
       * @name $log#warn
       *
       * @description
       * Write a warning message
       */
      warn: consoleLog('warn'),

      /**
       * @ngdoc method
       * @name $log#error
       *
       * @description
       * Write an error message
       */
      error: consoleLog('error'),

      /**
       * @ngdoc method
       * @name $log#debug
       *
       * @description
       * Write a debug message
       */
      debug: (function() {
        var fn = consoleLog('debug');

        return function() {
          if(debug) {
            fn.apply(self, arguments);
          }
        };
      }())
    };

    function formatError(arg) {
      if(arg instanceof Error) {
        if(arg.stack) {
          arg = (arg.message && arg.stack.indexOf(arg.message) === -1)
            ? 'Error: ' + arg.message + '\n' + arg.stack
            : arg.stack;
        } else if(arg.sourceURL) {
          arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
        }
      }
      return arg;
    }

    function noop() {
    }

    function consoleLog(type) {
      var console = consoleParent.console,
        logFn = console[type] || console.log || noop,
        hasApply = false,
        preColor = ColorType ? (ColorType[type] || ColorType.reset) : "",
        resetColor = ColorType ? ColorType.reset : "";


      // Note: reading logFn.apply throws an error in IE11 in IE8 document mode.
      // The reason behind this is that console.log has type "object" in IE8...
      try {
        hasApply = !!logFn.apply;
      } catch(e) {
      }

      if(hasApply) {
        return function() {
          var args = [];
          args.push(preColor);
          for(var i = 0, len = arguments.length; i < len; i++) {
            var arg = arguments[i];
            arg = formatError(arg);
            arg = Meteor.isServer && typeof arg === "object" ? Npm.require("util").inspect(arg, {depth:5}) : arg;
            args.push(arg);
          }
          args.push(resetColor);
          return logFn.apply(console, args);
        };
      }

      // we are IE which either doesn't have window.console => this is noop and we do nothing,
      // or we are IE where console.log doesn't have apply so we log at least first 2 args
      return function(arg1, arg2) {
        logFn(arg1, arg2 == null ? '' : arg2);
      };
    }
  };
}

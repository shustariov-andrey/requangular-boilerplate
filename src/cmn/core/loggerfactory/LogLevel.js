define(function() {
   'use strict';

   return {
      TRACE : {key : 'trace', value : 500000,           label : 'TRACE'},
      DEBUG : {key : 'debug', value : 400000,           label : 'DEBUG'},
      INFO  : {key : 'info',  value : 300000,           label : 'INFO '},
      WARN  : {key : 'warn',  value : 200000,           label : 'WARN '},
      ERROR : {key : 'error', value : 100000, label : 'ERROR'},
      DISABLED : {key : 'disabled', value : Number.MIN_VALUE, label : 'DISABLED'}
   };
});
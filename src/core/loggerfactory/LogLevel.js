define(function() {
   'use strict';

   return {
      ALL   : {key : 'all',   value : Number.MAX_VALUE, label : 'TRACE'},
      TRACE : {key : 'trace', value : 400000,           label : 'TRACE'},
      DEBUG : {key : 'debug', value : 300000,           label : 'DEBUG'},
      INFO  : {key : 'info',  value : 200000,           label : 'INFO '},
      WARN  : {key : 'warn',  value : 100000,           label : 'WARN '},
      ERROR : {key : 'error', value : Number.MIN_VALUE, label : 'ERROR'}
   };
});
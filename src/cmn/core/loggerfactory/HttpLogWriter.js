define([
   'src/cmn/core/config/module'
], function(Config) {
   'use strict';
   var buffer = [], sendInterval = 4000;

   function send(url, data, callback) {
      var xhr = new XMLHttpRequest();

      xhr.open('POST', url, true);

      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = function() {
         if (xhr.readyState === 4) {
            callback(xhr.status);
         }
      };

      xhr.send(data);
   }

   setInterval(function() {
      var length = buffer.length;
      if (length) {
         send(Config.getConfig('Core.LogServerUrl'), buffer, function() {
            buffer.splice(0, length);
         });
      }
   }, sendInterval);

   return {
      write : function(logLevel, messages) {
         buffer.push({level : logLevel, messages : messages});
      }
   };
});
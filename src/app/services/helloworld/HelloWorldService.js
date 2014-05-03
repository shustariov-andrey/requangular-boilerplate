define([
   'module',
   'src/cmn/core/servicefactory/module'
], function(module, ServiceFactory) {
   'use strict';

   ServiceFactory.register(module.id, [function() {
      this.getMessage = function()
      {
         this.logger.debug('calling getMessage()');
         return 'Hello, World';
      };
   }]);
});
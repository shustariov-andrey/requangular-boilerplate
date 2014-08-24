define([
   'module',
   'angular-mocks',
   'Squire'
], function(module, angular, Squire) {
   'use strict';

   describe(module.id, function () {

      var injector = new Squire('squire'), ServiceFactoryAugmenterManager, ServiceFactory, ForTestAugmenter, ForTestAugmenter1, deps = [
         'src/cmn/core/servicefactory/module',
         'src/cmn/core/servicefactoryaugmentermanager/module'
      ];

      beforeEach(injector.run(deps, function (_ServiceFactory, _ServiceFactoryAugmenterManager) {
            ServiceFactoryAugmenterManager = _ServiceFactoryAugmenterManager;
            ServiceFactory = _ServiceFactory;
         }
      ));

      afterEach(function () {
         injector.clean(deps);
      });

      beforeEach(angular.mock.module('ngModule'));

      beforeEach(function() {
         ServiceFactoryAugmenterManager.register('TestAugmenter', function($delegate) {
            $delegate.TestAugmenter = 'TestAugmenter';
            return $delegate;
         });

         ServiceFactory.register('ForTestAugmenter', [function() {
         }], ['TestAugmenter']);
      });

      beforeEach(angular.mock.inject(function(_ForTestAugmenter_) {
         ForTestAugmenter = _ForTestAugmenter_;
      }));

      afterEach(function() {
         ServiceFactoryAugmenterManager.clean();
      });

      it('should be augmented by TestAugmenter', function() {
         expect(ForTestAugmenter.TestAugmenter).toEqual('TestAugmenter');
      });

      it('should throw if augmenter is not a function', function() {
         function f() {
            ServiceFactoryAugmenterManager.register('TestAugmenter1', {
               TestAugmenter1: 'TestAugmenter1'
            });
         }
         expect(f).toThrow();
      });
   });
});
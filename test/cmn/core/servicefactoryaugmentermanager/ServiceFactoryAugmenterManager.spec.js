define([
   'module',
   'angular-mocks',
   'Squire'
], function(module, angular, Squire) {
   'use strict';
   /*global describe : false, beforeEach : false, afterEach : false, it : false, expect : false*/

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

         ServiceFactoryAugmenterManager.register('TestAugmenter1', function($delegate) {
            $delegate.TestAugmenter1 = 'TestAugmenter1';
            return $delegate;
         }, function($delegate) {
            return $delegate.canonicalModuleId.indexOf('ForTestAugmenter1') !== -1;
         });

         ServiceFactory.register('ForTestAugmenter1', [function() {
         }]);

         ServiceFactory.register('ForTestAugmenter', [function() {
         }]);
      });

      beforeEach(angular.mock.inject(function(_ForTestAugmenter1_, _ForTestAugmenter_) {
         ForTestAugmenter1 = _ForTestAugmenter1_;
         ForTestAugmenter = _ForTestAugmenter_;
      }));

      afterEach(function() {
         ServiceFactoryAugmenterManager.clean();
      });

      it('should be augmented by TestAugmenter', function() {
         expect(ForTestAugmenter1.TestAugmenter).toEqual('TestAugmenter');
         expect(ForTestAugmenter.TestAugmenter).toEqual('TestAugmenter');
      });

      it('should be augmented by TestAugmenter1', function() {
         expect(ForTestAugmenter1.TestAugmenter1).toEqual('TestAugmenter1');
         expect(ForTestAugmenter.TestAugmenter1).toBeUndefined();
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
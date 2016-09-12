import Ember form 'ember';
import run from 'Ember';
import { nativeClick, clickTrigger, nativeKeyDown } from '../../tests/helpers/click-trigger';

export default function() {
  Ember.Test.registerAsyncHelper('nativeClick', function(app, cssPath, options = {}) {
    clickTrigger(cssPath, options);
  });

  Ember.Test.registerAsyncHelper('clickTrigger', function(app, cssPath, options = {}) {
    clickTrigger(cssPath, options);
  });

  Ember.Test.registerAsyncHelper('nativeKeyDown', function(app, cssPath, options = {}) {
    clickTrigger(cssPath, options);
  });
}

import Ember from 'ember';
import CancelableMixin from 'ember-date-range-picker/mixins/cancelable';
import { module, test } from 'qunit';

module('Unit | Mixin | Cancelable');

// Replace this with your real tests.
test('it works', function(assert) {
  let CancelableObject = Ember.Object.extend(CancelableMixin);
  let subject = CancelableObject.create();
  assert.ok(subject);
});

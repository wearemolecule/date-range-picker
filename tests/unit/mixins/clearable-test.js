import Ember from 'ember';
import ClearableMixin from 'date-range-picker/mixins/clearable';
import { module, test } from 'qunit';

module('Unit | Mixin | clearable');

// Replace this with your real tests.
test('it works', function(assert) {
  let ClearableObject = Ember.Object.extend(ClearableMixin);
  let subject = ClearableObject.create();
  assert.ok(subject);
});

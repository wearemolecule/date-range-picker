import Ember from 'ember';
import ClickOutsideMixin from 'date-range-picker/mixins/click-outside';
import { module, test } from 'qunit';

module('Unit | Mixin | click outside');

// Replace this with your real tests.
test('it works', function(assert) {
  let ClickOutsideObject = Ember.Object.extend(ClickOutsideMixin);
  let subject = ClickOutsideObject.create();
  assert.ok(subject);
});

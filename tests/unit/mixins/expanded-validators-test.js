import Ember from 'ember';
import ExpandedValidatorsMixin from 'ember-date-range-picker/mixins/expanded-validators';
import { module, test } from 'qunit';

module('Unit | Mixin | expanded validators');

// Replace this with your real tests.
test('it works', function(assert) {
  let ExpandedValidatorsObject = Ember.Object.extend(ExpandedValidatorsMixin);
  let subject = ExpandedValidatorsObject.create();
  assert.ok(subject);
});

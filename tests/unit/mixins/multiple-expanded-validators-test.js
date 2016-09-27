import Ember from 'ember';
import MultipleExpandedValidatorsMixin from 'ember-date-range-picker/mixins/multiple-expanded-validators';
import { module, test } from 'qunit';

module('Unit | Mixin | multiple expanded validators');

// Replace this with your real tests.
test('it works', function(assert) {
  let MultipleExpandedValidatorsObject = Ember.Object.extend(MultipleExpandedValidatorsMixin);
  let subject = MultipleExpandedValidatorsObject.create();
  assert.ok(subject);
});

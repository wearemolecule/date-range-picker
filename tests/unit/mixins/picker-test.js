import Ember from 'ember';
import PickerMixin from 'date-range-picker/mixins/picker';
import { module, test } from 'qunit';

module('Unit | Mixin | picker');

const PickerObject = Ember.Object.extend(PickerMixin);

test('it works', function(assert) {
  let subject = PickerObject.create();
  assert.ok(subject);
});

test('converts strings to moments', function(assert) {
  let dateString = '01/02/3015';

  let subject = PickerObject.create({
    startDate: dateString,
    endDate: dateString,
  });

  assert.equal(subject.get('startDate._isAMomentObject'), true, 'startDate is converted to a moment.');
  assert.equal(subject.get('endDate._isAMomentObject'), true, 'endDate is converted to a moment.');
});

test('actions - toggleIsExpanded', function(assert) {
  let PickerController = Ember.Controller.extend(PickerMixin);

  let subject = PickerController.create({
    isExpanded: true,
  });

  subject.send('toggleIsExpanded');

  assert.equal(subject.get('isExpanded'), false, 'isExpanded is toggled to become false.');
});

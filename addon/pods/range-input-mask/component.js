import OneWayInputMask from 'ember-inputmask/components/one-way-input-mask';

export default OneWayInputMask.extend({
  // Default options
  greedyMask:                false,
  skipOptionalPartCharacter: "-",
  clearIncomplete:           true,

  updateMask: function() {
    this.setProperties({
      'options.skipOptionalPartCharacter': this.get('skipOptionalPartCharacter'),
    });

    this._super();
  },
});

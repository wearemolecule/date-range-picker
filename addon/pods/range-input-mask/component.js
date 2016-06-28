import InputMask from 'ember-inputmask/components/input-mask';

export default InputMask.extend({
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

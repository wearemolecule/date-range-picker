import moment from 'moment';

export default Ember.Mixin.create({
  safeIsSame(first, second) {
    let one = this.get(first);
    let two = this.get(second);
    if (!one || !two) {
      return false;
    }

    return one.isSame(two, 'day');
  },

  safeClone(date, defaultCloneValue = null) {
    if (!this.get(date)) {
      return defaultCloneValue;
    }
    return this.get(date).clone();
  },
});

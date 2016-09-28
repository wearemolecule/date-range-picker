import Ember from 'ember';
import moment from 'moment';
import SafeMoment from 'date-range-picker/mixins/safe-moment';

const { computed, run } = Ember;

export default Ember.Mixin.create(SafeMoment, {
  resetInitialValues() {
    this.setProperties({
      initialStartDate: this.safeClone('startDate'),
      initialEndDate: this.safeClone('endDate'),
      initialStartMonth: this.safeClone('startMonth', moment().startOf('month')),
      initialEndMonth: this.safeClone('endMonth', moment().startOf('month'))
    });

    run.next(this, () => {
      this.notifyPropertyChange('initialStartDate');
      this.notifyPropertyChange('initialStartMonth');
      this.notifyPropertyChange('initialEndDate');
      this.notifyPropertyChange('initialEndMonth');
    });
  },

  datesSame: computed('startDate', 'endDate', 'startMonth', 'endMonth', 'initialStartDate', 'initialEndDate', 'initialStartMonth', 'initialEndMonth', function() {
    return this.safeIsSame('startDate', 'initialStartDate') &&
      this.safeIsSame('endDate', 'initialEndDate') &&
      this.safeIsSame('startMonth', 'initialStartMonth') &&
      this.safeIsSame('endMonth', 'initialEndMonth');
  }),

  actions: {
    reset() {
      this.setProperties({
        startDate: this.safeClone('initialStartDate'),
        endDate: this.safeClone('initialEndDate'),
        startMonth: this.safeClone('initialStartMonth', moment().startOf('month')),
        endMonth: this.safeClone('initialEndMonth', moment().startOf('month')),
      });
    },

    cancel() {
      this.send('reset');
      let dropdown = this.get('dropdownController');
      if (dropdown) {
        dropdown.actions.close(null, false);
      }
      this.sendAction('cancel');
    },
  }
});

import Ember from 'ember';

const { computed, run } = Ember;

export default Ember.Mixin.create({
  resetInitialValues() {
    let {
      startDate,
      endDate,
      startMonth,
      endMonth
    } = this.getProperties('startDate', 'endDate', 'startMonth', 'endMonth');

    this.setProperties({
      initialStartDate: startDate.clone(),
      initialEndDate: this.safeClone('endDate'),
      initialStartMonth: startMonth.clone(),
      initialEndMonth: endMonth.clone()
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

  safeIsSame(first, second) {
    if (!this.get(first) || !this.get(second)) {
      return false;
    }

    return this.get(first).isSame(this.get(second));
  },

  safeClone(date) {
    if (!this.get(date)) {
      return null;
    }
    return this.get(date).clone();
  },

  actions: {
    reset() {
      this.setProperties({
        startDate: this.get('initialStartDate').clone(),
        endDate: this.safeClone('initialEndDate'),
        startMonth: this.get('initialStartMonth').clone(),
        endMonth: this.get('initialEndMonth').clone(),
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

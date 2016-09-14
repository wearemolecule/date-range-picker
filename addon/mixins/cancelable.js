import Ember from 'ember';

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
      initialEndDate: endDate.clone(),
      initialStartMonth: startMonth.clone(),
      initialEndMonth: endMonth.clone()
    });

    Ember.run.next(this, () => {
      this.notifyPropertyChange('initialStartDate');
      this.notifyPropertyChange('initialStartMonth');
      this.notifyPropertyChange('initialEndDate');
      this.notifyPropertyChange('initialEndMonth');
    });
  },

  init() {
    this._super(...arguments);
    this.resetInitialValues();
  },

  datesSame: Ember.computed('startDate', 'endDate', 'startMonth', 'endMonth', 'initialStartDate', 'initialEndDate', 'initialStartMonth', 'initialEndMonth', function() {
    return this.get('startDate').isSame(this.get('initialStartDate')) &&
           this.get('endDate').isSame(this.get('initialEndDate')) &&
           this.get('startMonth').isSame(this.get('initialStartMonth')) &&
           this.get('endMonth').isSame(this.get('initialEndMonth'));
  }),

  actions: {
    reset() {
      this.setProperties({
        startDate: this.get('initialStartDate').clone(),
        endDate: this.get('initialEndDate').clone(),
        startMonth: this.get('initialStartMonth').clone(),
        endMonth: this.get('initialEndMonth').clone(),
      });
    },

    cancel() {
      this.send('reset');
      let dropdown = this.get('dropdownController');
      if (dropdown) {
        dropdown.actions.close();
      }
      this.sendAction('cancel');
    },
  }
});

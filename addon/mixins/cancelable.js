import Ember from 'ember';

export default Ember.Mixin.create({
  didInsertElement() {
    let {
      startDate,
      endDate,
      startMonth,
      endMonth
    } = this.getProperties('startDate', 'endDate', 'startMonth', 'endMonth');

    this.setProperties({
      initialStartDate: startDate,
      initialEndDate: endDate,
      initialStartMonth: startMonth,
      initialEndMonth: endMonth
    });

    Ember.run.next(this, () => {
      this.notifyPropertyChange('startDate');
      this.notifyPropertyChange('endDate');
      this.notifyPropertyChange('startMonth');
      this.notifyPropertyChange('endMonth');
    });
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
        startDate: this.get('initialStartDate'),
        endDate: this.get('initialEndDate'),
        startMonth: this.get('initialStartMonth'),
        endMonth: this.get('initialEndMonth'),
      });
    },

    cancel() {
      let dropdown = this.get('dropdownController');
      if (dropdown) {
        dropdown.actions.close();
      }
      this.send('reset');
      this.sendAction('cancel');
    },
  }
});

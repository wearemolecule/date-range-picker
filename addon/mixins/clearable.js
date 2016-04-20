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
  },

  actions: {
    clear() {
      this.setProperties({
        startDate: this.get('initialStartDate'),
        endDate: this.get('initialEndDate'),
        startMonth: this.get('initialStartMonth'),
        endMonth: this.get('initialEndMonth'),
      });
    },
  }
});

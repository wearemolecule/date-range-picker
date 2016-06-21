import Ember from 'ember';
import moment from 'moment';

export default Ember.Mixin.create({
  dateFormat: "MM/DD/YYYY",

  actions: {
    apply() {
      this.send('toggleIsExpanded');
      this.sendAction('apply');
    },

    cancel() {
      this.send('toggleIsExpanded');
      this.sendAction('cancel');
    },

    parseInput() {
      let [ start, end ] = this.get('rangeFormatted').split('-');
      let startMoment = moment(start, this.get('dateFormat'));
      let endMoment = moment(end, this.get('dateFormat'));

      if(startMoment.isValid() || endMoment.isValid()) {
        if(!endMoment.isValid()) {
          endMoment = startMoment.clone();
        }

        if(!startMoment.isValid()) {
          startMoment = endMoment.clone();
        }

        this.setProperties({
          startDate: startMoment,
          endDate: endMoment,
          startMonth: startMoment.clone(),
          endMonth: endMoment.clone(),
        });
      }
    },
  }
});

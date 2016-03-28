/* jshint node: true */
'use strict';

module.exports = {
  name: 'date-range-picker',
  included: function(app) {
    app.import(app.bowerDirectory + '/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js');
    this._super.included(app);
  }
};

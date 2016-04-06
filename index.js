/* jshint node: true */
'use strict';

module.exports = {
  name: 'date-range-picker',
  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js');
  }
};

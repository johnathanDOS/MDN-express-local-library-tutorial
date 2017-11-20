var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  var birthday = this.date_of_birth ? moment(this.date_of_birth).format('MM/DD/YYYY') : '';
  var deathday = this.date_of_death ? moment(this.date_of_death).format('MM/DD/YYYY') : 'present';
  return birthday != '' ? birthday + ' - ' + deathday : 'unknown'
})

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
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

AuthorSchema
.virtual('url')
.get(function () {
    return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);


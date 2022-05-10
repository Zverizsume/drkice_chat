const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    },
    nick: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  }
}, { timestamps: true });

userSchema.virtual('fullName')
  .get(function(){
    return `${this.name.first} ${this.name.last}`;
  });

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

module.exports = mongoose.model('User', userSchema);
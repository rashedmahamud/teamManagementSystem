const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    salt: String,
    phone: String,
    team: [
        {
          teamMember: {
            _id:{type:String, require:true},
            name:{type:String},
           },
        }
    ],
  
   
},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports =  mongoose.model('user', UserSchema);
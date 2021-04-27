import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('User',userSchema);

export default User;
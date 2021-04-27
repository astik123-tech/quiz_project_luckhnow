import mongoose from 'mongoose';
const feedbackSchema = mongoose.Schema({
    comment:{
        type:String
    },
    _id:{
        type:String
    },
    userName:{
        type:String
    }
},{
    timestamps:true
})


const feedback = mongoose.model('feedback',feedbackSchema);

export default feedback;
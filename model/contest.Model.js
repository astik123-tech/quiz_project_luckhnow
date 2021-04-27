import mongoose from 'mongoose';
const contestSchema = mongoose.Schema({
    contestkey:{
        type:String
    },
    contestName:{
        type:String
    }
},{
    timestamps:true
})

const contest = mongoose.model('contest',contestSchema);

export default contest;
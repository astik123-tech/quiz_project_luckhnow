import mongoose from 'mongoose';
const ScheduleQuizSchema = mongoose.Schema({
    contentKey:{
        type:String,
        required:true,
    },
    _userId:{
        type:String
    },
    author_Name:{
        type:String,
    },
    duration:{
        type:String,
    },
    date:{
        type:Number
    },
    time:{
        type:Number
    },
    number_of_questoin:{
        type:String
    },
    contest_name:{
        type:String
    }
},{
    timestamps:true
})


const ScheduleQuiz = mongoose.model('ScheduleQuiz',ScheduleQuizSchema);

export default ScheduleQuiz;
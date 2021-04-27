import mongoose from 'mongoose';
const quizResultSchema = mongoose.Schema({ 
    user:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    questions:{
        type:Array
    },
    contestKey:{
        type:String
    },
    totalMarks:{
        type:Number
    }
},{
    timestamps:true
})


const quizResult = mongoose.model('quizResult',quizResultSchema);

export default quizResult;
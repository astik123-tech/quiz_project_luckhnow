import mongoose from 'mongoose';
const QuestionSchema = mongoose.Schema({
    question:{
        type:String
    },
    optionOne:{
        type:String
    },
    optionTwo:{
        type:String
    },
    optionThree:{
        type:String
    },
    optionFour:{
        type:String
    },
    CorrectAnswer:{
        type:String
    },
    explanation:{
        type:String
    }
},{
    timestamps:true
})


const Question = mongoose.model('Question',QuestionSchema);

export default Question;
import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constant/collections";
import { BaseModel } from "../../base.model";
import { User } from "../../user/user.model";
import { Question } from "../question/question.model";
import { Test } from "../test.model";


@modelOptions({
    schemaOptions : {
        collection : Collections.SOLVETEST
    }
})

export class SolveTest extends BaseModel{
    @prop({
        required:true,
        ref : Collections.USER,
        type:Types.ObjectId
    })
    userId:Ref<User>;

    @prop({
        required:true,
        ref : Collections.TEST,
        type:Types.ObjectId
    })
    testId:Ref<Test>;
    
    @prop({
        required:true,
        ref : Collections.QUESTION,
        type:Types.ObjectId
    })
    questionId:Ref<Question>;
    
    @prop({
        required:true,
        type:Types.ObjectId
    })
    answerId:string;
    
}

export const SolveTestModel = getModelForClass(SolveTest);
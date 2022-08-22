import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constant/collections";
import { BaseModel } from "../../base.model";
import { Test } from "../test.model";

@modelOptions({
    schemaOptions:{
        collection: Collections.QUESTION
    }
})


class Answer {
    @prop({
        required : true,
        trim:true
    })
    title:string

    @prop({default:false})
    isCorrect: boolean
}


export class Question extends BaseModel{
    @prop({
        required:true,
        trim: true
    })
    title : string;

    @prop({
        required:true,
        type:Types.ObjectId,
        ref: Collections.TEST
    })
    testId: Ref<Test>

    @prop({
        type : ()=>[Answer],
        required: true
    })
    answer : Answer[]
}

export const QuestionModel = getModelForClass(Question)
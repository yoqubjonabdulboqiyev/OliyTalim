import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constant/collections";
import { BaseModel } from "../../admin/base.model";
import { Test } from "../test.model";

@modelOptions({
    schemaOptions:{
        collection: Collections.SAVOL
    }
})


class javob {
    @prop({
        required : true,
        trim:true
    })
    title:string

    @prop({default:false})
    isCorrect: boolean
}


export class Savol extends BaseModel{
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
        type : ()=>[javob],
        required: true
    })
    javob : javob[]
}

export const SavolModel = getModelForClass(Savol)
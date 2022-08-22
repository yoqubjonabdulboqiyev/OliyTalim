import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constant/collections";
import { BaseModel } from "../../base.model";
import { Class } from "../class.model";

@modelOptions({
    schemaOptions:{
        collection:Collections.SUBJECT
    }
})


export class Subject extends BaseModel{
    @prop({trim: true, required:true})
    name : string;
    @prop({
        required : true,
        type : Types.ObjectId,
        ref : Collections.CLASS
    })

    classId: Ref<Class>
}

export const SubjectModel = getModelForClass(Subject)
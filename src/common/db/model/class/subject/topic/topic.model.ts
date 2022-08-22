import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../../constant/collections";
import { Subject } from "../subject.model";
import { BaseModel } from "../../../base.model";




@modelOptions({
    schemaOptions:{
        collection:Collections.TOPIC
    }
})


export class Topic extends BaseModel{
    @prop({trim: true, required:true})
    name : string;
    @prop({
        required : true,
        type : Types.ObjectId,
        ref : Collections.SUBJECT
    })

    subjectId: Ref<Subject>
}

export const TopicModel = getModelForClass(Topic)
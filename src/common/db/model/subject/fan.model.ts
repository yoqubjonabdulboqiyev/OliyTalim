import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../constant/collections";
import { BaseModel } from "../admin/base.model";
import { Sinf } from "../sinf/sinf.model";

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
        ref : Collections.SINF
    })

    sinfId: Ref<Sinf>
}

export const SubjectModel = getModelForClass(Subject)
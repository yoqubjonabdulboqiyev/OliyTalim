import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../constant/collections";
import { Subject } from "../subject/fan.model";
import { BaseModel } from "../admin/base.model";




@modelOptions({
    schemaOptions:{
        collection:Collections.BOB
    }
})


export class Bob extends BaseModel{
    @prop({trim: true, required:true})
    name : string;
    @prop({
        required : true,
        type : Types.ObjectId,
        ref : Collections.SUBJECT
    })

    subjectId: Ref<Subject>
}

export const BobModel = getModelForClass(Bob)
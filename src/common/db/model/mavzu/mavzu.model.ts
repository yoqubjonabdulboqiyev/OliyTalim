import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../constant/collections";
import { BaseModel } from "../admin/base.model";
import { Bob } from "../bob/bob.model";




@modelOptions({
    schemaOptions:{
        collection:Collections.MAVZU
    }
})


export class Mavzu extends BaseModel{
    @prop({trim: true, required:true})
    name : string;
    @prop({
        required : true,
        type : Types.ObjectId,
        ref : Collections.BOB
    })

    bobId: Ref<Bob>
}

export const MavzuModel = getModelForClass(Mavzu)
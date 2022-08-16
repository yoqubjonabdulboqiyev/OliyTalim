import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Collections } from "../../../constant/collections";
import { BaseModel } from "../admin/base.model";

@modelOptions({
    schemaOptions:{
        collection:Collections.SINF
    }
})


export class Sinf extends BaseModel{
    @prop({trim: true, required:true, unique: true})
    name : string;
}

export const SinfModel = getModelForClass(Sinf)
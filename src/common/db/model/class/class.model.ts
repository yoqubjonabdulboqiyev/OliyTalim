import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Collections } from "../../../constant/collections";
import { BaseModel } from "../base.model";

@modelOptions({
    schemaOptions:{
        collection:Collections.CLASS
    }
})


export class Class extends BaseModel{
    @prop({trim: true, required:true, unique: true})
    name : string;
}

export const ClassModel = getModelForClass(Class)
import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../constant/collections";
import { BaseModel } from "../admin/base.model";
import { Mavzu } from "../mavzu/mavzu.model";

@modelOptions({
    schemaOptions: {
        collection:Collections.TEST
    }
})

export class Test extends BaseModel{
    @prop({
        required:true,
        trim:true
    })
    name:string;

    @prop({
        required:true,
        type: Types.ObjectId,
        ref:Collections.MAVZU
    })
    mavzuId : Ref<Mavzu>

    @prop({required:true})
    testCount : number 

    @prop({
        required:true
    })
    vaqt: number;
}

export const testModel = getModelForClass(Test)
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constant/collections";
import { BaseModel } from "../../admin/base.model";


@modelOptions({
    schemaOptions : {
        collection : Collections.YECHISH
    }
})

export class Yechish extends BaseModel{
    @prop({
        required:true,
        ref : Collections.USER,
        type:Types.ObjectId
    })
    userId:string;

    @prop({
        required:true,
        ref : Collections.TEST,
        type:Types.ObjectId
    })
    testId:string;
    
    @prop({
        required:true,
        ref : Collections.SAVOL,
        type:Types.ObjectId
    })
    savolId:string;
    
    @prop({
        required:true,
        ref : Collections.SAVOL,
        type:Types.ObjectId
    })
    javobId:string;
    
}

export const yechishModel = getModelForClass(Yechish);
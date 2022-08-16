import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constant/collections";
import { BaseModel } from "../../admin/base.model";


export enum STATUS {
    START ='start',
    FINISH = 'finish',
    PENDING = 'pending'
}

@modelOptions({
    schemaOptions : {
        collection : Collections.NATIJA
    }
})

export class Natija extends BaseModel{
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
    
    @prop({default : undefined})
    started : Date;
    
    @prop({default : undefined})
    finished : Date;
   
    @prop({default :STATUS.PENDING})
    status : STATUS

    @prop({default : 0})
    ball? : number;

    @prop({default : 0})
    count? : number
    
}

export const natijaModel = getModelForClass(Natija);
import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../constant/collections";
import { BaseModel } from "../../base.model";
import { User } from "../../user/user.model";
import { Test } from "../test.model";


export enum STATUS {
    START ='start',
    FINISH = 'finish',
    PENDING = 'pending'
}

@modelOptions({
    schemaOptions : {
        collection : Collections.RESULT
    }
})

export class Result extends BaseModel{
    @prop({
        required:true,
        ref : Collections.USER,
        type:Types.ObjectId
    })
    userId:Ref<User>;

    @prop({
        required:true,
        ref : Collections.TEST,
        type:Types.ObjectId
    })
    testId:Ref<Test>;
    
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

export const ResultModel = getModelForClass(Result);
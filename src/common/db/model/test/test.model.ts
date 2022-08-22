import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../constant/collections";
import { BaseModel } from "../base.model";
import { Class } from "../class/class.model";
import { Topic } from "../class/subject/topic/topic.model";
import { Theme } from "../class/subject/topic/theme/theme.model";
import { Subject } from "../class/subject/subject.model";

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
        ref:Collections.THEME
    })
    themeId : Ref<Theme>

    @prop({
        required:true,
        type: Types.ObjectId,
        ref:Collections.TOPIC
    })
    topicId : Ref<Topic>

    @prop({
        required:true,
        type: Types.ObjectId,
        ref:Collections.SUBJECT
    })
    subjectId : Ref<Subject>

    @prop({
        required:true,
        type: Types.ObjectId,
        ref:Collections.CLASS
    })
    classId : Ref<Class>

    @prop({required:true})
    testCount : number 

    @prop({
        required:true
    })
    duration: number;
}

export const testModel = getModelForClass(Test)
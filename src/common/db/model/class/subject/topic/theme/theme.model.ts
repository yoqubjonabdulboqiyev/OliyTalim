import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Collections } from "../../../../../../constant/collections";
import { BaseModel } from "../../../../base.model";
import { Topic } from "../topic.model";




@modelOptions({
    schemaOptions:{
        collection:Collections.THEME
    }
})


export class Theme extends BaseModel{
    @prop({trim: true, required:true})
    name : string;
    @prop({
        required : true,
        type : Types.ObjectId,
        ref : Collections.TOPIC
    })

    topicId: Ref<Topic>
}

export const ThemeModel = getModelForClass(Theme)
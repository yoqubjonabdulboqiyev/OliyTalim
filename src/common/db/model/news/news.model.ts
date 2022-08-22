import { prop, modelOptions, index, getModelForClass } from "@typegoose/typegoose";
import { Collections } from "../../../constant/collections";
import { BaseModel } from "../base.model";

export enum ContentType {
    TEXT = 'text',
    VIDEO = 'video',
    IMAGE = 'img',
    LIST = 'list',
    LINK = 'link'
}
export enum Alignment {
    START = 'left',
    END = 'right',
    CENTER = 'center'
}
export enum ListIndicator {
    DOT = 'dot',
    NUMBER = 'number'
}


export class ContentData{
    @prop({
        default: undefined
    })
    newLine: boolean;

    @prop({
        enum: ContentType,
        type: String
    })
    type: ContentType;

    @prop({
        default: undefined
    })
    bold: boolean;

    @prop({
        default: undefined
    })
    underline: boolean;

    @prop({
        default: undefined
    })
    italic: boolean;

    @prop({
        default: undefined
    })
    strikethrough: boolean;

    @prop({
        default: undefined,
        trim: true
    })
    value: string;

    @prop({
        default: 14
    })
    size: number;

    @prop({
        enum: Alignment,
        type: String
    })
    align: Alignment;

    @prop({
        default: undefined
    })
    sup: boolean;

    @prop({
        default: undefined
    })
    sub: boolean;

    @prop({
        default: undefined,
        trim: true
    })
    href: string;

    @prop({
        default: undefined
    })
    items: any[];

    @prop({
        default: undefined,
        type: String,
        enum: ListIndicator
    })
    listIndicator: ListIndicator
}

@modelOptions({
    schemaOptions: {
        collection: Collections.NEWS
    }
})

@index({
    title: 1
},
    {
        unique: true,
        name: "name",
        background: true,
        partialFilterExpression: {
            isDeleted: {
                $eq: false
            }
        }
    }
)

export class News extends BaseModel{
    @prop({ required: true })
    imgUrl: string

    @prop({ required: true, trim: true })
    title: string

    @prop({
        required: true,
        type: ()=> [ContentData]
    })
    content: ContentData[]

    @prop({default: 0})
    viewCount?: number
}

export const NewsModel = getModelForClass(News)
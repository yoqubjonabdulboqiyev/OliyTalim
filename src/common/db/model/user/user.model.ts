import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { Collections } from "../../../constant/collections";
import { BaseModel } from "../admin/base.model";

export enum Gender{
    AYOL = 'ayol',
    Erkak = 'erkak'
}


@modelOptions({
    schemaOptions: {
        collection: Collections.USER
    }
})

@index({
    phoneNumber: 1
}, {
    name: 'phoneNumber',
    background: true,
    partialFilterExpression: {
        isDeleted: false,
        $type: 'boolean'
    }
})

export class User extends BaseModel {
    @prop({
        required: true,
        trim: true
    })
    ism: string;

    @prop({ required: true, trim: true })
    familya: string;

    @prop({
        required: true,
        trim: true
    })
    viloyat: string;

    @prop({
        enum: Gender,
        type: String,
        default: Gender.Erkak,
    })
    gender : Gender;
    @prop({
        required: true,
        trim: true,
        unique:true
    })
    
    phoneNumber: string;

    @prop({})
    password: number;

}

export const UserModel = getModelForClass(User)
import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { Collections } from "../../../../constant/collections";
import { BaseModel } from "../../base.model";




@modelOptions({
    schemaOptions: {
        collection: Collections.ROLE
    }
})

@index(
    {
        name: 1
    },
    {
        unique: true,
        background: true,
        name: 'name',
        partialFilterExpression: { isDeleted: { $eq: false } }
    },
)

@index(
    {
        isDeleted: 1,
    },
    {
        background: true,
        name: 'deleted',
        partialFilterExpression: { isDeleted: { $eq: false } }
    }

)

export class Role extends BaseModel {
    @prop({
        trim: true,
        required: true,
    })
    name: string;

    @prop({
        default: true
    })
    subject: boolean;

    @prop({
        default: true
    })
    subjectCreate: boolean;

    @prop({
        default: true
    })
    subjectUpdate: boolean;

    @prop({
        default: true
    })
    subjectDelete: boolean;

    @prop({
        default: true
    })
    news: boolean;

    @prop({
        default: true
    })
    newsCreate: boolean;

    @prop({
        default: true
    })
    newsUpdate: boolean;

    @prop({
        default: true
    })
    newsDelete: boolean;
    
    @prop({
        default: true
    })
    test: boolean;

    @prop({
        default: true
    })
    testCreate: boolean;

    @prop({
        default: true
    })
    testUpdate: boolean;

    @prop({
        default: true
    })
    testDelete: boolean;

    @prop({
        default: true
    })
    teacher: boolean;

    @prop({
        default: true
    })
    teacherCreate: boolean;

    @prop({
        default: true
    })
    teacherUpdate: boolean;

    @prop({
        default: true
    })
    teacherDelete: boolean;

    @prop({
        default: true
    })
    student: boolean;

    @prop({
        default: true
    })
    studentUpdate: boolean;

    @prop({
        default: true
    })
    studentDelete: boolean;

    @prop({
        default: true
    })
    role: boolean;

    @prop({
        default: true
    })
    roleCreate: boolean;

    @prop({
        default: true
    })
    roleUpdate: boolean;

    @prop({
        default: true
    })
    roleDelete: boolean;

    @prop({
        default: true
    })
    employee: boolean;

    @prop({
        default: true
    })
    employeeCreate: boolean;

    @prop({
        default: true
    })
    employeeUpdate: boolean;

    @prop({
        default: true
    })
    employeeDelete: boolean;

    @prop({
        default: true
    })
    class: boolean;

    @prop({
        default: true
    })
    classCreate: boolean;

    @prop({
        default: true
    })
    classUpdate: boolean;

    @prop({
        default: true
    })
    classDelete: boolean;
    
    @prop({
        default: true
    })
    topic: boolean;

    @prop({
        default: true
    })
    topicCreate: boolean;

    @prop({
        default: true
    })
    topicUpdate: boolean;

    @prop({
        default: true
    })
    topicDelete: boolean;

    @prop({
        default: true
    })
    theme: boolean;

    @prop({
        default: true
    })
    themeCreate: boolean;

    @prop({
        default: true
    })
    themeUpdate: boolean;

    @prop({
        default: true
    })
    themeDelete: boolean;

    @prop({
        default: true
    })
    question: boolean;

    @prop({
        default: true
    })
    questionCreate: boolean;

    @prop({
        default: true
    })
    questionUpdate: boolean;

    @prop({
        default: true
    })
    questionDelete: boolean;

}


export const RoleModel = getModelForClass(Role);
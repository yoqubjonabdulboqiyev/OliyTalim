import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { Collections } from "../../../../constant/collections";
import { BaseModel } from "../base.model";




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


    //fanlar

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

    //yangilik

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
    
    // test
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

    //teacher
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

    //student
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

    //role
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

    //employee
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

    //sinf
    @prop({
        default: true
    })
    sinf: boolean;

    @prop({
        default: true
    })
    sinfCreate: boolean;

    @prop({
        default: true
    })
    sinfUpdate: boolean;

    @prop({
        default: true
    })
    sinfDelete: boolean;
    
    //bob
    @prop({
        default: true
    })
    bob: boolean;

    @prop({
        default: true
    })
    bobCreate: boolean;

    @prop({
        default: true
    })
    bobUpdate: boolean;

    @prop({
        default: true
    })
    bobDelete: boolean;

    //mavzu
    @prop({
        default: true
    })
    mavzu: boolean;

    @prop({
        default: true
    })
    mavzuCreate: boolean;

    @prop({
        default: true
    })
    mavzuUpdate: boolean;

    @prop({
        default: true
    })
    mavzuDelete: boolean;

    //savol
    @prop({
        default: true
    })
    savol: boolean;

    @prop({
        default: true
    })
    savolCreate: boolean;

    @prop({
        default: true
    })
    savolUpdate: boolean;

    @prop({
        default: true
    })
    savolDelete: boolean;

}


export const RoleModel = getModelForClass(Role);
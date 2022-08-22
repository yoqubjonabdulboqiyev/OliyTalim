import {modelOptions, index, prop, Ref, getModelForClass} from  "@typegoose/typegoose"
import { Types } from "mongoose";
import { Collections } from "../../../../constant/collections";
import { BaseModel } from "../../base.model";
import { Role } from "../role/role.model";


@modelOptions({
    schemaOptions : {
        collection: Collections.EMPLOYEE
    }
})


@index(
    {phoneNumber : 1},
    {
        unique : true,
        background: true,
        name : "userName",
        partialFilterExpression : {isDeleted : {$eq : false}}
    }
)

export  class Employee extends BaseModel{
    @prop({trim : true})
    firstName : string;

    @prop({ trim :true})
    lastName :string;

    @prop({ trim :true})
    phoneNumber : string;

    @prop({ required :true, trim : true})
    password : string;

    @prop({
        required : true,
        unique:true,
        type : Types.ObjectId,
        ref : Collections.ROLE
    })

    roleId: Ref<Role>
}


export const EmployeeModel = getModelForClass(Employee)
import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../../../constant/collections";
import { Employee, EmployeeModel } from "../../../db/model/admin/employee/employee.model";
import { EmployeeError } from "../../../db/model/admin/employee/error";
import { EmployeeDto } from "../../../validation/dto/admin/employee/employee.dto";
import { PagingDto } from "../../../validation/dto/pagingDto";
import { BaseServise } from "../../BaseService"




export class EmployeeService extends BaseServise<Employee>{
    constructor(model: ModelType<Employee>){
        super(model);
    }


    public async findByIdError(id){
        try{
            let admin = await this.model.findById(id);
            if(!admin) throw EmployeeError.NotFound(id);
            return admin;
        }catch(e){
            return  e
        }
    }

    public async findByPhoneNumber(phoneNumber: string){
        try{
            let employee = await this.model.find({phoneNumber: phoneNumber})
            if(!employee.length)  throw EmployeeError.NotFound(phoneNumber)
            return employee[0];
        } catch(e){
            return e;
        }
    }

    public async getPaging<T>(dto: PagingDto){
        try{
            let query: any = { isDeleted: false };
            
            const $lookupRole = {
                $lookup: {
                    from: Collections.ROLE,
                    foreignField: "_id",
                    localField: "roleId",
                    as: "role",
                },
            };
            
            const $unwindRole = {
                $unwind: {
                    path: "$role",
                    preserveNullAndEmptyArrays: true,
                },
            };
            
            const $projection = {
                $project: {
                    _id: 1,
                    firstname: 1,
                    lastname: 1,
                    phoneNumber: 1,
                    isActive: 1,
                    role: {
                        _id: 1,
                        name: 1,
                    },
                },
            };
            
            const $pipline = [$lookupRole, $unwindRole, $projection];
            
            return await this.findPaging(query, dto, $pipline);
        }catch (error) {
            throw (error);
        }
    }

    public async getEmployeeById<T>(id: string, isDeleted: boolean = false) {
        try {
            const $match: any = {
                $match: {
                    _id: new Types.ObjectId(id),
                    isDeleted: false,
                },
            };
            
            if (isDeleted) {
                delete $match.$match.isDeleted;
            }
            
            const $lookupRole = {
                $lookup: {
                    from: Collections.ROLE,
                    foreignField: "_id",
                    localField: "roleId",
                    as: "role",
                },
            };
            
            const $unwindRole = {
                $unwind: {
                    path: "$role",
                    preserveNullAndEmptyArrays: true,
                },
            };
            
            const $projection = {
                $project: {
                    _id: 1,
                    isActive: 1,
                    lastname: 1,
                    firstname: 1,
                    phoneNumber: 1,
                    role: {
                        _id: 1,
                        name: 1,
                    },
                },
            };
            
            const $pipline = [$match, $lookupRole, $unwindRole, $projection];
            
            const data = await this.aggregate($pipline);
            if (!data || !data[0]) throw EmployeeError.NotFound(id);
            return data[0];
        } catch (error) {
            throw error;
        }
    }
    public async create(data: EmployeeDto) {
        try {
            return await super.create(data)
        } catch (e) {
            if (e.code == 11000) throw EmployeeError.AllreadyExsist(Object.keys(e.keyPattern))
            throw e
        }
    }
    public async update(id, data: EmployeeDto, options?: QueryOptions) {
        try {
            return await super.updateOne(id, data, options)
        } catch (e) {
            if (e.code == 11000) throw EmployeeError.AllreadyExsist(Object.keys(e.keyPattern))
            throw e
        }
    }

}


export const employeeService = new EmployeeService(EmployeeModel)
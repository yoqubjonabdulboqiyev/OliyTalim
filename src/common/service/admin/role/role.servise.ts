import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions } from "mongoose";
import { EmployeeError } from "../../../db/model/admin/employee/error";
import { RoleError } from "../../../db/model/admin/role/role.error";
import { Role, RoleModel } from "../../../db/model/admin/role/role.model";
import { RoleDto } from "../../../validation/dto/admin/role/role.dto";
import { PagingDto } from "../../../validation/dto/pagingDto";
import { BaseServise } from "../../BaseService";




class RoleService extends BaseServise<Role>{
    constructor(model: ModelType<Role>){
        super(model);
    }

    public async findByIdError(id){
        try{
            const role = await this.model.findById(id);
            if(!role) throw RoleError.NotFound(id);
            return role; 
        } catch(e){
            throw e;
        }
    }

    public async hasAccess(id: string, access:string){
        try{
            const role = await this.findById(id);

            if(!role) throw RoleError.NotFound(id);

            if(!role[access] || role.isDeleted) throw EmployeeError.NotEnoughPermission();
        } catch (e){
            throw e;
        }
    }

    public async getPaging<T>(dto: PagingDto){
        try{
            let query = {
                isDeleted : false,
            }

            const $project = {
                $project : {
                    _id:1,
                    name: 1,
                    description : 1
                },
            }
            const $pipeline = [ $project ]

            return await this.findPaging(query, dto, $pipeline)
        } catch(e){
            throw e;
        }
    }

    public async create(data : RoleDto){
        try{
        return await super.create(data)
    } catch(e){
        if (e.code == 11000) throw RoleError.AlreadyExists(Object.keys(e.keyPattern))
        throw e
    }
}


public async update(id, data: RoleDto, options?: QueryOptions) {
    try {
      return await super.updateOne(id, data, options)
    } catch (e) {
      if (e.code == 11000) throw RoleError.AlreadyExists(Object.keys(e.keyPattern))
      throw e
    }
  }
}



export const roleService = new RoleService(RoleModel);
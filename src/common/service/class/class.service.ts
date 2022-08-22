import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../../constant/collections";
import { ClassError } from "../../db/model/class/class.error";
import { Class, ClassModel } from "../../db/model/class/class.model";
import { PagingDto } from "../../validation/dto/pagingDto";
import { classDto } from "../../validation/dto/class/class.dto";
import { BaseServise } from "../BaseService";


export class ClassServise extends BaseServise<Class>{
    constructor(model: ModelType<Class>) {
        super(model)
    }

    public async ClassFindById(id) {
        try {
            const Class = await this.findById(id);
            if (!Class) throw ClassError.NotFound(id);
            return Class;
        }
        catch (e) {
            return e;
        }
    }

    public async createClass(data) {
        try {
            const Class = await super.create(data);
            return Class;
        } catch (e) {
            if(e.code==11000) throw ClassError.AlreadyExsist(Object.keys(e.keyPattern))
            return e;
        }
    }
    public async updateClass(id, data: classDto, options?: QueryOptions) {
        try {
            await this.ClassFindById(id)
            const updateClass = await this.updateOne(id, data, options);
            return updateClass
        } catch (e) {
            if(e.code==11000) throw ClassError.AlreadyExsist(Object.keys(e.keyPattern))
            return e;
        }
    }

    public async deleteClass(id) {
        try {
            await this.ClassFindById(id)
            const deleteClass = await this.updateOne(id, { isDeleted: true })
            return deleteClass
        } catch (e) {
            return e;
        }
    }

    public async getPaging<T>(dto: PagingDto) {
        try {
            let query: any = { isDeleted: false };

            const $projection = {
                $project: {
                    name: 1,
                },
            };

            const $pipline = [$projection];

            return await this.findPaging(query, dto, $pipline);
        } catch (e) {
            return e;
        }
    }

    public async getById<T>(id:string) {
        try {
            const $match = {
                $match : {
                    _id : new Types.ObjectId(id),
                    isDeleted : false
                }
            }
            const $projection = {
                $project: {
                    name: 1,
                },
            };

            const $pipline = [$match, $projection];

            return await this.aggregate( $pipline);
        } catch (e) {
            return e;
        }
    }


}

export const classService = new ClassServise(ClassModel)
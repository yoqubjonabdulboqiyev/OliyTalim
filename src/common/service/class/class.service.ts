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
        const Class = await this.findById(id);
        if (!Class) throw ClassError.NotFound(id);
        return Class;
    }

    public async createClass(data) {
        try {
            const Class = await super.create(data);
            return Class;
        } catch (e) {
            if (e.code == 11000) throw ClassError.AlreadyExsist(Object.keys(e.keyPattern))
            return e;
        }
    }
    public async updateClass(id, data: classDto, options?: QueryOptions) {
        try {
            await this.ClassFindById(id)
            const updateClass = await this.updateOne(id, data, options);
            return updateClass
        } catch (e) {
            if (e.code == 11000) throw ClassError.AlreadyExsist(Object.keys(e.keyPattern))
            return e;
        }
    }

    public async deleteClass(id) {
        await this.ClassFindById(id)
        const deleteClass = await this.updateOne(id, { isDeleted: true })
        return deleteClass
    }

    public async getPaging<T>(dto: PagingDto) {
        let query: any = { isDeleted: false };

        const $projection = {
            $project: {
                name: 1,
            },
        };

        const $pipline = [$projection];

        return await this.findPaging(query, dto, $pipline);
    }

    public async getById<T>(id: string) {
        const $match = {
            $match: {
                _id: new Types.ObjectId(id),
                isDeleted: false
            }
        }
        const $projection = {
            $project: {
                name: 1,
            },
        };

        const $pipline = [$match, $projection];

        return (await  this.aggregate($pipline)).shift();
    }


}

export const classService = new ClassServise(ClassModel)
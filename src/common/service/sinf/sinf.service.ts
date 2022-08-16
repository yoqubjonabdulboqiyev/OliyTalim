import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../../constant/collections";
import { sinfError } from "../../db/model/sinf/error";
import { Sinf, SinfModel } from "../../db/model/sinf/sinf.model";
import { PagingDto } from "../../validation/dto/pagingDto";
import { sinfDto } from "../../validation/dto/sinf/sinfDto";
import { BaseServise } from "../BaseService";


export class SinfServise extends BaseServise<Sinf>{
    constructor(model: ModelType<Sinf>) {
        super(model)
    }

    public async findByIds(id) {
        try {
            const sinf = await this.findById(id);
            if (!sinf) throw sinfError.NotFound(id);
            return sinf;
        }
        catch (e) {
            throw e;
        }
    }

    public async createSinf(data) {
        try {
            const sinf = await super.create(data);
            return sinf;
        } catch (e) {
            throw e;
        }
    }
    public async updateSinf(id, data: sinfDto, options?: QueryOptions) {
        try {
            const sinf = await this.findById(id);
            if (!sinf) throw sinfError.NotFound(id);
            const updateSinf = await this.updateOne(id, data, options);
            return updateSinf
        } catch (e) {
            throw e;
        }
    }

    public async deleteSinf(id) {
        try {
            const sinf = await this.findById(id)
            if (!sinf) throw sinfError.NotFound(id);
            const deleteSinf = await this.updateOne(id, { isDeleted: true })
            return deleteSinf
        } catch (e) {
            throw e;
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
        } catch (error) {
            throw (error);
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
        } catch (error) {
            throw (error);
        }
    }


}

export const sinfService = new SinfServise(SinfModel)
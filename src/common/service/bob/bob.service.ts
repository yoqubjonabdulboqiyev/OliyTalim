import { BeAnObject, IObjectWithTypegooseFunction, ModelType } from "@typegoose/typegoose/lib/types";
import { Document, QueryOptions, Types } from "mongoose";
import { Bob, BobModel } from "../../db/model/bob/bob.model";
import { bobError } from "../../db/model/bob/error";
import { bobDto } from "../../validation/dto/bob/bobDto";
import { PagingDto } from "../../validation/dto/pagingDto";
import { BaseServise } from "../BaseService";


export class BobServise extends BaseServise<Bob>{
    constructor(model: ModelType<Bob>) {
        super(model)
    }

    public async findByIds(id) {
        try {
            const bob = await this.findById(id);
            if (!bob) throw bobError.NotFound(id);
            return bob;
        }
        catch (e) {
            throw e;
        }
    }

    public async createBob(data) {
        try {
            const bob = await super.create(data);
            return bob;
        } catch (e) {
            throw e;
        }
    }
    public async updateBob(id, data: bobDto, options?: QueryOptions) {
        try {
            const bob = await this.findById(id);
            if (!bob) throw bobError.NotFound(id);
            const updatebob = await this.updateOne(id, data, options);
            return updatebob
        } catch (e) {
            throw e;
        }
    }

    public async deleteBob(id) {
        try {
            const bob = await this.findById(id)
            if (!bob) throw bobError.NotFound(id);
            const deletebob = await this.deleteOne(id)
            return deletebob
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

    public async getById<T>(id: string) {
        try {
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

            return await this.aggregate($pipline);
        } catch (error) {
            throw (error);
        }
    }


}

export const bobService = new BobServise(BobModel)
import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { savolError } from "../../../db/model/test/savollar/error";
import { Savol, SavolModel } from "../../../db/model/test/savollar/savol.model";
import { PagingDto } from "../../../validation/dto/pagingDto";
import { savolDto } from "../../../validation/dto/test/savol/savol.Dto";
import { BaseServise } from "../../BaseService";

export class SavolServise extends BaseServise<Savol>{
    constructor(model: ModelType<Savol>) {
        super(model)
    }

    public async findByIds(id) {
        try {
            const savol = await this.findById(id);
            if (!savol) throw savolError.NotFound(id);
            return savol;
        }
        catch (e) {
            throw e;
        }
    }

    public async createSavol(data) {
        try {
            const savol = await super.create(data);
            return savol;
        } catch (e) {
            throw e;
        }
    }
    public async updateSavol(id, data: savolDto, options?: QueryOptions) {
        try {
            const savol = await this.findById(id);
            if (!savol) throw savolError.NotFound(id);
            const updatesavol = await this.updateOne(id, data, options);
            return updatesavol
        } catch (e) {
            throw e;
        }
    }

    public async deleteSavol(id) {
        try {
            const savol = await this.findById(id)
            if (!savol) throw savolError.NotFound(id);
            const deletesavol = await this.deleteOne(id)
            return deletesavol
        } catch (e) {
            throw e;
        }
    }

    public async getPaging<T>(dto: PagingDto) {
        try {
            let query: any = { isDeleted: false };

            const $projection = {
                $project: {
                    title: 1,
                    javob: {
                        title: 1
                    }
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
                    title: 1,
                    javob: {
                        title: 1
                    }
                },
            };

            const $pipline = [$match, $projection];

            return await this.aggregate($pipline);
        } catch (error) {
            throw (error);
        }
    }


}

export const savolService = new SavolServise(SavolModel)
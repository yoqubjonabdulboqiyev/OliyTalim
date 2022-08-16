import { BeAnObject, IObjectWithTypegooseFunction, ModelType } from "@typegoose/typegoose/lib/types";
import { Document, QueryOptions, Types } from "mongoose";
import { mavzuError } from "../../db/model/mavzu/error";
import { Mavzu, MavzuModel } from "../../db/model/mavzu/mavzu.model";
import { mavzuDto } from "../../validation/dto/mavzu/mavzu.dto";
import { PagingDto } from "../../validation/dto/pagingDto";
import { BaseServise } from "../BaseService";


export class MavzuServise extends BaseServise<Mavzu>{
    constructor(model: ModelType<Mavzu>) {
        super(model)
    }

    public async findByIds(id) {
        try {
            const mavzu = await this.findById(id);
            if (!mavzu) throw mavzuError.NotFound(id);
            return mavzu;
        }
        catch (e) {
            throw e;
        }
    }

    public async createMavzu(data) {
        try {
            const mavzu = await super.create(data);
            return mavzu;
        } catch (e) {
            throw e;
        }
    }
    public async updateMavzu(id, data: mavzuDto, options?: QueryOptions) {
        try {
            const mavzu = await this.findById(id);
            if (!mavzu) throw mavzuError.NotFound(id);
            const updatemavzu = await this.updateOne(id, data, options);
            return updatemavzu
        } catch (e) {
            throw e;
        }
    }

    public async deleteMavzu(id) {
        try {
            const mavzu = await this.findById(id)
            if (!mavzu) throw mavzuError.NotFound(id);
            const deletemavzu = await this.deleteOne(id)
            return deletemavzu
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

export const mavzuService = new MavzuServise(MavzuModel)
import { ModelType } from "@typegoose/typegoose/lib/types";
import { lookup } from "dns";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../../constant/collections";
import { TestError } from "../../db/model/test/test.eror";
import { Test, testModel } from "../../db/model/test/test.model";
import { PagingDto } from "../../validation/dto/pagingDto";
import { testDto } from "../../validation/dto/test/test.dto";
import { BaseServise } from "../BaseService";


export class TestServise extends BaseServise<Test>{
    constructor(model: ModelType<Test>) {
        super(model)
    }

    public async TestfindById(id) {
        try {
            const test = await this.findById(id);
            if (!test) throw TestError.NotFound(id);
            return test;
        }
        catch (e) {
            throw e;
        }
    }

    public async createTest(data) {
        try {
            const test = await super.create(data);
            return test;
        } catch (e) {
            return e;
        }
    }
    public async updateTest(id, data: testDto, options?: QueryOptions) {
        try {
            await this.TestfindById(id)
            const updatetest = await this.updateOne(id, data, options);
            return updatetest
        } catch (e) {
            return e;
        }
    }

    public async deleteTest(id) {
        try {
            await this.TestfindById(id)
            const deletetest = await this.deleteOne(id)
            return deletetest
        } catch (e) {
            return e;
        }
    }

    public async getPaging<T>(dto: PagingDto) {
        try {
            let query: any = { isDeleted: false };
            const $lookup = {
                $lookup: {
                    from: Collections.QUESTION,
                    localField: '_id',
                    foreignField: 'testId',
                    as: 'question'
                }
            }
            const $unwind = {
                $unwind : {
                    path : "$question"
                }
            }

            const $pipline = [$lookup, $unwind];


            return await this.findPaging(query, dto, $pipline);
        } catch (e) {
            return e;
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

            const $lookup = {
                $lookup: {
                    from: Collections.QUESTION,
                    localField: '_id',
                    foreignField: 'testId',
                    as: 'question'
                }
            }

            const $pipline = [$match, $lookup];

            return await this.aggregate($pipline);
        } catch (e) {
            return e;
        }
    }


}

export const testService = new TestServise(testModel)
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
        const test = await this.findById(id);
        if (!test) throw TestError.NotFound(id);
        return test;
    }

    public async createTest(data) {
        const test = await super.create(data);
        return test;
    }
    public async updateTest(id, data: testDto, options?: QueryOptions) {
        await this.TestfindById(id)
        const updatetest = await this.updateOne(id, data, options);
        return updatetest
    }

    public async deleteTest(id) {
        await this.TestfindById(id)
        const deletetest = await this.deleteOne(id)
        return deletetest
    }

    public async getPaging<T>(dto: PagingDto) {
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
            $unwind: {
                path: "$question"
            }
        }

        const $pipline = [$lookup, $unwind];


        return await this.findPaging(query, dto, $pipline);
    }

    public async getById<T>(id: string) {
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

        return  (await this.aggregate($pipline)).shift();
    }


}

export const testService = new TestServise(testModel)
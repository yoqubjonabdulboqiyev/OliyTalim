import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { QuestionError } from "../../../db/model/test/question/question.error";
import { Question, QuestionModel } from "../../../db/model/test/question/question.model";
import { PagingDto } from "../../../validation/dto/pagingDto";
import { QuestionDto } from "../../../validation/dto/test/question/question.dto";
import { BaseServise } from "../../BaseService";

export class QuestionServise extends BaseServise<Question>{
    constructor(model: ModelType<Question>) {
        super(model)
    }

    public async QuestionFindById(id) {
        const question = await this.findById(id);
        if (!question) throw QuestionError.NotFound(id);
        return question;
    }

    public async createQuestion(data) {
        const question = await super.create(data);
        return question;
    }
    public async updateQuestion(id, data: QuestionDto, options?: QueryOptions) {
        await this.QuestionFindById(id)
        const updateQuestion = await this.updateOne(id, data, options);
        return updateQuestion
    }

    public async deleteQuestion(id) {
        await this.QuestionFindById(id)
        const deleteQuestion = await this.deleteOne(id)
        return deleteQuestion
    }

    public async getPaging<T>(dto: PagingDto) {
        let query: any = { isDeleted: false };

        const $projection = {
            $project: {
                title: 1,
                answer: {
                    title: 1
                }
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
                title: 1,
                answer: {
                    title: 1
                }
            },
        };

        const $pipline = [$match, $projection];

        return await this.aggregate($pipline);
    }


}

export const questionService = new QuestionServise(QuestionModel)
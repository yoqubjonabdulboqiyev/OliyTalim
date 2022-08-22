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
        try {
            const question = await this.findById(id);
            if (!question) throw QuestionError.NotFound(id);
            return question;
        }
        catch (e) {
            return e;
        }
    }

    public async createQuestion(data) {
        try {
            const question = await super.create(data);
            return question;
        } catch (e) {
            return e;
        }
    }
    public async updateQuestion(id, data: QuestionDto, options?: QueryOptions) {
        try {
            await this.QuestionFindById(id)
            const updateQuestion = await this.updateOne(id, data, options);
            return updateQuestion
        } catch (e) {
            return e;
        }
    }

    public async deleteQuestion(id) {
        try {
            await this.QuestionFindById(id)
            const deleteQuestion = await this.deleteOne(id)
            return deleteQuestion
        } catch (e) {
            return e;
        }
    }

    public async getPaging<T>(dto: PagingDto) {
        try {
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
        } catch (e) {
            return e;
        }
    }


}

export const questionService = new QuestionServise(QuestionModel)
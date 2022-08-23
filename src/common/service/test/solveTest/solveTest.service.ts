import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types, QueryOptions } from "mongoose";
import { Collections } from "../../../constant/collections";
import { SolveTest, SolveTestModel } from "../../../db/model/test/solveTest/solveTest.model";
import { BaseServise } from "../../BaseService";



export class SolveTestServise extends BaseServise<SolveTest>{
    constructor(model: ModelType<SolveTest>) {
        super(model)
    }
    public async findAnswer(date, answer) {
        const $match = {
            $match: {
                userId: new Types.ObjectId(answer.userId),
                questionId: new Types.ObjectId(answer.questionId),
                testId: new Types.ObjectId(answer.testId),
                createdAt: { $gte: new Date(date) }
            }
        }

        const question =  (await this.aggregate([$match])).shift();
        return question

    }

    public async createSolveTest(data) {
        const solveTest = await super.create(data);
        return solveTest;
    }
    public async updateSolveTest(id, data, options?: QueryOptions) {
        const updateSolveTest = await this.updateOne(id, data, options);
        return updateSolveTest
    }

    public async getAnswer(data) {
        const $matchSolveTest = {
            $match: {
                testId: new Types.ObjectId(data.testId),
                userId: new Types.ObjectId(data.userId),
                createdAt: { $gte: new Date(data.createdAt), $lte: new Date(data.finished) },
            }
        }


        const $lookup = {
            $lookup: {
                from: Collections.QUESTION,
                localField: "questionId",
                foreignField: "_id",
                as: 'question'
            }
        }
        const $unwindQ = {
            $unwind: {
                path: "$question"
            }
        }

        const $project = {
            $project: {
                answerId: 1,
                "answer": {
                    $filter: {
                        input: "$question.answer",
                        as: "answer",
                        cond: {
                            $and: [
                                {
                                    $eq: ["$$answer.isCorrect", true]
                                }
                            ]
                        }
                    }
                }
            }
        }

        const $unwind = {
            $unwind: {
                path: "$answer"
            }
        }

        const $group = {
            $group: {
                _id: {
                    answer: { $eq: ["$answerId", "$answer._id"] }
                },
                count: { $sum: 1 }
            }
        }

        const $matchAnswer = {
            $match: {
                "_id.answer": true
            }
        }
        const $projectAnswer = {
            $project: {
                _id: 0
            }
        }


        const $pipeline = [
            $matchSolveTest,
            $lookup,
            $unwindQ,
            $project,
            $unwind,
            $group,
            $matchAnswer,
            $projectAnswer
        ]

        const answer =  await this.aggregate($pipeline)
        if(answer[0]){
            return answer[0].count
        }
        else{
            return 0
        }
    }

}

export const solveTestService = new SolveTestServise(SolveTestModel)
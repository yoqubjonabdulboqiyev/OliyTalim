import { ModelType } from "@typegoose/typegoose/lib/types"
import { Types } from "mongoose"
import { Result, ResultModel } from "../../../db/model/test/result/result.model"
import { BaseServise } from "../../BaseService"
import { questionService } from "../question/question.service"
import { testService } from "../test.service"
import { solveTestService } from "../solveTest/solveTest.service"
import { ResultError } from "../../../db/model/test/result/result.error"



export class ResultServise extends BaseServise<Result>{
    constructor(model: ModelType<Result>) {
        super(model)
    }
    public async findStart(id) {
        try {
            const $match = {
                $match: {
                    userId: new Types.ObjectId(id),
                    status: 'start'
                }
            }
            const $pipeline = [$match]
            const findStartTest = await this.aggregate($pipeline)
            return findStartTest
        }
        catch (e) {
           return e;
        }
    }

    public async findNotFinished(data) {
        try {
            const $match = {
                $match: {
                    userId: new Types.ObjectId(data.userId),
                    testId: new Types.ObjectId(data.testId),
                    status: 'start'
                }
            }
            const $pipeline = [$match]
            const findStartTest = await this.aggregate($pipeline)
            return findStartTest
        }
        catch (e) {
            return e;
        }
    }
    public async Time(data) {
        try {
            const $match = {
                $match: {
                    _id: new Types.ObjectId(data.testId),
                }
            }
            const $pipline = [$match]
            const Test = await testService.aggregate($pipline)
            const finishDate = new Date((Test[0].duration) * 60 * 1000 + (data.createdAt).getTime())
            return finishDate

        }
        catch (e) {
            return e;
        }
    }


    public async testFinish(data) {
        try {
            const $match = {
                $match: {
                    userId: new Types.ObjectId(data.userId),
                    testId: new Types.ObjectId(data.testId),
                    createdAt: { $gte: new Date(data.createdAt) }
                }
            }
            let ball = 0;
            const $pipeline = [$match];
            const results = await solveTestService.aggregate($pipeline);
            if (!results[0]) return ball;
            for (let item of results) {
                const $matchQuestion = {
                    $match: {
                        _id: item.questionId
                    }
                }
                const $pipelineQuestion = [$matchQuestion]
                const question = await questionService.aggregate($pipelineQuestion);
                if (!question[0]) return ball
                question[0].answer.forEach((items) => {
                    if ((items._id).toString() == (item.answerId).toString() && items.isCorrect == true) {
                        ball += 1;
                    }
                })
            }
            return ball;
        }
        catch (e) {
            return e;
        }
    }

    public async findFinish(data) {
        try {
            const $match = {
                $match: {
                    userId: new Types.ObjectId(data.userId),
                    testId: new Types.ObjectId(data.testId),
                    status: 'finish'
                }
            }
            const $pipeline = [$match]
            const finish = await this.aggregate($pipeline)
            return finish
        }
        catch (e) {
            return e;
        }
    }
    public async createResult(data) {
        try {
            const result = await super.create(data);
            return result;
        } catch (e) {
            return e;
        }
    }
    public async updateResult(id, data) {
        try {
            const updateResult = await this.updateOne(id, data);
            return updateResult
        } catch (e) {
            return e;
        }
    }

    public async results(id) {
        try {
            const $match = {
                $match: {
                    testId: new Types.ObjectId(id)
                }
            }
            const $group = {
                $group: {
                    _id: "$userId"
                }
            }
            const $pipeline = [$match, $group]
            const UserCount = await this.aggregate($pipeline);
            const $matchTest = {
                $match: {
                    _id: new Types.ObjectId(id)
                }
            }

            const $pipelineTest = [$matchTest]
            const test = await testService.aggregate($pipelineTest)
            const $groups = {
                $group: {
                    _id: '$testId',
                    TotalBall: { $sum: "$ball" },
                    count: { $sum: 1 }
                }
            }
            const $pipelineBall = [$match, $groups]
            const totalBall = await this.aggregate($pipelineBall);
            const $sort = {
                $sort: {
                    ball: -1
                }
            }
            const $pipelineMax = [$match, $sort]
            const MaxBall = await this.aggregate($pipelineMax)
            const statistic = {
                Ishtirokchilar: UserCount.length,
                SavollarSoni: test[0].testCount,
                OrtachaNatija: (totalBall[0].TotalBall * 100) / (totalBall[0].count * test[0].testCount),
                MaksimalNatija: (MaxBall[0].ball * 100) / test[0].testCount
            }
            return statistic
        }
        catch (e) {
            return e;
        }
    }
}

export const resultService = new ResultServise(ResultModel)
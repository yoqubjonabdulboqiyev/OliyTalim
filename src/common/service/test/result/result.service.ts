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
        const $match = {
            $match: {
                userId: new Types.ObjectId(id),
                status: 'start'
            }
        }
        const findStartTest =  (await this.aggregate([$match])).shift()
        return findStartTest
    }

    public async findNotFinished(data) {
        const $match = {
            $match: {
                userId: new Types.ObjectId(data.userId),
                testId: new Types.ObjectId(data.testId),
                status: 'start'
            }
        }
        const findStartTest =  (await this.aggregate([$match])).shift()
        return findStartTest
    }
    public async Time(data) {
        const $match = {
            $match: {
                _id: new Types.ObjectId(data.testId),
            }
        }
       
        const Test = (await testService.aggregate([$match])).shift();
        const finishDate = new Date((Test.duration)* 60 * 1000 + (data.createdAt).getTime())
        return finishDate

    }

    public async findFinish(data) {
        const $match = {
            $match: {
                userId: new Types.ObjectId(data.userId),
                testId: new Types.ObjectId(data.testId),
                status: 'finish'
            }
        }
        
        const finish =  await this.aggregate([$match])
        return finish
    }
    public async createResult(data) {
        const result = await super.create(data);
        return result;
    }
    public async updateResult(id, data) {
        const updateResult = await this.updateOne(id, data);
        return updateResult
    }

    public async results(id) {
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
        const test = (await testService.aggregate($pipelineTest)).shift()
        const $groups = {
            $group: {
                _id: '$testId',
                TotalBall: { $sum: "$ball" },
                count: { $sum: 1 }
            }
        }
        const $pipelineBall = [$match, $groups]
        const totalBall = (await this.aggregate($pipelineBall)).shift();
        const $sort = {
            $sort: {
                ball: -1
            }
        }
        const $pipelineMax = [$match, $sort]
        const MaxBall = (await this.aggregate($pipelineMax)).shift()
        const statistic = {
            Ishtirokchilar: UserCount.length,
            SavollarSoni: test.testCount,
            OrtachaNatija: (totalBall.TotalBall * 100) / (totalBall.count * test.testCount),
            MaksimalNatija: (MaxBall.ball * 100) / test.testCount
        }
        return statistic
    }
}

export const resultService = new ResultServise(ResultModel)
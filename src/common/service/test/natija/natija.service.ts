import { ModelType } from "@typegoose/typegoose/lib/types"
import { Types } from "mongoose"
import { Natija, natijaModel } from "../../../db/model/test/natija/natija.model"
import { BaseServise } from "../../BaseService"
import { savolService } from "../savol/savol.service"
import { testService } from "../test.service"
import { yechishService } from "../yechish/yechish.service"



export class NatijaServise extends BaseServise<Natija>{
    constructor(model: ModelType<Natija>) {
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
            const $pipline = [$match]
            const findStartTest = await this.aggregate($pipline)
            return findStartTest
        }
        catch (e) {
            throw e;
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
            const $pipline = [$match]
            const findStartTest = await this.aggregate($pipline)
            return findStartTest
        }
        catch (e) {
            throw e;
        }
    }
    public async Vaqt(data) {
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
            throw e;
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
            const $pipline = [$match];
            const javoblar = await yechishService.aggregate($pipline);
            if (!javoblar[0]) return ball;
            for (let item of javoblar) {
                const $matchSavol = {
                    $match: {
                        _id: item.savolId
                    }
                }
                const $piplineSavol = [$matchSavol]
                const savol = await savolService.aggregate($piplineSavol);
                if (!savol[0]) return ball
                savol[0].javob.forEach((items) => {
                    if ((items._id).toString() == (item.javobId).toString() && items.isCorrect == true) {
                        ball += 1;
                    }
                })
            }
            return ball;
        }
        catch (e) {
            throw e;
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
            const $pipline = [$match]
            const finish = await this.aggregate($pipline)
            return finish
        }
        catch (e) {
            throw e;
        }
    }
    public async createNatija(data) {
        try {
            const natija = await super.create(data);
            return natija;
        } catch (e) {
            throw e;
        }
    }
    public async updateNatija(id, data) {
        try {
            const updateNatija = await this.updateOne(id, data);
            return updateNatija
        } catch (e) {
            throw e;
        }
    }

    public async natijalarim(id) {
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
            console.log(UserCount)
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
            throw e;
        }
    }
}

export const natijaService = new NatijaServise(natijaModel)
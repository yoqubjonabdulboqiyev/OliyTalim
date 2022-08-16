import { Types } from "mongoose";
import { natijaError } from "../../../../common/db/model/test/natija/eror";
import { yechishError } from "../../../../common/db/model/test/yechish/error";
import { natijaService } from "../../../../common/service/test/natija/natija.service";
import { yechishService } from "../../../../common/service/test/yechish/yechish.service";
import { natijaDto } from "../../../../common/validation/dto/test/natija/natijaDto";
import { yechishDto } from "../../../../common/validation/dto/test/yechish/yechishDto";
import { DtoGroups } from "../../../../common/validation/dtoGroups";
import { validateIt } from "../../../../common/validation/validate";

export async function StartTestHandler(req, res, next) {
    try {
        const data = req.body;
        const userId: string = (req._id).toString()
        const natija = {
            userId: userId,
            testId: data.testId,
        }
        const dto = await validateIt(natija, natijaDto, DtoGroups.CREATE);
        const findNotFinished = await natijaService.findNotFinished(natija);
        if (findNotFinished[0]) {
            throw natijaError.NotFinished()
        }
        const findStart = await natijaService.findStart(userId);
        if (findStart[0]) {
            throw natijaError.NotPermission()
        }

        const finish = await natijaService.findFinish(natija)
        if (finish[0]) {
            const natijam = {
                userId: new Types.ObjectId(natija.userId),
                testId: new Types.ObjectId(natija.testId),
                started: new Date(),
                count: finish[finish.length - 1].count + 1,
                status: 'start'
            }

            const testStarted = await natijaService.createNatija(natijam)
            return res.send(natijaError.Success(testStarted))
        }
        else {
            const natijam = {
                userId: new Types.ObjectId(natija.userId),
                testId: new Types.ObjectId(natija.testId),
                started: new Date(),
                status: 'start',
                count: 1
            }
            const testStarted = await natijaService.createNatija(natijam)
            return res.send(natijaError.Success(testStarted))
        }
    } catch (e) {
        return next(e);
    }
}

export async function createYechishHandler(req, res, next) {
    try {
        const data = req.body;
        const userId: string = (req._id).toString()
        const yechish = {
            userId: userId,
            testId: data.testId,
            savolId: data.savolId,
            javobId: data.javobId
        }
        const dto = await validateIt(yechish, yechishDto, DtoGroups.CREATE);
        const startNatija = await natijaService.findNotFinished(yechish)
        if (!startNatija[0]) {
            throw natijaError.NotStart()
        }
        else {
            const finishDate = await natijaService.Vaqt(startNatija[0])
            if (finishDate <= new Date()) {
                const ball = await natijaService.testFinish(startNatija[0]);
                const finish = {
                    userId: startNatija[0].userId,
                    tetsId: startNatija[0].tetsId,
                    status: 'finish',
                    finished: finishDate,
                    ball: ball
                }
                const natijaUpdate = await natijaService.updateNatija(startNatija[0]._id, finish)
                throw natijaError.finish(natijaUpdate)
            }

            const savol = await yechishService.findJavob(startNatija[0].createdAt, yechish)
            if (savol[0]) {
                const javob = {
                    userId: new Types.ObjectId(yechish.userId),
                    testId: new Types.ObjectId(yechish.testId),
                    javobId: new Types.ObjectId(yechish.javobId),
                    savolId: new Types.ObjectId(yechish.savolId),
                }

                const update = await yechishService.updateYechish(savol[0]._id, javob)
                return res.send(yechishError.Success(update))
            }
            else {
                const javob = {
                    userId: new Types.ObjectId(yechish.userId),
                    testId: new Types.ObjectId(yechish.testId),
                    javobId: new Types.ObjectId(yechish.javobId),
                    savolId: new Types.ObjectId(yechish.savolId),
                }

                const create = await yechishService.createYechish(javob)
                
                return res.send(yechishError.Success(create))
            }
        }
    } catch (e) {
        return next(e);
    }
}

export async function FinishTestHandler(req, res, next) {
    try {
        const data = req.body;
        const userId: string = (req._id).toString()
        const natija = {
            userId: userId,
            testId: data.testId,
        }
        const dto = await validateIt(natija, natijaDto, DtoGroups.UPDATE);
        const startNatija = await natijaService.findNotFinished(natija)
        if (startNatija[0]) {
            const ball = await natijaService.testFinish(startNatija[0]);
            const finish = {
                userId: startNatija[0].userId,
                tetsId: startNatija[0].tetsId,
                status: 'finish',
                finished: new Date(),
                ball: ball
            }
            const natijaUpdate = await natijaService.updateNatija(startNatija[0]._id, finish)
            return res.send(natijaError.Success(natijaUpdate))
        }
        else {
            throw natijaError.NotStart()
        }

    } catch (e) {
        return next(e);
    }
}
import { Types } from "mongoose";
import { ResultError } from "../../../../common/db/model/test/result/result.error";
import { SolveTestError } from "../../../../common/db/model/test/solveTest/solveTest.error";
import { resultService } from "../../../../common/service/test/result/result.service";
import { solveTestService } from "../../../../common/service/test/solveTest/solveTest.service";
import { ResultDto } from "../../../../common/validation/dto/test/result/result.dto";
import { SolveTestDto } from "../../../../common/validation/dto/test/solveTest/solveTest.dto";
import { DtoGroups } from "../../../../common/validation/dtoGroups";
import { validateIt } from "../../../../common/validation/validate";

export async function StartTestHandler(req, res, next) {
    try {
        const data = req.body;
        const userId: string = (req._id).toString()
        const result = {
            userId: userId,
            testId: data.testId,
        }
        const dto = await validateIt(result, ResultDto, DtoGroups.CREATE);
        const findNotFinished = await resultService.findNotFinished(result);
        if (findNotFinished[0]) {
            throw ResultError.NotFinished()
        }
        const findStart = await resultService.findStart(userId);
        if (findStart[0]) {
            throw ResultError.NotPermission()
        }

        const finish = await resultService.findFinish(result)
        if (finish[0]) {
            const results = {
                userId: new Types.ObjectId(result.userId),
                testId: new Types.ObjectId(result.testId),
                started: new Date(),
                count: finish[finish.length - 1].count + 1,
                status: 'start'
            }

            const testStarted = await resultService.createResult(results)
            return res.send(ResultError.Success(testStarted))
        }
        else {
            const results = {
                userId: new Types.ObjectId(result.userId),
                testId: new Types.ObjectId(result.testId),
                started: new Date(),
                status: 'start',
                count: 1
            }
            const testStarted = await resultService.createResult(results)
            return res.send(ResultError.Success(testStarted))
        }
    } catch (e) {
        return next(e);
    }
}

export async function createYechishHandler(req, res, next) {
    try {
        const data = req.body;
        const userId: string = (req._id).toString()
        const solveTest = {
            userId: userId,
            testId: data.testId,
            questionId: data.questionId,
            answerId: data.answerId
        }
        const dto = await validateIt(solveTest, SolveTestDto, DtoGroups.CREATE);
        const startResult = await resultService.findNotFinished(solveTest)
        if (!startResult[0]) {
            throw ResultError.NotStart()
        }
        else {
            const finishDate = await resultService.Time(startResult[0])
            if (finishDate <= new Date()) {
                startResult[0].finished = finishDate;
                const ball = await solveTestService.getAnswer(startResult[0]);
                const finish = {
                    userId: startResult[0].userId,
                    tetsId: startResult[0].tetsId,
                    status: 'finish',
                    finished: finishDate,
                    ball: ball
                }
                const resultUpdate = await resultService.updateResult(startResult[0]._id, finish)
                throw ResultError.finish(resultUpdate)
            }

            const question = await solveTestService.findAnswer(startResult[0].createdAt, solveTest)
            if (question[0]) {
                const answer = {
                    userId: new Types.ObjectId(solveTest.userId),
                    testId: new Types.ObjectId(solveTest.testId),
                    answerId: new Types.ObjectId(solveTest.answerId),
                    questionId: new Types.ObjectId(solveTest.questionId),
                }

                const update = await solveTestService.updateSolveTest(question[0]._id, answer)
                return res.send(SolveTestError.Success(update))
            }
            else {
                const answer = {
                    userId: new Types.ObjectId(solveTest.userId),
                    testId: new Types.ObjectId(solveTest.testId),
                    answerId: new Types.ObjectId(solveTest.answerId),
                    questionId: new Types.ObjectId(solveTest.questionId),
                }

                const create = await solveTestService.createSolveTest(answer)

                return res.send(SolveTestError.Success(create))
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
        const result = {
            userId: userId,
            testId: data.testId,
        }
        const dto = await validateIt(result, ResultDto, DtoGroups.UPDATE);
        const startResult = await resultService.findNotFinished(result)
        if (startResult[0]) {
            startResult[0].finished = new Date();
            const ball = await solveTestService.getAnswer(startResult[0]);
            const finish = {
                userId: startResult[0].userId,
                tetsId: startResult[0].tetsId,
                status: 'finish',
                finished: new Date(),
                ball: ball
            }
            const resultUpdate = await resultService.updateResult(startResult[0]._id, finish)
            return res.send(ResultError.Success(resultUpdate))
        }
        else {
            throw ResultError.NotStart()
        }

    } catch (e) {
        return next(e);
    }
}
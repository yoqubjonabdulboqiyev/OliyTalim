import { Types } from "mongoose";
import cron from "node-cron"
import { ResultError } from "../../../../common/db/model/test/result/result.error";
import { STATUS } from "../../../../common/db/model/test/result/result.model";
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
        if (findNotFinished) {
            throw ResultError.NotFinished()
        }
        const findStart = await resultService.findStart(userId);
        if (findStart) {
            throw ResultError.NotPermission()
        }

        const finish = await resultService.findFinish(result)
        if (finish[0]) {
            const results = {
                userId: new Types.ObjectId(result.userId),
                testId: new Types.ObjectId(result.testId),
                started: new Date(),
                count: finish[finish.length - 1].count + 1,
                status: STATUS.START
            }

            const testStarted = await resultService.createResult(results)
            return res.send(ResultError.Success(testStarted))
        }
        else {
            const results = {
                userId: new Types.ObjectId(result.userId),
                testId: new Types.ObjectId(result.testId),
                started: new Date(),
                status: STATUS.START,
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
        if (!startResult) {
            throw ResultError.NotStart()
        }
        else {
            const finishDate = await resultService.Time(startResult)
            let task = cron.schedule('* * * * *', async () => {
                if (finishDate <= new Date()) {
                    startResult.finished = finishDate;
                    const ball = await solveTestService.getAnswer(startResult);
                    const finish = {
                        userId: startResult.userId,
                        tetsId: startResult.tetsId,
                        status: STATUS.FINISH,
                        finished: finishDate,
                        ball: ball
                    }
                    const resultUpdate = await resultService.updateResult(startResult._id, finish)
                    task.stop();
                    return res.send(ResultError.finish(resultUpdate))
                }
            });

            const question = await solveTestService.findAnswer(startResult.createdAt, solveTest)
            if (question) {
                const answer = {
                    userId: new Types.ObjectId(solveTest.userId),
                    testId: new Types.ObjectId(solveTest.testId),
                    answerId: new Types.ObjectId(solveTest.answerId),
                    questionId: new Types.ObjectId(solveTest.questionId),
                }

                const update = await solveTestService.updateSolveTest(question._id, answer)
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
        if (startResult) {
            startResult.finished = new Date();
            const ball = await solveTestService.getAnswer(startResult);
            const finish = {
                userId: startResult.userId,
                tetsId: startResult.tetsId,
                status: STATUS.FINISH,
                finished: new Date(),
                ball: ball
            }
            const resultUpdate = await resultService.updateResult(startResult._id, finish)
            return res.send(ResultError.Success(resultUpdate))
        }
        else {
            throw ResultError.NotStart()
        }

    } catch (e) {
        return next(e);
    }
}
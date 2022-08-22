import express, { response } from "express";
import { ADMIN_PORt, HOST } from "../common/config";
import { connectDB } from "../common/db/connection";
import employeeRoute from "../admin/route/employee/employee.route"
import roleRoute from "../admin/route/role/role.route";
import sinfRouter from './route/class/class.route';
import subject from './route/class/subject/subject.route'
import bobRouter from "./route/class/subject/topic/topic.router";
import mavzuRouter from './route/class/subject/topic/theme/theme.route';
import testRouter from '../admin/route/test/test.Router';
import savolRouter from './route/test/question/question.router';
import newsRouter from '../admin/route/newss/news.router'


//user

import userRouter from "../user/router/user/user.router";
import testYechishRouter from "../user/router/test/test.router";
import newsrouter from '../user/router/news/news.router';
import subjectroter from '../user/router/class/subject/subject.router';
import sinfrouter from '../user/router/class/class.router'
import bobrouter from '../user/router/class/subject/topic/topic.router'
import mavzurouter from '../user/router/class/subject/topic/theme/theme.route'
import statisticRouter from '../user/router/statistic/statistic.router'
import { BaseError } from "../common/reporter/base.error";


const app = express();

app.use(express.json())

app.use('/employee', employeeRoute)
app.use('/role', roleRoute)
app.use('/sinf', sinfRouter)
app.use('/subject', subject)
app.use("/bob", bobRouter)
app.use('/mavzu', mavzuRouter)
app.use('/test', testRouter)
app.use('/savol', savolRouter)
app.use('news', newsRouter)

//user

app.use('/user', userRouter)
app.use('/testYechish', testYechishRouter)
app.use('/newsUser', newsrouter)
app.use('/subjectUser', subjectroter)
app.use('/sinfUser',sinfrouter)
app.use('/bobUser', bobrouter)
app.use('/mavzuUser',mavzurouter)
app.use('/statistic', statisticRouter)

async function start() {
    try {
        await connectDB();
        console.log(ADMIN_PORt)
        app.listen({ port: ADMIN_PORt, host: HOST })
        console.log("server successfull")
        app.use((error: any, request: any, response: any, next: Function) => {
            if (error instanceof BaseError) {
                response.status(400).send(error)
            }
            else response.status(400).send(BaseError.UnknownError(error))
        })
    }
    catch (e) {
        console.log("server not successful", e)
    }
}

start();
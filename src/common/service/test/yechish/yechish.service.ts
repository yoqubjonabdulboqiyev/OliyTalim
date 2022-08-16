import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types, QueryOptions } from "mongoose";
import { Yechish, yechishModel } from "../../../db/model/test/yechish/yechish.model";
import { BaseServise } from "../../BaseService";



export class YechishServise extends BaseServise<Yechish>{
    constructor(model: ModelType<Yechish>) {
        super(model)
    }
    public async findJavob(date, javob) {
        try {
            const $match = {
                $match: {
                    userId: new Types.ObjectId(javob.userId),
                    savolId: new Types.ObjectId(javob.savolId),
                    testId: new Types.ObjectId(javob.testId),
                    createdAt: { $gte: new Date(date) }
                }
            }

            const $pipline = [$match]
            const savol = await this.aggregate($pipline);
            return savol

        }
        catch (e) {
            throw e;
        }
    }

    public async createYechish(data) {
        try {

            const yechish = await super.create(data);

            return yechish;
        } catch (e) {
            throw e;
        }
    }
    public async updateYechish(id, data, options?: QueryOptions) {
        try {
            const updateyechish = await this.updateOne(id, data, options);
            return updateyechish
        } catch (e) {
            throw e;
        }
    }


}

export const yechishService = new YechishServise(yechishModel)
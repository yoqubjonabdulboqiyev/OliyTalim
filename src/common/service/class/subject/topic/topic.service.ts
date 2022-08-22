import {  ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Topic, TopicModel } from "../../../../db/model/class/subject/topic/topic.model";
import { TopicError } from "../../../../db/model/class/subject/topic/topic.error";
import { TopicDto } from "../../../../validation/dto/class/subject/topic/topic.dto";
import { PagingDto } from "../../../../validation/dto/pagingDto";
import { BaseServise } from "../../../BaseService";


export class TopicServise extends BaseServise<Topic>{
    constructor(model: ModelType<Topic>) {
        super(model)
    }

    public async TopicFindById(id) {
        try {
            const topic = await this.findById(id);
            if (!topic) throw TopicError.NotFound(id);
            return topic;
        }
        catch (e) {
            return e;
        }
    }

    public async createTopic(data) {
        try {
            const topic = await super.create(data);
            return topic;
        } catch (e) {
            if(e.code==11000) throw TopicError.AlreadyExsist(Object.keys(e.keyPattern))
            return e;
        }
    }
    public async updateTopic(id, data: TopicDto, options?: QueryOptions) {
        try {
            await this.TopicFindById(id)
            const updateTopic = await this.updateOne(id, data, options);
            return updateTopic
        } catch (e) {
            if(e.code ==11000) throw TopicError.AlreadyExsist(Object.keys(e.keyPattern))
            return e;
        }
    }

    public async deleteTopic(id) {
        try {
            await this.TopicFindById(id)
            const deleteTopic = await this.deleteOne(id)
            return deleteTopic
        } catch (e) {
            return e;
        }
    }

    public async getPaging<T>(dto: PagingDto) {
        try {
            let query: any = { isDeleted: false };

            const $projection = {
                $project: {
                    name: 1,
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
                    name: 1,
                },
            };

            const $pipline = [$match, $projection];

            return await this.aggregate($pipline);
        } catch (e) {
            return e;
        }
    }


}

export const topicService = new TopicServise(TopicModel)


import {  ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { newsError } from "../../db/model/news/news.error";
import { News, NewsModel } from "../../db/model/news/news.model";
import { newsDto } from "../../validation/dto/news/news.dto";
import { PagingDto } from "../../validation/dto/pagingDto";
import { BaseServise } from "../BaseService";


export class NewsServise extends BaseServise<News>{
    constructor(model: ModelType<News>) {
        super(model)
    }

    public async NewsFindById(id) {
        try {
            const news = await this.findById(id);
            if (!news) throw newsError.NotFound(id);
            return news;
        }
        catch (e) {
            return e;
        }
    }

    public async createNews(data) {
        try {
            const news = await super.create(data);
            return news;
        } catch (e) {
            if(e.code==11000) throw newsError.AlreadyExsist(Object.keys(e.keyPattern))
            return e;
        }
    }
    public async updateNews(id, data: newsDto, options?: QueryOptions) {
        try {
            await this.NewsFindById(id)
            const updateNews = await this.updateOne(id, data, options);
            return updateNews
        } catch (e) {
            if(e.code==11000) throw newsError.AlreadyExsist(Object.keys(e.keyPattern))
            return e;
        }
    }

    public async deleteNews(id) {
        try {
            await this.NewsFindById(id)
            const deleteNews = await this.deleteOne(id)
            return deleteNews
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
            const $sort = {
                $sort : {
                    createdAt : -1
                }
            }

            const $pipline = [$sort, $projection];

            return await this.findPaging(query, dto, $pipline);
        } catch (error) {
            throw (error);
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
        } catch (error) {
            throw (error);
        }
    }


}

export const newsService = new NewsServise(NewsModel)
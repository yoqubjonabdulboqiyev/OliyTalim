

import { ModelType } from "@typegoose/typegoose/lib/types";
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
        const news = await this.findById(id);
        if (!news) throw newsError.NotFound(id);
        return news;
    }

    public async createNews(data) {
        try {
            const news = await super.create(data);
            return news;
        } catch (e) {
            if (e.code == 11000) throw newsError.AlreadyExsist(Object.keys(e.keyPattern))
            return e;
        }
    }
    public async updateNews(id, data: newsDto, options?: QueryOptions) {
        try {
            await this.NewsFindById(id)
            const updateNews = await this.updateOne(id, data, options);
            return updateNews
        } catch (e) {
            if (e.code == 11000) throw newsError.AlreadyExsist(Object.keys(e.keyPattern))
            return e;
        }
    }

    public async deleteNews(id) {
        await this.NewsFindById(id)
        const deleteNews = await this.deleteOne(id)
        return deleteNews
    }

    public async getPaging<T>(dto: PagingDto) {
        let query: any = { isDeleted: false };

        const $projection = {
            $project: {
                name: 1,
            },
        };
        const $sort = {
            $sort: {
                createdAt: -1
            }
        }

        const $pipline = [$sort, $projection];

        return await this.findPaging(query, dto, $pipline);
    }

    public async getById<T>(id: string) {
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

        return await (await this.aggregate($pipline)).shift();
    }


}

export const newsService = new NewsServise(NewsModel)
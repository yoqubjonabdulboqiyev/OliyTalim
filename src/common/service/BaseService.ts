import { ModelType, Ref } from "@typegoose/typegoose/lib/types";
import { AggregateOptions, QueryOptions, Types } from "mongoose";
import { PagingDto } from "../validation/dto/pagingDto";


export class BaseServise<T> {
    constructor(public model: ModelType<T>) { }

    public async find<T>(
        query,
        options?: QueryOptions,
        projection: object = { __v: 0 }
    ) {
        try {
            return await this.model.find(query, projection, options);
        } catch (e) {
            throw e;
        }
    }

    public async findById<T>(
        id: string | Types.ObjectId | Ref<T>,
        options?: QueryOptions,
        projection: object = { __v: 0 }
    ) {
        try {
            return await this.model.findOne(
                { _id: id, isDeleted: false },
                projection,
                options
            );
        } catch (e) {
            throw e;
        }
    }

    public async create<T>(
        data: any,
        projection: object = { __v: 0, isDeleted: 0 },
        options?: QueryOptions
    ) {
        try {
            const saved = await this.model.create([data], options);
            return await this.model.findById(saved[0]._id, projection, options);
        }
        catch (e) {
            throw e;
        }
    }

    public async createMany<t>(data: any[], options: QueryOptions) {
        try {
            return await this.model.insertMany(data, options);
        } catch (e) {
            throw e;
        }
    }

    public async deleteOne<T>(id, options?: QueryOptions) {
        try {
            return await this.model.findByIdAndUpdate(id, { isDeleted: true }, options);
        } catch (e) {
            throw e;
        }
    }

    public async updateOne<T>(
        id: Types.ObjectId | string | Ref<T>,
        data,
        options?: QueryOptions
    ) {
        try {
            await this.model.findByIdAndUpdate(id, data, options);
            return await this.model.findById(id, { isDeleted: 0, __v: 0 }, options);
        } catch (error) {
            throw error;
        }
    }

    public async updateOneByQuery<T>(query, data, options?: QueryOptions) {
        try {
            return await this.model.findOneAndUpdate(query, data, options);
        } catch (error) {
            throw error;
        }
    }

    public async updateMany<T>(query, data, options?: QueryOptions) {
        try {
            return await this.model.updateMany(query, data, options).exec();
        } catch (error) {
            throw error;
        }
    }

    public async aggregate<T>(pipeline: Array<any>, options?: AggregateOptions) {
        try {
            return await this.model
                .aggregate(pipeline, options)
                .allowDiskUse(true)
                .exec();
        } catch (e) {
            throw e;
        }
    }

    public async getCount(query: object = {}) {
        try {


            let $match = {
                $match: {
                    isDeleted: false,
                    ...query
                }
            }

            let $count = {
                $count: "totalCount"
            }

            let $pipeline = [$match, $count]

            let result = await this.aggregate($pipeline)

            return result[0] || {}

        }
        catch (e) {
            throw e;
        }
    }

    public async findPaging<T>(
        query,
        dto: PagingDto,
        additional_pipeline: any = [
            {
                $project: {
                    __v: 0,
                },
            },
        ],
        sort = null
    ) {
        try {
            const { limit, page, sortBy, asc } = dto;
            const $match = {

                $match: {
                    ...query
                },

            };



            const $sort = {
                $sort: {
                    createdAt: -1,
                },
            };

            if (sortBy) {
                $sort.$sort = {} as any;
                $sort.$sort[`${sortBy}`] = asc > 0 ? 1 : -1;
            } else if (sort) {
                $sort.$sort = sort;
            }

            const $skip = {
                $skip: limit * (page - 1),
            };

            const $limit = {
                $limit: limit,
            };

            let pipeline: Array<any> = [$match, $sort, $skip, $limit];

            if (additional_pipeline.length > 0) {
                pipeline = [...pipeline, ...additional_pipeline];
            }
            console.log(34, pipeline);

            const data = await this.model
                .aggregate(pipeline)
                .allowDiskUse(true)
                .exec();

            return data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

}
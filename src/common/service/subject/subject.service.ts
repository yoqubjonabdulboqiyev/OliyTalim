import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { subjectError } from "../../db/model/subject/eror";
import { Subject, SubjectModel } from "../../db/model/subject/fan.model";
import { PagingDto } from "../../validation/dto/pagingDto";
import { subjectDto } from "../../validation/dto/subject/subjectDto";
import { BaseServise } from "../BaseService";


export class SubjectServise extends BaseServise<Subject>{
    constructor(model: ModelType<Subject>) {
        super(model)
    }

    public async findByIds(id) {
        try {
            const subject = await this.findById(id);
            if (!subject) throw subjectError.NotFound(id);
            return subject;
        }
        catch (e) {
            throw e;
        }
    }

    public async createSubject(data) {
        try {
            const subject = await super.create(data);
            return subject;
        } catch (e) {
            throw e;
        }
    }
    public async updateSubject(id, data: subjectDto, options?: QueryOptions) {
        try {
            const subject = await this.findById(id);
            if (!subject) throw subjectError.NotFound(id);
            const updatesubject = await this.updateOne(id, data, options);
            return updatesubject
        } catch (e) {
            throw e;        
        }
    }

    public async deleteSubject(id) {
        try {
            const subject = await this.findById(id)
            if (!subject) throw subjectError.NotFound(id);
            const deletesubject = await this.deleteOne(id)
            return deletesubject
        } catch (e) {
            throw e;
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

export const subjectService = new SubjectServise(SubjectModel)
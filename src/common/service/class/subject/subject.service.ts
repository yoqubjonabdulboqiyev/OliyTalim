import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { subjectError } from "../../../db/model/class/subject/subject.eror";
import { Subject, SubjectModel } from "../../../db/model/class/subject/subject.model";
import { PagingDto } from "../../../validation/dto/pagingDto";
import { subjectDto } from "../../../validation/dto/class/subject/subject.dto";
import { BaseServise } from "../../BaseService";


export class SubjectServise extends BaseServise<Subject>{
    constructor(model: ModelType<Subject>) {
        super(model)
    }

    public async SubjectFindById(id) {
        const subject = await this.findById(id);
        if (!subject) throw subjectError.NotFound(id);
        return subject;
    }

    public async createSubject(data) {
        try {
            const subject = await super.create(data);
            return subject;
        } catch (e) {
            if (e.code == 11000) throw subjectError.AlreadyExsist(Object.keys(e.keyPattern))
            return e;
        }
    }
    public async updateSubject(id, data: subjectDto, options?: QueryOptions) {
        try {
            await this.SubjectFindById(id)
            const updatesubject = await this.updateOne(id, data, options);
            return updatesubject
        } catch (e) {
            if (e.code == 11000) throw subjectError.AlreadyExsist(Object.keys(e.keyPattern))
            return e;
        }
    }

    public async deleteSubject(id) {
        await this.SubjectFindById(id)
        const deletesubject = await this.deleteOne(id)
        return deletesubject
    }

    public async getPaging<T>(dto: PagingDto) {
        let query: any = { isDeleted: false };

        const $projection = {
            $project: {
                name: 1,
            },
        };

        const $pipline = [$projection];

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

export const subjectService = new SubjectServise(SubjectModel)
import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { Collections } from "../../constant/collections";
import { testError } from "../../db/model/test/eror";
import { Test, testModel } from "../../db/model/test/test.model";
import { PagingDto } from "../../validation/dto/pagingDto";
import { testDto } from "../../validation/dto/test/testDto";
import { BaseServise } from "../BaseService";


export class TestServise extends BaseServise<Test>{
    constructor(model: ModelType<Test>) {
        super(model)
    }

    public async findByIds(id) {
        try {
            const test = await this.findById(id);
            if (!test) throw testError.NotFound(id);
            return test;
        }
        catch (e) {
            throw e;
        }
    }

    public async createTest(data) {
        try {
            const test = await super.create(data);
            return test;
        } catch (e) {
            throw e;
        }
    }
    public async updateTest(id, data: testDto, options?: QueryOptions) {
        try {
            const test = await this.findById(id);
            if (!test) throw testError.NotFound(id);
            const updatetest = await this.updateOne(id, data, options);
            return updatetest
        } catch (e) {
            throw e;
        }
    }

    public async deleteTest(id) {
        try {
            const test = await this.findById(id)
            if (!test) throw testError.NotFound(id);
            const deletetest = await this.deleteOne(id)
            return deletetest
        } catch (e) {
            throw e;
        }
    }

    public async getPaging<T>(dto: PagingDto) {
        try {
            let query: any = { isDeleted: false };
                const $lookupmavzu = {
                    $lookup: {
                        from: Collections.MAVZU,
                        localField: 'mavzuId',
                        foreignField: '_id',
                        as: 'mavzu'
                    }
                }
    
                const $lookupBob = {
                    $lookup: {
                        from: Collections.BOB,
                        localField: 'mavzu.bobId',
                        foreignField: '_id',
                        as: 'bob'
                    }
                }
                const $lookupsubject = {
                    $lookup: {
                        from: Collections.SUBJECT,
                        localField: 'bob.subjectId',
                        foreignField: '_id',
                        as: 'subject'
                    }
                }
    
                const $lookupsinf = {
                    $lookup: {
                        from: Collections.SINF,
                        localField: 'subject.sinfId',
                        foreignField: '_id',
                        as: 'sinf'
                    }
                }
    
                const $lookupSavol = {
                    $lookup: {
                        from: Collections.SAVOL,
                        localField: '_id',
                        foreignField: 'testId',
                        as: 'savol'
                    }
                }
    
                const $project = {
                    $project: {
                        name: 1,
                        vaqt : 1,
                        mavzu : {
                            name : 1,
                        },
                        bob : {
                            name  : 1,
                        },
                        subject : {
                            name : 1,
                        },
                        sinf : {
                            name : 1,
                        },
                        savol : {
                            title : 1,
                            javob : {
                                title:1
                            },
                        }
                    }
                }
    
                const $pipline = [ $lookupmavzu, $lookupBob, $lookupsubject, $lookupsinf, $lookupSavol, $project];
    

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

            const $lookupmavzu = {
                $lookup: {
                    from: Collections.MAVZU,
                    localField: 'mavzuId',
                    foreignField: '_id',
                    as: 'mavzu'
                }
            }

            const $lookupBob = {
                $lookup: {
                    from: Collections.BOB,
                    localField: 'mavzu.bobId',
                    foreignField: '_id',
                    as: 'bob'
                }
            }
            const $lookupsubject = {
                $lookup: {
                    from: Collections.SUBJECT,
                    localField: 'bob.subjectId',
                    foreignField: '_id',
                    as: 'subject'
                }
            }

            const $lookupsinf = {
                $lookup: {
                    from: Collections.SINF,
                    localField: 'subject.sinfId',
                    foreignField: '_id',
                    as: 'sinf'
                }
            }

            const $lookupSavol = {
                $lookup: {
                    from: Collections.SAVOL,
                    localField: '_id',
                    foreignField: 'testId',
                    as: 'savol'
                }
            }

            const $project = {
                $project: {
                    name: 1,
                    vaqt : 1,
                    mavzu : {
                        name : 1,
                    },
                    bob : {
                        name  : 1,
                    },
                    subject : {
                        name : 1,
                    },
                    sinf : {
                        name : 1,
                    },
                    savol : {
                        title : 1,
                        javob : {
                            title:1
                        },
                    }
                }
            }

            const $pipline = [$match, $lookupmavzu, $lookupBob, $lookupsubject, $lookupsinf, $lookupSavol, $project];

            return await this.aggregate($pipline);
        } catch (error) {
            throw (error);
        }
    }


}

export const testService = new TestServise(testModel)
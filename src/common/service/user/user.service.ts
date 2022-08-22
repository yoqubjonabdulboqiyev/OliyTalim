import { ModelType } from "@typegoose/typegoose/lib/types";
import { QueryOptions, Types } from "mongoose";
import { userError } from "../../db/model/user/eror";
import { User, UserModel } from "../../db/model/user/user.model";
import { PagingDto } from "../../validation/dto/pagingDto";
import { UserDto } from "../../validation/dto/user/user.dto";
import { BaseServise } from "../BaseService";


export class UserServise extends BaseServise<User>{
    constructor(model: ModelType<User>) {
        super(model)
    }

    public async UserFindById(id) {
        const user = await this.findById(id);
        if (!user) throw userError.NotFound(id);
        return user;
    }

    public async findPhoneNumber(phoneNumber) {
        const user = await this.model.findOne({ phoneNumber: phoneNumber });
        if (!user) throw userError.NotFound(phoneNumber);
        return user;
    }

    public async createUser(data) {
        const users = await this.model.findOne({ phoneNumber: data.phoneNumber });
        if (users) { throw userError.AlreadyExsist(data) }
        const password = Number(Math.random().toString().substring(2, 6));
        data.password = password;
        const user = await super.create(data);
        return user;
    }
    public async updateUser(id, data: UserDto, options?: QueryOptions) {
        try {
            await this.UserFindById(id)
            const updateUser = await this.updateOne(id, data, options);
            return updateUser
        } catch (e) {
            if (e.code == 11000) throw userError.AlreadyExsist(Object.keys(e.keyPattern))
            return e;
        }
    }

    public async deleteUser(id) {
        await this.UserFindById(id)
        const deleteUser = await this.deleteOne(id)
        return deleteUser
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

        return  (await this.aggregate($pipline)).shift();
    }


}

export const userService = new UserServise(UserModel)
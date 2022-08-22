import { IsEnum, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator"
import { BaseDto, DtoGroups } from "../../dtoGroups"
import { Gender } from "../../../db/model/user/user.model"
export class UserDto extends BaseDto {
    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.REGISTER, DtoGroups.UPDATE]
    })
    ism: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.REGISTER, DtoGroups.UPDATE]
    })
    familya: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsEnum(Gender, {
        groups: [DtoGroups.REGISTER, DtoGroups.UPDATE]
    })
    gender: Gender;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.REGISTER, DtoGroups.UPDATE]
    })
    viloyat: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsPhoneNumber(null, {
        groups: [DtoGroups.REGISTER, DtoGroups.UPDATE, DtoGroups.LOGIN, DtoGroups.GET]
    })
    phoneNumber: string;
    
    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsNumber({},{
        groups: [DtoGroups.LOGIN, DtoGroups.UPDATE]
    })
    password: number;
}



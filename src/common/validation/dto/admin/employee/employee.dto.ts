import { IsMongoId, IsOptional, IsString, MinLength } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups";



export class EmployeeDto extends BaseDto{
    @IsOptional({
        groups : [ DtoGroups.CREATE, DtoGroups.UPDATE,]
    })
    @IsString({
        groups : [ DtoGroups.CREATE, DtoGroups.UPDATE]
    })

    firsName: string;

    @IsOptional({
        groups : [ DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsString({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    lastName :string

    @IsOptional({
        groups: [ DtoGroups.UPDATE]
    })
    @IsString({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE, DtoGroups.LOGIN]
    })
    phoneNumber: string;

    @IsOptional({
        groups: [ DtoGroups.UPDATE]
    })
    @IsString({
        groups: [
            DtoGroups.CREATE, 
            DtoGroups.UPDATE,
            DtoGroups.LOGIN
        ]
    })
    @MinLength(4, {
        groups: [
            DtoGroups.CREATE, 
            DtoGroups.UPDATE,
            DtoGroups.LOGIN
        ]
    })
    password: string;

    @IsOptional({groups: [DtoGroups.UPDATE]})
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    roleId: string;

}   
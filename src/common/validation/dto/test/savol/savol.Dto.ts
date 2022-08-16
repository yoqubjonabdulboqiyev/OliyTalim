import { IsArray, isArray, IsBoolean, IsMongoId, IsOptional, IsString } from "class-validator";
import { BaseModel } from "../../../../db/model/admin/base.model";
import { BaseDto, DtoGroups } from "../../../dtoGroups";



class javobDto{
    @IsOptional({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsString({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    title:string;

    @IsOptional({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsBoolean({
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    isCorrect: boolean
} 
export class savolDto extends BaseDto{
    @IsOptional({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsString({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    title:string;

    @IsOptional({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    testId:string
    
    @IsOptional({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsArray({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    javob : javobDto[]
    
}
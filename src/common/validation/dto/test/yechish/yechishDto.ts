import { IsOptional, IsMongoId } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups";


export class yechishDto extends BaseDto{
    
    @IsOptional({
        groups : [ DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    testId:string

    @IsOptional({
        groups : [ DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    userId:string
    @IsOptional({
        groups : [ DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    savolId:string
    
    @IsOptional({
        groups : [ DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    javobId:string
    
}
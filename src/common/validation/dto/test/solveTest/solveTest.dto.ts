import { IsOptional, IsMongoId } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups";


export class SolveTestDto extends BaseDto{
    
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
    questionId:string
    
    @IsOptional({
        groups : [ DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    answerId:string
    
}
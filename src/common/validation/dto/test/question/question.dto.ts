import { IsArray, isArray, IsBoolean, IsMongoId, IsOptional, IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups";



class answerDto{
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
export class QuestionDto extends BaseDto{
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
    answer :answerDto[]
    
}
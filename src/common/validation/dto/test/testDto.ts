import { IsDate, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../dtoGroups";


export class testDto extends BaseDto{
    @IsOptional({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsString({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    name:string;

    @IsOptional({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    mavzuId:string
    
    @IsOptional({
        groups:[DtoGroups.UPDATE]
    })
    @IsNumber({}
        ,{
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    testCount : number;

    @IsOptional({
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsNumber({}
        ,{
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    vaqt : number;
}
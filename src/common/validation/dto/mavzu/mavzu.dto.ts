
import { IsMongoId, IsOptional, IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../dtoGroups";


export class mavzuDto extends BaseDto{
    @IsOptional({groups: [DtoGroups.UPDATE]})
    @IsString({
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    name:string;
    @IsOptional({groups: [DtoGroups.UPDATE]})
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    bobId: string;
}
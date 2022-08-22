import { IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../dtoGroups";


export class classDto extends BaseDto{
    @IsString({
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    name:string;
}
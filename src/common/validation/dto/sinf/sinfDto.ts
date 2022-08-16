import { IsString } from "class-validator";
import { BaseDto, DtoGroups } from "../../dtoGroups";


export class sinfDto extends BaseDto{
    @IsString({
        groups:[DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    name:string;
}
import { IsArray, IsEnum, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator"
import { BaseDto, DtoGroups } from "../../dtoGroups"
import { ContentData, TitleType } from "../../../db/model/news/news.model";
export class newsDto extends BaseDto {
    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    imgUrl: string;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsString({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    title: string;
     
    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsEnum({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    titleType: TitleType;

    @IsArray({
        groups : [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    content : ContentData[]

}


 
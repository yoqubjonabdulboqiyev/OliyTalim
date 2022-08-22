import { IsOptional, IsMongoId, IsDate, IsEnum, IsNumber } from "class-validator";
import { STATUS } from "../../../../db/model/test/result/result.model";
import { BaseDto, DtoGroups } from "../../../dtoGroups";



export class ResultDto extends BaseDto {
    @IsOptional({
        groups: [DtoGroups.UPDATE, DtoGroups.STATISTIC]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.GET_BY_ID, DtoGroups.UPDATE, DtoGroups.STATISTIC]
    })
    userId: string

    @IsOptional({
        groups: [DtoGroups.UPDATE, DtoGroups.STATISTIC]
    })
    @IsMongoId({
        groups: [DtoGroups.CREATE, DtoGroups.GET_BY_ID, DtoGroups.UPDATE, DtoGroups.STATISTIC]
    })
    testId: string

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsDate({
        groups: [DtoGroups.UPDATE]
    })
    finished: Date;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsEnum({
        groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    status: STATUS

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsNumber({}
        , {
            groups: [DtoGroups.UPDATE]
        })
    ball: number;

    @IsOptional({
        groups: [DtoGroups.UPDATE]
    })
    @IsNumber({
        allowInfinity: false,
        allowNaN : false,
        maxDecimalPlaces : 2
    }
        , {
            groups: [DtoGroups.UPDATE]
        })
    count: number;
}
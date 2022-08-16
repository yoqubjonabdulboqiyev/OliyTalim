import { isMongoId, IsMongoId, IsOptional } from "class-validator";


export enum DtoGroups {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    LOGIN = 'login',
    REGISTER = 'register',
    VERIFY = 'verify',
    GET_BY_ID = 'getById',
    GET = 'GET',
    PAGENATION = 'pagenation',
    STATISTIC = 'statistic'
}

export class BaseDto {
    @IsOptional({
        groups: [DtoGroups.PAGENATION, DtoGroups.UPDATE]
    })
    @IsMongoId({
        groups: [
            DtoGroups.UPDATE,
            DtoGroups.DELETE,
            DtoGroups.GET_BY_ID,
            DtoGroups.PAGENATION
        ]
    })
    _id?; string;

    @IsOptional({ groups: [DtoGroups.CREATE, DtoGroups.UPDATE] })
    @IsMongoId({ groups: [DtoGroups.CREATE] })

    createdBy?: string;

    @IsOptional({ groups: [DtoGroups.UPDATE, DtoGroups.UPDATE] })
    @IsMongoId({ groups: [DtoGroups.UPDATE] })
    updatedBy?: string;

    @IsOptional({ groups: [DtoGroups.DELETE, DtoGroups.UPDATE] })
    @IsMongoId({ groups: [DtoGroups.DELETE] })
    deletedBy?: string;

    isDeleted?: boolean;
}

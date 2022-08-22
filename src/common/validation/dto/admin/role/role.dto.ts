import { IsString, IsBoolean, IsOptional } from "class-validator";
import { BaseDto, DtoGroups } from "../../../dtoGroups";

export class RoleDto extends BaseDto{
    @IsString({
      groups: [DtoGroups.UPDATE, DtoGroups.CREATE],
    })
    name: string; 
  
    //subject 
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    subject: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    subjectCreate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    subjectUpdate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    subjectDelete: boolean;
  
    /** *********************************************** */
  
    //test
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    test: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    testCreate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    testUpdate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    testDelete: boolean;
  
  
    
    // students
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    student: boolean;
  
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    studentUpdate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    studentDelete: boolean;
  
  
    // teachers
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    teacher: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    teacherCreate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    teacherUpdate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    teacherDelete: boolean;
  
    /** ******************************* */
  
    //role
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    role: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    roleCreate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    roleUpdate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    roleDelete: boolean;
  
    /** ******************************* */
  
    //employee
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    employee: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    employeeCreate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    employeeUpdate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    employeeDelete: boolean;
  
    /** ******************************* */
  
  
    //news
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    news: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    newsCreate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    newsUpdate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    newsDelete: boolean;


     //sinf
     @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    class: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    classCreate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    classUpdate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    classDelete: boolean;

     //bob
     @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    topic: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    topicCreate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    topicUpdate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    topicDelete: boolean;

    //savol
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    question: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    questionCreate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    questionUpdate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    questionDelete: boolean;

    //mavzu
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    theme: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    themeCreate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    themeUpdate: boolean;
  
    @IsBoolean({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    @IsOptional({
      groups: [DtoGroups.CREATE, DtoGroups.UPDATE]
    })
    themeDelete: boolean;
  
  }
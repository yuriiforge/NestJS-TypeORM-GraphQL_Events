import { Field, InputType } from '@nestjs/graphql';
import { Gender } from '../school.types';
import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class TeacherAddInput {
  @Field()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @Field(() => Gender)
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}

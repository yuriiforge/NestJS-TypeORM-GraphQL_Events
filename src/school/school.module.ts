import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Subject } from 'rxjs';
import { TeacherResolver } from './resolvers/teacher.resolver';
import { Course } from './entities/course.entity';
import { CourseResolver } from './resolvers/course.resolver';
import { SubjectResolver } from './resolvers/subject.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Subject, Course])],
  providers: [TeacherResolver, CourseResolver, SubjectResolver],
})
export class SchoolModule {}

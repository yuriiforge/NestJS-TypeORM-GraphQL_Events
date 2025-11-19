import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Teacher } from '../entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherAddInput } from '../input/teacher-add.input';
import { Logger } from '@nestjs/common';
import { EntityWithId } from '../school.types';

@Resolver(() => Teacher)
export class TeacherResolver {
  private readonly logger = new Logger(TeacherResolver.name);

  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {}

  @Query(() => [Teacher])
  public async teachers(): Promise<Teacher[]> {
    return this.teacherRepo.find();
  }

  @Query(() => Teacher)
  public async teacher(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Teacher> {
    return this.teacherRepo.findOneOrFail({
      where: { id },
    });
  }

  @Mutation(() => Teacher, { name: 'teacherAdd' })
  public async add(
    @Args('input', { type: () => TeacherAddInput }) input: TeacherAddInput,
  ): Promise<Teacher> {
    return this.teacherRepo.save(new Teacher(input));
  }

  @Mutation(() => Teacher, { name: 'teacherEdit' })
  public async edit(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', { type: () => TeacherAddInput }) input: TeacherAddInput,
  ): Promise<Teacher> {
    const teacher = await this.teacherRepo.findOneOrFail({ where: { id } });
    return this.teacherRepo.save(new Teacher(Object.assign(teacher, input)));
  }

  @Mutation(() => EntityWithId, { name: 'teacherDelete' })
  public async delete(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<EntityWithId> {
    const teacher = await this.teacherRepo.findOneOrFail({ where: { id } });

    await this.teacherRepo.remove(teacher);

    return new EntityWithId(id);
  }

  @ResolveField('subjects')
  public async subjects(@Parent() teacher: Teacher) {
    this.logger.debug('@ResolveFeild subjects was called');
    return await teacher.subjects;
  }
}

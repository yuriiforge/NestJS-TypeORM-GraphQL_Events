import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from './entities/attendee.entity';
import { EventsController } from './controllers/event.controller';
import { CurrentUserEventAttendanceController } from './controllers/current-user-events-attendance.controller';
import { EventAttendeesController } from './controllers/event-atendees.controller';
import { EventsOrganizedByUserController } from './controllers/events-organized-by-user.controller';
import { EventsService } from './event.service';
import { AttendeesService } from './services/attendees.service';
import { Event } from './entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee])],
  controllers: [
    EventsController,
    CurrentUserEventAttendanceController,
    EventAttendeesController,
    EventsOrganizedByUserController,
  ],
  providers: [EventsService, AttendeesService],
})
export class EventsModule {}

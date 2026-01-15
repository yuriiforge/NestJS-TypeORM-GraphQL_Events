import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendeesService } from './attendees.service';
import { Attendee, AttendeeAnswerEnum } from '../entities/attendee.entity';

describe('AttendeesService', () => {
  let service: AttendeesService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Attendee>;

  const mockAttendeeRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendeesService,
        {
          provide: getRepositoryToken(Attendee),
          useValue: mockAttendeeRepository,
        },
      ],
    }).compile();

    service = module.get<AttendeesService>(AttendeesService);
    repository = module.get<Repository<Attendee>>(getRepositoryToken(Attendee));

    jest.clearAllMocks();
  });

  describe('findByEventId', () => {
    it('should query attendees by nested event id', async () => {
      const mockAttendees = [
        { id: 1, eventId: 10, answer: AttendeeAnswerEnum.Accepted },
      ];
      mockAttendeeRepository.find.mockResolvedValue(mockAttendees);

      const result = await service.findByEventId(10);

      expect(result).toEqual(mockAttendees);
      expect(mockAttendeeRepository.find).toHaveBeenCalledWith({
        where: { event: { id: 10 } },
      });
    });
  });

  describe('createOrUpdate', () => {
    it('should update existing attendee answer using enum', async () => {
      const existingAttendee = new Attendee();
      existingAttendee.id = 1;
      existingAttendee.answer = AttendeeAnswerEnum.Maybe;

      const dto = { answer: AttendeeAnswerEnum.Accepted };

      mockAttendeeRepository.findOne.mockResolvedValue(existingAttendee);
      mockAttendeeRepository.save.mockImplementation((val) =>
        Promise.resolve(val),
      );

      const result = await service.createOrUpdate(dto, 100, 50);

      expect(result.id).toBe(1);
      expect(result.answer).toBe(AttendeeAnswerEnum.Accepted);
      expect(result.eventId).toBe(100);
      expect(result.userId).toBe(50);
    });

    it('should create a new attendee with default Accepted status if not found', async () => {
      mockAttendeeRepository.findOne.mockResolvedValue(null);
      mockAttendeeRepository.save.mockImplementation((val) =>
        Promise.resolve(val),
      );

      const dto = { answer: AttendeeAnswerEnum.Rejected };
      const result = await service.createOrUpdate(dto, 200, 10);

      expect(result.answer).toBe(AttendeeAnswerEnum.Rejected);
      expect(result.eventId).toBe(200);
      expect(result.userId).toBe(10);
    });
  });
});

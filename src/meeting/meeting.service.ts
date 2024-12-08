import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, MetadataAlreadyExistsError, Repository } from 'typeorm';
import { Meeting } from './entities/meeting.entity';
import { UpdateAttendeesDto, UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingErrorMessages as ErrMsg } from './dto/meeting.error.messages';
import { Employee } from 'src/employee/entities/employee.entity';
import { findMeetingDto } from './dto/find-meeting.dto';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createMeetingDto: CreateMeetingDto) {
    const newMeeting = new Meeting(createMeetingDto);
    try {
      return await this.entityManager.save(newMeeting); 
    } catch (error) {
      throw new NotFoundException(ErrMsg.EmployeeNotFound);
    }
  }

  findAll() {
    return this.meetingRepository.find();
  }

  async findOne(id: string) {
    const meeting = await this.meetingRepository.findOne({ where: { id: id }, relations: { attendees: true } });
    if(!meeting) throw new NotFoundException(ErrMsg.MeetingNotFound);
    return meeting;
  }

  async update(id: string, updateMeetingDto: UpdateMeetingDto) {
    try {
      const meeting = await this._findMeetingById(id);
      Object.entries(updateMeetingDto).forEach(([key, newValue]) => {
        if (newValue != null) meeting[key] = newValue;
      });
      return await this.entityManager.save(meeting);
    } catch (error) {
      throw new NotFoundException(ErrMsg.EmployeeNotFound);
    }
  }

  async addAttendees(id: string, addAttendeesDto: UpdateAttendeesDto) {
    try {
      const { attendeeIds } = addAttendeesDto;
      const meeting = await this._findMeetingById(id);
      
      for (const attendeeId of attendeeIds) {
        const employee = await this._findEmployeeById(attendeeId);
        if (meeting.attendees.some((attendee) => attendee.id === employee.id))
          throw new BadRequestException(ErrMsg.EmployeeAlreadyPresent);
        meeting.attendees = meeting.attendees.concat(employee);
      }

      return await this.entityManager.save(meeting);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeAttendee(id: string, removeAttendesDto: UpdateAttendeesDto) {
    try {
      const { attendeeIds } = removeAttendesDto;
      const meeting = await this._findMeetingById(id);

      for (const attendeeId of attendeeIds) {
        meeting.attendees = meeting.attendees.filter((attendee) => attendee.id !== attendeeId);
      }

      return await this.entityManager.save(meeting);
    } catch (error) {
      throw new BadRequestException(ErrMsg.EmployeeNotFound);
    }
  }

  async remove(id: string) {
    const deleteResult = await this.meetingRepository.delete(id);
    if(deleteResult.affected === 0) throw new NotFoundException(ErrMsg.MeetingNotFound);
    return { message: 'meeting canceled'};
  }

  private async _findMeetingById(id: string): Promise<Meeting> {
    const meeting = await this.meetingRepository.findOne({ where: { id: id }, relations: { attendees: true }});
    if(!meeting) throw new NotFoundException(ErrMsg.MeetingNotFound);
    return meeting;
  }

  private async _findEmployeeById(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id: id }});
    if(!employee) throw new NotFoundException(ErrMsg.EmployeeNotFound);
    return employee;
  }
}

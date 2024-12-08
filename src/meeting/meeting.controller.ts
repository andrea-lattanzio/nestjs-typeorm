import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateAttendeesDto, UpdateMeetingDto } from './dto/update-meeting.dto';
import { findMeetingDto } from './dto/find-meeting.dto';
import { UuidValidationPipe } from 'src/pipes/uuid.validation.pipe';

@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post()
  create(@Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingService.create(createMeetingDto);
  }

  @Get()
  findAll() {
    return this.meetingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', UuidValidationPipe) id: string) {
    return this.meetingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', UuidValidationPipe) id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
    return this.meetingService.update(id, updateMeetingDto);
  }

  @Patch('addattendees/:id')
  addAttendees(@Param('id', UuidValidationPipe) id: string, @Body() addAttendeesDto: UpdateAttendeesDto) {
    return this.meetingService.addAttendees(id, addAttendeesDto);
  }

  @Patch('removeattendees/:id')
  removeAttendees(@Param('id', UuidValidationPipe) id: string, @Body() removeAttendeesDto: UpdateAttendeesDto) {
    return this.meetingService.removeAttendee(id, removeAttendeesDto);
  }

  @Delete(':id')
  remove(@Param('id', UuidValidationPipe) id: string) {
    return this.meetingService.remove(id);
  }
}

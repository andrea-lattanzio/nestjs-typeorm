import { IsNotEmpty, IsUUID } from "class-validator";

export class findMeetingDto {
  @IsNotEmpty()
  @IsUUID()
  meetingId: string;
}
import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION });
const chime = new AWS.Chime({ region: process.env.AWS_REGION });
chime.endpoint = new AWS.Endpoint(
  'https://service.chime.aws.amazon.com/console'
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    const meetingResponse = await chime
      .createMeeting({
        ClientRequestToken: `meeting-${Date.now()}`,
      })
      .promise();

    const attendeeResponse = await chime
      .createAttendee({
        MeetingId: meetingResponse.Meeting.MeetingId,
        ExternalUserId: name || `user-${Date.now()}`,
      })
      .promise();

    return NextResponse.json({
      Meeting: meetingResponse.Meeting,
      Attendee: attendeeResponse.Attendee,
    });
  } catch (error) {
    console.error('Failed to create meeting:', error);
    return NextResponse.error();
  }
}

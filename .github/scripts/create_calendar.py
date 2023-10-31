import os
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import datetime
import pytz
import json


SCOPES = ['https://www.googleapis.com/auth/calendar']

def get_issue_details():
    #
    return {
        'title': 'Fix bug in application',
        'due_date': '2023-12-01T10:00:00+00:00',
        'assignee_email': 'assignee@example.com'
    }

def create_event(summary, start_time, end_time, attendees):
    """Creates an event in the user's Google Calendar."""
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json')
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            with open('./credentials.json', 'r') as f:
    client_config = json.load(f)

    flow = InstalledAppFlow.from_client_config(client_config, SCOPES)
            creds = flow.run_console()
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('calendar', 'v3', credentials=creds)
        event = {
            'summary': summary,
            'start': {
                'dateTime': start_time,
                'timeZone': 'UTC',
            },
            'end': {
                'dateTime': end_time,
                'timeZone': 'UTC',
            },
            'attendees': [{'email': attendee} for attendee in attendees],
        }
        event = service.events().insert(calendarId='primary', body=event).execute()
        print('Event created: %s' % (event.get('htmlLink')))
    except Exception as e:
        print('Error creating the calendar event:', str(e))
        return False
    return True

if __name__ == '__main__':
    try:
        # Get the issue details from the GitHub API (you'll need to implement this part)
        issue_details = get_issue_details()

        # For the purpose of this example, I'm hardcoding these values
        summary = "Complete Task: " + issue_details['title']
        start_time = issue_details['due_date']
        end_time = (datetime.datetime.strptime(start_time, "%Y-%m-%dT%H:%M:%S%z") + datetime.timedelta(hours=1)).isoformat()
        attendees = [issue_details['assignee_email']]

        if not create_event(summary, start_time, end_time, attendees):
            raise Exception("Failed to create calendar event")
    except Exception as e:
        print('An error occurred:', str(e))

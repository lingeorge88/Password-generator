import os
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import datetime
import pytz

# If modifying these SCOPES, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar']

def create_event(summary, start_time, end_time, attendees):
    """Creates an event in the user's Google Calendar."""
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json')
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_info({
                "installed": {
                    "client_id": os.environ['GOOGLE_CLIENT_ID'],
                    "client_secret": os.environ['GOOGLE_CLIENT_SECRET'],
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
                }
            }, SCOPES)
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

if __name__ == '__main__':
    # Get the issue details from the GitHub API (you'll need to implement this part)
    issue_details = get_issue_details()

    # For the purpose of this example, I'm hardcoding these values
    summary = "Complete Task: " + issue_details['title']
    start_time = issue_details['due_date']
    end_time = (datetime.datetime.strptime(start_time, "%Y-%m-%dT%H:%M:%S%z") + datetime.timedelta(hours=1)).isoformat()
    attendees = [issue_details['assignee_email']]

    create_event(summary, start_time, end_time, attendees)

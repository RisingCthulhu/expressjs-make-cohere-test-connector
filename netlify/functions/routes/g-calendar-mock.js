import { Router } from 'express';

const routes = Router();

const defaultEvent = {
    kind: 'calendar#event',
    etag: '"3431526128112000"',
    id: '47fg2o2238r4d0tumgl14cj9ro_default',
    status: 'confirmed',
    htmlLink:
        'https://www.google.com/calendar/event?eid=NDdmZzJvMjIzOHI0ZDB0dW1nbDE0Y2o5cm8gcnNoYTY1dDhoZ3U2NHNmZ2U4dWg4NXJxb2NAZw',
    created: '2024-05-08T10:06:55.000Z',
    updated: '2024-05-15T08:47:40.134Z',
    summary: 'new update name',
    description: 'saad',
    location: 'Lutsk',
    colorId: '4',
    creator: {
        email: 'devintegromat@gmail.com',
    },
    organizer: {
        email: 'rsha65t8hgu64sfge8uh85rqoc@group.calendar.google.com',
        displayName: 'calendar_1695747696_updated',
        self: true,
    },
    start: '2024-05-15T12:22:00.000Z',
    end: '2024-05-15T14:22:00.000Z',
    visibility: 'public',
    iCalUID: '47fg2o2238r4d0tumgl14cj9ro@google.com',
    sequence: 1,
    reminders: {
        useDefault: false,
        overrides: [
            {
                method: 'email',
                minutes: 2,
            },
        ],
    },
    eventType: 'default',
};

const fromGmailEvent = {
    kind: 'calendar#event',
    etag: '"3431526128112000"',
    id: '47fg2o2238r4d0tumgl14cj9ro_fromGmail',
    status: 'confirmed',
    htmlLink:
        'https://www.google.com/calendar/event?eid=NDdmZzJvMjIzOHI0ZDB0dW1nbDE0Y2o5cm8gcnNoYTY1dDhoZ3U2NHNmZ2U4dWg4NXJxb2NAZw',
    created: '2024-05-08T10:06:55.000Z',
    updated: '2024-05-15T08:47:40.134Z',
    summary: 'new update name',
    description: 'saad',
    location: 'Lutsk',
    colorId: '4',
    creator: {
        email: 'devintegromat@gmail.com',
    },
    organizer: {
        email: 'rsha65t8hgu64sfge8uh85rqoc@group.calendar.google.com',
        displayName: 'calendar_1695747696_updated',
        self: true,
    },
    start: '2024-05-15T12:22:00.000Z',
    end: '2024-05-15T14:22:00.000Z',
    visibility: 'public',
    iCalUID: '47fg2o2238r4d0tumgl14cj9ro@google.com',
    sequence: 1,
    reminders: {
        useDefault: false,
        overrides: [
            {
                method: 'email',
                minutes: 2,
            },
        ],
    },
    eventType: 'fromGmail',
};

routes.get('/calendars/:calendarId/events/:eventId', (req, res) => {
    const event =
        req.params.eventId === 'fromGmailEvent' ? fromGmailEvent : defaultEvent;

    res.send(event);
});
// routes.get('/calendars/:calendarId/fromGmailEvents/:eventId', (req, res) => {
//     res.send(fromGmailEvent);
// });

routes.patch('/calendars/:calendarId/events/:eventId', (req, res) => {
    const event =
        req.params.eventId === 'fromGmailEvent' ? fromGmailEvent : defaultEvent;

    const propsToUpdate = {
        colorId: req.colorId || event.colorId,
        summary: req.summary || event.summary,
        start: req.start || event.start,
        end: req.end || event.end,
        description: req.description || event.description,
        location: req.location || event.location,
        reminders: req.reminders || event.reminders,
        attendees: req.attendees || event.attendees,
        transparency: req.transparency || event.transparency,
        visibility: req.visibility || event.visibility,
        guestsCanModify: req.guestsCanModify || event.guestsCanModify,
        recurrence: req.recurrence || event.recurrence,
        attachments: req.attachments || event.attachments,
    };

    const updEvent = {
        ...event,
        ...propsToUpdate,
    };

    res.send(updEvent);
});

export default routes;

import { Router } from 'express';

const routes = Router();

const defaultEvent = {
	id: '123123123',
	attendees: [ { displayName: 'Make User', email: 'development@make.com' } ],
	eventType: 'default'
}

const fromGmailEvent = {
	id: '123123123',
	attendees: [ { displayName: 'Make User', email: 'development@make.com' } ],
	eventType: 'fromGmail'
}

routes.get('/calendars/:calendarId/defaultEvents/:eventId', (req, res) => {
    res.send({
        results: [ defaultEvent ],
    });
});
routes.get('/calendars/:calendarId/fromGmailEvents/:eventId', (req, res) => {
    res.send({
        results: [ fromGmailEvent ],
    });
});

routes.patch('/calendars/:calendarId/events/:eventId', (req, res) => {
	res.send(req.body)
})

export default routes;
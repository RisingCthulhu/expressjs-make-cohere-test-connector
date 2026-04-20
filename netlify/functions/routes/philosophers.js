import { Router } from 'express';

const routes = Router();

const philosophers = [
    {
        id: 'philosopher_doc_1',
        title: 'Socrates',
        text: 'Socrates was a classical Greek philosopher credited as one of the founders of Western philosophy. He is known for his Socratic method of questioning to prompt critical thinking and for his contribution to ethics.',
    },
    {
        id: 'philosopher_doc_2',
        title: 'Plato',
        text: 'Plato was an Athenian philosopher during the Classical period in Ancient Greece, founder of the Platonist school of thought, and the Academy, the first institution of higher learning in the Western world.',
    },
    {
        id: 'philosopher_doc_3',
        title: 'Aristotle',
        text: 'Aristotle was an Ancient Greek philosopher and polymath. His writings cover a broad range of subjects spanning the natural sciences, philosophy, linguistics, economics, politics, psychology, and the arts.',
    },
    {
        id: 'philosopher_doc_4',
        title: 'Confucius',
        text: 'Confucius was a Chinese philosopher and politician of the Spring and Autumn period. His philosophy, known as Confucianism, emphasized personal and governmental morality, correctness of social relationships, justice, and sincerity.',
    },
    {
        id: 'philosopher_doc_5',
        title: 'Heraclitus',
        text: 'Heraclitus was a pre-Socratic Greek philosopher known for his doctrine of change being central to the universe, as well as for his cryptic style and paradoxical sayings.',
    },
];

const DEFAULT_LIMIT = 2;
const INT_REGEX = /^[0-9]+$/;

const isEmpty = value => {
    return value === null || value === undefined;
}

routes.get('/search', (req, res) => {
    const { offset: rawOffset, limit: rawLimit } = req.query;

    if (!isEmpty(rawOffset) && !INT_REGEX.test(rawOffset)) {
        return res.status(400).send({ message: 'Offset should be a non-negative integer.' });
    }
    if (!isEmpty(rawLimit) && !INT_REGEX.test(rawLimit)) {
        return res.status(400).send({ message: 'Limit should be a non-negative integer.' });
    }

    const offset = !isEmpty(rawOffset) ? parseInt(rawOffset, 10) : 0;
    const limit = !isEmpty(rawLimit) ? parseInt(rawLimit, 10) : DEFAULT_LIMIT;

    const results = philosophers.slice(offset, offset + limit);

    let next = null;
    if (limit > 0 && offset + limit < philosophers.length) {
        const params = new URLSearchParams({
            offset: String(offset + limit),
            limit: String(limit),
        });
        next = `${req.baseUrl}${req.path}?${params.toString()}`;
    }

    res.send({ results, next });
});

export default routes;

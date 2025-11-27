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

const isEmpty = value => {
    return value === null || value === undefined;
}

routes.get('/search', (req, res) => {
    const { offset, limit } = req.query;
    const intRegExp = /^[0-9]+$/;

    if (!isEmpty(offset) && !intRegExp.test(offset)) {
        res.status(400).send({ message: 'Offset should be an integer.' })
    }

    if (!isEmpty(limit) && !intRegExp.test(limit ?? 5)) {
        res.status(400).send({ message: 'Limit should be an integer.' })
    }

    if (!isNaN(parseInt(offset))) {
        const startIdx = parseInt(offset);
        let endIdx = limit ? startIdx + parseInt(limit) : startIdx + 5;
        endIdx = endIdx > philosophers.length ? undefined : endIdx;
        const results = philosophers.slice(startIdx, endIdx)

        res.send({
            results,
        });
    }

    res.send({
        results: philosophers,
    });
});

export default routes;
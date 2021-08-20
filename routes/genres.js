const express = require('express')
const router = express.Router();

const genres = [
    { id: 1, name: "Genre 1" },
    { id: 2, name: "Genre 2" },
    { id: 3, name: "Genre 3" }
]


router.get('/', (req, res) => {
    if (!genres) return res.status(404).send('Courses could not be found');
    res.status(200).send(genres);
})

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: +genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.status(200).send(genre);
})

router.put('/', (req, res) => {
    let genre = genres.find(g => g.id == req.params.id)
    if (!genre) {
        res.status(404).send('Genre could not be found')
    }
    else {
        genre.name = req.params.name;
        res.status(200).send(genre)
    }
})

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
    });

    return schema.validate(genre);
}

module.exports = router;
const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const movies = [{ id: 1, name: 'Action' }, { id: 2, name: 'Horror' }, { id: 3, name: 'Romance' }];

app.get('/movies', (req, res) => {
  res.send(movies);
});

app.get('/movies/:id', (req, res) => {
  // validation
  const result = movies.find(c => c.id === parseInt(req.params.id));
  if (!result) {
    return res.status(404).send('invalid Id');
  }
  res.send(result);
});
app.post('/movies/', (req, res) => {
  const { error } = validateCourse(req.body); // check name
  if (error) return res.status(404).send(error.details[0].message);
  // validation
  const movie = {
    id: movies.length + 1,
    name: req.body.name,
  };
  movies.push(movie);
  res.send(movie);
});

app.put('/movies/:id', (req, res) => {
  const result = movies.find(c => c.id === parseInt(req.params.id));
  if (!result) return res.status(404).send('invalid Id');
  const { error } = validateCourse(req.body); // check name
  if (error) return res.status(404).send(error.details[0].message);
  // update
  result.name = req.body.name;
  // display
  console.log(parseInt(req.param.id));
  console.log(req.body.name + 'xxxx');
  console.log(req.body);
  res.send(result);
});

app.delete('/movies/:id', (req, res) => {
  const movie = movies.find(c => c.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('invalid Id');
  // find element in array
  const index = movies.indexOf(movie);
  // delete
  movies.splice(index, 1);
  // display deleted element
  res.send(movie);
});

function validateCourse(course) {
  schema = {
    name: Joi.string()
      .min(3)
      .required(),
  };
  return Joi.validate(course, schema);
}
app.listen(3000, () => {
  console.log('you are connected');
});

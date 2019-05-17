const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [{ id: 1, name: 'Muhannad' }, { id: 2, name: 'Hiba' }, { id: 3, name: 'Razan' }];

app.post('/api/courses', (req, res) => {
  // if (!req.body.name || req.body.name.length < 3) return res.status(404).send('invalid information') // old validate way
  const { error } = validateCourse(req.body); // new validate way
  if (error) return res.status(404).send(error.details[0].message);

  const course = {
    id: courses.length + 1, // automatic numeric
    name: req.body.name, // .name : check all name keys inside page
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  // find
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send({ error: 'invalid Id' });
  // validate
  const { error } = validateCourse(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  // update name
  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  // find
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send({ error: 'invalid Id' });
  // validate
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  // send the deleted course
  res.send(course);
});

app.get('/courses', (req, res) => {
  res.send(courses);
});

app.get('/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send({ error: 'invalid Id' });
  res.send(course);
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

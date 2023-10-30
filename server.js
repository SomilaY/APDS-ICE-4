const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000; 

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://SomilaY:Thekingishere16@somilacluster.kul1amk.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  username: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

app.post('/signup', (req, res) => {
  const userData = req.body;
  const newUser = new User(userData);

  newUser.save((err, user) => {
    if (err) {
      console.error('Error saving user:', err);
      res.status(500).json({ message: 'Error creating user' });
    } else {
      res.status(200).json({ message: 'User created successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

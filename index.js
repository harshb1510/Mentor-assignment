const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port =  3000;

app.use(session({
  secret: "arstu123", 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true } 
}));

app.use(cookieParser());

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }); // User is the userSchema
      
        if (user && bcrypt.compareSync(password, user.password)) {
          const userId = user._id;
          userIsAuthenticated = true;
        } else {
          userIsAuthenticated = false;
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
  
    if (userIsAuthenticated) {
      req.session.userId = userId;  
      res.cookie('sessionId', req.sessionID); 
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
  

  app.post('/signup', async (req, res) => {

    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = new User({
          email,
          password: hashedPassword
        });
      
        const savedUser = await user.save();
        const userId = savedUser._id;
        userCreatedSuccessfully = true;
      } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Signup failed' });
        return;
      }
  
    if (userCreatedSuccessfully) {
      req.session.userId = userId; 
      res.cookie('sessionId', req.sessionID); 
      res.json({ message: 'Signup successful' });
    } else {
      res.status(400).json({ message: 'Signup failed' });
    }
  });
  

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
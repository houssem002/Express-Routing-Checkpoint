const express = require('express');
const app = express();
const path = require('path');

// Middleware to check working hours
const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
    const hour = now.getHours(); // 0-23
    const isWorkingDay = day >= 1 && day <= 5; // Monday to Friday
    const isWorkingHour = hour >= 9 && hour < 17; // 9 AM to 5 PM
    
    if (isWorkingDay && isWorkingHour) {
        next();
    } else {
        res.send('<h1>Sorry, we are only available during working hours (Monday to Friday, 9 AM to 5 PM).</h1>');
    }
};

// Set up middleware
app.use(workingHoursMiddleware);

// Set up the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/services', (req, res) => res.render('services'));
app.get('/contact', (req, res) => res.render('contact'));

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

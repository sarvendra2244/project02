// airbnb.js
const express = require('express');
const path = require('path');
const app = express();

const storeRouter = require('./router/storeRouter');
const { hostRouter } = require('./router/hostRouter');
const rootDir = require('./utils/path');
const errorController = require('./controller/errors');
const { mongoConnect } = require('./utils/databaseUtil');

// View engine setup
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routers
app.use(storeRouter);
app.use('/host', hostRouter);

// Error handler
app.use(errorController.errorController);

// Port binding for Render
const PORT = process.env.PORT || 3000;

// Connect to DB, then start server
mongoConnect()
  .then(client => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Database connection failed:", err);
  });


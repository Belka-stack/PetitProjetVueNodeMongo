var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mydb_test"); // On se connecte à mydb_test

var listSchema = mongoose.Schema({
  text : String  // texte associé à l'élément liste
});

// association du modèle List à lacollection elements

var List = mongoose.model("elements", listSchema);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Création d'un nouvelle élément dans la liste

// Route GET /list
app.get('/list', async (req, res) => {
  try {
      const elements = await Element.find(); // Utilisation de async/await pour récupérer les éléments
      res.status(200).json({ elements });
  } catch (error) {
      console.error("Erreur lors de la récupération des éléments:", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Route POST /list
app.post('/list', async (req, res) => {
  try {
      const newElement = await Element.create(req.body); // Utilisation de async/await pour créer un élément
      res.status(201).json(newElement);
  } catch (error) {
      console.error("Erreur lors de la création de l'élément:", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Route PUT /list
app.put('/list/:id', async (req, res) => {
  try {
      const updatedElement = await Element.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedElement);
  } catch (error) {
      console.error("Erreur lors de la mise à jour de l'élément:", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Route DELETE /list
app.delete('/list/:id', async (req, res) => {
  try {
      await Element.findByIdAndDelete(req.params.id); // Utilisation de async/await pour supprimer un élément
      res.status(200).json({ message: "Élément supprimé" });
  } catch (error) {
      console.error("Erreur lors de la suppression de l'élément:", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
  }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
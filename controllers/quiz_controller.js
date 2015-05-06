var models = require('../models/models.js');

// GET /quizes
exports.index = function(req, res) {
  
  if (typeof req.query.search == "string" && req.query.search.trim() != ""){
    models.Quiz.findAll({where: ["pregunta like ?", '%' + req.query.search + '%'], order: 'pregunta ASC'}).then(function(quizes){
      res.render('quizes/index', { quizes: quizes, query: req.query.search });
    });
  }
  else {
    models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index', { quizes: quizes });
    });
  }
  models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index.ejs', { quizes: quizes});
  })
};

/*exports.search = function (req, res) {
  if (req.query.serach){
    modes.Quiz.findAll({where: ["pregunta like ?", '%' +req.query.search+ '%'], order: 'pregunta ASC'}).then(function(){
      res.render('quizes/index', { quizes: quizes });
    });
  }
  else {
    models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index', { quizes: quizes});
    })
  }
};
*/

// GET /quizes/:id
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', { quiz: quiz});
  })
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    if (req.query.respuesta === quiz.respuesta) {
      res.render('quizes/answer', 
                 { quiz: quiz, respuesta: 'Correcto' });
    } else {
      res.render('quizes/answer', 
                 { quiz: quiz, respuesta: 'Incorrecto'});
    }
  })
};
var models = require('../models/models.js');

//GET /statistics
exports.statistics = function(req, res){

	models.Quiz.findAll({include: [{ model: models.Comment}]}).then(function(quizes) {
	res.render('statistics/statistics.ejs', {preguntas: quizes, 
		errors: [] }).catch(function(error){next(error);});
	
	})
};
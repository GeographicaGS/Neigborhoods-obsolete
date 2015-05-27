var express = require('express');
var router = express.Router();
var db = require('../db/db.js');
var IndicatorModel = db.IndicatorModel;

/* GET home page. */
router.get('/indicator/:id', function(req, res, next) {
	var id = req.params.id;
	IndicatorModel.getIndicator(id,function(err,dataIndicator){
		IndicatorModel.getIndicatorData(dataIndicator[0].table_name,function(err,data){
			IndicatorModel.getCities(function(err,dataCity){
				res.render('indicator', { 
					title: 'Barriadas obsoletas',
					indicator:dataIndicator[0],
					cities:dataCity,
					data:data
				});
			});
		});
	});
});

module.exports = router;

var express = require('express');
var router = express.Router();
var db = require('../db/db.js');
var FamilyModel = db.FamilyModel;
var NeighborhoodsModel = db.NeighborhoodsModel;

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Barriadas obsoletas' });
  	FamilyModel.getFamilies(function(err,data){
		res.render('index',{
			title: 'Barriadas obsoletas',
			families: data
    	});
	});
});

router.get('/neighborhods_geom', function(req, res, next) {
  	NeighborhoodsModel.getGeoms(function(err,data){
  		var geom = [];
  		for(var i=0; i<data.length; i++){
  			var aux = JSON.parse(data[i].geom);
  			geom.push({'type': 'MultiPolygon', 'coordinates':aux.coordinates})
  		}
		res.json({'result': geom })
	});
});

module.exports = router;

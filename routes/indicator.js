var express = require('express');
var router = express.Router();
var db = require('../db/db.js');
var FamilyModel = db.FamilyModel;
var IndicatorModel = db.IndicatorModel;


router.get('/indicators', function(req, res, next) {
  // res.render('index', { title: 'Barriadas obsoletas' });
  	FamilyModel.getFamilies(function(err,data){
		res.render('indicator_list',{
			title: 'Barriadas obsoletas',
			families: data
    	});
	});
});

router.get('/indicator/:id', function(req, res, next) {
	var id = req.params.id;
	IndicatorModel.getIndicator(id,function(err,dataIndicator){
		IndicatorModel.getIndicatorData(dataIndicator[0].table_name,function(err,data){
			IndicatorModel.getCities(function(err,dataCity){
				IndicatorModel.getTowns(function(err,dataTown){
					res.render('indicator', { 
						title: 'Barriadas obsoletas',
						indicator:dataIndicator[0],
						cities:dataCity,
						towns:dataTown,
						data:data
					});
				});
			});
		});
	});
});

router.get('/indicator_level/:id', function(req, res, next) {
	var id = req.params.id;
	IndicatorModel.getLevel_1(id,function(err,data_level_1){
		IndicatorModel.getLevel_2(id,function(err,data_level_2){

			IndicatorModel.getLevel_3_supNeigh(id,function(err,data_level_3_supNeigh){
				IndicatorModel.getLevel_3_walkerLong(id,function(err,data_level_3_walkerLong){
					IndicatorModel.getLevel_3_roadsLong(id,function(err,data_level_3_roadsLong){
						IndicatorModel.getLevel_3_partyAreas(id,function(err,data_level_3_partyAreas){
							IndicatorModel.getLevel_3_mixedStreets(id,function(err,data_level_3_mixedStreets){
								IndicatorModel.getLevel_3_walkerStreets(id,function(err,data_level_3_walkerStreets){
									IndicatorModel.getLevel_3_buildingSup(id,function(err,data_level_3_buildingSup){
										IndicatorModel.getLevel_3_gardenSup(id,function(err,data_level_3_gardenSup){
											res.render('indicator_level', {
												level1:data_level_1[0],
												level2:data_level_2[0],
												level3SupNeigh:data_level_3_supNeigh[0],
												level3WalkerLong:data_level_3_walkerLong[0],
												level3RoadsLong:data_level_3_roadsLong[0],
												level3PartyAreas:data_level_3_partyAreas[0],
												level3MixedStreets:data_level_3_mixedStreets[0],
												level3WalkerStreets:data_level_3_walkerStreets[0],
												level3BuildingSup:data_level_3_buildingSup[0],
												level3GardenSup:data_level_3_gardenSup[0]
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
});

module.exports = router;

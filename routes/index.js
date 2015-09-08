var express = require('express');
var router = express.Router();
var db = require('../db/db.js');
var NeighborhoodsModel = db.NeighborhoodsModel;
var IndicatorModel = db.IndicatorModel;

/* GET home page. */
router.get('/', function(req, res, next) {
  	NeighborhoodsModel.getNeighborhoodsList(function(err,data){
      IndicatorModel.getCities(function(err,dataCity){
        IndicatorModel.getTowns(function(err,dataTown){
      		res.render('index',{
      			title: 'Barriadas obsoletas',
      			indicators: data,
            cities:dataCity,
            towns:dataTown
          });
        });
      });
	});
});

router.get('/data', function(req, res, next) {
    NeighborhoodsModel.getNeighborhoodsList(function(err,data){
      IndicatorModel.getCities(function(err,dataCity){
        IndicatorModel.getTowns(function(err,dataTown){
          res.render('data_list',{
            title: 'Barriadas obsoletas',
            indicators: data,
            cities:dataCity,
            towns:dataTown
          });
        });
      });
  });
});

router.get('/neighborhods_geom', function(req, res, next) {
    var result = {};
    NeighborhoodsModel.getGeoms(function(err,data){
      result["neighbors"] = createGeomArray(data, 'MultiPolygon');

      NeighborhoodsModel.getGardenGeoms(function(err,data){
        result["gardens"] = createGeomArray(data, 'MultiPolygon');
        
        NeighborhoodsModel.getBuildingsGeoms(function(err,data){
          result["buildings"] = createGeomArray(data, 'MultiPolygon');
          
          NeighborhoodsModel.getWalkerStreetGeoms(function(err,data){
            result["walkerStreet"] = createGeomArray(data, 'MultiPolygon');

            NeighborhoodsModel.getMixedStreetGeoms(function(err,data){
              result["mixedStreet"] = createGeomArray(data, 'MultiPolygon');
              
              NeighborhoodsModel.getNeighborSupGeoms(function(err,data){
                result["neighborSup"] = createGeomArray(data, 'MultiPolygon');
                
                NeighborhoodsModel.getPlaytimeGeoms(function(err,data){
                  result["playtime"] = createGeomArray(data, 'MultiPolygon');
                  
                  NeighborhoodsModel.getRoadsLongGeoms(function(err,data){
                    result["roads"] = createGeomArray(data,'MultiLineString');
                    
                    NeighborhoodsModel.getWalkerLongGeoms(function(err,data){
                      result["longWalker"] = createGeomArray(data,'MultiLineString');
                      res.json(result);
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

function createGeomArray(data, type){
  var geom = [];
  for(var i=0; i<data.length; i++){
    var aux = JSON.parse(data[i].geom);
    geom.push({'type': type, 'properties':{'town':data[i].town, 'nom_barr':data[i].nom_barr, 'nombrebloq': data[i].nombrebloq}, 'coordinates':aux.coordinates})
  }
  return geom;
}

module.exports = router;

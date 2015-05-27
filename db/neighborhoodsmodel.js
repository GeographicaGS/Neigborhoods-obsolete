var db = require('./db.js');
var BaseModel = db.BaseModel;

function NeighborhoodsModel() {
}

NeighborhoodsModel.prototype.getGeoms = function(callback){
	BaseModel.query(callback,'select ST_AsGeoJSON(ST_Transform(geom,4326)) as geom from data.neighborhoods');
};


module.exports = NeighborhoodsModel;


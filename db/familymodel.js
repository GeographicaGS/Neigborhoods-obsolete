var db = require('./db.js');
var BaseModel = db.BaseModel;

function FamilyModel() {
}

FamilyModel.prototype.getFamilies = function(callback){
	BaseModel.query(callback,'select i.id as id_indicator, f.name as family_name, i.name as indicator_mame, f.id as id_family from catalog.family f inner join catalog.indicator i on f.id = i.id_family order by "order", id_indicator');
};


module.exports = FamilyModel;


var db = require('./db.js');
var BaseModel = db.BaseModel;

function IndicatorModel() {
}

IndicatorModel.prototype.getIndicator = function(id,callback){
	BaseModel.query(callback,'select i.name as indicator_name, i.note, f.name as family_name, f.id as family_id, i.table_name, i.umbral from catalog.indicator i inner join catalog.family f on f.id = i.id_family where i.id = $1', [id]);
};

IndicatorModel.prototype.getCities = function(callback){
	BaseModel.query(callback,'select distinct(city) as name from data.neighborhoods order by city');
};

IndicatorModel.prototype.getTowns = function(callback){
	BaseModel.query(callback,'select distinct(town) as name, city from data.neighborhoods order by town');
};

IndicatorModel.prototype.getIndicatorData = function(table,callback){
	BaseModel.query(callback,'select data.nombrebloq, n.nom_barr,n.city, n.town, data.valor, ST_X(ST_Centroid(ST_Transform(n.geom,4326))) as lng, ST_Y(ST_Centroid(ST_Transform(n.geom,4326))) as lat from data.' + table + ' data inner join data.neighborhoods n on data.nombrebloq = n.nombrebloq order by n.town');
};

IndicatorModel.prototype.getLevel_1 = function(id,callback){
	BaseModel.query(callback,'select n.nom_barr, sub.gid, sub.area, sub.nombrebloq, sub.dens_viv, sub.num_viv, sub.edad_pob, sub.agno_fin,'+ 
						       'sub.nombr_barr, sub.promotor, sub.arquitecto, sub.analfabet, sub.sin_estudi, sub.est_1_grad,'+
						       'sub.est_2_grad, sub.est_3_grad, sub.no_aplicab, sub.ocupados, sub.estudiant, sub.desemplead,'+ 
						       'sub.subsd_rent, sub.otra_situa, sub.extranjer, sub.viv_ppales, sub.viv_secund, sub.viv_vacias, '+ 
						       'sub.propiedad, n.tiene_aplicacion_mbp, n.tiene_ficha_patrimonial, ' +
						       ' (select count(*) from data.neighborhoods_proyecto where nombrebloq=n.nombrebloq) as num_images' +
						       ' from nivel_1.barriadas sub inner join data.neighborhoods n on sub.nombrebloq = n.nombrebloq  where sub.nombrebloq = $1', [id]);
};

IndicatorModel.prototype.getLevel_2 = function(id,callback){
	BaseModel.query(callback,'select area, nombrebloq, num_viv, dens_viv, edad_pob, agno_fin, nombr_barr,'+ 
						       'promotor, arquitecto, analfabet, sin_estudi, est_1_grad, est_2_grad,'+
						       'est_3_grad, no_aplicab, ocupados, estudiant, desemplead, subsd_rent,'+ 
						       'otra_situa, extranjer, viv_ppales, viv_secund, viv_vacias, tipologia,'+ 
						       'ev_muro, ev_pilares, eh_pt_tipo, eh_pt_estr, eh_pt_secu, eh_pt_entr,'+ 
						       'eh_p0_tipo, eh_p0_estr, eh_p0_secu, eh_p0_entr, ec_posicio, ec_tipo,'+ 
						       'ec_estr_pp, ec_secunda, ec_entrevi, e_observac, ci_tipo, ci_tipo_ci,'+ 
						       'ci_tipo__1, ci_sist_co, ci_observa, cv1_nombre, cv1_tipo, cv1_aislam,'+ 
						       'cv1_compos, cv2_nombre, cv2_tipo, cv2_aislam, cv2_compos, cv3_nombre,'+ 
						       'cv3_tipo, cv3_aislam, cv3_compos, cv4_nombre, cv4_tipo, cv4_aislam,'+ 
						       'cv4_compos, cv_observa, cu_tipo, cu_posicio, cu_aislam_, cu_capa_im,'+ 
						       'cu_tipo_ca, cu_composi, cu_observa, fnh1_nombr, fnh1_uso_e, fnh1_aisla,'+ 
						       'fnh1_tipo_, fnh1_compo, fnh2_nombr, fnh2_uso_e, fnh2_aisla, fnh2_tipo_,'+ 
						       'fnh2_compo, fnh_observ, fe_nombre, fe_aislam_, fe_composi, fe_observa,'+ 
						       'ft_nombre, ft_aislam_, ft_composi, ft_observa, h1_nombre, h1_tipo_vi,'+ 
						       'h1_composi, h1_tipo_ca, h1_tipo_pr, h1_retranq, h_observac, re_tipo_re,'+ 
						       're_tipo_ba, re_tipo_co, re_solucio, ra_tipo_co, ra_solucio, ie_tipo_co,'+ 
						       'ie_solucio, ic_sist_co, ic_tipo_si, ic_producc, ic_solucio, iacs_sist_,'+ 
						       'iacs_tipo_, iacs_combu, iacs_capta, iacs_sis_1, iacs_soluc, ir_sist_co,'+ 
						       'ir_tipo_si, ir_descrip, ir_aparato, ir_solucio, iv_sist_lo, iv_sist_ap,'+ 
						       'i_pci, i_pararray, ict_soluci, ict_canali, i_observac, ee_reforma,'+ 
						       'ee_refor_1 from nivel_2.sub_barriada where nombrebloq = $1', [id]);
};

IndicatorModel.prototype.getLevel_3_supNeigh = function(id,callback){
	BaseModel.query(callback,'select gid, area, nombrebloq, dens_viv, id, barriada, provincia, secciones,'+ 
						       'promotor, arquitecto, agno_fin, num_viv, hab_viv, vol_edific,'+
						       'sup_edific, tipologia, sup_s_traf, otras_tip_, propiedad_, ev_muro,'+ 
						       'ev_pilares, eh_pt_tipo, eh_pt_estr, eh_pt_secu, eh_pt_entr, eh_p0_tipo,'+
						       'eh_p0_estr, eh_p0_secu, eh_p0_entr, ec_posicio, ec_tipo, ec_estr_pp,'+ 
						       'ec_secunda, ec_entrevi, e_observac, ci_tipo, ci_tipo_ci, ci_tipo__1,'+ 
						       'ci_sist_co, ci_observa, cv1_nombre, cv1_tipo, cv1_aislam, cv1_compos,'+ 
						       'cv2_nombre, cv2_tipo, cv2_aislam, cv2_compos, cv3_nombre, cv3_tipo,'+ 
						       'cv3_aislam, cv3_compos, cv4_nombre, cv4_tipo, cv4_aislam, cv4_compos,'+ 
						       'cv_observa, cu_tipo, cu_posicio, cu_aislam_, cu_capa_im, cu_tipo_ca,'+ 
						       'cu_composi, cu_observa, fnh1_nombr, fnh1_uso_e, fnh1_aisla, fnh1_tipo_,'+ 
						       'fnh1_compo, fnh2_nombr, fnh2_uso_e, fnh2_aisla, fnh2_tipo_, fnh2_compo,'+ 
						       'fnh_observ, fe_nombre, fe_aislam_, fe_composi, fe_observa, ft_nombre,'+ 
						       'ft_aislam_, ft_composi, ft_observa, h1_nombre, h1_tipo_vi, h1_composi,'+ 
						       'h1_tipo_ca, h1_tipo_pr, h1_retranq, h_observac, re_tipo_re, re_tipo_ba,'+
						       're_tipo_co, re_solucio, ra_tipo_co, ra_solucio, ie_tipo_co, ie_solucio,'+ 
						       'ic_sist_co, ic_tipo_si, ic_producc, ic_solucio, iacs_sist_, iacs_tipo_,'+ 
						       'iacs_combu, iacs_capta, iacs_sis_1, iacs_soluc, ir_sist_co, ir_tipo_si,'+ 
						       'ir_descrip, ir_aparato, ir_solucio, iv_sist_lo, iv_sist_ap, i_pci,'+ 
						       'i_pararray, ict_soluci, ict_canali, i_observac, ee_reforma, ee_refor_1,'+
						       'id_tipolog, bloque_ana, ref_catast, dm_zona_cl, dm_altitud, dm_vel_med,'+ 
						       'dm_dir_vie, dm_tse_min, dm_tse_max, dm_temp_hu, dm_omd_ver, dm_omd_anu,'+ 
						       'de_fachad, de_cubier, de_forjad, de_suelos, de_suel_1, de_huecos,'+ 
						       'de_huec_1, de_median, de_partic, de_pt_pila, de_pt_num_, de_pt_fren,'+
						       'de_pt_caja, ig_sup_env, ig_porc_cu, ig_porc_fa, ig_porc_ce, ig_porc_hu,'+
						       'ig_porc__1, ig_porc__2, ig_porc__3, ig_porc__4, ig_porc__5, ig_porc__6,'+ 
						       'ig_porc__7, ig_porc__8, ig_factor, ig_sup_uti, ig_sup_u_1, ig_sup_u_2,'+ 
						       'ce_sist_ac, ce_sist_ca, ce_sist_re, ce_inst_en, ce_generac, ce_cal_e_g,'+ 
						       'ce_cal_e_p, ce_cal_e_1, ce_cal_e_2, vv_viviend, vv_vivie_1, vv_vivie_2,'+ 
						       'ind_vv, oc_ocupado, oc_estudia, oc_desempl, oc_subs_re, oc_otros,'+ 
						       'ind_oc, ed_65, ind_ed, in_extranj, ind_in, ne_analfab, ne_sin_est,'+ 
						       'ne_est_1_g, ne_est_2_g, ne_est_3_g, ne_no_apli, ind_ne, pv_precio_,'+ 
						       'pv_preci_1, pv_preci_2, ind_pv, total_ind_, clase_obs_, el_acc_mal,'+ 
						       'el_acc_m_1, ind_el_acc, el_pu_mal_, el_pu_ma_1, el_pu_mob_, el_pu_mo_1,'+
						       'el_pu_ocup, ind_el_pu, mov_ctp_su, mov_ctp__1, mov_ctp_fr, mov_ctp__2,'+ 
						       'ind_mov_ct, cu_cob_eq_, cu_cob_e_1, cu_cob_e_2, cu_cob_e_3, cu_cob_e_4,'+ 
						       'cu_cob_e_5, cu_cob_e_6, cu_cob_e_7, cu_cob_e_8, cu_cob_e_9, cu_cob_e10,'+ 
						       'cu_cob_e11, cu_cob_e12, cu_cob_e13, ind_cu_cob, cu_dot_com, cu_dot_c_1,'+ 
						       'cu_dot_c_2, ind_cu_dot, ed_est_num, ed_est_n_1, ed_est_blo, ind_ed_est,'+ 
						       'ed_acc_num, ed_acc_blo, ind_ed_acc, fa_barr_ur, fa_barr__1, fa_barr__2,'+ 
						       'fa_barr__3, ind_fa_bar, total_in_1, clase_ob_1, total_ind, total_clas,'+ 
						       'key_bloq from nivel_3_agrupado.sup_barriada where upper(key_bloq) = $1', [id]);
};

IndicatorModel.prototype.getLevel_3_walkerLong = function(id,callback){	
	BaseModel.query(callback,'select key_bloq,nombrebloq,longitud from nivel_3_agrupado.long_peaton where upper(key_bloq) = $1', [id]);
};

IndicatorModel.prototype.getLevel_3_roadsLong = function(id,callback){
	BaseModel.query(callback,'select key_bloq,nombrebloq,longitud from nivel_3_agrupado.long_vias where upper(key_bloq) = $1', [id]);
};

IndicatorModel.prototype.getLevel_3_partyAreas = function(id,callback){
	BaseModel.query(callback,'select key_bloq,area,nombrebloq,barriada,provincia,accesible,estado,ajardinami,mobiliario from nivel_3_agrupado.sup_areasrecreo where upper(key_bloq) = $1', [id]);
};

IndicatorModel.prototype.getLevel_3_mixedStreets = function(id,callback){
	BaseModel.query(callback,'select key_bloq,area,nombrebloq,barriada,provincia,accesible,mobiliario from nivel_3_agrupado.sup_callesmixta where upper(key_bloq) = $1', [id]);
};

IndicatorModel.prototype.getLevel_3_walkerStreets = function(id,callback){
	BaseModel.query(callback,'select key_bloq,area,nombrebloq,barriada,provincia,accesible,mobiliario from nivel_3_agrupado.sup_callespeaton where upper(key_bloq) = $1', [id]);
};

IndicatorModel.prototype.getLevel_3_buildingSup = function(id,callback){
	BaseModel.query(callback,'select key_bloq,area,nombrebloq from nivel_3_agrupado.sup_edificaciones where upper(key_bloq) = $1', [id]);
};

IndicatorModel.prototype.getLevel_3_gardenSup = function(id,callback){
	BaseModel.query(callback,'select key_bloq,area,nombrebloq,barriada,provincia,accesible,estado,ajardinami,mobiliario from nivel_3_agrupado.sup_jardin where upper(key_bloq) = $1', [id]);
};


module.exports = IndicatorModel;


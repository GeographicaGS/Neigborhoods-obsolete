function DataLevel(){
	DataLevel.prototype.onReady = function(){
		$('#dataLevel').unbind().on('click', '.levels span', function(event) {
			$('#dataLevel .levels span').removeClass('active');
			$(this).addClass('active');

			$('#dataLevel .level_1').addClass('hide');
			$('#dataLevel .level_2').addClass('hide');
			$('#dataLevel .level_3').addClass('hide');
			$('#dataLevel .' + $(this).attr('level')).removeClass('hide');

		});

		$("#dataLevel").on('click', '.back-to-page', function(event) {
			$('.banner nav a[href="data"]').trigger('click')
		});
	}
}
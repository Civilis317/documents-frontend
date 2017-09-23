$(document).ready(function() {
	if ($('#modalContainer')[0]){
		$('.modal').click(function(){
			$(this).toggle();
			$('#modalContainer').toggle();
		});
		$('.close-modal').click(function(e){
			e.preventDefault();
			$('.qtip.qtip-default').hide();
			$('.tooltip').removeClass('is-active');
			$(this).closest('.modal').toggle();
			$('#modalContainer').toggle();
		});
		$('.modal section').click(function(e){
			e.stopPropagation();
		});
		
		$('.has-modal').click(function(e){
			
			e.preventDefault();
			$('.qtip.qtip-default').hide();
			$('.tooltip').removeClass('is-active');
			var target = $(this).data('target'); 
			$(target).toggle();
			$('#modalContainer').toggle();
		});
	}
	
	/* Prevent button click when disabled */
	$('body').on('click', 'a.disabled', function(e) {
		e.preventDefault();
	});


	$( ".datepicker" ).datepicker({		
	});
	
	
    $('body').on('mouseenter', '.has-tooltip', function () {
        $(this).qtip({
            overwrite: false, // Don't overwrite tooltips already bound
			content: {
				text: $(this).next('span'),
				button: true
			},
			position: {
				my: 'center left',
				at: 'center left',
				adjust: {
					x: 20
				},
				viewport: $(window),
			container: $(this).closest('div.modal').find('.form-section')
			},
			show: {
				event: 'click'
			},
			hide: {
				event: 'click'
			},
			events: {
				toggle: function(event, api) {
					api.elements.target.toggleClass('is-active');
				}
			}
        });
    });	
});

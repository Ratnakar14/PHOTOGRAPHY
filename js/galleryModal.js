var modal = (function() {
	var $window = $(window);
	var $modal = $('<div class="modal"></div>');
	var $modalCnt = $('<div class="modalContent"></div>');
	var $close = $('<img class="closeModal" src="images/close-s.png"/>');
	var $viewImg = $('#viewImage');

	$modal.append($close, $modalCnt);

	$close.on('click', function() {
		modal.close();
	});

	return {
		center: function() {
			var top = Math.max($window.height() - $modal.outerHeight(),0) / 2;
			var left = Math.max($window.width() - $modal.outerWidth(),0) / 2;

			$modal.css({
				top:top + $window.scrollTop(),
				left:left + $window.scrollLeft()
			});
		},

		open: function(settings) {
			$viewImg.css({display: 'initial'});
			$modalCnt.empty().append(settings.content);
			$modal.css({
				width:settings.width || 'auto',
				height:settings.height || 'auto'
			}).appendTo('body');
			modal.center();
			$window.on('resize', modal.center);
		},

		close: function() {
			$modalCnt.empty();
			$modal.detach();
			$window.off('resize', modal.center);
		}		
	};
}());

//hide modal until image is clicked on
(function() {
	var $modalCnt = $('#viewImage').detach();
	$('.gaImg').on('click', function() {
		//grab the id # of the image clicked on and create the larger version
		//in the photobox
		var thisId = $(this).attr('id');
		$modalCnt.children().first().empty()
			.append("<img src='images/gallery/image" + thisId.replace(/gi/,'') + "-600.jpg'/>");

		modal.open({content: $modalCnt, width:640, height:405});
	});
}());
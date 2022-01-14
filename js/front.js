$(function() {
	var $slider = $('#slider');
	var $sGroup = $('#slide-group');
	var $slides = $('.slides');
	var $LRBtns = $('.LRBtns');
	var btnArray = [];
	var timeout;
	var thisIndex = 0;

	//checks current activity of slides(animated or showing)
	//updates the class of the current button with current slide, sets
	//the values for animating the next slide movement
	function slide(newIndex) {
		var slideLeft;
		var animateLeft;
		next();

		if($sGroup.is(':animated') || thisIndex === newIndex) {
			return;
		};
		btnArray[thisIndex].removeClass('active');
		btnArray[newIndex].addClass('active');
		if(newIndex > thisIndex) {
			//slide left for the next slide, animate left for the current
			slideLeft = '100%';
			animateLeft = '-100%';
		}else{
			slideLeft = '-100%';
			animateLeft = '100%';
		};
		//position the next slide to show
		$slides.eq(newIndex).css({
			left: slideLeft,
			display: 'block'
		});
		$sGroup.animate({left: animateLeft}, function() {
			$slides.eq(thisIndex).css({display: 'none'});
			$slides.eq(newIndex).css({left: 0});
			$sGroup.css({left: 0});
			thisIndex = newIndex;
		});		
	};

	function next() {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			if(thisIndex < $slides.length-1) {
				slide(thisIndex+1);
			}else{
				slide(0);
			};
		}, 5000);
	};

	$slides.each(function(index) {
		var $btn = $('<button type="button" class="slide-btn">&bull;</button>');
		if(index === thisIndex) {
			$btn.addClass('active');
		};
		$btn.on('click', function() {
			slide(index);
		}).appendTo('#slide-btns');
		btnArray.push($btn);
	});

	$LRBtns.on('click', function() {
		//left button
		if($(this).is('#leftBtn')) {
			if(thisIndex === 0) {
				slide($slides.length-1);
			}else{
				slide(thisIndex-1);
			};
		//right button
		}else{
			if(thisIndex < $slides.length-1) {
				slide(thisIndex+1);
			}else {
				slide(0)
			}
		};
	});
	next();
})
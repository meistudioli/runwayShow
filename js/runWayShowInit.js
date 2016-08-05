var init;

init = {
	displayCnt: 0,
	runwayShows: [],
	callBack: function(action, host) {
		if (action == 'mousemove') return;

		console.log('callBack', arguments);
		
		if (init.displayCnt < init.runwayShows.length && action == 'ended') {
			init.displayCnt++;
			if (init.runwayShows[init.displayCnt]) init.runwayShows[init.displayCnt].play();
			
			//set triggerByHover
			if (init.displayCnt >= init.runwayShows.length && !isEventSupported('touchstart')) {
				[].slice.call(document.querySelectorAll('li')).forEach(
					function(li) {
						li.classList.add('guide');
					}
				);
				init.runwayShows[0].set('triggerByHover', true);
			}//end if
		}//end if
	}
};

function pageInit() {
	var runwayShows, c, max, iid;
	// http://www.apple.com/macbook-pro/features-retina/
	// http://www.html5rocks.com/en/tutorials/shapes/getting-started/
	// https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside

	init.runwayShows = [].slice.call(document.querySelectorAll('runway-show'));
	c = 0;
	max = 10000;
	iid = setInterval(
		function() {
			c += 5;
			if (c >= max) {
				clearInterval(iid);
				return;
			}//end if
			if (init.runwayShows[0].addCallback && init.runwayShows[1].addCallback && init.runwayShows[0].get('isReady') && init.runwayShows[1].get('isReady')) {
				clearInterval(iid);
				init.runwayShows[0].addCallback(init.callBack);
				init.runwayShows[1].addCallback(init.callBack);

				init.runwayShows[0].set('aspect', 'left');
				init.runwayShows[0].play();
			}//end if
		}
	, 5);
}
/*programed by mei(李維翰), http://www.facebook.com/mei.studio.li*/

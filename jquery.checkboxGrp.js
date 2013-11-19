(function($){
	var EVENT_NAME = 'change.mthGroupingPlugin'

	var prependChange = function(elem, handler){
		var el = $(elem)[0];
		var evcpy = [];
		var i;

		elem.off(EVENT_NAME);
		var events = $._data(el, 'events')['change'];
		for (i=0; i<events.length; i++){
			evcpy.push(events[i]);
		}

		elem.off('change');
		elem.on(EVENT_NAME, handler);

		for (i=0; i<evcpy.length; i++){
			var name;
			if(evcpy[i].namespace){
				name = evcpy[i].type + '.' + evcpy[i].namespace;
			}else{
				name = evcpy[i].type;
			}
			elem.on(name, evcpy[i].handler);
		}
	};

	$.fn.checkboxGrp = function(options){

		var grp = this;
		grp.each(function(){

			var o = {changeMethod: 'check'};
			$.extend(o, options);

			var $grp = grp;
			var fn = function(ev){

				$grp.not($(this)).each(function(){

					if ($(this).prop('checked')){
						if ('click' === o.changeMethod){
							$(this).off(EVENT_NAME);
							$(this).trigger('click');
							prependChange($(this), fn);
						} else {
							$(this).prop('checked', false);
						}
					}
				});
			};

			if ('click' === o.changeMethod){
				$(this).off(EVENT_NAME);
				prependChange($(this), fn);
			} else {
				$(this).off(EVENT_NAME).on(EVENT_NAME, fn);
			}
			delete grp;
		});

	};

})(jQuery);

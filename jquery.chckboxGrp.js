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

	/* options
	 * changeMethod check|click if option is set to check currently
	 *				selected checkbox is simply checked/unchecked.
	 *				If option is click then click event is fired. It
	 *				has big impact on wchich events are fired. Eg.
	 *				checkbox1 is currently checked and checkbox2 is
	 *				clicked.
	 *				With check method events fired are:
	 *				checkbox2.click, checkbox2.change
	 *				With click method events fired are:
	 *				checkbox2.click, checkbox1.click, checkbox1.change,
	 *				checkbox2.change.
	 *
	 *				Plugin works that way that currently unchecking
	 *				checkbox's change event is always fired before
	 *				currently checking chekbox's one. This allows
	 *				to make cleanup.
	 */

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

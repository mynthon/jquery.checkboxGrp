(function($){
	var EVENT_NAMESPACE = 'mthGroupingPlugin';
	var EVENT_NAME = 'change.' + EVENT_NAMESPACE;

	var uniqueId = function($element){
		if ($element.attr('id') === undefined){
			$element.attr('id', 'chbxuq' + (Math.round(Math.random() * 10000000)) + '_' + (Math.round(Math.random() * 10000000)));
		}
		return $element.attr('id');
	};

	$.fn.checkboxGrp = function(options){
		var clickedId = null;
		var grp = this;
		var o = {changeMethod: 'check'};

		$.extend(o, options);

		grp.each(function(){
			var $this = $(this);

			$this.off(EVENT_NAME).on(EVENT_NAME, function(ev){

				if (clickedId === null){
					clickedId = uniqueId($this);
				} else {
					// this event wasn't triggered by clicking on this object
					// but by clicking other object in this checkboxes group,
					// so we must skip it
					if (ev.handleObj.namespace === EVENT_NAMESPACE){
						return true;
					}
				}

				grp.each(function(){
					var l2this = this;
					var l2$this = $(l2this);

					// Click was on this object anyway, so we should not trigger events second time
					if (clickedId === uniqueId(l2$this)) { return true; }

					// this element is unchecked so we should skip
					if (l2$this.prop('checked') === false){ return true; }

					if (o.changeMethod === 'click'){
						if (o.eventExtraParams){
							l2$this.trigger('click', o.eventExtraParams);
						} else {
							l2$this.trigger('click');
						}

					}else{
						l2$this.prop('checked', false);
					}
				})

				clickedId = null;
			});


		});

	};

})(jQuery);

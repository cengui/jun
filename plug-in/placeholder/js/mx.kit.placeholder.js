MX.kit.placeholder = function( inputlist ){
	/**
		isempty = 1 || 0;
		isdefaultvalue = 1 || 0
	*/
	

	var isSupportPlaceholder = document.createElement('input').placeholder === "" ? true : false;
	
	for(var i=0; i<inputlist.length; i++){
		
		(function(element){

			var holder = element.attr('placeholder');
			
			!isSupportPlaceholder && element.val( holder );
			
			element.keyup(function(){
				checkinput(element, holder);
			});
			
			element.blur(function(){
				if(element.val() == "" && !isSupportPlaceholder){
					element.val(holder)
				}
				checkinput(element, holder);
			});
			
			element.focus(function(){
				if(element.val() == holder && !isSupportPlaceholder){
					element.val('');
				};
				checkinput(element, holder);
			});
			
		})(inputlist.eq(i));
		
	}
	
	
	function checkinput( element, holder ){
		var val = element.val();
		
		if(val != "" || val == holder){
			element.attr('isempty', "0");
		}else{
			element.attr('isempty', "1");
		}
		
		if(val != holder){
			element.attr('isdefaultvalue', "0");
		}else{
			element.attr('isdefaultvalue', "1");
		}
	};
};
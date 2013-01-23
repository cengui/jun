$(function(){
	function updateSVGSize(){
		$("#svg").attr('width', $(window).width());
		$("#svg").attr('height', $(window).height() - 10);
	}
	updateSVGSize();
	
	$(window).resize(updateSVGSize);

});

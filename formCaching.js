(function(){
	var formData = localStorage.getItem('formData') || "{}",
		debounce;

	if (formData) formData = JSON.parse(formData);

	function persistForm (e) {
		clearTimeout(debounce);
		formData[this.name] = this.value;

		debounce = setTimeout(function(){
			localStorage.setItem('formData', JSON.stringify(formData));
		}, 200);
	}

	[].forEach.call(document.forms['test-one'].elements, function(element){
		element.onkeyup = persistForm;

		if (formData[element.name])
			element.value = formData[element.name];
	});
})();
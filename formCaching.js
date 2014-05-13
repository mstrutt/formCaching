(function(namespace){
	var formData = {},
		blacklist = ['button', 'submit', 'reset'],
		debounce,
		id;

	namespace += '-';

	function persistForm (e) {
		clearTimeout(debounce);
		id = this.form.id;
		formData[id][this.name] = this.value;

		debounce = setTimeout(function(){
			localStorage.setItem(namespace+id, JSON.stringify(formData[id]));
		}, 200);
	}

	function clearForm (e) {
		formData[this.id] = {};
		localStorage.removeItem(namespace+this.id);
	}

	[].forEach.call(document.forms, function (form) {
		formData[form.id] = JSON.parse(localStorage.getItem(namespace+form.id) || "{}");

		form.onsubmit = clearForm;
		form.onreset = clearForm;

		[].forEach.call(form.elements, function(element){
			if (blacklist.indexOf(element.type) < 0) {
				element.onkeyup = persistForm;

				if (formData[form.id][element.name])
					element.value = formData[form.id][element.name];
			}
		});
	});
})('formData');
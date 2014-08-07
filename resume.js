var $name;
window.onload = function() {
	// The following could totally be done in the HTML, but I'm lazy and
	// people who disable javascript can deal
	$("a").each(function() {
		var $this = $(this);
		var text = $this.text();
		if(/^\s*\(?[0-9]{3}\)?\s*-?\s*[0-9]{3}\s*-?\s*[0-9]+\s*$/.test(text))
			$this.attr("href", "tel:" + text.split("").filter(function(c) {
				return /^[0-9]$/.test(c);}).join(""));
		else if(/^[^@]+@\w+\.\w+$/.test(text))//Good enough email regex
			$this.attr("href", "mailto:"+text);
		else if(text.substr(0, 4) == "http")
			$this.attr("href", text);
		else
			$this.attr("href", "http://"+text);
	});

	$name = $(".header h1");
	$name.css("width", "100%");
	$name.css("margin", "0pt");
	window.onresize();
}

//Stop my name from overflowing
window.onresize = function() {
	var NAME_RATIO = 5;//experimentally derived
	var name = $name[0];//de-JQ for speed in inner loop
	name.style.fontSize = "";
	if(name.scrollWidth <= NAME_RATIO * name.scrollHeight) {
		var l = 3, h = 4;
		for(var i = 0; i < 10; i++) {
			var m = (l+h)/2;
			name.style.fontSize = m+"em";
			if(name.scrollWidth > NAME_RATIO * name.scrollHeight)
				l = m;
			else
				h = m;
		}
		name.style.fontSize = l+"em";
	}
}

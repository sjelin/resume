var $name;
window.onload = function() {
	// The following could totally be done in the HTML, but this makes my
	// HTML cleaner and people who disable javascript can deal
	$("a").each(function() {
		var $this = $(this);
		if($this.attr("href"))
			return;
		var text = $this.text();
		if(/^\s*\(?[0-9]{3}\)?\s*-?\s*[0-9]{3}\s*-?\s*[0-9]+\s*$/.test(text))
			$this.attr("href", "tel:" + text.split("").filter(function(c) {
				return /^[0-9]$/.test(c);}).join(""));
		else if(/^[^@]+@\w+\.\w+$/.test(text))//Good enough email regex
			$this.attr("href", "mailto:"+text);
		else if(text.substr(0, 4) == "http")
			$this.attr("href", text);
		else if(/^\w+\.\w+(?:\/.*)?$/.test(text))
			$this.attr("href", "http://"+text);
		else
			$this.attr("href", "#"+text.toLowerCase());
	});

	$name = $(".header h1");
	$name.css("width", "100%");
	$name.css("margin", "0pt");
	window.onresize();
}

//Stop my name from overflowing
window.onresize = function() {
	var NAME_RATIO = 5;//experimentally derived
	var PRECISION = 3;// # of decimal points
	var ITERATIONS = PRECISION * Math.log(10) / Math.log(2);
	var name = $name[0];//de-JQ for speed in inner loop
	name.style.fontSize = "";
	if(name.scrollWidth <= NAME_RATIO * name.scrollHeight) {
		var l = 3, h = 4;//4em is the goal, but as low as 3em might be needed
		for(var i = 0; i < ITERATIONS; i++) {
			var m = (l+h)/2;
			name.style.fontSize = m+"em";
			if(name.scrollWidth > NAME_RATIO * name.scrollHeight)
				l = m;
			else
				h = m;
		}
		var tmp = Math.pow(10, PRECISION+1);
		name.style.fontSize = (Math.floor(l*tmp)/tmp)+"em";
	}
}

// The following could totally be done in the HTML, but I'm lazy and people
// who disable javascript can deal
window.onload = function() {
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
}

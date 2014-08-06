all: resume.css

resume.css: resume.scss
	sass --update resume.scss:resume.css

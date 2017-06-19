all: resume.css

resume.css: resume.scss
	sass resume.scss > resume.css

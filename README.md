### Acknowledgement
This website is built on a Jekyll template by Martin Saveski, Mor Naaman, and Quan Xiao, with improvement ideas borrowed from the al‑folio theme.

### Updates guidance
Please modify one of the files in `_data`—unless you plan to change the website’s appearance.

Test changes with:
```
jekyll serve --livereload
```

If a `jekyll serve --livereload` process is already running, please follow these steps:
```
lsof -i :4000
kill -9 <PID>

jekyll serve --livereload
```

Push to github
```
git add .
git commit -m "Description of changes"
git push
```


If not working (probabily due to first time or large change), try
```
git config http.postBuffer 524288000
```
before
```
git push
```


## External Libraries
- Framework: [Jekyll](http://jekyllrb.com/)
- CSS
  - [Skeleton](getskeleton.com)
  - Tabs: [Skeleton Tabs](https://github.com/nathancahill/skeleton-tabs)
  - Experience: [Timeline](https://codepen.io/NilsWe/pen/FemfK)
  - Icons: [Font Awesome](http://fontawesome.io/)
- JS
  - [Jquery (3.1.1)](https://jquery.com/)
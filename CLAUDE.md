# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is Zhaoxian Wu's academic personal website, built with Jekyll and hosted on GitHub Pages. All content is stored as YAML data files — almost all updates should be made to files in `_data/` rather than to HTML templates.

## Local Development

```bash
jekyll serve --livereload
```

If port 4000 is already in use:
```bash
lsof -i :4000
kill -9 <PID>
jekyll serve --livereload
```

For large pushes that fail:
```bash
git config http.postBuffer 524288000
git push
```

## Architecture

The site is a single-page Jekyll site. `index.html` is the only page template; it reads directly from `site.data.*` (the YAML files in `_data/`) using Liquid templating. `_layouts/default.html` wraps everything in the page shell.

All content lives in `_data/`:

| File | Purpose |
|---|---|
| `news.yaml` | News items; `selected: y` → "Recent News" tab, `selected: n` → "Old News" tab only |
| `publications.yaml` | Full publications list; `selected: y` → appears in "Selected" tab |
| `main_info.yaml` | Name, title, contact info, social links, profile photo path |
| `bio.yaml`, `education.yaml`, `research.yaml` | Bio section content |
| `award.yaml`, `internship.yaml`, `service.yaml`, `talk.yaml`, `teaching.yaml`, `visiting.yaml` | Other CV sections |

## Adding a New Accepted Paper

When a paper is accepted, update **two** files:

### 1. `_data/news.yaml`
Prepend a new item at the top of the `news_items` list. Set `selected: y` to show it in "Recent News". Structure:
```yaml
- item: "Our paper about <topic> was accepted by <b>Full Venue Name (Short Acronym YEAR)</b>"
  date: "Mon YYYY"
  links:
    - url: "https://arxiv.org/..."
      text: "Paper Title"
  selected: y
```
Optional `info_links` (shown in parentheses inline) vs `links` (shown as a bulleted list below the item text).

### 2. `_data/publications.yaml`
Prepend a new entry at the top of the `papers` list. Fields:
```yaml
- title: "Full Paper Title"
  authors: "<strong><u>Zhaoxian Wu</strong></u>, Co-Author Name, ..."
  venue: "Proc. of Full Venue Name <strong>(Short)</strong>"
  paper_pdf: "https://arxiv.org/..."
  year: "YYYY"
  selected: y          # y = appears in Selected tab
  label: "NeurIPS"     # short badge label shown on figure
  fig: "./assets/pub_figure/YYYY-short-name.jpg"
  code: "https://github.com/..."   # optional
  award: "Award text"              # optional, e.g. "Oral, top 0.3%"
```

The author name format for Zhaoxian Wu is always: `<strong><u>Zhaoxian Wu</strong></u>`

Publication figures should be placed in `assets/pub_figure/`.

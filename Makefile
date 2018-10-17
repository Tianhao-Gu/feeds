install:
	pip install -r requirements.txt

build-docs:
	-rm -r docs
	-rm -r docsource/internal_apis
	mkdir -p docs
	sphinx-apidoc --separate -o docsource/internal_apis src

test:
	# flake8 feeds
	pytest --verbose test --cov feeds

start:
	gunicorn --worker-class gevent --timeout 300 --workers 10 --bind :5000 feeds:app

.PHONY: test
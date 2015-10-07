BIN = node_modules/.bin

RIX_CACHE_DIR = tmp/cache/react-inline/

RIX_OPTIONS = --relativize --follow-requires --ignore-dependencies --ignore-node-core --babelize --cache-dir $(RIX_CACHE_DIR)

#RIX_OPTIONS = --relativize --follow-requires --ignore-dependencies --ignore-node-core --media-map "phone=media only screen and (max-width: 640px)" --vendor-prefixes --bundle ../public/bundle.css --babelize --cache-dir $(RIX_CACHE_DIR)
RIX_PRODUCTION_OPTIONS = $(RIX_OPTIONS) --compress-class-names --minify


webpackdevserver: _install
	webpack-dev-server --hot --inline

rixwatch: _install
	$(BIN)/react-inline-extract $(RIX_OPTIONS) --watch src/ _afterRix/ main

webpackwatch: _install
	webpack -w

clean: 
	rm -rf _afterRix/
	rm -rf _build/

_install:
	npm install

.PHONY: clean webpackdevserver webpackwatch rixwatch

MAKEFLAGS = --no-print-directory --always-make --silent
MAKE = make $(MAKEFLAGS)

NODE_BIN = node_modules/.bin
NODE = $(NODE_BIN)/babel-node
NODEMON = $(NODE_BIN)/nodemon

.PHONY: \
	build \
	dev server \
	check lint test \
	test-watch

build:
	@echo "Building project..."
	$(NODE_BIN)/webpack

dev:
	@echo "Starting dev server..."
	$(NODE_BIN)/webpack-dev-server \
		--progress --colors \
		--hot --inline \
		--content-base build

server:
	@echo "Starting api server..."
	$(NODEMON) --exec $(NODE) --harmony -- src/server/index.js

check:
	$(MAKE) lint
	$(MAKE) test
	@echo "Hooray! -- All checks pass"

lint:
	@echo "Running eslint..."
	$(NODE_BIN)/eslint --ext .js --ext .jsx src
	$(NODE_BIN)/eslint test

test:
	@echo "Running tests..."
	$(NODE_BIN)/mocha 'test/**/*.@(js|jsx)' \
		--recursive \
		--require babel-register \
		--require css-modules-require-hook \
		--reporter list

test-watch:
	@echo "Watching tests..."
	$(NODE_BIN)/mocha 'test/**/*.@(js|jsx)' \
		--recursive \
		--require babel-register \
		--require css-modules-require-hook \
		--reporter min \
		--watch

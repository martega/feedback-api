############################################################################
#                        Makefile for feedback-api                         #
############################################################################

MOCHA = ./node_modules/mocha/bin/mocha

test: node_modules
	@$(MOCHA) -R spec

test-nyan: node_modules
	@$(MOCHA) -R nyan

test-md: node_modules
	@$(MOCHA) -R markdown > spec.md

run: node_modules
	@node ./src/main.js

node_modules:
	@npm install

clean:
	@rm -rf node_modules

.PHONY: run test test-md clean

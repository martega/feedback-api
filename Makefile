############################################################################
#                        Makefile for feedback-api                         #
############################################################################

MOCHA       = ./node_modules/.bin/mocha
TEST_FILES  = find ./test -name '*.js'
CONFIG_FILE = ./config/index.js

test: node_modules $(CONFIG_FILE)
	@export ENVIRONMENT=test NODE_PATH=.:src; $(TEST_FILES) | xargs $(MOCHA) -R spec

test-nyan: node_modules $(CONFIG_FILE)
	@export ENVIRONMENT=test NODE_PATH=.:src; $(TEST_FILES) | xargs $(MOCHA) -R nyan

test-cov: node_modules
	@./bin/jscoverage src src-cov;
	@-export ENVIRONMENT=test NODE_PATH='.:src-cov'; $(TEST_FILES) | xargs $(MOCHA) -R html-cov > test_coverage.html;
	@rm -rf src-cov;
	@open test_coverage.html;

run: node_modules $(CONFIG_FILE)
	@ENVIRONMENT=local NODE_PATH=.:src node ./src/main.js

node_modules:
	@npm install

encrypt-config: $(CONFIG_FILE)
	@openssl cast5-cbc -e -in $(CONFIG_FILE) -out $(CONFIG_FILE).cast5

decrypt-config: $(CONFIG_FILE).cast5
	@openssl cast5-cbc -d -in $(CONFIG_FILE).cast5 -out $(CONFIG_FILE)
	@chmod 600 $(CONFIG_FILE)

$(CONFIG_FILE):
	@make decrypt-config

clean:
	@-rm -rf node_modules
	@-rm test_coverage.html


.PHONY: run test test-nyan test-cov clean encrypt-config decrypt-config

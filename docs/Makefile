############################################################################
#                Feedback Component API Documentation Makefile             #
############################################################################

TEX_FILES = $(shell find . -name '*.tex')

feedback-component-api-documentation.pdf: $(TEX_FILES)
	rubber --pdf main.tex;
	mv main.pdf $@;

clean:
	rm -f *.aux *.log *.pdf *.toc

.PHONY: clean

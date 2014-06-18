doc:
	@yuidoc . -o doc

test:
	@mocha

.PHONY: doc test

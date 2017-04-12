package com.bank.debt.protocol.tools.map;

public interface Mapping<FROM, TO> {
	TO onMap(FROM from) throws MappingSkipException, MappingFailedException;
}

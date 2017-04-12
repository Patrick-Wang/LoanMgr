package com.bank.debt.protocol.tools.map;

import java.util.ArrayList;
import java.util.List;

public class Mapper<FROM, TO> {

	private Mapping<FROM, TO> mapping;

	public void setMapping(Mapping<FROM, TO> mapping) {
		this.mapping = mapping;
	}

	public List<TO> map(List<FROM> srcs) throws MappingFailedException {
		List<TO> dests = new ArrayList<TO>();
		for (FROM src : srcs) {
			try {
				dests.add(this.mapping.onMap(src));
			} catch (MappingSkipException e) {
				e.printStackTrace();
			} catch (MappingFailedException e) {
				throw e;
			}
		}
		return dests;
	}

	public TO map(FROM src) throws MappingFailedException  {
		try {
			return this.mapping.onMap(src);
		} catch (MappingSkipException e) {
			throw new MappingFailedException(e);
		}
	}
	
	public TO forceMap(FROM src) {
		try {
			return this.mapping.onMap(src);
		} catch (MappingSkipException | MappingFailedException e) {
			return null;
		}
	}
	
	public List<TO> forceMap(List<FROM> srcs) {
		List<TO> dests = new ArrayList<TO>();
		for (FROM src : srcs) {
			try {
				dests.add(this.mapping.onMap(src));
			} catch (MappingSkipException e) {
				e.printStackTrace();
			} catch (MappingFailedException e) {
				e.printStackTrace();
				break;
			}
		}
		return dests;
	}
}

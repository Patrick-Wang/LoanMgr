package com.bank.debt.protocol.tools.map;

import com.bank.debt.model.entity.AttachementEntity;
import com.bank.debt.protocol.entity.Attachement;

public class AttachMapping{

	private AttachMapping(){}

	public final static Mapping<AttachementEntity, Attachement> ae2aMapping = new Mapping<AttachementEntity, Attachement>(){
		
		public Attachement onMap(AttachementEntity from) throws MappingSkipException, MappingFailedException {
			if (from != null){
				Attachement attach = new Attachement();
				attach.setDisplay(from.getDisplay());
				attach.setEntityVersion(from.getEntityVersion());
				attach.setFileAddress(from.getFileAddress());
				attach.setId(from.getId());
				attach.setUploadTime(from.getUploadTime());
				return attach;
			}
			return null;
		}
	};
	
public final static Mapping<Attachement, AttachementEntity> a2aeMapping = new Mapping<Attachement, AttachementEntity>(){
		
		public AttachementEntity onMap(Attachement from) throws MappingSkipException, MappingFailedException {
			if (from != null){
				AttachementEntity attach = new AttachementEntity();
				attach.setDisplay(from.getDisplay());
				attach.setEntityVersion(from.getEntityVersion());
				attach.setFileAddress(from.getFileAddress());
				attach.setId(from.getId());
				attach.setUploadTime(from.getUploadTime());
				return attach;
			}
			return null;
		}
	};

}

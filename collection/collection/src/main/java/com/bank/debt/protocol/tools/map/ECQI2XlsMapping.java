package com.bank.debt.protocol.tools.map;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.bank.debt.protocol.entity.ECCarLoan;
import com.bank.debt.protocol.entity.ECCreditCard;
import com.bank.debt.protocol.entity.ECCreditLoan;
import com.bank.debt.protocol.entity.ECQueryInfo;
import com.bank.debt.protocol.entity.IF;
import com.bank.debt.protocol.tools.BeanUtil;
import com.bank.debt.protocol.tools.ValidationException;

public class ECQI2XlsMapping implements Mapping<ECQueryInfo, OutputStream> {

	
	private OutputStream doMapping(ECQueryInfo ecqi) throws IOException, ValidationException, MappingFailedException{
		
		List<Object> baseEC = null;
		Class<?> cls = null;
		if (ecqi.getCarLoan() != null){
			cls = ECCarLoan.class;
			baseEC = ecqi.getCarLoan();
		}else if (ecqi.getCreditCard() != null){
			cls = ECCreditCard.class;
			baseEC = ecqi.getCreditCard();
		}else if (ecqi.getCreditLoan() != null){
			baseEC = ecqi.getCreditLoan();
			cls = ECCreditLoan.class;
		}
		
		if (baseEC != null){
			List<IF> ifs = ecqi.getIfs();
			HSSFWorkbook workbook = new HSSFWorkbook();
			HSSFSheet sheet = workbook.createSheet("委案");
			HSSFRow title = sheet.createRow(0);
			List<Integer> cols = new ArrayList<Integer>();
			List<Method> mds = new ArrayList<Method>();
			for(int i = 0; i < ifs.size(); ++i){
				try {
					Method md = cls.getMethod(BeanUtil.getGetMethod(ifs.get(i).getFieldFromAddr()));
					cols.add(i);
					mds.add(md);
					HSSFCell tCol = title.createCell(i);
					tCol.setCellValue(ifs.get(i).getDescription());
				} catch (NoSuchMethodException | SecurityException e) {
					e.printStackTrace();
				}
			}
			
			for (int j = 0; j < baseEC.size(); ++j){
				HSSFRow row = sheet.createRow(sheet.getLastRowNum() + 1);
				for(int i = 0; i < cols.size(); ++i){
					HSSFCell cell = row.createCell(i);
					cell.setCellValue(getStringValue(mds.get(i), baseEC.get(j)));
				}
			}
	
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return baos;
		}
		throw new MappingFailedException();
	}
	
	private IF findIF(List<IF> ifs, String address){
		for (IF intf : ifs){
			if (intf.getAddress().endsWith(address)){
				return intf;
			}
		}
		return null;
	}

	
	private String getStringValue(Method md, Object obj){
		try {
			Object val = md.invoke(obj);
			if (val == null){
				return null;
			}else if (val instanceof Date){
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
				return formatter.format(val);
			}else{
				return val.toString();
			}
		} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public OutputStream onMap(ECQueryInfo from) throws MappingFailedException {
		try {
			return doMapping(from);
		} catch (IOException | ValidationException e) {
			throw new MappingFailedException(e);
		}
	}

}

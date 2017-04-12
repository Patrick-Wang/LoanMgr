package com.bank.debt.protocol.tools;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class XLS2JsonMapper {

	public static Date parseDate(HSSFCell cell) throws ValidationException {
		if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
			try{
				java.util.Date date = cell.getDateCellValue();
				return new Date(date.getTime());
			}catch(Exception e){
				e.printStackTrace();
				short df = cell.getCellStyle().getDataFormat();
				throw new ValidationException(cell.getRowIndex() + ", " + cell.getColumnIndex() + ":日期解析失败，数据格式编码" + df);
			}
		}else if (cell.getCellType() == HSSFCell.CELL_TYPE_BLANK){
			return null;
		}
		throw new ValidationException(cell.getRowIndex() + ", " + cell.getColumnIndex() + ":日期解析失败，类型编码 " + cell.getCellType());
	}
	
	public static Double parseNumber(HSSFCell cell) throws ValidationException{
		switch(cell.getCellType()){
		case HSSFCell.CELL_TYPE_BLANK:
			return null;
		case HSSFCell.CELL_TYPE_NUMERIC:
		case HSSFCell.CELL_TYPE_FORMULA:
			return cell.getNumericCellValue();
		}
		throw new ValidationException(cell.getRowIndex() + ", " + cell.getColumnIndex() + ":数值类型解析失败 ，类型编码  " + cell.getCellType());
	}
	
	public static String parseString(HSSFCell cell) throws ValidationException{
		switch(cell.getCellType()){
		case HSSFCell.CELL_TYPE_BLANK:
			return null;
		case HSSFCell.CELL_TYPE_STRING:
			return cell.getStringCellValue();
		}
		throw new ValidationException(cell.getRowIndex() + ", " + cell.getColumnIndex() + ": 字符串类型解析失败 ，类型编码  " + cell.getCellType());
	}
	
	private static List<Field> getBeanFieldTypes(Class<?> beanClass){
		List<Field> types = new ArrayList<Field>();
		Field[] fields = beanClass.getDeclaredFields();
		for (Field field : fields){
			try {
				Method method = beanClass.getMethod(BeanUtil.getSetMethod(field.getName()), field.getType());
				types.add(field);
			} catch (NoSuchMethodException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SecurityException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		return types;
	}
	
	public static JSONArray xls2Json(InputStream xls, Class<?> beanClass) throws IOException, ValidationException{
		List<Field> fields = getBeanFieldTypes(beanClass);
		JSONArray ja = new JSONArray();
		HSSFWorkbook workbook = new HSSFWorkbook(xls);
		HSSFSheet sheet = workbook.getSheetAt(0);
		for (int i = 1; i <= sheet.getLastRowNum(); ++i){
			HSSFRow row = sheet.getRow(i);
			JSONObject jrow = new JSONObject();
			for (int j = 0; j < fields.size() && j < row.getLastCellNum(); ++j){
				HSSFCell cell = row.getCell(j);
				if (fields.get(j).getType().isAssignableFrom(String.class)){
					jrow.put(fields.get(j).getName(), parseString(cell));
				}else if (fields.get(j).getType().isAssignableFrom(Date.class)) {
					Date date = parseDate(cell);
					jrow.put(fields.get(j).getName(), date);
				}else if (fields.get(j).getType().isAssignableFrom(Timestamp.class)){
					Date date = parseDate(cell);
					if (null != date){
						jrow.put(fields.get(j).getName(), new Timestamp(date.getTime()));
					}else{
						jrow.put(fields.get(j).getName(), null);
					}
				}else if (fields.get(j).getType().isAssignableFrom(Double.class)){
					Double num = parseNumber(cell);
					jrow.put(fields.get(j).getName(), num);
				}else if (fields.get(j).getType().isAssignableFrom(Integer.class)){
					Double num = parseNumber(cell);
					if (null != num){
						jrow.put(fields.get(j).getName(), num.intValue());
					}else{
						jrow.put(fields.get(j).getName(), null);
					}
				}
				ja.add(row);
			}
			
		}
		return ja;
	}
}
package com.example.propeditor;


import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UtilDatePropertyEditor extends PropertyEditorSupport {

	private String format="yyyy-MM-dd";
	public void setFormat(String format){
		this.format=format;
	}
	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		SimpleDateFormat formater=new SimpleDateFormat(format);
		Date value=null;
		try {
			value=formater.parse(text);
			this.setValue(value);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}

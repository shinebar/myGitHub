package com.example.demo;

import java.io.IOException;

import org.junit.Test;
import org.springframework.beans.factory.xml.PluggableSchemaResolver;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.xml.sax.InputSource;

public class StringOperTest {
	private static final String DTD_EXTENSION = ".dtd";
	private static final String DTD_FILENAME = "spring-beans-2.0";

	private static final String DTD_NAME = "spring-beans";

	@Test
	public void strIndex() {
		String publicId = "-//Spring//DTD BEAN 2.0//EN";
//http://www.Springframework.org/dtd/Spring-beans-2.0.dtd		
		String systemId = "http://www.Springframework.org/dtd/spring-beans-2.0.dtd";

		if (systemId != null && systemId.endsWith(DTD_EXTENSION)) {
			int lastPathSeparator = systemId.lastIndexOf("/");
			System.out.println("lastPathSeparator:"+lastPathSeparator);
			int dtdNameStart = systemId.indexOf(DTD_NAME, lastPathSeparator);
			System.out.println("dtdNameStart:"+dtdNameStart);
			if (dtdNameStart != -1) {
				String dtdFile = DTD_FILENAME + DTD_EXTENSION;
				System.out.println("dtdFile:"+dtdFile);
				try {
					Resource resource = new ClassPathResource(dtdFile, getClass());
					InputSource source = new InputSource(resource.getInputStream());
					source.setPublicId(publicId);
					source.setSystemId(systemId);
				}
				catch (IOException ex) {
					ex.printStackTrace();
				}
			}
		}
	}
	
	@Test
	public void entityResolve(){
		String publicId = "-//Spring//DTD BEAN 2.0//EN";
		//http://www.Springframework.org/dtd/Spring-beans-2.0.dtd		
		String systemId = "http://www.springframework.org/schema/beans/spring-beans-2.0.xsd";
		PluggableSchemaResolver psr=new PluggableSchemaResolver(this.getClass().getClassLoader());
		try {
			psr.resolveEntity(publicId, systemId);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public  void testFinaly(){
		try{
			int i=1/0;
		}finally{
			System.out.println("finally");
		}
	}
	
	@Test
    public void main(){
    	try{
    		testFinaly();
    	}catch(Exception ex){
    		ex.printStackTrace();
    	}
    }
}

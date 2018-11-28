package com.example.applicationWare;

import java.util.concurrent.Semaphore;

import javax.annotation.Resource;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.concurrent.FutureCallback;
import org.apache.http.impl.nio.client.CloseableHttpAsyncClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.Assert;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:application-test.xml")
public class AsycHttpClientFactoryBeanTest {
	
	private static final Semaphore currency=new Semaphore(1024);
	@Resource
	CloseableHttpAsyncClient asyncClient;
	
	@Test
	public void main(){
		Assert.notNull(asyncClient);
		currency.acquireUninterruptibly();
		try{
			final HttpUriRequest httpUriRequest=RequestBuilder
					.get().setUri("http://www.baidu.com").build();
			asyncClient.execute(httpUriRequest, new FutureCallback<HttpResponse>(){

				@Override
				public void cancelled() {
					System.out.println("dfsfsfsfsfsf\t:cancelled");
					
				}

				@Override
				public void completed(HttpResponse arg0) {
					System.out.println(arg0.getStatusLine());
					
				}

				@Override
				public void failed(Exception arg0) {
					System.out.println("dfsfsfsfsfsf\failed");
					
				}
				
			});
		}finally{
			currency.release();
		}
	}

}

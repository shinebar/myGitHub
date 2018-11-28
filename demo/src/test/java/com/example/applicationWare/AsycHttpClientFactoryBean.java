package com.example.applicationWare;

import org.apache.commons.lang3.concurrent.BasicThreadFactory;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.impl.nio.client.CloseableHttpAsyncClient;
import org.apache.http.impl.nio.client.HttpAsyncClients;
import org.apache.http.impl.nio.conn.PoolingNHttpClientConnectionManager;
import org.apache.http.impl.nio.reactor.DefaultConnectingIOReactor;
import org.apache.http.impl.nio.reactor.IOReactorConfig;
import org.springframework.beans.factory.FactoryBean;

public class AsycHttpClientFactoryBean implements FactoryBean<CloseableHttpAsyncClient> {

	private static final int DEFAULT_MAX_TOTAL= 512;
	private static final int DEFAULT_MAX_PER_ROUTE=64;
	private static final int DEFAULT_CONNECTION_TIMEOUT=5000;
	private static final int DEFAULT_SOCKET_TIMEOUT=3000;
	private static final int DEFAULT_TIMEOUT=1000;
	@Override
	public CloseableHttpAsyncClient getObject() throws Exception {
		DefaultConnectingIOReactor ioReactor =new DefaultConnectingIOReactor(IOReactorConfig.custom().setSoKeepAlive(true).build());
		PoolingNHttpClientConnectionManager pcm=new PoolingNHttpClientConnectionManager(ioReactor);
		pcm.setMaxTotal(DEFAULT_MAX_TOTAL);
		pcm.setDefaultMaxPerRoute(DEFAULT_MAX_PER_ROUTE);
		RequestConfig defaultRequestConfig=RequestConfig.custom()
				.setConnectTimeout(DEFAULT_CONNECTION_TIMEOUT)
				.setSocketTimeout(DEFAULT_SOCKET_TIMEOUT)
				.setConnectionRequestTimeout(DEFAULT_TIMEOUT).build();
		return HttpAsyncClients.custom().setThreadFactory(new BasicThreadFactory.Builder().namingPattern("AsyncHttpThread-%d").build())
				.setConnectionManager(pcm)
				.setDefaultRequestConfig(defaultRequestConfig)
				.build();
	}

	@Override
	public Class<?> getObjectType() {
		// TODO Auto-generated method stub
		return CloseableHttpAsyncClient.class;
	}

	@Override
	public boolean isSingleton() {
		// TODO Auto-generated method stub
		return true;
	}

}

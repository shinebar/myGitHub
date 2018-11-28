package com.example.applicationWare;

import java.net.SocketTimeoutException;

import org.apache.commons.codec.Charsets;
import org.apache.http.NoHttpResponseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.config.ConnectionConfig;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.FactoryBean;

public class HttpClientFactoryBean implements FactoryBean<HttpClient> {

	private static final int DEFAULT_MAX_TOTAL= 512;
	private static final int DEFAULT_MAX_PER_ROUTE=64;
	private static final int DEFAULT_CONNECTION_TIMEOUT=5000;
	private static final int DEFAULT_SOCKET_TIMEOUT=3000;
	private static final int DEFAULT_TIMEOUT=1000;
	@Override
	public HttpClient getObject() throws Exception {
		ConnectionConfig config=ConnectionConfig.custom().setCharset(Charsets.UTF_8).build();
		RequestConfig defaultRequestConfig=RequestConfig.custom()
				.setConnectTimeout(DEFAULT_CONNECTION_TIMEOUT)
				.setSocketTimeout(DEFAULT_SOCKET_TIMEOUT)
				.setConnectionRequestTimeout(DEFAULT_TIMEOUT).build();
		
		return HttpClients.custom().setMaxConnPerRoute(DEFAULT_MAX_PER_ROUTE)
				.setMaxConnTotal(DEFAULT_MAX_TOTAL)
				.setRetryHandler((exception,executionCount,context)->executionCount <=3 && 
				(exception instanceof NoHttpResponseException || exception instanceof ClientProtocolException 
	|| exception instanceof SocketTimeoutException
	|| exception instanceof ConnectTimeoutException))
				.setDefaultConnectionConfig(config)
				.setDefaultRequestConfig(defaultRequestConfig)
				.build();
	}

	@Override
	public Class<?> getObjectType() {
		// TODO Auto-generated method stub
		return HttpClient.class;
	}

	@Override
	public boolean isSingleton() {
		// TODO Auto-generated method stub
		return true;
	}

}

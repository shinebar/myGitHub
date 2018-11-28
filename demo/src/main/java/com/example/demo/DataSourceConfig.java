//package com.example.demo;
//
//import javax.sql.DataSource;
//
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class DataSourceConfig {
//
//    @Bean(name = "primaryDataSource")
//    @Qualifier("primaryDataSource")
//    @ConfigurationProperties(prefix="spring.datasource")
//    public DataSource primaryDataSource() {
//        return DataSourceBuilder.create().build();
//    }
//
////    @Bean(name = "secondaryDataSource")
////    @Qualifier("secondaryDataSource")
////    @Primary
////    @ConfigurationProperties(prefix="spring.datasource.secondary")
////    public DataSource secondaryDataSource() {
////        return DataSourceBuilder.create().build();
////    }
//
//}

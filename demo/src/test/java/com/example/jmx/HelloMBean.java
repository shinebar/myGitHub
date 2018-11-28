package com.example.jmx;

public interface HelloMBean<K,V> {
    public String getName();
    public void setName(String name);
    public void printHello();
    public void printHello(String whoName);
    
    default V getOrDefault(Object key, V defaultValue) {
        V v=null;
        return (((v != null))? v : defaultValue);
    }
}

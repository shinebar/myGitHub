package com.example.thread;

import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class WhileSysc {

	public static void main(String[] args) {
		final Buf buf = new Buf();
		ExecutorService es = Executors.newFixedThreadPool(11);
		for (int i = 0; i < 3; i++)
		es.execute(new Runnable() {
		 
		    @Override
		    public void run() {
		        while (true) {
		            try {
		                buf.put(1);
		                Thread.sleep(20);
		            }
		            catch (InterruptedException e) {
		                e.printStackTrace();
		                break;
		            }
		        }
		    }
		});
		for (int i = 0; i < 3; i++) {
		    es.execute(new Runnable() {
		 
		        @Override
		        public void run() {
		            while (true) {
		                try {
		                    buf.get();
		                    Thread.sleep(10);
		                }
		                catch (InterruptedException e) {
		                    e.printStackTrace();
		                    break;
		                }
		            }
		        }
		    });
		}
		 
		es.shutdown();
		try {
			es.awaitTermination(1, TimeUnit.DAYS);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	static class Buf {
	    private final int MAX = 5;
	    private final ArrayList<Integer> list = new ArrayList<>();
	    synchronized void put(int v) throws InterruptedException {
	    	System.out.println("put  start:\t"+Thread.currentThread().getName());
	        if (list.size() == MAX) {
	        	System.out.println("put wait start:\t"+Thread.currentThread().getName());
	            wait();
	            System.out.println("put wait end:\t"+Thread.currentThread().getName());
	        }
	        System.out.println("put add start:\t"+Thread.currentThread().getName());
	        list.add(v);
	        System.out.println("put add end:\t"+Thread.currentThread().getName());
	        System.out.println("put add notifyAll start:\t"+Thread.currentThread().getName());
	        notifyAll();
	        System.out.println("put add notifyAll end:\t"+Thread.currentThread().getName());
	        System.out.println("put  end:\t"+Thread.currentThread().getName());
	    }
	 
	    synchronized int get() throws InterruptedException {
	    	System.out.println("get  start:\t"+Thread.currentThread().getName());
	        // line 0 
	        while(list.size() == 0) {  // line 1
	        	System.out.println("get wait start:\t"+Thread.currentThread().getName());
	            wait();  // line2
	            // line 3
	            System.out.println("get wait end:\t"+Thread.currentThread().getName());
	        }
	        System.out.println("get remove start:\t"+Thread.currentThread().getName());
	        int v = list.remove(0);  // line 4
	        System.out.println("get remove end:\t"+Thread.currentThread().getName());
	        System.out.println("get notifyAll start:\t"+Thread.currentThread().getName());
	        notifyAll(); // line 5
	        System.out.println("get notifyAll end:\t"+Thread.currentThread().getName());
	        System.out.println("get  end:\t"+Thread.currentThread().getName());
	        return v;
	    }
	 
	    synchronized int size() {
	        return list.size();
	    }
	}

}

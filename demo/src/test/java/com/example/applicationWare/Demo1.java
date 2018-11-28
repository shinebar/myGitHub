package com.example.applicationWare;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class Demo1 {

    public static void main(String[] args) throws InterruptedException {
        ThreadPoolExecutor threadPool = new ThreadPoolExecutor(5, 10, 100, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(5));
        int count = 10;
        final CountDownLatch latch = new CountDownLatch(count);

        for (int i = 0; i < count; i++) {
            threadPool.execute(new MyRunnable1(latch, i));
        }

        latch.await();
        System.err.println("等待线程被唤醒！");
        threadPool.shutdown();
    }
}

class MyRunnable1 implements Runnable {

    CountDownLatch latch = null;
    int i;

    public MyRunnable1(CountDownLatch latch, int i) {
        this.latch = latch;
        this.i = i;
    }

    @Override
    public void run() {
        System.err.println("线程" + i +"完成了操作...");
        try {
            Thread.currentThread();
            Thread.sleep(4000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        latch.countDown();
    }

}

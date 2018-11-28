package com.example.nio;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectableChannel;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;

public class ServerSocketChannelTest {
	public static void main(String[] args) {
		ServerSocketChannel serverChannel=null;
		try {
			serverChannel=ServerSocketChannel.open();
			serverChannel.configureBlocking(false);
			serverChannel.socket().bind(new InetSocketAddress("127.0.0.1",5000));
			Selector selector=Selector.open();
			serverChannel.register(selector, SelectionKey.OP_ACCEPT);
			ByteBuffer readBuff=ByteBuffer.allocate(128);
			ByteBuffer writeBuff=ByteBuffer.allocate(128);
			while(true){
				int n=selector.select();
				if(n > 0){
				   Iterator<SelectionKey> iterator = selector.selectedKeys().iterator();
				    while(iterator.hasNext()){
				    	SelectionKey key = iterator.next();
				    	iterator.remove();
				    	if (key.isAcceptable()) {
							SocketChannel socketChannel = serverChannel.accept();
							socketChannel.configureBlocking(false);
							socketChannel.register(selector, SelectionKey.OP_READ);
						}else if(key.isReadable()){
							SocketChannel socketChannel = (SocketChannel)key.channel();
						    readBuff.clear();
						    socketChannel.read(readBuff);
						    readBuff.flip();
						    System.out.println(new String(readBuff.array()));
						    key.interestOps(SelectionKey.OP_WRITE);
						}else if(key.isWritable()){
							writeBuff.rewind();
							SocketChannel socketChannel=(SocketChannel)key.channel();
							socketChannel.write(writeBuff);
							key.interestOps(SelectionKey.OP_READ);
						}
				    	
				    }
				}
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}

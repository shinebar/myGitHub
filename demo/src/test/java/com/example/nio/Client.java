package com.example.nio;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;

public class Client {

	public static void main(String[] args) throws IOException {
		SocketChannel socketChannel = SocketChannel.open();
		socketChannel.connect(new InetSocketAddress("127.0.0.1", 5000));
		ByteBuffer writeBuffer = ByteBuffer.allocate(32);
		ByteBuffer readBuffer = ByteBuffer.allocate(32);
		writeBuffer.put("hello".getBytes());
		writeBuffer.flip(); // make buffer ready for reading
		while (true) {
		    writeBuffer.rewind(); // sets the position back to 0
		    socketChannel.write(writeBuffer); // hello
		    readBuffer.clear(); // make buffer ready for writing
		    socketChannel.read(readBuffer); // recieved
		}

	}

}

package tools;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

public class Main {
	
	static final int TILE_SIZE = 40;
	
	public static void main(String[] args) throws IOException, InterruptedException {
		System.out.println("start");
		Map<Integer, Image> tiles = new HashMap<Integer, Image>();
		tiles.put(0, new BufferedImage(TILE_SIZE, TILE_SIZE, BufferedImage.TYPE_INT_RGB));
		int i = 1;
		for(File tileFile : new File("tiles/").listFiles()){
			tiles.put(i, ImageIO.read(tileFile));
			i++;
		}
		
		BufferedImage bufferedImage = new BufferedImage(7200, 7200, BufferedImage.TYPE_INT_RGB);
		Graphics graphics = bufferedImage.createGraphics();
		FileInputStream in = new FileInputStream("FAGARAS.MAP");
		
		final int COLUMN_WIDTH = 180;
		int column = 0, row = 0;
		byte[] buffer = new byte[4];	
		while(in.read(buffer) != -1){
			int tileID = (buffer[0] + (buffer[1] << 8) + (buffer[2] << 16) + (buffer[3] << 24)) & 0xFF;
			Image tile = tiles.get(tileID);
			int x = column * TILE_SIZE;
			int y = row * TILE_SIZE;		
			
			graphics.drawImage(tile, x, y, null);
			column++;
			if(column == COLUMN_WIDTH){
				row++;
				column = 0;
			}
		}
		
		ImageIO.write(bufferedImage, "png", new File("out.png"));
		System.out.println("finished");
		
		String[] commands = {"cmd.exe" , "/c", "start", "out.png"};
		Runtime.getRuntime().exec(commands).waitFor();
	}
}

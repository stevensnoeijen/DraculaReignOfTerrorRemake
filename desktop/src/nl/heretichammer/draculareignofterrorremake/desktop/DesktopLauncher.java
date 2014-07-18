package nl.heretichammer.draculareignofterrorremake.desktop;

import nl.heretichammer.draculareignofterrorremake.DRoTRGame;

import com.badlogic.gdx.Files.FileType;
import com.badlogic.gdx.backends.lwjgl.LwjglApplication;
import com.badlogic.gdx.backends.lwjgl.LwjglApplicationConfiguration;

public class DesktopLauncher {
	public static void main (String[] arg) {
		LwjglApplicationConfiguration config = new LwjglApplicationConfiguration();
		config.width = 640;
		config.height = 480;
		config.resizable = false;
		config.addIcon("images/icon.png", FileType.Internal);
		new LwjglApplication(new DRoTRGame(), config);
	}
}

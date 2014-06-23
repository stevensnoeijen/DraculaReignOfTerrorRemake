package nl.heretichammer.draculareignofterrorremake.desktop;

import nl.heretichammer.draculareignofterrorremake.DraculaGame;

import com.badlogic.gdx.backends.lwjgl.LwjglApplication;
import com.badlogic.gdx.backends.lwjgl.LwjglApplicationConfiguration;

public class DesktopLauncher {
	public static void main (String[] arg) {
		LwjglApplicationConfiguration config = new LwjglApplicationConfiguration();
		new LwjglApplication(new DraculaGame(), config);
	}
}

package nl.heretichammer.draculareignofterrorremake;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Preferences;

public class DRoTR {
	public static void log(Exception ex) {
		throw new NotImplementedException();
	}
	
	public final static Preferences PREFERENCES = Gdx.app.getPreferences("DRoTR.preferences");
	
	public static void loadDefaultPreferences() {
		PREFERENCES.putBoolean("music.enabled", false);
	}
	
	static {
		loadDefaultPreferences();
	}
}

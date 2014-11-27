package nl.heretichammer.draculareignofterrorremake;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Preferences;

public class DRoTR {	
	public final static Preferences PREFERENCES = Gdx.app.getPreferences("DRoTR.preferences");
	
	public static void loadDefaultPreferences() {
		PREFERENCES.putBoolean("music.enabled", false);
	}
	
	static {
		loadDefaultPreferences();
	}
}

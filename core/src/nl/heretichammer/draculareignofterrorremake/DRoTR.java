package nl.heretichammer.draculareignofterrorremake;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Preferences;

import nl.heretichammer.draculareignofterrorremake.rts.RTS;
import nl.heretichammer.draculareignofterrorremake.tbs.TBS;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

public class DRoTR {
	public static void log(Exception ex) {
		throw new NotImplementedException();
	}
	
	public final static TBS tbs = new TBS();
	public final static RTS rts = new RTS();
	
	public final static Preferences PREFERENCES = Gdx.app.getPreferences("DRoTR.preferences");
	
	public static void loadDefaultPreferences() {
		PREFERENCES.putBoolean("music.enabled", false);
	}
	
	static {
		loadDefaultPreferences();
	}
}

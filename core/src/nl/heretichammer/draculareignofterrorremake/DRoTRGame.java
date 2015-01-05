package nl.heretichammer.draculareignofterrorremake;

import nl.heretichammer.draculareignofterrorremake.screens.ActorScreen;
import nl.heretichammer.draculareignofterrorremake.screens.LoadScreen;
import nl.heretichammer.draculareignofterrorremake.screens.MainScreen;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Preferences;
import com.badlogic.gdx.Screen;

public class DRoTRGame extends Game {
	
	public static Preferences preferences;
	
	@Override
	public void create() {
		preferences = Gdx.app.getPreferences("drotr/settings.xml");
		preferences.flush();
		setScreen(new MainScreen());
	}
	
	@Override
	public void setScreen(Screen screen) {
		if(screen instanceof LoadScreen){
			super.setScreen(screen);
		}else{
			if(screen instanceof ActorScreen){
				ActorScreen actorScreen = (ActorScreen)screen;
				if(actorScreen.isLoaded()){
					super.setScreen(screen);
				}else{
					super.setScreen(new LoadScreen(actorScreen));
				}
			}else{
				super.setScreen(screen);
			}
		}
	}
}

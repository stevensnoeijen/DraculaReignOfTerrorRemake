package nl.heretichammer.draculareignofterrorremake;

import nl.heretichammer.draculareignofterrorremake.screens.ActorScreen;
import nl.heretichammer.draculareignofterrorremake.screens.CouncilScreen;
import nl.heretichammer.draculareignofterrorremake.screens.LoadScreen;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.Screen;

public class DRoTRGame extends Game {
	
	@Override
	public void create() {
		DRoTR.options.load();
		setScreen(new CouncilScreen());
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

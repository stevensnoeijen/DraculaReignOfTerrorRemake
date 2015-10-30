package nl.heretichammer.draculareignofterrorremake;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Screen;
import com.badlogic.gdx.graphics.GL20;

import nl.heretichammer.draculareignofterrorremake.screens.ActorScreen;
import nl.heretichammer.draculareignofterrorremake.screens.BattleScreen;
import nl.heretichammer.draculareignofterrorremake.screens.LoadScreen;

public class DRoTRGame extends Game {
	
	@Override
	public void create() {
		DRoTR.options.load();
		setScreen(new BattleScreen());
	}
	
	@Override
	public void render() {
		Gdx.gl.glClearColor(0f, 0f, 0f, 0f);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
		
		super.render();
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

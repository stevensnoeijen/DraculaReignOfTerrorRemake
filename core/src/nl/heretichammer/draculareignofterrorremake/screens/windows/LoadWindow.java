package nl.heretichammer.draculareignofterrorremake.screens.windows;

import nl.heretichammer.draculareignofterrorremake.assets.AssetUtils;
import nl.heretichammer.draculareignofterrorremake.assets.Asset;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.ActorLoader;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Window;
import com.badlogic.gdx.utils.Timer;

public class LoadWindow implements ScreenWindow {
	private boolean loaded;
	@Asset("sound/click.ogg") private Sound click;
	private UI ui = new UI();
	private Window window;
	
	@Override
	public boolean isLoaded() {
		return loaded;
	}

	@Override
	public void load(AssetManager assetManager) {
		AssetUtils.load(this, assetManager);
		assetManager.load("layout/LoadWindow.xml", Actor.class, new ActorLoader.ActorLoaderParameter(ui));
	}

	@Override
	public void loaded(AssetManager assetManager) {
		AssetUtils.bind(this, assetManager);
		window = (Window) assetManager.get("layout/LoadWindow.xml", Actor.class);
	}

	@Override
	public void show(Stage stage) {
		stage.addActor(window);
	}

	@Override
	public void close() {
		window.remove();
	}
	
	private void loadGame(){
		//TODO
	}
	
	public class UI {
		public void ok(InputEvent event){
			click.play();
			Timer.schedule(new Timer.Task() {
				@Override
				public void run() {
					loadGame();
				}
			}, 0.5f);
		}
		
		public void cancel(InputEvent event){
			click.play();
			Timer.schedule(new Timer.Task() {
				@Override
				public void run() {
					close();
				}
			}, 0.25f);
		}
	}
}

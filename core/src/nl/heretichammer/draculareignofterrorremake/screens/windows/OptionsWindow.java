package nl.heretichammer.draculareignofterrorremake.screens.windows;

import nl.heretichammer.draculareignofterrorremake.assets.AssetUtils;
import nl.heretichammer.draculareignofterrorremake.assets.Asset;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.ActorLoader;
import nl.heretichammer.draculareignofterrorremake.view.Bind;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Slider;
import com.badlogic.gdx.scenes.scene2d.ui.Window;
import com.badlogic.gdx.utils.Timer;

public class OptionsWindow implements ScreenWindow {

	private boolean loaded = false;
	private UI ui = new UI();
	@Asset("sound/click.ogg") private Sound click;
	private Window window;
	
	@Override
	public boolean isLoaded() {
		return loaded;
	}

	@Override
	public void load(AssetManager assetManager) {
		AssetUtils.load(this, assetManager);
		assetManager.load("layout/OptionsWindow.xml", Actor.class, new ActorLoader.ActorLoaderParameter(ui));
	}

	@Override
	public void loaded(AssetManager assetManager) {
		AssetUtils.bind(this, assetManager);
		window = (Window) assetManager.get("layout/OptionsWindow.xml", Actor.class);
		loaded = true;
	}

	@Override
	public void show(Stage stage) {
		stage.addActor(window);
	}

	@Override
	public void resume() {
		
	}

	@Override
	public void close() {
		window.remove();
	}
	
	private void save(){
		
	}
	
	private void loadDefault(){
		
	}
	
	public class UI {
		@Bind("sfx") private Slider sfx;
		@Bind("music") private Slider music;
		@Bind("brightness") private Slider brightness;
		@Bind("color") private Slider color;
		@Bind("contrast") private Slider contrast;
		@Bind("gamespeed") private Slider gamespeed;
		@Bind("scrollspeed") private Slider scrollspeed;
		
		public void ok(InputEvent event){
			click.play();
			Timer.schedule(new Timer.Task() {
				@Override
				public void run() {
					save();
					close();
				}
			}, 0.25f);
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
		
		public void defaultClick(InputEvent event){
			click.play();
			Timer.schedule(new Timer.Task() {
				@Override
				public void run() {
					loadDefault();
				}
			}, 0.25f);
		}
		
		public void drag(InputEvent e){
			
		}
	}

}

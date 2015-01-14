package nl.heretichammer.draculareignofterrorremake.screens.windows;

import nl.heretichammer.draculareignofterrorremake.DRoTR;
import nl.heretichammer.draculareignofterrorremake.Disposer;
import nl.heretichammer.draculareignofterrorremake.assets.Asset;
import nl.heretichammer.draculareignofterrorremake.assets.AssetUtils;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.ActorLoader;
import nl.heretichammer.draculareignofterrorremake.view.View;
import nl.heretichammer.draculareignofterrorremake.view.ViewUtils;

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
		ViewUtils.bind(window, ui);
		loadSettings();
		loaded = true;
	}
	
	/**
	 * Set sliders by options.
	 */
	private void loadSettings(){
		ui.sfx.setValue(DRoTR.options.sfx);
		ui.music.setValue(DRoTR.options.music);
		ui.brightness.setValue(DRoTR.options.brightness);
		ui.color.setValue(DRoTR.options.color);
		ui.contrast.setValue(DRoTR.options.contrast);
		ui.gamespeed.setValue(DRoTR.options.gamespeed);
		ui.scrollspeed.setValue(DRoTR.options.scrollspeed);
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
		DRoTR.options.save();
	}
	
	private void loadDefault(){
		DRoTR.options.reset();
	}
	
	public void dispose() {
		Disposer.dispose(this);
	}
	
	public class UI {
		@View("sfx") private Slider sfx;
		@View("music") private Slider music;
		@View("brightness") private Slider brightness;
		@View("color") private Slider color;
		@View("contrast") private Slider contrast;
		@View("gamespeed") private Slider gamespeed;
		@View("scrollspeed") private Slider scrollspeed;
		
		public void ok(InputEvent event){
			click.play();
			save();
			Timer.schedule(new Timer.Task() {
				@Override
				public void run() {
					close();
				}
			}, 0.25f);
		}
		
		public void cancel(InputEvent event){
			click.play();
			DRoTR.options.load();//load options before
			Timer.schedule(new Timer.Task() {
				@Override
				public void run() {
					close();
				}
			}, 0.25f);
		}
		
		public void defaultClick(InputEvent event){
			click.play();
			loadDefault();
		}
		
		public void drag(InputEvent e){
			Slider slider = (Slider)e.getTarget();
			String name = slider.getName();
			DRoTR.options.set(name, slider.getValue());
		}
	}

}

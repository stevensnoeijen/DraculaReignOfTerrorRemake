package nl.heretichammer.draculareignofterrorremake.screens.windows;

import nl.heretichammer.draculareignofterrorremake.assets.Asset;
import nl.heretichammer.draculareignofterrorremake.assets.AssetUtils;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.ActorLoader;
import nl.heretichammer.draculareignofterrorremake.view.ViewUtils;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.actions.Actions;
import com.badlogic.gdx.scenes.scene2d.ui.Window;
import com.badlogic.gdx.scenes.scene2d.utils.Align;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
import com.badlogic.gdx.utils.Timer;
import com.sun.java.swing.plaf.windows.resources.windows;

public class EngageDialog implements ScreenWindow {

	private boolean loaded;
	private UI ui = new UI();
	@Asset("sound/click.ogg") private Sound click;
	@Asset("sound/projectile-hit2.ogg") private Sound strike;
	private Window window;
	
	@Override
	public boolean isLoaded() {
		return loaded;
	}

	@Override
	public void load(AssetManager assetManager) {
		AssetUtils.load(this, assetManager);
		assetManager.load("layout/EngageDialog.xml", Actor.class, new ActorLoader.ActorLoaderParameter(ui));
	}

	@Override
	public void loaded(AssetManager assetManager) {
		AssetUtils.bind(this, assetManager);
		window = (Window) assetManager.get("layout/EngageDialog.xml", Actor.class);
		ViewUtils.bind(window, ui);
		loaded = true;
	}

	@Override
	public void show(Stage stage) {
		stage.addActor(window);
		window.pack();
	}

	@Override
	public void resume() {
		
	}

	@Override
	public void close() {
		window.remove();
	}
	
	public class UI {
		public ClickListener continueListener = new ClickListener(){
			public void clicked(InputEvent event, float x, float y) {
				strike.play();
				/*
				stage.addAction(Actions.fadeOut(1f));
				Timer.schedule(new Timer.Task() {
					@Override
					public void run() {
						//TODO
						//changeScreen(Wo)
					}
				}, 1f);
				*/
			};
		};
		
		public ClickListener newgameListener = new ClickListener(){
			public void clicked(InputEvent event, float x, float y) {
				click.play();
				Timer.schedule(new Timer.Task() {
					@Override
					public void run() {
						//MainMenuScreen.this.exit(dialog);
					}
				}, 0.25f);
			}
		};
		
		public ClickListener cancelListener = new ClickListener(){
			public void clicked(InputEvent event, float x, float y) {
				click.play();
				close();
			};
		};
	}
}

package nl.heretichammer.draculareignofterrorremake.screens.windows;

import nl.heretichammer.draculareignofterrorremake.assets.Asset;
import nl.heretichammer.draculareignofterrorremake.assets.AssetUtils;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.ActorLoader;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.scenes.scene2d.ui.Window;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.badlogic.gdx.utils.Timer;

public class LoadWindow implements ScreenWindow {
	private boolean loaded;
	@Asset("sound/click.ogg") private Sound click;
	@Asset("image/mainmenu.pack") private TextureAtlas textures;
	private UI ui = new UI();
	private Window window;
	private Image selected;
	
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
		selected = new Image(new TextureRegionDrawable(textures.findRegion("ui-border-selected")));
	}
	
	@Override
	public void resume() {
		
	}

	@Override
	public void close() {
		window.remove();
	}
	
	private void loadGame(String name){
		//TODO
		selected.remove();
	}
	
	public class UI {
		public void ok(InputEvent event){
			Label label = (Label)event.getTarget();
			final String name = label.getUserObject().toString();
			click.play();
			Timer.schedule(new Timer.Task() {
				@Override
				public void run() {
					loadGame(name);
				}
			}, 0.5f);
		}
		
		public void cancel(InputEvent event){
			click.play();
			Timer.schedule(new Timer.Task() {
				@Override
				public void run() {
					close();
					selected.remove();
				}
			}, 0.25f);
		}
		
		public void select(InputEvent event){
			if(selected.getParent() == null){//add if not added
				window.addActor(selected);
			}
			Label target = (Label)event.getTarget();
			selected.setPosition(target.getX() - 5f, target.getY());
		}
	}
}

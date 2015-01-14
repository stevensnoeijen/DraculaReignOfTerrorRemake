package nl.heretichammer.draculareignofterrorremake.screens;

import nl.heretichammer.draculareignofterrorremake.DRoTR;
import nl.heretichammer.draculareignofterrorremake.DRoTRGame;
import nl.heretichammer.draculareignofterrorremake.Disposer;
import nl.heretichammer.draculareignofterrorremake.assets.Asset;
import nl.heretichammer.draculareignofterrorremake.assets.AssetHelper;
import nl.heretichammer.draculareignofterrorremake.assets.AssetUtils;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.ActorLoader;
import nl.heretichammer.draculareignofterrorremake.screens.windows.EngageDialog;
import nl.heretichammer.draculareignofterrorremake.screens.windows.LoadWindow;
import nl.heretichammer.draculareignofterrorremake.screens.windows.OptionsWindow;
import nl.heretichammer.draculareignofterrorremake.screens.windows.SaveWindow;
import nl.heretichammer.draculareignofterrorremake.view.View;
import nl.heretichammer.draculareignofterrorremake.view.ViewUtils;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Screen;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.audio.Music;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.scenes.scene2d.Action;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.actions.Actions;
import com.badlogic.gdx.scenes.scene2d.ui.Button;
import com.badlogic.gdx.scenes.scene2d.ui.Dialog;
import com.badlogic.gdx.scenes.scene2d.ui.ImageButton;
import com.badlogic.gdx.scenes.scene2d.ui.ImageButton.ImageButtonStyle;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.Window;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
import com.badlogic.gdx.utils.Disposable;
import com.badlogic.gdx.utils.Timer;

public class MainMenuScreen extends ActorScreen {
	private Assets assets = new Assets();
	private UI ui = new UI();
	
	private Group mainScreen;
	private LoadWindow loadWindow = new LoadWindow();
	private SaveWindow saveWindow = new SaveWindow();
	private OptionsWindow optionsWindow = new OptionsWindow();
	private EngageDialog engageDialog = new EngageDialog();
	
	public MainMenuScreen() {

	}
	
	@Override
	protected void load(AssetManager assetManager) {
		super.load(assetManager);
		AssetUtils.load(assets, assetManager);
		assetManager.load("layout/MainMenuScreen.xml", Actor.class, new ActorLoader.ActorLoaderParameter(ui));
		saveWindow.load(assetManager);
		loadWindow.load(assetManager);
		optionsWindow.load(assetManager);
		engageDialog.load(assetManager);
	}

	@Override
	protected void loaded(AssetManager assetManager) {
		ViewUtils.bind(stage.getRoot(), ui);
		AssetUtils.bind(assets, assetManager);
		mainScreen = (Group) assetManager.get("layout/MainMenuScreen.xml", Actor.class);
		saveWindow.loaded(assetManager);
		loadWindow.loaded(assetManager);
		optionsWindow.loaded(assetManager);
		engageDialog.loaded(assetManager);
		stage.addActor(mainScreen);
		assets.music.setLooping(true);
		assets.music.setVolume(DRoTR.options.music);
		super.loaded(assetManager);
	};
	
	@Override
	public void show() {
		super.show();
		Gdx.input.setCursorImage(assets.pointer, 0, 0);
		assets.music.play();
	}

	private void changeScreen(Class<? extends Screen> clazz) {
		Game game = (Game)Gdx.app.getApplicationListener();
		
		if(clazz == CouncilScreen.class) {
			CouncilScreen worldMapScreen = new CouncilScreen();
			game.setScreen(worldMapScreen);
		}else {
			throw new IllegalArgumentException("Screen can not be made");
		}
	}
	
	private void exit(){
		stage.addAction(Actions.sequence(Actions.fadeOut(0.75f), new Action() {
			@Override
			public boolean act(float delta) {
				Gdx.app.exit();
				return true;
			}
		}));
	}
	
	private void exit(Window window) {
		window.remove();
	}
	
	@Override
	public void resume() {
		super.resume();
		assets.music.play();
	}
	
	@Override
	public void pause() {
		super.pause();
		assets.music.pause();
	}
	
	private static enum MenuItem {
		ENGAGE, LOAD, SAVE, INTRODUCTION, OPTIONS, CREDITS, EXIT
	}
	
	public class Assets implements Disposable {
		@Asset("music/war1.mp3") private Music music;
		@Asset("sound/block.ogg") private Sound block;
		@Asset("sound/projectile-hit2.ogg") private Sound strike;
		@Asset("sound/click.ogg") private Sound click;
		@Asset("image/pointer.png") private Pixmap pointer;
		
		public void dispose() {
			Disposer.dispose(this);
		}
	}
	
	public class UI {
		@View("engage") private ImageButton engage;
		@View("load") private ImageButton load;
		@View("save") private ImageButton save;
		@View("introduction") private ImageButton introduction;
		@View("options") private ImageButton options;
		@View("credits") private ImageButton credits;
		@View("exit") private ImageButton exit;
		
		public void enterMenuItem(InputEvent event) {
			Button button = (Button)event.getTarget();
			if(!button.isDisabled()) {
				assets.block.play(DRoTR.options.sfx);
			}
		}
		
		public void clickMenuItem(InputEvent event) {
			final Button button = (Button)event.getTarget();			
			if(!button.isDisabled()) {
				assets.strike.play(DRoTR.options.sfx);
				Timer.schedule(new Timer.Task() {
					@Override
					public void run() {
						MenuItem menuItem = MenuItem.valueOf(button.getName().toUpperCase());
						open(menuItem);
					}
				}, .25f);//delay opening menu-item 1 second
			}
		}
		
		private void open(MenuItem menuItem){
			switch (menuItem) {
			case ENGAGE:
				engageDialog.show(stage);
				break;
			case LOAD:
				loadWindow.show(stage);
				break;
			case SAVE:
				saveWindow.show(stage);
				break;
			case INTRODUCTION:
				throw new UnsupportedOperationException();
				//break;
			case OPTIONS:
				optionsWindow.show(stage);
				break;
			case EXIT:
				exit();
				break;
			default:
				throw new UnsupportedOperationException();
			}
		}
	}
}

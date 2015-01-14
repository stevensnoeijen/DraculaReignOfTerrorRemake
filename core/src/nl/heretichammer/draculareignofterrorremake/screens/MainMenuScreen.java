package nl.heretichammer.draculareignofterrorremake.screens;

import nl.heretichammer.draculareignofterrorremake.DRoTRGame;
import nl.heretichammer.draculareignofterrorremake.assets.Asset;
import nl.heretichammer.draculareignofterrorremake.assets.AssetHelper;
import nl.heretichammer.draculareignofterrorremake.assets.AssetUtils;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.ActorLoader;
import nl.heretichammer.draculareignofterrorremake.screens.windows.LoadWindow;
import nl.heretichammer.draculareignofterrorremake.screens.windows.OptionsWindow;
import nl.heretichammer.draculareignofterrorremake.screens.windows.SaveWindow;
import nl.heretichammer.draculareignofterrorremake.view.Bind;
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
import com.badlogic.gdx.utils.Timer;

public class MainMenuScreen extends ActorScreen {
	private Assets assets = new Assets();
	private UI ui = new UI();
	private LoadWindow loadWindow = new LoadWindow();
	private SaveWindow saveWindow = new SaveWindow();
	private OptionsWindow optionsWindow = new OptionsWindow();
	
	private AssetManager assetManager;
	private AssetHelper assetHelper;
	
	private Skin skin;//FIXME: remove this
	
	public MainMenuScreen() {
		assetManager = new AssetManager();
		assetHelper = new AssetHelper(assetManager);
	}
	
	@Override
	protected void load(AssetManager assetManager) {
		super.load(assetManager);
		AssetUtils.load(assets, assetManager);
		assetManager.load("layout/MainMenuScreen.xml", Actor.class, new ActorLoader.ActorLoaderParameter(ui));
		saveWindow.load(assetManager);
		loadWindow.load(assetManager);
		optionsWindow.load(assetManager);
	}

	@Override
	protected void loaded(AssetManager assetManager) {
		ViewUtils.bind(stage.getRoot(), ui);
		AssetUtils.bind(assets, assetManager);
		assets.mainScreen = (Group) assetManager.get("layout/MainMenuScreen.xml", Actor.class);
		saveWindow.loaded(assetManager);
		loadWindow.loaded(assetManager);
		optionsWindow.loaded(assetManager);
		stage.addActor(assets.mainScreen);
		assets.music.setLooping(true);
		super.loaded(assetManager);
	};
	
	@Override
	public void show() {
		super.show();
		if(DRoTRGame.preferences.getBoolean("music")){
			assets.music.play();
		}
		Gdx.input.setCursorImage(assets.pointer, 0, 0);
	}
	
	private void showEngageDialog() {
		final Dialog dialog = new Dialog("", skin);
		dialog.setBackground(assetHelper.getDrawable("images/mainmenu.pack:ui-dialog-engage"));
		
		//create buttonstyles
		ImageButtonStyle continueButtonStyle = new ImageButtonStyle();
		continueButtonStyle.over = assetHelper.getDrawable("images/mainmenu.pack:ui-button-continue-selected");
		continueButtonStyle.down = assetHelper.getDrawable("images/mainmenu.pack:ui-button-continue-clicked");
		ImageButtonStyle newGameButtonStyle = new ImageButtonStyle();
		newGameButtonStyle.over = assetHelper.getDrawable("images/mainmenu.pack:ui-button-newgame-selected");
		newGameButtonStyle.down = assetHelper.getDrawable("images/mainmenu.pack:ui-button-newgame-clicked");
		ImageButtonStyle cancelButtonStyle = new ImageButtonStyle();
		cancelButtonStyle.over = assetHelper.getDrawable("images/mainmenu.pack:ui-button-cancel-selected");
		cancelButtonStyle.down = assetHelper.getDrawable("images/mainmenu.pack:ui-button-cancel-clicked");
		
		//create and add buttons
		ImageButton continueButton = new ImageButton(continueButtonStyle);
		continueButton.setPosition(42, 105);
		continueButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				super.clicked(event, x, y);
				stage.addAction(Actions.fadeOut(1f));
				Timer.schedule(new Timer.Task() {
					@Override
					public void run() {
						//TODO
						//changeScreen(Wo)
					}
				}, 1f);
			}
		});
		dialog.addActor(continueButton);
		ImageButton newGameButton = new ImageButton(newGameButtonStyle);
		newGameButton.setPosition(42, 62);
		dialog.addActor(newGameButton);
		ImageButton cancelButton = new ImageButton(cancelButtonStyle);
		cancelButton.setPosition(42, 24);
		cancelButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				super.clicked(event, x, y);
				assets.click.play();
				Timer.schedule(new Timer.Task() {
					@Override
					public void run() {
						MainMenuScreen.this.exit(dialog);
					}
				}, 0.25f);
			}
		});
		dialog.addActor(cancelButton);
		
		dialog.show(stage);
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
		if(DRoTRGame.preferences.getBoolean("music")){
			assets.music.play();
		}
	}
	
	@Override
	public void pause() {
		super.pause();
		if(DRoTRGame.preferences.getBoolean("music")){
			assets.music.pause();
		}
	}
	
	@Override
	public void dispose() {
		super.dispose();
		assets.music.dispose();
		assets.music = null;
		
		assetManager.dispose();
		assetManager = null;
	}
	
	private static enum MenuItem {
		ENGAGE, LOAD, SAVE, INTRODUCTION, OPTIONS, CREDITS, EXIT
	}
	
	public class Assets {
		@Asset("music/war1.mp3") private Music music;
		@Asset("sound/block.ogg") private Sound block;
		@Asset("sound/projectile-hit2.ogg") private Sound strike;
		@Asset("sound/click.ogg") private Sound click;
		@Asset("image/pointer.png") private Pixmap pointer;
		private Group mainScreen;
	}
	
	public class UI {
		@Bind("engage") private ImageButton engage;
		@Bind("load") private ImageButton load;
		@Bind("save") private ImageButton save;
		@Bind("introduction") private ImageButton introduction;
		@Bind("options") private ImageButton options;
		@Bind("credits") private ImageButton credits;
		@Bind("exit") private ImageButton exit;
		
		public void enterMenuItem(InputEvent event) {
			Button button = (Button)event.getTarget();
			if(!button.isDisabled()) {
				assets.block.play();
			}
		}
		
		public void clickMenuItem(InputEvent event) {
			final Button button = (Button)event.getTarget();			
			if(!button.isDisabled()) {
				assets.strike.play();
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
				showEngageDialog();
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

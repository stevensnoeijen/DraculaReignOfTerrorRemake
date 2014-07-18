package nl.heretichammer.draculareignofterrorremake.screens;

import nl.heretichammer.draculareignofterrorremake.utils.AssetHelper;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.audio.Music;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.scenes.scene2d.Action;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.actions.Actions;
import com.badlogic.gdx.scenes.scene2d.ui.Button;
import com.badlogic.gdx.scenes.scene2d.ui.ButtonGroup;
import com.badlogic.gdx.scenes.scene2d.ui.Dialog;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.scenes.scene2d.ui.ImageButton;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.Slider;
import com.badlogic.gdx.scenes.scene2d.ui.Window;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
import com.badlogic.gdx.utils.Timer;

public class MainScreen extends SceneScreen {
	
	private static final int MENU_ENGAGE = 0, MENU_LOAD = 1, MENU_SAVE = 2, MENU_INTRODUCTION = 3, MENU_OPTIONS = 4, MENU_CREDITS = 5, MENU_EXIT = 6;
	
	private Music music;
	private Sound block, strike, click;
	
	private ButtonGroup menuGroup;
	
	private AssetManager assetManager;
	private AssetHelper assetHelper;
	
	private Skin skin;
	
	public MainScreen() {
		assetManager = new AssetManager();
		assetHelper = new AssetHelper(assetManager);
	}
	
	@Override
	public void show() {
		super.show();
		assetManager.load("uiskin.json", Skin.class);
		assetManager.load("images/mainmenu.pack", TextureAtlas.class);
		assetManager.load("music/war1.mp3", Music.class);
		assetManager.load("sounds/block.ogg", Sound.class);
		assetManager.load("sounds/projectile-hit2.ogg", Sound.class);
		assetManager.load("sounds/click.ogg", Sound.class);
		assetManager.finishLoading();
		
		skin = assetManager.get("uiskin.json", Skin.class);
		
		//set music
		music = assetManager.get("music/war1.mp3", Music.class);
		music.setLooping(true);
		music.play();
		//set sounds
		block = assetManager.get("sounds/block.ogg", Sound.class);
		strike = assetManager.get("sounds/projectile-hit2.ogg", Sound.class);
		click = assetManager.get("sounds/click.ogg", Sound.class);
		
		//add background
		addActor(new Image(assetHelper.getDrawable("images/mainmenu.pack:ui-screen-main")), "background", 0, 0);
		
		//add menu items
		menuGroup = new ButtonGroup();//for selection		
		
		addActor(createMenuItem("engage", MENU_ENGAGE), 128, 278);		
		addActor(createMenuItem("load", MENU_LOAD), 128, 241);
		addActor(createMenuItem("save", MENU_SAVE), 128, 198);
		addActor(createMenuItem("introduction", MENU_INTRODUCTION), 95, 159);
		addActor(createMenuItem("options", MENU_OPTIONS), 128, 114);
		addActor(createMenuItem("credits", MENU_CREDITS), 128, 75);	
		addActor(createMenuItem("exit", MENU_EXIT), 128, 31);
		
		Gdx.input.setCursorImage(new Pixmap(Gdx.files.internal("images/pointer.png")), 0, 0);
	}
	
	private Button createMenuItem(String name, final int menuItem) {
		ImageButton button = new ImageButton(createImageButtonStyle(name));
		
		button.addListener(new ClickListener() {
			@Override
			public void enter(InputEvent event, float x, float y, int pointer, Actor fromActor) {
				super.enter(event, x, y, pointer, fromActor);
				if(!isPressed()) {
					block.play();
				}
			}
			
			@Override
			public void clicked(InputEvent event, float x, float y) {
				super.clicked(event, x, y);
				strike.play();
				Timer.schedule(new Timer.Task() {
					@Override
					public void run() {
						onMenuItem(menuItem);
					}
				}, .25f);//delay opening menu-item 1 second
			}
		});
		menuGroup.add(button);
		return button;
	}
	
	private void onMenuItem(int menuItem) {
		switch(menuItem) {
		case MENU_ENGAGE:
			Dialog dialog = new Dialog("", skin);
			dialog.setBackground(assetHelper.getDrawable("images/mainmenu.pack:ui-dialog-engage"));
			dialog.show(stage);
			break;
		case MENU_LOAD:
			showLoadWindow();
			break;
		case MENU_SAVE:
			
			break;
		case MENU_INTRODUCTION:
			
			break;
		case MENU_OPTIONS:
			showOptionsWindow();
			break;
		case MENU_CREDITS:
			
			break;
		case MENU_EXIT:
			stage.addAction(Actions.sequence(Actions.fadeOut(0.75f), new Action() {
				@Override
				public boolean act(float delta) {
					Gdx.app.exit();
					return true;
				}
			}));
			break;
		default:
		}
	}
	
	private void showLoadWindow() {
		Window window = new Window("", skin);
		window.setBackground(assetHelper.getDrawable("images/mainmenu.pack:ui-window-load"));
		window.setFillParent(true);
		
		//create buttonstyles
		
		stage.addActor(window);
	}
	
	private void showOptionsWindow() {
		final Window window = new Window("", skin);
		window.setBackground(assetHelper.getDrawable("images/mainmenu.pack:ui-window-options"));
		window.setFillParent(true);
		
		//create buttonstyles
		ImageButton.ImageButtonStyle okButtonStyle = new ImageButton.ImageButtonStyle();
		okButtonStyle.down = assetHelper.getDrawable("images/mainmenu.pack:ui-button2-ok-clicked");
		ImageButton.ImageButtonStyle cancelButtonStyle = new ImageButton.ImageButtonStyle();
		cancelButtonStyle.down = assetHelper.getDrawable("images/mainmenu.pack:ui-button2-cancel-clicked");
		ImageButton.ImageButtonStyle defaultButtonStyle = new ImageButton.ImageButtonStyle();
		defaultButtonStyle.down = assetHelper.getDrawable("images/mainmenu.pack:ui-button2-default-clicked");

		//create and add buttons
		ImageButton okButton = new ImageButton(okButtonStyle);
		okButton.setPosition(112, 265);
		okButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				super.clicked(event, x, y);
				click.play();
				Timer.schedule(new Timer.Task() {
					@Override
					public void run() {
						MainScreen.this.exit(window);
					}
				}, 0.5f);
			}
		});
		window.addActor(okButton);
		ImageButton cancelButton = new ImageButton(cancelButtonStyle);
		cancelButton.setPosition(112, 192);
		cancelButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				super.clicked(event, x, y);
				click.play();
				Timer.schedule(new Timer.Task() {
					@Override
					public void run() {
						MainScreen.this.exit(window);
					}
				}, 0.25f);
			}
		});
		window.addActor(cancelButton);
		ImageButton defaultButton = new ImageButton(defaultButtonStyle);
		defaultButton.setPosition(112, 118);
		defaultButton.addListener(new ClickListener() {
			@Override
			public void clicked(InputEvent event, float x, float y) {
				super.clicked(event, x, y);
				click.play();
				Timer.schedule(new Timer.Task() {
					@Override
					public void run() {
						MainScreen.this.exit(window);
					}
				}, 0.25f);
			}
		});
		window.addActor(defaultButton);
		
		stage.addActor(window);
	}
	
	private void exit(Window window) {
		window.remove();
	}
	
	private void addActor(Actor actor, String name, int x, int y) {
		actor.setName(name);
		actor.setPosition(x, y);
		stage.addActor(actor);
	}
	
	private void addActor(Actor actor, int x, int y) {
		addActor(actor, null, x, y);
	}
	
	private ImageButton.ImageButtonStyle createImageButtonStyle(String name){
		ImageButton.ImageButtonStyle style = new ImageButton.ImageButtonStyle();
		style.down = assetHelper.getDrawable("images/mainmenu.pack:ui-button-" + name + "-clicked");
		style.over = assetHelper.getDrawable("images/mainmenu.pack:ui-button-" + name + "-selected");
		style.disabled = assetHelper.getDrawable("images/mainmenu.pack:ui-button-" + name + "-disabled");
		
		return style;
	}
	
	@Override
	public void resume() {
		super.resume();
		music.play();
	}
	
	@Override
	public void pause() {
		super.pause();
		music.pause();
	}
	
	@Override
	public void dispose() {
		super.dispose();
		music.dispose();
		block.dispose();
		strike.dispose();
		assetManager.dispose();
	}
}

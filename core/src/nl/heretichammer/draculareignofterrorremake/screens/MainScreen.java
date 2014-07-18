package nl.heretichammer.draculareignofterrorremake.screens;

import nl.heretichammer.draculareignofterrorremake.utils.AssetHelper;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.audio.Music;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.ui.Button;
import com.badlogic.gdx.scenes.scene2d.ui.ButtonGroup;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.scenes.scene2d.ui.ImageButton;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;

public class MainScreen extends SceneScreen {
	
	private static final int MENU_ENGAGE = 0, MENU_LOAD = 1, MENU_SAVE = 2, MENU_INTRODUCTION = 3, MENU_OPTIONS = 4, MENU_CREDITS = 5, MENU_EXIT = 6;
	
	private Music music;
	private Sound block, strike;
	
	private ButtonGroup menuGroup;
	
	private AssetManager assetManager;
	private AssetHelper assetHelper;
	
	public MainScreen() {
		assetManager = new AssetManager();
		assetHelper = new AssetHelper(assetManager);
	}
	
	@Override
	public void show() {
		super.show();
		assetManager.load("images/mainmenu.pack", TextureAtlas.class);
		assetManager.load("music/war1.mp3", Music.class);
		assetManager.load("sounds/block.ogg", Sound.class);
		assetManager.load("sounds/projectile-hit2.ogg", Sound.class);		
		assetManager.finishLoading();
		
		//set music
		music = assetManager.get("music/war1.mp3", Music.class);
		music.setLooping(true);
		music.play();
		//set sounds
		block = assetManager.get("sounds/block.ogg", Sound.class);
		strike = assetManager.get("sounds/projectile-hit2.ogg", Sound.class);
		
		//add background
		addActor(new Image(assetHelper.getDrawable("images/mainmenu.pack:ui-screen-main")), "background", 0, 0);
		
		//add menu items
		menuGroup = new ButtonGroup();//for selection
		ImageButton button;
		
			
		addActor(button = new ImageButton(createImageButtonStyle("engage")), "engage", 128, 278);
		addMenuItem(button, MENU_ENGAGE);
		button.setChecked(true);
		stage.setKeyboardFocus(button);
		addActor(button = new ImageButton(createImageButtonStyle("load")), "load", 128, 241);
		addMenuItem(button, MENU_LOAD);
		addActor(button = new ImageButton(createImageButtonStyle("save")), "save", 128, 198);
		addMenuItem(button, MENU_SAVE);
		addActor(button = new ImageButton(createImageButtonStyle("introduction")), "introduction", 95, 159);
		addMenuItem(button, MENU_INTRODUCTION);
		addActor(button = new ImageButton(createImageButtonStyle("options")), "options", 128, 114);
		addMenuItem(button, MENU_OPTIONS);
		addActor(button = new ImageButton(createImageButtonStyle("credits")), "credits", 128, 75);
		addMenuItem(button, MENU_CREDITS);
		addActor(button = new ImageButton(createImageButtonStyle("exit")), "exit", 128, 31);
		addMenuItem(button, MENU_EXIT);
	}
	
	private void addMenuItem(Button button, final int menuItem) {
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
				onMenuItem(menuItem);
			}
		});
		menuGroup.add(button);
	}
	
	private void onMenuItem(int menuItem) {
		
	}
	
	private Actor addActor(Actor actor, String name, int x, int y) {
		actor.setName(name);
		actor.setPosition(x, y);
		stage.addActor(actor);
		return actor;
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
	}
}

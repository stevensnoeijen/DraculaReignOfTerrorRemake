package nl.heretichammer.draculareignofterrorremake.screens;

import nl.heretichammer.draculareignofterrorremake.models.Area;
import nl.heretichammer.draculareignofterrorremake.models.units.Unit;
import nl.heretichammer.draculareignofterrorremake.utils.AssetHelper;
import aurelienribon.tweenengine.TweenManager;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.audio.Music;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.math.Vector3;
import com.badlogic.gdx.scenes.scene2d.ui.Image;

public class BattleScreen extends MapScreen {
	private AreaMapScreenState state;
	private Area area;
	
	private Music music;
	
	private AssetManager assetManager = new AssetManager();
	private AssetHelper assetHelper = new AssetHelper(assetManager);
	
	private SpriteBatch spriteBatch;
	
	private final TweenManager tweenManager = new TweenManager();
	
	public final static int POSITION_XY = 1;
	public BattleScreen() {

	}
	
	@Override
	public String getMapFilePath() {
		return "data/maps/test2.tmx";
	}
	
	@Override
	public void show() {
		super.show();		
		assetManager.load("images/battle-ui.pack", TextureAtlas.class);
		assetManager.load("images/units.pack", TextureAtlas.class);
		assetManager.load("music/war1.mp3", Music.class);
		assetManager.finishLoading();
		
		music = assetManager.get("music/war1.mp3", Music.class);
		
		stage.addActor(new Image(assetHelper.getDrawable("images/battle-ui.pack:ui-panel-left")));
		
		spriteBatch = new SpriteBatch();
		
		setState(new AreaMapScreenPlayState());
	}
	
	@Override
	public void render(float delta) {
		super.render(delta);
		tweenManager.update(delta);
		spriteBatch.setProjectionMatrix(camera.combined);
		spriteBatch.begin();
		spriteBatch.end();
	}
	
	@Override
	public boolean touchDown(int screenX, int screenY, int pointer, int button) {
		Vector3 pos = camera.unproject(new Vector3(screenX, screenY, 0));

		//sprite.setCenter(pos.x, pos.y);
		return true;
	}
	
	@Override
	public boolean keyDown(int keycode) {
		if(keycode == Input.Keys.ESCAPE) {
			if(state instanceof AreaMapScreenPlayState) {//is playing
				pause();
			}else if(state instanceof AreaMapScreenPauseState) {
				unpause();
			}
			
			return true;
		}
		return false;
	}
	
	protected void setState(AreaMapScreenState state) {
		this.state = state;
		this.state.create();
	}
	
	@Override
	public void pause() {
		super.pause();
		setState(new AreaMapScreenPauseState());
	}
	
	public void unpause() {
		setState(new AreaMapScreenPlayState());
	}
	
	@Override
	public void dispose() {
		super.dispose();
		spriteBatch.dispose();
	}
	
	@Override
	public boolean mouseMoved(int screenX, int screenY) {
		if(screenX < 15) {//mouse is left
			camera.position.x--;
			camera.update();
			return true;
		}
		if(screenX > (Gdx.graphics.getWidth() - 15)) {//mouse is right
			camera.position.x++;
			camera.update();
			return true;
		}
		if(screenY < 15){//mouse is top
			camera.position.y++;
			camera.update();
		}
		if(screenY > (Gdx.graphics.getHeight() - 15)) {//mouse is bottom
			camera.position.y--;
			camera.update();
		}
		
		return false;
	}

	@Override
	public boolean scrolled(int amount) {
		if(amount == 1) {//zoom in
			if(camera.zoom > 1) {
				camera.zoom -= 0.5;
				camera.update();
				return true;
			}
		} else {//zoom out
			if(camera.zoom < 2) {
				camera.zoom += 0.5;
				camera.update();
				return true;
			}
		}
		return false;
	}
	
	private interface AreaMapScreenState {
		public void create();
	}
	
	public class AreaMapScreenPlayState implements AreaMapScreenState {
		@Override
		public void create() {
			//music.play();
			
		}
	}
	
	public class AreaMapScreenPauseState implements AreaMapScreenState {
		@Override
		public void create() {
			music.pause();
			
		}
	}
}

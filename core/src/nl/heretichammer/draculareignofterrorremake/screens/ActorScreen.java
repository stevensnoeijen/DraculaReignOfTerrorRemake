package nl.heretichammer.draculareignofterrorremake.screens;

import java.lang.reflect.Field;

import nl.heretichammer.draculareignofterrorremake.annotations.Asset;
import nl.heretichammer.draculareignofterrorremake.annotations.View;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.InputProcessor;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.scenes.scene2d.Stage;

public abstract class ActorScreen extends ScreenAdapter implements InputProcessor {
	protected Stage stage;
	private boolean loaded;
	
	public ActorScreen() {
		stage = new Stage();
	}
	
	public boolean isLoaded(){
		return loaded;
	}
	
	protected void load(AssetManager assetManager){
		//load assets that are defined with fields
		for(Field field : getClass().getDeclaredFields()){
			if(field.isAnnotationPresent(Asset.class)){
				Asset asset = field.getAnnotation(Asset.class);
				assetManager.load(asset.value(), field.getType());
			}
		}
	}
	
	protected void loaded(AssetManager assetManager){
		Group root = stage.getRoot();
		for(Field field : this.getClass().getDeclaredFields()){
			if(field.isAnnotationPresent(Asset.class)){
				Asset asset = field.getAnnotation(Asset.class);
				try {
					field.setAccessible(true);
					field.set(this, assetManager.get(asset.value(), field.getType()));
				} catch (Exception ex){
					throw new RuntimeException(ex);
				}
			}else if(field.isAnnotationPresent(View.class)){
				View view = field.getAnnotation(View.class);
				Actor actor = root.findActor(view.value());
				try {
					field.setAccessible(true);
					field.set(this, field.getType().cast(actor));
				} catch (Exception ex){
					throw new RuntimeException(ex);
				}
			}
		}
		loaded = true;
	}
	
	@Override
	public void show() {
		Gdx.input.setInputProcessor(stage);
	}
	
	@Override
	public void render(float delta) {
		Gdx.gl.glClearColor(0, 0, 0, 1);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
		renderStage(delta);
	}
	
	protected void renderStage(float delta) {
		stage.act(delta);
		stage.draw();
	}
	
	@Override
	public void resize(int width, int height) {
		stage.getViewport().update(width, height, true);
	}
	
	@Override
	public void dispose() {
		super.dispose();
		stage.dispose();
	}

	@Override
	public boolean keyDown(int keycode) {
		return false;
	}

	@Override
	public boolean keyUp(int keycode) {
		return false;
	}

	@Override
	public boolean keyTyped(char character) {
		return false;
	}

	@Override
	public boolean touchDown(int screenX, int screenY, int pointer, int button) {
		return false;
	}

	@Override
	public boolean touchUp(int screenX, int screenY, int pointer, int button) {
		return false;
	}

	@Override
	public boolean touchDragged(int screenX, int screenY, int pointer) {
		return false;
	}

	@Override
	public boolean mouseMoved(int screenX, int screenY) {
		return false;
	}

	@Override
	public boolean scrolled(int amount) {
		return false;
	}
}

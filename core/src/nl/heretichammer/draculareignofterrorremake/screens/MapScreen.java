package nl.heretichammer.draculareignofterrorremake.screens;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.InputMultiplexer;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.maps.Map;
import com.badlogic.gdx.maps.MapRenderer;
import com.badlogic.gdx.maps.tiled.TiledMap;
import com.badlogic.gdx.maps.tiled.TmxMapLoader;
import com.badlogic.gdx.maps.tiled.renderers.OrthogonalTiledMapRenderer;

public abstract class MapScreen extends Scene2DScreen {
	
	protected MapRenderer mapRenderer;
	protected Map map;
	protected OrthographicCamera camera;
	
	@Override
	public void show() {
		super.show();
		map = new TmxMapLoader().load(getMapFilePath());
		mapRenderer = new OrthogonalTiledMapRenderer((TiledMap) map);
		camera = new OrthographicCamera(Gdx.graphics.getWidth(), Gdx.graphics.getHeight());
		Gdx.input.setInputProcessor(new InputMultiplexer(stage, this));
	}
	
	public abstract String getMapFilePath();
	
	@Override
	public void render(float delta) {
		Gdx.gl.glClearColor(0, 0, 0, 1);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
		
		renderMap(delta);		
		renderStage(delta);
	}
	
	protected void renderMap(float delta) {
		mapRenderer.setView(camera);
		mapRenderer.render();
	}
	
	@Override
	public void resize(int width, int height) {
		super.resize(width, height);
		camera.viewportHeight = height;
		camera.viewportWidth = width;
		camera.update();
	}
}

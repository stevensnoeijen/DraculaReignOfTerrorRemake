package nl.heretichammer.draculareignofterrorremake.screens;

import nl.heretichammer.draculareignofterrorremake.utils.OrthographicCameraController;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.InputMultiplexer;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.maps.Map;
import com.badlogic.gdx.maps.MapRenderer;
import com.badlogic.gdx.maps.tiled.TiledMap;
import com.badlogic.gdx.maps.tiled.TmxMapLoader;
import com.badlogic.gdx.maps.tiled.renderers.OrthogonalTiledMapRenderer;

public class MapScreen extends Scene2DScreen {
	
	protected MapRenderer mapRenderer;
	protected Map map;
	protected OrthographicCamera camera;
	protected OrthographicCameraController cameraController;
	
	@Override
	public void show() {
		super.show();
		
		map = new TmxMapLoader().load("data/maps/test.tmx");
		mapRenderer = new OrthogonalTiledMapRenderer((TiledMap) map, 1 / 60f);
		camera = new OrthographicCamera(10f, 8f);
		camera.position.set(10f/2f,8f/2f,0);
		camera.update();
		cameraController = new OrthographicCameraController(camera);
		Gdx.input.setInputProcessor(new InputMultiplexer(stage, cameraController));
	}
	
	@Override
	public void render(float delta) {
		Gdx.gl.glClearColor(0.7f, 0.7f, 1.0f, 1);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
		      
		float deltaTime = Gdx.graphics.getDeltaTime();
		stage.act(deltaTime);

		camera.update();
		      
		mapRenderer.setView(camera);
		mapRenderer.render();
		      
		stage.draw();
	}
	
	@Override
	public void resize(int width, int height) {
		super.resize(width, height);
		cameraController.resize(width, height);
	}
}

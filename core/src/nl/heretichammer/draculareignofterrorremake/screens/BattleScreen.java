package nl.heretichammer.draculareignofterrorremake.screens;

import com.badlogic.ashley.core.Engine;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.InputMultiplexer;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.g3d.utils.CameraInputController;
import com.badlogic.gdx.maps.tiled.TiledMap;
import com.badlogic.gdx.maps.tiled.TiledMapRenderer;
import com.badlogic.gdx.maps.tiled.TmxMapLoader;
import com.badlogic.gdx.maps.tiled.renderers.OrthogonalTiledMapRenderer;

public class BattleScreen extends ScreenAdapter {
	
	CameraInputController cameraController;
	OrthographicCamera camera;
	TiledMap map;
	TiledMapRenderer mapRenderer;
	private SpriteBatch batch;
	private Sprite sprite;
	private Engine engine;
	
	public BattleScreen() {
		float w = Gdx.graphics.getWidth();
		float h = Gdx.graphics.getHeight();

		camera = new OrthographicCamera();
		camera.setToOrtho(false, (w / h) * 10, 10);
		camera.update();
		cameraController = new CameraInputController(this.camera);
		Gdx.input.setInputProcessor(new InputMultiplexer(cameraController));
		
		engine = new Engine();
		
		map = new TmxMapLoader().load("data/maps/test.tmx");
		mapRenderer = new OrthogonalTiledMapRenderer(map, 1f / 32f);
		sprite = new Sprite(new Texture(Gdx.files.internal("image/icon.png")));
	}
	
	@Override
	public void show() {
		super.show();
		batch = new SpriteBatch();
	}
	
	@Override
	public void render(float delta) {
		camera.update();
		cameraController.update();
		mapRenderer.setView(camera);
		mapRenderer.render();
		
		batch.begin();
		sprite.draw(batch);
		batch.end();
		
		update(delta);
	}
	
	public void update (float delta) {
		engine.update(delta);
	}
}

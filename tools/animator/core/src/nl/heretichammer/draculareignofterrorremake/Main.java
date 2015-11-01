package nl.heretichammer.draculareignofterrorremake;

import java.util.HashMap;
import java.util.Map;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Animation;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.graphics.g2d.TextureAtlas.AtlasRegion;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.SelectBox;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.utils.ChangeListener;
import com.badlogic.gdx.utils.Array;
import com.badlogic.gdx.utils.Json;
import com.badlogic.gdx.utils.JsonReader;
import com.badlogic.gdx.utils.JsonValue;

public class Main extends ApplicationAdapter {
	
	private final static String ASSETS_LOC = "..\\..\\..\\android\\assets\\";
	
	private Stage stage;
	
	SpriteBatch batch;
	
	float stateTime = 0;
	Animation animation;
	
	Map<String, JsonValue> animationsData = new HashMap<String, JsonValue>();
	
	@Override
	public void create () {
		Skin skin = new Skin(Gdx.files.internal("uiskin.json")); 
		
		stage = new Stage();
		Gdx.input.setInputProcessor(stage);
		
		JsonReader reader = new JsonReader();
		final JsonValue value = reader.parse(Gdx.files.absolute(ASSETS_LOC + "image\\animations.json"));
		
		for(int i = 0; i < value.size; i++){
			animationsData.put(value.get(i).getString("name"), value.get(i));		
		}	
		
		final SelectBox select = new SelectBox<String>(skin);
		select.addListener(new ChangeListener() {
			@Override
			public void changed(ChangeEvent event, Actor actor) {
				
				JsonValue animationData =  animationsData.get(select.getSelected().toString());
				
				float duration = animationData.getFloat("duration");
				
				String frames = animationData.getString("frames");
				String fileName = frames.split(":")[0];
				fileName = fileName.replace("/", "\\");
				String region = frames.split(":")[1];
				
				TextureAtlas atlas = new TextureAtlas(Gdx.files.absolute(ASSETS_LOC + "image\\units.pack"));
				Array<AtlasRegion> keyFrames = atlas.findRegions(region);

				animation = new Animation(duration, keyFrames, Animation.PlayMode.LOOP);
			}
		});
		
		select.setItems(animationsData.keySet().toArray());
		
		stage.addActor(select);		
		select.pack();
		
		batch = new SpriteBatch();
		
	}
	
	public void resize (int width, int height) {
	    stage.getViewport().update(width, height, true);
	}
	
	@Override
	public void render () {
		stateTime += Gdx.graphics.getDeltaTime();
		Gdx.gl.glClearColor(0, 0, 0, 1);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
		
	    stage.act();
	    stage.draw();
		
		batch.begin();
		if(animation != null){
			batch.draw(animation.getKeyFrame(stateTime), 200, 100);
		}
		batch.end();
	}
	
	@Override
	public void dispose() {
		stage.dispose();
		super.dispose();
	}
}

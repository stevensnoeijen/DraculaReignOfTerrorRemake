package nl.heretichammer.draculareignofterrorremake.screens;

import nl.heretichammer.draculareignofterrorremake.AnimationMap;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.AnimationMapLoader;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.ActorLoader;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.assets.loaders.resolvers.InternalFileHandleResolver;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;

public class LoadScreen extends ActorScreen {
	private AssetManager assetManager;
	private ActorScreen next;
	
	public LoadScreen(ActorScreen next) {
		this.next = next;
		assetManager = new AssetManager();
		assetManager.setLoader(Actor.class, new ActorLoader(new InternalFileHandleResolver()));
		assetManager.setLoader(AnimationMap.class, new AnimationMapLoader(new InternalFileHandleResolver()));
		next.load(assetManager);
	}
	
	@Override
	public void show() {
		super.show();
		stage.addActor(new Image(new TextureRegionDrawable(new TextureRegion(new Texture(Gdx.files.internal("image/loading.png"))))));
	}
	
	@Override
	public void render(float delta) {
		super.render(delta);
		boolean done = assetManager.update();
		if(done){
			next.loaded(assetManager);
			((Game)Gdx.app.getApplicationListener()).setScreen(next);
		}
	}
}

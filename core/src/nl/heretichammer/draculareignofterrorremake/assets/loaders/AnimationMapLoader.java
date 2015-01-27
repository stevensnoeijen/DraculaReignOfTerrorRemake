package nl.heretichammer.draculareignofterrorremake.assets.loaders;

import java.util.HashSet;
import java.util.Set;

import nl.heretichammer.draculareignofterrorremake.AnimationMap;
import nl.heretichammer.draculareignofterrorremake.assets.AssetUtils;

import com.badlogic.gdx.assets.AssetDescriptor;
import com.badlogic.gdx.assets.AssetLoaderParameters;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.assets.loaders.AsynchronousAssetLoader;
import com.badlogic.gdx.assets.loaders.FileHandleResolver;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.graphics.g2d.Animation;
import com.badlogic.gdx.graphics.g2d.Animation.PlayMode;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.graphics.g2d.TextureAtlas.AtlasRegion;
import com.badlogic.gdx.utils.Array;
import com.badlogic.gdx.utils.JsonReader;
import com.badlogic.gdx.utils.JsonValue;

public class AnimationMapLoader extends AsynchronousAssetLoader<AnimationMap, AnimationMapLoader.AnimationMapLoaderParameters> {

	private JsonReader reader = new JsonReader();
	private JsonValue root;
	
	private AnimationMap animations;
	
	public AnimationMapLoader(FileHandleResolver resolver) {
		super(resolver);
	}

	@Override
	public Array<AssetDescriptor> getDependencies(String fileName, FileHandle file,	AnimationMapLoaderParameters parameter) {
		Set<String> atlases = new HashSet<String>();
		root = reader.parse(file);
		for(JsonValue child : root){
			String frames = child.getString("frames");
			String atlas = AssetUtils.getAtlasFileName(frames);
			atlases.add(atlas);
		}
		
		Array<AssetDescriptor> dependencies = new Array<AssetDescriptor>();
		for(String atlas : atlases){
			dependencies.add(new AssetDescriptor<TextureAtlas>(atlas, TextureAtlas.class));
		}
		return dependencies;
	}
	
	@Override
	public void loadAsync(AssetManager manager, String fileName, FileHandle file, AnimationMapLoaderParameters parameter) {
		animations = new AnimationMap();
		
		for(JsonValue child : root){			
			float duration = child.getFloat("duration");
			String frames = child.getString("frames");
			Animation.PlayMode mode = PlayMode.NORMAL;
			if(child.has("mode")){
				mode = Animation.PlayMode.valueOf(child.getString("mode"));
			}
			
			String[] args = frames.split(":");
			Array<AtlasRegion> regions = manager.get(args[0], TextureAtlas.class).findRegions(args[1]);
			
			Animation animation = new Animation(duration, regions, mode);
			animations.put(child.name, animation);
		}
	}

	@Override
	public AnimationMap loadSync(AssetManager manager, String fileName, FileHandle file, AnimationMapLoaderParameters parameter) {
		return animations;
	}	

	public final class AnimationMapLoaderParameters extends AssetLoaderParameters<AnimationMap> {
		
	}
}

package nl.heretichammer.draculareignofterrorremake.assets;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Animation;
import com.badlogic.gdx.graphics.g2d.Animation.PlayMode;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.graphics.g2d.TextureAtlas.AtlasRegion;
import com.badlogic.gdx.scenes.scene2d.utils.Drawable;
import com.badlogic.gdx.scenes.scene2d.utils.SpriteDrawable;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.badlogic.gdx.utils.Array;

public class AssetHelper {
	/**
	 * A empty drawable, used when the disabled image is in the background.
	 */
	public static Drawable EMPTY = new SpriteDrawable( new Sprite( new Texture(1, 1, Pixmap.Format.Alpha) ) );
	
	private AssetManager assetManager;
	
	public AssetHelper(AssetManager assetManager) {
		this.assetManager = assetManager;
	}
	
	/**
	 * 
	 * @param name requires format "file.pack:regionname"
	 * @return atlasregion
	 * @throws IllegalArgumentException if the format is incorrect.
	 */
	public Array<AtlasRegion> getAtlasRegions(String name) {
		String[] args = name.split(":");
		if(args.length != 2) {
			throw new IllegalArgumentException("Incorrect format");
		}
		final String fileName = args[0];
		final String region = args[1];
		
		final TextureAtlas atlas = assetManager.get(fileName);		
		return atlas.findRegions(region);//if atlas doesnt exist it will throw a null-pointer exception
	}
	
	public AtlasRegion getAtlasRegion(String name) {
		String[] args = name.split(":");
		if(args.length != 2) {
			throw new IllegalArgumentException("Incorrect format");
		}
		final String fileName = args[0];
		final String region = args[1];
		
		final TextureAtlas atlas = assetManager.get(fileName);		
		return atlas.findRegion(region);//if atlas doesnt exist it will throw a null-pointer exception
	}
	
	/**
	 * @see #getAtlasRegion(String)
	 * @param name
	 * @return
	 */
	public Texture getAtlasTexture(String name) {
		return getAtlasRegion(name).getTexture();
	}
	
	public Drawable getDrawable(String name) {
		return new TextureRegionDrawable(getAtlasRegion(name));
	}
	
	public Animation getAnimation(String name) {
		return new Animation(0.1f, getAtlasRegions(name), PlayMode.LOOP_REVERSED);
	}

	public Sound getSound(String name) {
		return assetManager.get(String.format("sound/%s.ogg", name), Sound.class);
	}
}

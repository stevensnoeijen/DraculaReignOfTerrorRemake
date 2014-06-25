package nl.heretichammer.draculareignofterrorremake.utils;

import nl.heretichammer.draculareignofterrorremake.constants.Constants;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.graphics.g2d.TextureAtlas.AtlasRegion;

public class AssetHelper {
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
	public AtlasRegion getAtlasRegion(String name) {
		String[] args = name.split(":");
		if(args.length != 2) {
			throw new IllegalArgumentException(Constants.exceptions.incorrectformat);
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
}

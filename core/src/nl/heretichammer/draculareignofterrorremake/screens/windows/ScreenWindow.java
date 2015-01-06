package nl.heretichammer.draculareignofterrorremake.screens.windows;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.scenes.scene2d.Stage;

public interface ScreenWindow {
	public boolean isLoaded();
	
	public void load(AssetManager assetManager);
	
	public void loaded(AssetManager assetManager);
	
	public void show(Stage stage);
	
	public  void resume();
	
	public void close();
}

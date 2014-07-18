package nl.heretichammer.draculareignofterrorremake.screens;

import com.badlogic.gdx.InputMultiplexer;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.scenes.scene2d.ui.Image;

import nl.heretichammer.draculareignofterrorremake.map.AreaMap;
import nl.heretichammer.draculareignofterrorremake.screens.states.ScreenState;
import nl.heretichammer.draculareignofterrorremake.utils.AssetHelper;

public class AreaMapScreen extends MapScreen {
	private ScreenState state;
	
	private AreaMap areaMap;
	
	private AssetManager assetManager = new AssetManager();
	private AssetHelper assetHelper = new AssetHelper(assetManager);
	
	public AreaMapScreen() {
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public void show() {
		super.show();
		
		assetManager.load("images/battle-ui.pack", TextureAtlas.class);
		assetManager.finishLoading();
		
		stage.addActor(new Image(assetHelper.getDrawable("images/battle-ui.pack:ui-panel-left")));
	}
}

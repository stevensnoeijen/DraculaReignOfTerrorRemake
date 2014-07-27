package nl.heretichammer.draculareignofterrorremake;

import nl.heretichammer.draculareignofterrorremake.screens.AreaMapScreen;
import nl.heretichammer.draculareignofterrorremake.screens.MainScreen;
import nl.heretichammer.draculareignofterrorremake.screens.MapScreen;
import nl.heretichammer.draculareignofterrorremake.screens.WorldMapScreen;

import com.badlogic.gdx.Game;

public class DRoTRGame extends Game {

	@Override
	public void create() {
		setScreen(new WorldMapScreen());
	}
	
}

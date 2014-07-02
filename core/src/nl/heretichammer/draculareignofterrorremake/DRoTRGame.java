package nl.heretichammer.draculareignofterrorremake;

import nl.heretichammer.draculareignofterrorremake.screens.WorldMapScreen;

import com.badlogic.gdx.Game;

public class DRoTRGame extends Game {

	@Override
	public void create() {
		setScreen(new WorldMapScreen());
	}
	
}

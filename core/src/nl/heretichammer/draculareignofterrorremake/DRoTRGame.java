package nl.heretichammer.draculareignofterrorremake;

import nl.heretichammer.draculareignofterrorremake.screens.DRoTRGameSave;
import nl.heretichammer.draculareignofterrorremake.screens.WorldMapScreen;

import com.badlogic.gdx.Game;

public class DRoTRGame extends Game {
	
	public final static DRoTRGameSave save = new DRoTRGameSave();
	
	@Override
	public void create() {
		setScreen(new WorldMapScreen());
		save.create("test.gs");
	}
}

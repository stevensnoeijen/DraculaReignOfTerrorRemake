package nl.heretichammer.draculareignofterrorremake;

import nl.heretichammer.draculareignofterrorremake.screens.BattleScreen;
import nl.heretichammer.draculareignofterrorremake.screens.CouncilScreen;

import com.badlogic.gdx.Game;

public class DRoTRGame extends Game {
	
	@Override
	public void create() {
		setScreen(new CouncilScreen());
	}
}

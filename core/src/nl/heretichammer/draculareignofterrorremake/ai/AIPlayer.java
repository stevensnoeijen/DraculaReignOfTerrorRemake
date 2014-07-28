package nl.heretichammer.draculareignofterrorremake.ai;

import nl.heretichammer.draculareignofterrorremake.team.Player;
import nl.heretichammer.draculareignofterrorremake.team.Team;

public class AIPlayer extends Player {

	public AIPlayer(Team team) {
		super(team);
	}
	
	@Override
	public void turn() {
		turnDone();
	}
}

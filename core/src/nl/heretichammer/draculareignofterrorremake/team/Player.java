package nl.heretichammer.draculareignofterrorremake.team;

import nl.heretichammer.draculareignofterrorremake.tbs.TurnManager;
import nl.heretichammer.draculareignofterrorremake.tbs.Turnable;

public class Player implements Teamable, Turnable {
	private Team team;
	
	public Player(Team team) {
		setTeam(team);
	}
	
	@Override
	public Team getTeam() {
		return team;
	}

	@Override
	public void setTeam(Team team) {
		if(team == null) {
			throw new NullPointerException();
		}
		this.team = team;
		team.addPlayer(this);
	}

	@Override
	public void turn() {
		
	}
	
	public void turnDone() {
		TurnManager.instance.done(this);
	}
}

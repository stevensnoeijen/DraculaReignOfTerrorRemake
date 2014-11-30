package nl.heretichammer.draculareignofterrorremake;

import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.team.Teamable;

public class Player implements Teamable {
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
			throw new IllegalArgumentException();
		}
		this.team = team;
	}
}

package nl.heretichammer.draculareignofterrorremake.team.player;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;

public class Player implements Teamable{
	private Team team;
	
	@Override
	public Team getTeam() {
		return team;
	}

	@Override
	public void setTeam(Team team) {
		throw new NotImplementedException();
	}
}

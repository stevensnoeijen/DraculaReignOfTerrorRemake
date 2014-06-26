package nl.heretichammer.draculareignofterrorremake.team;

import nl.heretichammer.draculareignofterrorremake.constants.Constants;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

public class Player implements Teamable{
	private Team team;
	
	public Player(Team team) {
		if(team == null) {
			throw new IllegalArgumentException(String.format(Constants.exceptions.paramNull, "team"));
		}
		this.team = team;
	}
	
	@Override
	public Team getTeam() {
		return team;
	}

	@Override
	public void setTeam(Team team) {
		throw new NotImplementedException();
	}
}

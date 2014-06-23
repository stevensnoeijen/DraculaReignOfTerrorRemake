package nl.heretichammer.draculareignofterrorremake.team;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;

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

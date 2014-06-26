package nl.heretichammer.draculareignofterrorremake.map;

import java.util.List;

import nl.heretichammer.draculareignofterrorremake.DRoTR;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.unit.Unit;

public class Area implements Teamable {
	private String name;
	private Team team;
	private List<Unit> units;
	
	//adjacents
	
	public Area(String name, Team team) {
		this.name = name;
		setTeam(team);
	}
	
	public Area() {
		
	}
	public String getName() {
		return name;
	}
	
	@Override
	public void setTeam(Team team) {
		this.team = team;
	}

	@Override
	public Team getTeam() {
		return team;
	}
}

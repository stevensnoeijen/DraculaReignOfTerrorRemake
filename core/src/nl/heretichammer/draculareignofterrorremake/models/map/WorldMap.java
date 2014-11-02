package nl.heretichammer.draculareignofterrorremake.models.map;

import java.util.List;

import nl.heretichammer.draculareignofterrorremake.models.team.Team;

public class WorldMap {

	private final World world;
	
	public WorldMap(World world) {
		this.world = world;
	}
	
	public int getWeek() {
		return world.getWeek();
	}
	
	public int getYear() {
		return world.getYear();
	}

	public void week() {
		world.week();
	}
	
	public Area getArea(String name) {
		return world.getArea(name);
	}
	
	public List<Team> getTeams() {
		return world.getTeams();
	}
}

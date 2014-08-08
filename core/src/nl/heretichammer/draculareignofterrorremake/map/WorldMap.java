package nl.heretichammer.draculareignofterrorremake.map;

import java.util.List;

import nl.heretichammer.draculareignofterrorremake.tbs.TBSObject;
import nl.heretichammer.draculareignofterrorremake.team.Team;

public class WorldMap implements TBSObject {

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

	@Override
	public void turn() {
		world.turn();
	}
	
	public Area getArea(String name) {
		return world.getArea(name);
	}
	
	public List<Team> getTeams() {
		return world.getTeams();
	}
}

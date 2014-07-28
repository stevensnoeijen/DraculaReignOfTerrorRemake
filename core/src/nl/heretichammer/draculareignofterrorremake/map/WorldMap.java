package nl.heretichammer.draculareignofterrorremake.map;

import java.util.List;

import nl.heretichammer.draculareignofterrorremake.map.World.Areas;
import nl.heretichammer.draculareignofterrorremake.tbs.TBSObject;
import nl.heretichammer.draculareignofterrorremake.team.Team;

public class WorldMap implements TBSObject {

	public final World world;
	
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
	
	public Areas getAreas() {
		return world.areas;
	}
	
	public List<Team> getTeams() {
		return world.getTeams();
	}
}

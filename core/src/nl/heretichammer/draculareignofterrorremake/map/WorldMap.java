package nl.heretichammer.draculareignofterrorremake.map;

import nl.heretichammer.draculareignofterrorremake.tbs.TBSObject;

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
}

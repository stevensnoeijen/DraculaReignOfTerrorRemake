package nl.heretichammer.draculareignofterrorremake.team.access;

import java.util.HashMap;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;

public class AccessManager implements Teamable {
	
	private Team team;
	private Map<String, Boolean> accessibilities;
	
	@Override
	public void setTeam(Team team) {
		this.team = team;
	}
	
	/**
	 * 
	 * @param name is a constant name to check if its accessable
	 * @return
	 */
	public boolean isAccessable(String name){
		return accessibilities.get(name);
	}
	
	public void putAccessable(String name, boolean value) {
		accessibilities.put(name, value);
	}
	
	public void putAccessable(String name, int value) {
		
	}

	@Override
	public Team getTeam() {
		return team;
	}
	
	/**
	 * Extention for .class. 
	 * @author Steven Snoeijen
	 *
	 */
	@SuppressWarnings("serial")
	private static class AccessProperties extends HashMap<String, Boolean> {
		
	}
}

package nl.heretichammer.draculareignofterrorremake.team.player.access;

import java.util.HashMap;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;

public class AccessManager implements Teamable {
	
	private Team team;
	private Map<String, Boolean> accessibilities;
	
	@Override
	public void setTeam(Team team) {
		this.team = team;
	}
	
	public boolean isAccessable(String name){
		return accessibilities.get(name);
	}
	
	public void load(){
		throw new NotImplementedException();
	}
	
	public void save(){
		throw new NotImplementedException();
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

package nl.heretichammer.draculareignofterrorremake.team.access;

import nl.heretichammer.draculareignofterrorremake.DRoTRGame;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;

import com.badlogic.gdx.Gdx;

public class AccessManager implements Teamable {
	
	private Team team;
	
	public AccessManager() {
		Gdx.app.getPreferences("test");
	}
	
	@Override
	public void setTeam(Team team) {
		this.team = team;
	}
	
	@Override
	public Team getTeam() {
		return team;
	}
	
	/**
	 * 
	 * @param name is a constant name to check if its accessable
	 * @return
	 */
	public boolean isAccessable(String name){
		return DRoTRGame.save.getBoolean("teams." + team.getName().toLowerCase() + ".accessibilities." +  name);
	}
	
	public void putAccessable(String name, boolean value) {
		
	}
	
	public void putAccessable(String name, int value) {
		
	}
}

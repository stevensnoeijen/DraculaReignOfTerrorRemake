package nl.heretichammer.draculareignofterrorremake;

import nl.heretichammer.draculareignofterrorremake.models.Area;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.team.Teamable;

public class Player implements Teamable {
	private Team team;
	private Area selectedArea;
	
	public Player(Team team) {
		setTeam(team);
	}
	
	@Override
	public Team getTeam() {
		return team;
	}

	@Override
	public void setTeam(Team team) {
		if(team == null) {
			throw new IllegalArgumentException();
		}
		this.team = team;
	}
	
	public void setSelectedArea(Area selectedArea) {
		this.selectedArea = selectedArea;
		team.getArchitectureUpgrader().setResourceSupplier(selectedArea);
		team.getArmamentUpgrader().setResourceSupplier(selectedArea);
	}
	
	public Area getSelectedArea() {
		return selectedArea;
	}
}

package nl.heretichammer.draculareignofterrorremake.models;

import java.beans.PropertyChangeEvent;

import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.team.Teamable;

public class Player extends Model implements Teamable {
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
		Area old = this.selectedArea;
		this.selectedArea = selectedArea;
		team.getArchitectureUpgrader().setResourceSupplier(selectedArea);
		team.getArmamentUpgrader().setResourceSupplier(selectedArea);
		post(new PropertyChangeEvent(this, "selectedArea", old, selectedArea));
	}
	
	public Area getSelectedArea() {
		return selectedArea;
	}
}

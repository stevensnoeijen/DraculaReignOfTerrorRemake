package nl.heretichammer.draculareignofterrorremake.models;

import nl.heretichammer.draculareignofterrorremake.models.team.Team;

public class Council {
	private Team team;
	private Area selectedArea;
	
	public Council(Team team) {
		this.team = team;
	}
	
	public void setSelectedArea(Area selectedArea) {
		if(this.selectedArea != null){//remove resourcesuppliers from producers
			this.selectedArea.unselect();
		}
		this.selectedArea = selectedArea;
		this.selectedArea.select();
	}
}

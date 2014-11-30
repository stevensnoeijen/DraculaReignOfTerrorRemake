package nl.heretichammer.draculareignofterrorremake.models;

import nl.heretichammer.draculareignofterrorremake.models.producer.Producer;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;

public class Council {
	private Team team;
	private Area selectedArea;
	
	public Council(Team team) {
		this.team = team;
	}
	
	public void setSelectedArea(Area selectedArea) {
		if(this.selectedArea != null){//remove resourcesuppliers from producers
			unselect(this.selectedArea);
		}
		this.selectedArea = selectedArea;
		select(this.selectedArea);
	}
	
	
	protected void select(Area area){
		team.getArchitectureUpgrader().setResourceSupplier(area);
		team.getArmamentUpgrader().setResourceSupplier(area);
		
		for(Producer<?> producer : area.getResourceProducers()){
			producer.setResourceSupplier(area);
		}
		for(Producer<?> producer : area.getResourceProducers()){
			producer.setResourceSupplier(area);
		}
	}
	
	protected void unselect(Area area){
		team.getArchitectureUpgrader().setResourceSupplier(area);
		team.getArmamentUpgrader().setResourceSupplier(area);
		for(Producer<?> producer : area.getResourceProducers()){
			producer.setResourceSupplier(null);
		}
		for(Producer<?> producer : area.getResourceProducers()){
			producer.setResourceSupplier(null);
		}
	}
}

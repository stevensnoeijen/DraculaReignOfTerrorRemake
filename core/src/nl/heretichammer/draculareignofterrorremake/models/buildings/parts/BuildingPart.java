package nl.heretichammer.draculareignofterrorremake.models.buildings.parts;

import nl.heretichammer.draculareignofterrorremake.models.TeamableModel;
import nl.heretichammer.draculareignofterrorremake.models.buildings.Building;

public abstract class BuildingPart extends TeamableModel {

	private Building building;
	
	public BuildingPart() {
		
	}
	
	public abstract String getName();
}

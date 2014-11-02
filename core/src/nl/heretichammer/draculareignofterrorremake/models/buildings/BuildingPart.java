package nl.heretichammer.draculareignofterrorremake.models.buildings;

import nl.heretichammer.draculareignofterrorremake.models.unit.Unit;

public class BuildingPart extends Unit{

	private Building building;
	
	public BuildingPart(BuildingPartData data) {
		super(data);
	}

	public static class BuildingPartData extends UnitData{
		
	}
}

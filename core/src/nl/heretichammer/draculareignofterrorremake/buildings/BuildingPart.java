package nl.heretichammer.draculareignofterrorremake.buildings;

import nl.heretichammer.draculareignofterrorremake.unit.Unit;

public class BuildingPart extends Unit{

	private Building building;
	
	public BuildingPart(BuildingPartData data) {
		super(data);
	}

	public static class BuildingPartData extends UnitData{
		
	}
}

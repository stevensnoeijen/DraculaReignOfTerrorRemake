package nl.heretichammer.draculareignofterrorremake.models.buildings.parts;

import nl.heretichammer.draculareignofterrorremake.models.buildings.Building;
import nl.heretichammer.draculareignofterrorremake.models.units.Unit;

public class BuildingPart extends Unit{

	private Building building;
	
	public BuildingPart(BuildingPartData data) {
		super(data);
	}

	public static class BuildingPartData extends UnitData{
		
	}
}

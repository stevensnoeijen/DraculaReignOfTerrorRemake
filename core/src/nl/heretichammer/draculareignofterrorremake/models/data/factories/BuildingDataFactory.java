package nl.heretichammer.draculareignofterrorremake.models.data.factories;

import nl.heretichammer.draculareignofterrorremake.models.buildings.Building;

public class BuildingDataFactory extends AbstractDataFactory<Building.BuildingData> {

	public static final BuildingDataFactory instance = new BuildingDataFactory();
	
	@Override
	public Building.BuildingData fromFile(String name) {
		return get(String.format("data/buildings/%s.json", name), Building.BuildingData.class);
	}
}
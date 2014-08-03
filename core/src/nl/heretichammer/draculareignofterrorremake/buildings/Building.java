package nl.heretichammer.draculareignofterrorremake.buildings;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.producers.Producer;

public class Building {
	private BuildingPart[] pieces;
	private Producer<?> producer;
	private BuildingData buildingData;
	
	public BuildingData getData() {
		return buildingData;
	}
	
	public static class BuildingData {
		public BuildingType type;
		public int level;
		public Item.ItemDescriptor[] buildCost;
		public Item.ItemDescriptor[] upgradeCost;
		public String previewImage;
		public String mapIconImage;
		public String buildMapIconImage;
	}
	
	public static enum BuildingType {
		BRIDGE, TOWER, CASTLE
	}
}

package nl.heretichammer.draculareignofterrorremake.models.map;

import nl.heretichammer.draculareignofterrorremake.models.data.DataManager;

public class AreaFactory {
	public static Area create(String name) {
		return new Area(DataManager.instance.getAreaData(name));
	}
}

package nl.heretichammer.draculareignofterrorremake.map;

import nl.heretichammer.draculareignofterrorremake.data.DataManager;

public class AreaFactory {
	public static Area create(String name) {
		return new Area(DataManager.instance.getAreaData(name));
	}
}

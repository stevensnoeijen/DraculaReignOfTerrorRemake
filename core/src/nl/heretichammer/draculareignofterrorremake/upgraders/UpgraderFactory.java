package nl.heretichammer.draculareignofterrorremake.upgraders;

import nl.heretichammer.draculareignofterrorremake.data.DataManager;

public class UpgraderFactory {

	public static Upgrader create(String name) {
		return new BaseUpgrader( DataManager.instance.getUpgraderData(name) );
	}
}

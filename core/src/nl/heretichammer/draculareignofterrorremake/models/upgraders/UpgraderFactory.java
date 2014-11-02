package nl.heretichammer.draculareignofterrorremake.models.upgraders;

import nl.heretichammer.draculareignofterrorremake.models.data.DataManager;

public class UpgraderFactory {

	public static Upgrader create(String name) {
		return new BaseUpgrader( DataManager.instance.getUpgraderData(name) );
	}
}

package nl.heretichammer.draculareignofterrorremake.models.upgraders.upgrades;

import nl.heretichammer.draculareignofterrorremake.models.data.DataManager;

public class UpgradeFactory {
	public static Upgrade createAccessUpgrade(String name) {
		return new AccessUpgrade( DataManager.instance.getAccessUpgradeData(name) );
	}
}

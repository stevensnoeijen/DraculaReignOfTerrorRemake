package nl.heretichammer.draculareignofterrorremake.upgraders.upgrades;

import nl.heretichammer.draculareignofterrorremake.data.DataManager;

public class UpgradeFactory {
	public static Upgrade createAccessUpgrade(String name) {
		return new AccessUpgrade( DataManager.instance.getAccessUpgradeData(name) );
	}
}

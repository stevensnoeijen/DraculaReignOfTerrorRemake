package nl.heretichammer.draculareignofterrorremake.data.factories;

import nl.heretichammer.draculareignofterrorremake.upgraders.upgrades.AccessUpgrade;

public class AccessUpgradeDataFactory extends AbstractDataFactory<AccessUpgrade.AccessUpgradeData> {

	public static final AccessUpgradeDataFactory instance = new AccessUpgradeDataFactory();
	
	@Override
	public AccessUpgrade.AccessUpgradeData fromFile(String name) {
		return get(String.format("data/upgrader/upgrades/%s.json", name), AccessUpgrade.AccessUpgradeData.class);
	}

}

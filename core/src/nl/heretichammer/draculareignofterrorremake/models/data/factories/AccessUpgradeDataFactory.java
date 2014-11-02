package nl.heretichammer.draculareignofterrorremake.models.data.factories;

import nl.heretichammer.draculareignofterrorremake.models.upgraders.upgrades.AccessUpgrade;

public class AccessUpgradeDataFactory extends AbstractDataFactory<AccessUpgrade.AccessUpgradeData> {

	public static final AccessUpgradeDataFactory instance = new AccessUpgradeDataFactory();
	
	@Override
	public AccessUpgrade.AccessUpgradeData fromFile(String name) {
		return get(String.format("data/upgraders/upgrades/%s.json", name), AccessUpgrade.AccessUpgradeData.class);
	}

}

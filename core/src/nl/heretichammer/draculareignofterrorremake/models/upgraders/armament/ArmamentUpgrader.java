package nl.heretichammer.draculareignofterrorremake.models.upgraders.armament;

import nl.heretichammer.draculareignofterrorremake.models.upgraders.Upgrader;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.Upgrade;

public class ArmamentUpgrader extends Upgrader<Upgrade> {
	private static final String NAME = "Armament";

	public ArmamentUpgrader() {
		addUpgrade(new ArmamentUpgrade2());
		addUpgrade(new ArmamentUpgrade3());
		addUpgrade(new ArmamentUpgrade4());
		addUpgrade(new ArmamentUpgrade5());
	}
	
	@Override
	public int getMaxLevel() {
		return ArmamentUpgrade5.LEVEL;
	}

	@Override
	public String getName() {
		return NAME;
	}
}

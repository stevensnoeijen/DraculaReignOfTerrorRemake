package nl.heretichammer.draculareignofterrorremake.models.upgraders.architecture;

import nl.heretichammer.draculareignofterrorremake.models.upgraders.Upgrade;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.Upgrader;

public class ArchitectureUpgrader extends Upgrader<Upgrade> {
	private static final String NAME = "Architecture";
	
	public ArchitectureUpgrader() {
		addUpgrade(new ArchitectureUpgrade2());
		addUpgrade(new ArchitectureUpgrade3());
		addUpgrade(new ArchitectureUpgrade4());
	}
	
	@Override
	public String getName() {
		return NAME;
	}

	@Override
	public int getMaxLevel() {
		return ArchitectureUpgrade4.LEVEL;
	}
}

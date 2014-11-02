package nl.heretichammer.draculareignofterrorremake.models.upgraders.armament;

import nl.heretichammer.draculareignofterrorremake.models.upgraders.Upgrade;

public class ArmamentUpgrade5 extends Upgrade {
	public static final int LEVEL = 5;
	
	@Override
	public int getLevel() {
		return LEVEL;
	}

	@Override
	public int getGoldCost() {
		return 300;
	}

	@Override
	public int getWoodCost() {
		return 0;
	}

	@Override
	public int getFoodCost() {
		return 0;
	}

	@Override
	public int getWeekCost() {
		return 13;
	}

	@Override
	protected void upgrade() {
		
	}
}

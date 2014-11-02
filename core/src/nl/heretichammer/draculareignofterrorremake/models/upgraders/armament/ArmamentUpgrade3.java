package nl.heretichammer.draculareignofterrorremake.models.upgraders.armament;

import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.Upgrade;

public class ArmamentUpgrade3 extends Upgrade {

	@Override
	public int getLevel() {
		return 3;
	}

	@Override
	public int getGoldCost() {
		return 250;
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
		return 10;
	}

	@Override
	protected void upgrade() {
		Team team = getTeam();
		team.setPermission(Team.PERMISSION_CATAPULT, true);
	}
}

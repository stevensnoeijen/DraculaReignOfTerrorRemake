package nl.heretichammer.draculareignofterrorremake.models.upgraders.armament;

import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.Upgrade;

public class ArmamentUpgrade2 extends Upgrade {

	@Override
	public int getLevel() {
		return 2;
	}

	@Override
	public int getGoldCost() {
		return 200;
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
		return 8;
	}

	@Override
	protected void upgrade() {
		Team team = getTeam();
		team.setPermission(Team.PERMISSION_KNIGHT, true);
		team.setPermission(Team.PERMISSION_SPY, true);
	}
}

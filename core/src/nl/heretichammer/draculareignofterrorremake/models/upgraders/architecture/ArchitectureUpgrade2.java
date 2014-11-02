package nl.heretichammer.draculareignofterrorremake.models.upgraders.architecture;

import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.Upgrade;

public class ArchitectureUpgrade2 extends Upgrade {

	@Override
	public int getLevel() {
		return 2;
	}

	@Override
	public int getGoldCost() {
		return 150;
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
	protected void upgrade() {
		Team team = getTeam();
		team.setPermission(Team.PERMISSION_BRIDGE2, true);
		team.setPermission(Team.PERMISSION_BRIDGE3, true);
		team.setPermission(Team.PERMISSION_TOWER, true);
	}

	@Override
	public int getWeekCost() {
		return 7;
	}

}

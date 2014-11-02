package nl.heretichammer.draculareignofterrorremake.models.upgraders.architecture;

import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.Upgrade;

public class ArchitectureUpgrade3 extends Upgrade {

	@Override
	public int getLevel() {
		return 3;
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
	protected void upgrade() {
		Team team = getTeam();
		team.setPermission(Team.PERMISSION_CASTLE1, true);
		team.setPermission(Team.PERMISSION_CASTLE2, true);
		team.setPermission(Team.PERMISSION_CASTLE3, true);
	}

	@Override
	public int getWeekCost() {
		return 9;
	}

}

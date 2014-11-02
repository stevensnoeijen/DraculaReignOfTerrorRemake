package nl.heretichammer.draculareignofterrorremake.models.upgraders.architecture;

import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.Upgrade;

public class ArchitectureUpgrade4 extends Upgrade {
	public static final int LEVEL = 4;
	
	@Override
	public int getLevel() {
		return LEVEL;
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
	protected void upgrade() {
		Team team = getTeam();
		team.setPermission(Team.PERMISSION_CASTLE4, true);
		team.setPermission(Team.PERMISSION_CASTLE5, true);
		team.setPermission(Team.PERMISSION_CASTLE6, true);
	}

	@Override
	public int getWeekCost() {
		return 10;
	}
	
}

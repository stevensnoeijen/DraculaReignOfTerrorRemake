package nl.heretichammer.draculareignofterrorremake.models.upgraders;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCost;
import nl.heretichammer.draculareignofterrorremake.annotations.Upgrade;
import nl.heretichammer.draculareignofterrorremake.models.Resource;
import nl.heretichammer.draculareignofterrorremake.models.team.Permission;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;

public class ArchitectureUpgrader extends Upgrader {
	private static final String SOUND_UPGRADING_ARCHITECTURE = "upgrading architecture.ogg";
	public static final String NAME = "Architecture";
	
	public ArchitectureUpgrader() {
		
	}
	
	@Override
	public String getName() {
		return NAME;
	}
	
	@Override
	protected int getStartLevel() {
		return 2;
	}
	
	@Override
	public int getMaxLevel() {
		return 4;
	}
	
	@Upgrade(level=1, cost={}, image="council.pack:upgrade-architecture-1")
	protected void upgrade1(){
		
	}
	
	@Upgrade(level=2, cost={@ResourceCost(resource=Resource.GOLD, amount=150), @ResourceCost(resource=Resource.TIME, amount=7)}, image="council.pack:upgrade-architecture-2")
	protected void upgrade2(){
		Team team = getTeam();
		team.setPermission(Permission.BRIDGE2, true);
		team.setPermission(Permission.BRIDGE3, true);
		team.setPermission(Permission.TOWER, true);
	}
	
	@Upgrade(level=3, cost={@ResourceCost(resource=Resource.GOLD, amount=200), @ResourceCost(resource=Resource.TIME, amount=9)}, image="council.pack:upgrade-architecture-3")
	protected void upgrade3(){
		Team team = getTeam();
		team.setPermission(Permission.CASTLE1, true);
		team.setPermission(Permission.CASTLE2, true);
		team.setPermission(Permission.CASTLE3, true);
	}
	
	@Upgrade(level=4, cost={@ResourceCost(resource=Resource.GOLD, amount=250), @ResourceCost(resource=Resource.TIME, amount=10)}, image="council.pack:upgrade-architecture-4")
	protected void upgrade4(){
		Team team = getTeam();
		team.setPermission(Permission.CASTLE4, true);
		team.setPermission(Permission.CASTLE5, true);
		team.setPermission(Permission.CASTLE6, true);
	}

	@Override
	public String getStartSound() {
		return SOUND_UPGRADING_ARCHITECTURE;
	}

	@Override
	public String getCancelSound() {
		return SOUND_UPGRADING_CANCELLED;
	}
}

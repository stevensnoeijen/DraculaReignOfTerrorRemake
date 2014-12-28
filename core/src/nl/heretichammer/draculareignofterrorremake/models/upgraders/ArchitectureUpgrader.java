package nl.heretichammer.draculareignofterrorremake.models.upgraders;

import nl.heretichammer.draculareignofterrorremake.models.ResourceCost;
import nl.heretichammer.draculareignofterrorremake.models.team.Permission;

public class ArchitectureUpgrader extends Upgrader {
	private static final String SOUND_UPGRADING_ARCHITECTURE = "sound/upgrading architecture.ogg";
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
	
	@Upgrade(level=1, cost=@ResourceCost(time=0, gold=0), image="image/council.pack:upgrade-architecture-1")
	protected void upgrade1(){
		
	}
	
	@Upgrade(level=2, cost=@ResourceCost(gold=150, time=7), image="image/council.pack:upgrade-architecture-2")
	protected void upgrade2(){
		team.setPermission(Permission.BRIDGE2, true);
		team.setPermission(Permission.BRIDGE3, true);
		team.setPermission(Permission.TOWER, true);
	}
	
	@Upgrade(level=3, cost=@ResourceCost(gold=200, time=9), image="image/council.pack:upgrade-architecture-3")
	protected void upgrade3(){
		team.setPermission(Permission.CASTLE1, true);
		team.setPermission(Permission.CASTLE2, true);
		team.setPermission(Permission.CASTLE3, true);
	}
	
	@Upgrade(level=4, cost=@ResourceCost(gold=250, time=10), image="image/council.pack:upgrade-architecture-4")
	protected void upgrade4(){
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

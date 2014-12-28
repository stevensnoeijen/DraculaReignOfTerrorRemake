package nl.heretichammer.draculareignofterrorremake.models.upgraders;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCost;
import nl.heretichammer.draculareignofterrorremake.models.team.Permission;

public class ArmamentUpgrader extends Upgrader {
	private static final String SOUND_UPGRADING_ARMERMENT = "sound/upgrading armerment.ogg";
	private static final String NAME = "Armament";

	public ArmamentUpgrader() {
		
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
		return 5;
	}
	
	@Upgrade(level=1, cost=@ResourceCost(gold=0, time=0), image="image/council.pack:upgrade-armament-1")
	protected void upgrade1(){
		
	}
	
	@Upgrade(level=2, cost=@ResourceCost(gold=200, time=8), image="image/council.pack:upgrade-armament-2")
	protected void upgrade2(){
		team.setPermission(Permission.KNIGHT, true);
		team.setPermission(Permission.SPY, true);
	}
	
	@Upgrade(level=3, cost=@ResourceCost(gold=250, time=10), image="image/council.pack:upgrade-armament-3")
	protected void upgrade3(){
		team.setPermission(Permission.CATAPULT, true);
	}
	
	@Upgrade(level=4, cost=@ResourceCost(gold=250, time=11), image="image/council.pack:upgrade-armament-4")
	protected void upgrade4(){
		team.setPermission(Permission.CANNON, true);
	}
	
	@Upgrade(level=5, cost=@ResourceCost(gold=300, time=13), image="image/council.pack:upgrade-armament-5")
	protected void upgrade5(){
		
	}

	@Override
	public String getStartSound() {
		return SOUND_UPGRADING_ARMERMENT;
	}

	@Override
	public String getCancelSound() {
		return SOUND_UPGRADING_CANCELLED;
	}
}

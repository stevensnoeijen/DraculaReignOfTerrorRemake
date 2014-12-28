package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.models.ResourceCost;
import nl.heretichammer.draculareignofterrorremake.models.team.Permission;

@Trooper(name="spy", size=1, cost=@ResourceCost(gold=4, time=5), permission=Permission.SPY)
public class Spy extends Unit {
	public static final String NAME = "spy";
	public static final int STRENGTH = 0, ACCURACY = 0, DEFENSE = 0, STAMINA = 0, SPEED = 0, RANGE = 0;
	
	public Spy() {
		
	}

	@Override
	public String getName() {
		return NAME;
	}
}

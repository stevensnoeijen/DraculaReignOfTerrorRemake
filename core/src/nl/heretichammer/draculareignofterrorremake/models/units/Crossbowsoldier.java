package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCost;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;
import nl.heretichammer.draculareignofterrorremake.models.team.Permission;

@Trooper(name="crossbowsoldier", size=5, cost=@ResourceCost(gold=5, time=2), permission=Permission.CROSSBOWSOLDIERS)
public class Crossbowsoldier extends Unit {
	public static final String NAME = "crossbowsoldier";
	public static final int STRENGTH = 2, ACCURACY = 6, DEFENSE = 3, STAMINA = 2, SPEED = 2, RANGE = 5;
	
	public Crossbowsoldier() {
		
	}
	
	@Override
	public String getName() {
		return NAME;
	}
}

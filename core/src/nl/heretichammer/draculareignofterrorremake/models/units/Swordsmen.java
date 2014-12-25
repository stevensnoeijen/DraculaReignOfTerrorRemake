package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCost;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;
import nl.heretichammer.draculareignofterrorremake.models.team.Permission;

@Trooper(name="swordsoldier", size=5, cost=@ResourceCost(gold=4, time=2), permission=Permission.SWORDSMEN)
public class Swordsmen extends Unit {
	public static final String NAME = "swordsoldier";
	public static final int STRENGTH = 3, ACCURACY = 0, DEFENSE = 4, STAMINA = 3, SPEED = 3, RANGE = 1;
	
	public Swordsmen() {
		
	}
	
	@Override
	public String getName() {
		return NAME;
	}
}

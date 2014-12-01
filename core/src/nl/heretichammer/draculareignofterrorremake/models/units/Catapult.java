package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCost;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;

@Trooper(name="catapult", size=1, cost=@ResourceCost(gold=7, time=6))
public class Catapult extends Unit {
	public static final String NAME = "catapult";
	public static final int STRENGTH = 4, ACCURACY = 4, DEFENSE = 1, STAMINA = 7, SPEED = 1, RANGE = 5;
	
	public Catapult() {
		
	}
	
	@Override
	public String getName() {
		return NAME;
	}
}

package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCost;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;

@Trooper(name="knight", size=1, cost=@ResourceCost(gold=4, time=4))
public class Knight extends Unit {
	public static final String NAME = "knight";
	public static final int STRENGTH = 8, ACCURACY = 0, DEFENSE = 8, STAMINA = 4, SPEED = 4, RANGE = 1;
	
	public Knight() {
		
	}
	
	@Override
	public String getName() {
		return NAME;
	}
}

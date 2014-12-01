package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCost;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;

@Trooper(name="cannon", size=1, cost=@ResourceCost(gold=8, time=7))
public class Cannon extends Unit {
	public static final String NAME = "cannon";
	public static final int STRENGTH = 6, ACCURACY = 3, DEFENSE = 1, STAMINA = 7, SPEED = 1, RANGE = 4;
	
	public Cannon() {
		
	}
	
	@Override
	public String getName() {
		return NAME;
	}
}

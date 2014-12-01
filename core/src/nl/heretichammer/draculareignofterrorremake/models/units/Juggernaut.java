package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCost;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;

@Trooper(name="juggernaut", size=1, cost=@ResourceCost(gold=2, time=3))
public class Juggernaut extends Unit {
	public static final String NAME = "juggernaut";
	public static final int STRENGTH = 3, ACCURACY = 0, DEFENSE = 1, STAMINA = 5, SPEED = 2, RANGE = 1;
	
	public Juggernaut() {
		
	}
	
	@Override
	public String getName() {
		return NAME;
	}
}

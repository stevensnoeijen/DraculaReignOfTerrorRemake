package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCosts;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;
import nl.heretichammer.draculareignofterrorremake.annotations.UnitAttributes;
import nl.heretichammer.draculareignofterrorremake.annotations.Uniter;

@Trooper(name="catapult", size=1, cost=@ResourceCosts(gold=7, time=6))
@Uniter(name = "catapult", attributes=@UnitAttributes(strength=4,accuracy=4,defence=1,stamina=7,speed=1,range=5))
public class Catapult extends Unit {
	public Catapult() {
		
	}
}

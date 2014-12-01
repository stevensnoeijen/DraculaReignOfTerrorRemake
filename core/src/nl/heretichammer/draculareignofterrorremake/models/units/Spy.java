package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCosts;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;
import nl.heretichammer.draculareignofterrorremake.annotations.UnitAttributes;
import nl.heretichammer.draculareignofterrorremake.annotations.Uniter;

@Trooper(name="spy", size=1, cost=@ResourceCosts(gold=4, time=5))
@Uniter(name = "spy", attributes=@UnitAttributes(strength=0,accuracy=0,defence=0,stamina=0,speed=0,range=0))
public class Spy extends Unit {
	public Spy() {
		
	}

}

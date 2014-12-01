package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCosts;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;
import nl.heretichammer.draculareignofterrorremake.annotations.UnitAttributes;
import nl.heretichammer.draculareignofterrorremake.annotations.Uniter;

@Trooper(name="cannon", size=1, cost=@ResourceCosts(gold=8, time=7))
@Uniter(name = "cannon", attributes=@UnitAttributes(strength=6,accuracy=3,defence=1,stamina=7,speed=1,range=4))
public class Cannon extends Unit {
	public Cannon() {
		
	}
}

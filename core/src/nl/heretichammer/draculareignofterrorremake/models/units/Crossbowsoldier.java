package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCosts;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;
import nl.heretichammer.draculareignofterrorremake.annotations.UnitAttributes;
import nl.heretichammer.draculareignofterrorremake.annotations.Uniter;

@Trooper(name="crossbowsoldiers", size=5, cost=@ResourceCosts(gold=5, time=2))
@Uniter(name = "crossbowsoldier", attributes=@UnitAttributes(strength=2,accuracy=6,defence=3,stamina=2,speed=2,range=5))
public class Crossbowsoldier extends Unit {
	public Crossbowsoldier() {
		
	}
}

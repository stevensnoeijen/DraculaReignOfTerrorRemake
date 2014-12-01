package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCosts;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;
import nl.heretichammer.draculareignofterrorremake.annotations.UnitAttributes;
import nl.heretichammer.draculareignofterrorremake.annotations.Uniter;

@Trooper(name="knight", size=1, cost=@ResourceCosts(gold=4, time=4))
@Uniter(name = "knight", attributes=@UnitAttributes(strength=8,accuracy=0,defence=8,stamina=4,speed=4,range=1))
public class Knight extends Unit {
	public Knight() {
		
	}
}

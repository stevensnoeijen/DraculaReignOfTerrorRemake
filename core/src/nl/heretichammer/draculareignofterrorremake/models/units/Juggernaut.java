package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCosts;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;
import nl.heretichammer.draculareignofterrorremake.annotations.UnitAttributes;
import nl.heretichammer.draculareignofterrorremake.annotations.Uniter;

@Trooper(name="juggernaut", size=1, cost=@ResourceCosts(gold=2, time=3))
@Uniter(name = "juggernaut", attributes=@UnitAttributes(strength=3,accuracy=0,defence=1,stamina=5,speed=2,range=1))
public class Juggernaut extends Unit {
	public Juggernaut() {
		
	}
}

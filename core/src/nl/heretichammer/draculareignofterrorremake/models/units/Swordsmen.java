package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCosts;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;
import nl.heretichammer.draculareignofterrorremake.annotations.UnitAttributes;
import nl.heretichammer.draculareignofterrorremake.annotations.Uniter;

@Trooper(name="swordsmen", size=5, cost=@ResourceCosts(gold=4, time=2))
@Uniter(name = "swordsoldier", attributes=@UnitAttributes(strength=3,accuracy=0,defence=4,stamina=3,speed=3,range=1))
public class Swordsmen extends Unit {
	public Swordsmen() {
		
	}
}

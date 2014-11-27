package nl.heretichammer.draculareignofterrorremake.annotations;

import nl.heretichammer.draculareignofterrorremake.models.units.Unit;

public @interface UnitAttribute {
	public Unit.AttributeType type();
	public int value();
}

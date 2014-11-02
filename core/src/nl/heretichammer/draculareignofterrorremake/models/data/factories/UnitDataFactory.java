package nl.heretichammer.draculareignofterrorremake.models.data.factories;

import nl.heretichammer.draculareignofterrorremake.models.unit.Unit;

public class UnitDataFactory extends AbstractDataFactory<Unit.UnitData>{

	public static final UnitDataFactory instance = new UnitDataFactory();
	
	@Override
	public Unit.UnitData fromFile(String name) {
		return get(String.format("data/units/%s.json", name), Unit.UnitData.class) ;
	}
}

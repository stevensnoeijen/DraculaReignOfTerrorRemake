package nl.heretichammer.draculareignofterrorremake.data.factories;

import nl.heretichammer.draculareignofterrorremake.unit.Troop;
import nl.heretichammer.draculareignofterrorremake.unit.Troop.TroopModel;

public class TroopDataFactory extends AbstractDataFactory<Troop.TroopModel> {

	public static final TroopDataFactory instance = new TroopDataFactory(); 
	
	@Override
	public TroopModel fromFile(String name) {
		return get(String.format("data/troops/%s.json", name), Troop.TroopModel.class);
	}

}

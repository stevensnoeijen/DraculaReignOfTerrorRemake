package nl.heretichammer.draculareignofterrorremake.models.unit;

import java.util.HashMap;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.exceptions.DataModelDontExistException;
import nl.heretichammer.draculareignofterrorremake.models.unit.Unit.UnitData;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.utils.Array;
import com.badlogic.gdx.utils.Json;

public class UnitFactory {
	
	private static final Json json = new Json();
	
	private static Map<String, UnitData> cache = new HashMap<String, UnitData>();
	
	public static Unit createUnit(String name) {
		if(!cache.containsKey(name)) {
			UnitData data = json.fromJson(UnitData.class, Gdx.files.internal(String.format("data/units/%s.json", name)));
			if(data == null) {
				throw new DataModelDontExistException();
			}
			cache.put(name, data);
		}
		return new Unit( cache.get(name) );
	}
	
	public static Unit[] createUnits(String name, int number) {
		if(number < 1) {
			throw new IllegalArgumentException();
		}
		
		Unit unit = createUnit(name);
		Array<Unit> units = new Array<Unit>(number);
		units.add(unit);
		try {
			for(int i = 1; i < number; i++) {
				units.add((Unit)unit.clone());//add new one
			}
		} catch (CloneNotSupportedException e) {
			throw new RuntimeException(e);
		}
		
		return units.toArray(Unit.class);
	}
}

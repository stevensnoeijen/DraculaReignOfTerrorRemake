package nl.heretichammer.draculareignofterrorremake.unit;

import java.util.HashMap;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.exceptions.DataModelDontExistException;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.utils.Array;
import com.badlogic.gdx.utils.Json;

public class UnitFactory {
	
	private static final Json json = new Json();
	
	private static Map<String, Unit.Model> models = new HashMap<String, Unit.Model>();
	
	public static Unit createUnit(String name) {
		if(!models.containsKey(name)) {
			Unit.Model model = json.fromJson(Unit.Model.class, Gdx.files.internal(String.format("data/units/%s.json", name)));
			if(model == null) {
				throw new DataModelDontExistException();
			}
			models.put(name, model);
		}
		return new Unit( models.get(name) );
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
		
		return units.items;
	}
}

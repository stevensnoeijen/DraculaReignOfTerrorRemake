package nl.heretichammer.draculareignofterrorremake.models.units;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import com.badlogic.gdx.utils.Json;

@SuppressWarnings("unchecked")
public class UnitFactory {
	private static Map<UnitType, Unit.UnitData> unitData;
	
	static {
		Json json = new Json();
		unitData = json.fromJson(new HashMap<UnitType, Unit.UnitData>().getClass(), "data/units.json");
	}
	
	public static Unit create(UnitType type){
		Objects.nonNull(type);
		Unit.UnitData data = unitData.get(type);
		return new Unit(data);
	}
}

package nl.heretichammer.draculareignofterrorremake.models.units;

import java.util.HashMap;
import java.util.Map;

import com.badlogic.gdx.utils.Json;

public class TroopFactory {
	private static Map<UnitType, Troop.TroopData> troopData;
	
	static {
		Json json = new Json();
		troopData = json.fromJson(new HashMap<UnitType, Troop.TroopData>().getClass(), "data/troops.json");
	}
	
	public static Troop create(UnitType type){
		
		return null;
	}
}

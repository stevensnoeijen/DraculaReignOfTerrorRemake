package nl.heretichammer.draculareignofterrorremake;

import java.util.HashMap;
import java.util.Map;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.utils.Json;

public class DRoTRGameSave {
	public static final String EXTENTION = ".ds";
	
	private String name;
	private Json json;
	private Map<String, Object> data;
	
	public DRoTRGameSave() {
		json = new Json();
		data = new HashMap<String, Object>();
	}
	
	public void create(String name) {
		this.name = name;
		data = new HashMap<String, Object>();
		//data.put("year", String.valueOf(World.START_YEAR));
		//data.put("week", String.valueOf(World.START_WEEK));
		//	areas
		//	teams
		data.put("teams.1.accessibilities.troopproducers.swordsmen", Boolean.toString(true));
		data.put("teams.1.accessibilities.troopproducers.crossbowsoldiers", Boolean.toString(true));
		data.put("teams.1.accessibilities.troopproducers.knight", Boolean.toString(true));
		data.put("teams.1.accessibilities.troopproducers.juggernaut", Boolean.toString(true));
		data.put("teams.1.accessibilities.troopproducers.catapult", Boolean.toString(true));
		data.put("teams.1.accessibilities.troopproducers.cannon", Boolean.toString(true));
		data.put("teams.1.accessibilities.troopproducers.spy", Boolean.toString(true));
		data.put("teams.2.accessibilities.troopproducers.swordsmen", Boolean.toString(true));
		data.put("teams.2.accessibilities.troopproducers.crossbowsoldiers", Boolean.toString(true));
		data.put("teams.2.accessibilities.troopproducers.knight", Boolean.toString(true));
		data.put("teams.2.accessibilities.troopproducers.juggernaut", Boolean.toString(true));
		data.put("teams.2.accessibilities.troopproducers.catapult", Boolean.toString(true));
		data.put("teams.2.accessibilities.troopproducers.cannon", Boolean.toString(true));
		data.put("teams.2.accessibilities.troopproducers.spy", Boolean.toString(true));
		
		//	players
	}
	
	public void loadDefaults() {
		
	}
	
	@SuppressWarnings("unchecked")
	public void load(String name) {
		this.name = name;
		data = json.fromJson(HashMap.class, Gdx.files.external(name + EXTENTION));
	}
	
	public void save() {
		json.toJson(data, Gdx.files.external(name + EXTENTION));
	}
	
	public boolean getBoolean(String name) {
		return Boolean.valueOf(data.get(name).toString());
	}
	
	public void putBoolean(String name, boolean value) {
		data.put(name, value);
	}
	
	public int getInteger(String name) {
		return (Integer)data.get(name);
	}
	
	public void putInteger(String name, int value) {
		data.put(name, value);
	}
	
	public String getString(String name) {
		return (String)data.get(name);
	}
	
	public void putString(String name, String value) {
		data.put(name, value);
	}
}

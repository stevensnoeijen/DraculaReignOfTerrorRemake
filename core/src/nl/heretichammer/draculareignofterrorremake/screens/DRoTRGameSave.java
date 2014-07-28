package nl.heretichammer.draculareignofterrorremake.screens;

import java.util.HashMap;
import java.util.Map;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.utils.Json;

public class DRoTRGameSave {
	
	private String name;
	private Json json;
	private Map<String, String> data;
	
	public DRoTRGameSave() {
		json = new Json();
	}
	
	public void create(String name) {
		this.name = name;
		data = new HashMap<String, String>();
		//data.put("year", String.valueOf(World.START_YEAR));
		//data.put("week", String.valueOf(World.START_WEEK));
		//	areas
		//	teams
		data.put("teams.transylvania.accessibilities.troopproducers.swordsmen", Boolean.toString(true));
		data.put("teams.transylvania.accessibilities.troopproducers.crossbowsoldiers", Boolean.toString(true));
		data.put("teams.transylvania.accessibilities.troopproducers.knight", Boolean.toString(true));
		data.put("teams.transylvania.accessibilities.troopproducers.juggernaut", Boolean.toString(true));
		data.put("teams.transylvania.accessibilities.troopproducers.catapult", Boolean.toString(true));
		data.put("teams.transylvania.accessibilities.troopproducers.cannon", Boolean.toString(true));
		data.put("teams.transylvania.accessibilities.troopproducers.spy", Boolean.toString(true));
		
		
		//	players
	}
	
	public void load(String name) {
		this.name = name;
		
		data = json.fromJson(HashMap.class, Gdx.files.external(name));
	}
	
	public void save() {
		json.toJson(data, Gdx.files.external(name));
	}
	
	public boolean getBoolean(String name) {
		return Boolean.valueOf(data.get(name));
	}
}

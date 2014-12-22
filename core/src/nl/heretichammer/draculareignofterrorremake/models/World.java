package nl.heretichammer.draculareignofterrorremake.models;

import java.beans.PropertyChangeEvent;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.models.team.Team;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.utils.Json;
import com.badlogic.gdx.utils.JsonValue;

public class World extends Model {
	public static final int START_YEAR = 1456,
			START_WEEK = 1;
	
	private int year = START_YEAR;
	private int week = START_WEEK;
	
	private List<Team> teams = new ArrayList<Team>(2);
	private Map<String, Area> areas = new HashMap<String, Area>(); 
	
	public World() {
		//create teams
		teams.add(Team.turks);
		teams.add(Team.transylvanians);
		
		//load areas
		Json json = new Json();
		json.setSerializer(Map.class, new Json.Serializer<Map>() {
			@Override
			public void write(Json json, Map object, Class knownType) {
				
			}

			@Override
			public Map read(Json json, JsonValue jsonData, Class type) {
				return new HashMap<Object, Object>();
			}
		});
		json.setSerializer(Team.class, new Json.Serializer<Team>() {
			@Override
			public Team read(Json json, JsonValue jsonData, Class type) {
				String name = jsonData.asString();
				if(name.equals("transylvanians")){
					return Team.transylvanians;
				}else if(name.equals("turks")){
					return Team.turks;
				}else{
					return null;
				}
			}
			
			@Override
			public void write(Json json, Team object, Class knownType) {
				
			}
		});
		Area[] areas = json.fromJson(Area[].class, Gdx.files.internal("data/areas.json"));
		
		for(Area area : areas) {
			area.setWorld(this);
			this.areas.put(area.getName().toLowerCase(), area);
		}
	}
	
	public Iterable<Team> getTeams() {
		return teams;
	}
	
	public Team findTeamByName(String name) {
		for(Team team : teams) {
			if(team.getName().toLowerCase().equals(name)) {
				return team;
			}
		}
		return null;
	}
	
	public void week() {
		if(week == 52) {
			year++;
			post(new PropertyChangeEvent(this, "year", year-1, year));
			week = 1;
			post(new PropertyChangeEvent(this, "week", 52, week));
		}else {
			week++;
			post(new PropertyChangeEvent(this, "week", week-1, week));
		}
		for(Area area : areas.values()){
			area.week();
		}
		for(Team team : teams){
			team.week();
		}
	}
	
	public int getWeek() {
		return week;
	}
	
	public int getYear() {
		return year;
	}

	public Area getArea(String name) {
		return areas.get(name);
	}
}

package nl.heretichammer.draculareignofterrorremake.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.Player;
import nl.heretichammer.draculareignofterrorremake.exceptions.WeekNotDoneException;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.team.Team.TeamColor;

public class World {
	public static final int START_YEAR = 1456,
			START_WEEK = 1;
	public static final String TEAM_TURKS = "Turks",
			TEAM_TRANSYLVANIA = "Transylvania";
	
	private int year = START_YEAR;
	private int week = START_WEEK;
	
	private List<Team> teams = new ArrayList<Team>(2);
	private Map<String, Area> areas = new HashMap<String, Area>(); 
	
	public World() {
		//create teams
		teams.add(new Team(1, TEAM_TURKS, TeamColor.RED));
		teams.add(new Team(2, TEAM_TRANSYLVANIA, TeamColor.BLUE));
		
		//create worlds
		for(String areaname : Area.NAMES) {
			Area area = AreaFactory.create(areaname);
			area.setWorld(this);
			areas.put(areaname, area);
		}
	}
	
	public List<Team> getTeams() {
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
			week = 1;
		}else {
			week++;
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

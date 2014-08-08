package nl.heretichammer.draculareignofterrorremake.map;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.exceptions.WeekNotDoneException;
import nl.heretichammer.draculareignofterrorremake.tbs.TBSObject;
import nl.heretichammer.draculareignofterrorremake.tbs.TurnManager;
import nl.heretichammer.draculareignofterrorremake.team.Player;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Team.TeamColor;

public class World implements TBSObject {
	public static int START_YEAR = 1456,
			START_WEEK = 1;
	
	private int year = START_YEAR;
	private int week = START_WEEK;
	
	private List<Team> teams = new ArrayList<Team>(2);
	private Map<String, Area> areas = new HashMap<String, Area>(); 
	
	public static final String[] AREANAMES = {"sibiu", "fagaras", "curtea", "brasov", "pitesti", "tirgo", "snagov", "giurgiu", "braila", "hirsova", "rasova", "ostrov"};
	
	public World() {
		//create teams
		teams.add(new Team(1, "Turks", TeamColor.RED));
		teams.add(new Team(2, "Transylvania", TeamColor.BLUE));
		
		//create worlds
		for(String areaname : AREANAMES) {
			Area area = AreaFactory.create(areaname);
			area.setWorld(this);
			areas.put(areaname, area);
		}
	}
	
	private void fillTurnManager() {
		//fill turnmanager
		for(Team team : teams) {
			TurnManager.instance.addTurn(team);
			for(Player player : team.getPlayers()) {
				TurnManager.instance.addTurn(player);
			}
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
	

	@Override
	public void turn() {
		if(!TurnManager.instance.isEmpty()) {
			throw new WeekNotDoneException();
		}
		if(week == 52) {
			year++;
			week = 1;
		}else {
			week++;
		}
		fillTurnManager();
		TurnManager.instance.nextTurn();
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

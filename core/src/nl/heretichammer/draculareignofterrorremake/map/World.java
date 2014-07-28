package nl.heretichammer.draculareignofterrorremake.map;

import java.util.ArrayList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.exceptions.WeekNotDoneException;
import nl.heretichammer.draculareignofterrorremake.tbs.TBSObject;
import nl.heretichammer.draculareignofterrorremake.tbs.TurnManager;
import nl.heretichammer.draculareignofterrorremake.team.Player;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Team.TeamColor;

public class World implements TBSObject {
	private int year = 1456;
	private int week = 1;
	
	private List<Team> teams = new ArrayList<Team>(2);
	public final Areas areas;
	
	public World() {
		//create teams
		teams.add(new Team("Turks", TeamColor.RED));
		teams.add(new Team("Transylvania", TeamColor.BLUE));
		
		//create worlds
		areas = new Areas();
		areas.sibiu.setWorld(this);
		areas.fagaras.setWorld(this);
		areas.curtea.setWorld(this);
		areas.brasov.setWorld(this);
		areas.pitesti.setWorld(this);
		areas.tirgo.setWorld(this);
		areas.snagov.setWorld(this);
		areas.giurgiu.setWorld(this);
		areas.braila.setWorld(this);
		areas.hirsova.setWorld(this);
		areas.rasova.setWorld(this);
		areas.ostrov.setWorld(this);
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
	
	public final class Areas {
		public final Area sibiu = AreaFactory.create("sibiu");
		public final Area fagaras = AreaFactory.create("fagaras");
		public final Area curtea = AreaFactory.create("curtea");
		public final Area brasov = AreaFactory.create("brasov");
		public final Area pitesti = AreaFactory.create("pitesti");
		public final Area tirgo = AreaFactory.create("tirgo");
		public final Area snagov = AreaFactory.create("snagov");
		public final Area giurgiu = AreaFactory.create("giurgiu");
		public final Area braila = AreaFactory.create("braila");
		public final Area hirsova = AreaFactory.create("hirsova");
		public final Area rasova = AreaFactory.create("rasova");
		public final Area ostrov = AreaFactory.create("ostrov");
		
		private Areas() {
			
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
}

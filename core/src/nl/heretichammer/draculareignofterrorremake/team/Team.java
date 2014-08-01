package nl.heretichammer.draculareignofterrorremake.team;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.map.Area;
import nl.heretichammer.draculareignofterrorremake.tbs.TurnManager;
import nl.heretichammer.draculareignofterrorremake.tbs.Turnable;
import nl.heretichammer.draculareignofterrorremake.team.access.AccessManager;
import nl.heretichammer.draculareignofterrorremake.unit.Troop;

public class Team implements Turnable {
	public static final Team NULL = new Team("", null);
	public static final Team NEUTRAL = new Team("Neutral", TeamColor.WHITE);
	
	private String name;
	private TeamColor color;
	private List<Area> ownedAreas = new ArrayList<Area>();
	private List<Troop> troops = new LinkedList<Troop>();
	private List<Player> players = new LinkedList<Player>();
	
	//public final properties
	public final AccessManager accessManager;

	public Team(String name, TeamColor color) {
		this();
		this.name = name;
		this.color = color;
	}
	
	/**
	 * For json
	 */
	public Team(){
		accessManager = new AccessManager();//this can give problems with the saver?
		accessManager.setTeam(this);
		//accessManager.load();
	}
	
	/**
	 * @return the color
	 */
	public TeamColor getColor() {
		return color;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	
	public void addPlayer(Player player) {
		if(player.getTeam() == this) {
			players.add(player);
		}else {
			player.setTeam(this);//which calls this method again and will add it to troops
		}		
	}
	
	public List<Player> getPlayers() {
		return players;
	}
	
	public List<Area> getOwnedAreas() {
		return ownedAreas;
	}
	
	/**
	 * @param area that is set to this team
	 */
	public void addOwnedArea(Area area) {
		if(area.getTeam() != this) {
			area.setTeam(this);//which calls this method again and will add it to ownedAreas
		}else {
			ownedAreas.add(area);
		}
	}
	
	public void addTroop(Troop troop) {
		if(troop.getTeam() != this) {
			troop.setTeam(this);//which calls this method again and will add it to troops
		}else {
			troops.add(troop);
		}
	}
	
	public int getItemAmount(String itemName) {
		int amount = 0;
		for(Area area : ownedAreas) {
			Item resource = area.findResourceByName(itemName);
			if(resource != null) {
				amount += resource.getAmount();
			}
		}
		return amount;
	}
	
	public int getIncome(String name) {
		int income = 0;
		for(Area area : ownedAreas) {
			income += area.getIncome(name);
		}
		return income;
	}
	
	public int getUnits() {
		int units = 0;
		for(Troop troop : troops) {
			units += troop.getSize();
		}
		return units;
	}
	
	@Override
	public void turn() {
		for(Area area : ownedAreas) {
			area.turn();
		}
		TurnManager.instance.done(this);
	}

	/**
	 * not enabled, becouse this can give problems when saving
	 * @param name the name to set
	 */
	/*public void setName(String name) {
		this.name = name;
	}*/
	
	public static enum TeamColor {
		BLUE, RED, WHITE
	}
}

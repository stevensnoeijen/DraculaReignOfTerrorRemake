package nl.heretichammer.draculareignofterrorremake.team;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.map.Area;
import nl.heretichammer.draculareignofterrorremake.tbs.TurnManager;
import nl.heretichammer.draculareignofterrorremake.tbs.Turnable;
import nl.heretichammer.draculareignofterrorremake.unit.Troop;
import nl.heretichammer.draculareignofterrorremake.upgraders.Upgrader;
import nl.heretichammer.draculareignofterrorremake.upgraders.UpgraderManager;

public class Team implements Turnable {
	public static final Team NULL = new Team();
	public static final String SAVE_FORMAT = "teams.%d.%s";
	
	private int id;
	private String name;
	private TeamColor color;
	private List<Area> ownedAreas;
	private List<Troop> troops;
	private List<Player> players;
	private UpgraderManager upgraderManager;
	private final Map<String, Boolean> accessibilities = getDefaultAccessibilities();

	public Team(int id, String name, TeamColor color) {
		this.id = id;
		this.name = name;
		this.color = color;
		players = new LinkedList<Player>();
		troops = new LinkedList<Troop>();
		ownedAreas = new ArrayList<Area>();
		upgraderManager = new UpgraderManager();
		upgraderManager.setTeam(this);
	}
	
	private Team(){
	}
	
	public int getId() {
		return id;
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
		upgraderManager.turn();
		TurnManager.instance.done(this);
	}
	
	public Upgrader getUpgrader(String name) {
		return upgraderManager.getUpgrader(name);
	}
	
	/**
	 * not enabled, becouse this can give problems when saving
	 * @param name the name to set
	 */
	/*public void setName(String name) {
		this.name = name;
	}*/
	
	public static enum TeamColor {
		BLUE, RED
	}

	public boolean isAccessible(String accessName) {
		return accessibilities.get(accessName);
	}
	
	public void setAccessibility(String accessibility, boolean value) {
		if(!accessibilities.containsKey(accessibility)) {
			throw new RuntimeException( String.format("doesn't contain accessibility '%s'", accessibility) );
		}
		accessibilities.put(accessibility, value);
	}
	
	public void putAccessibility(String accessibility, boolean value) {
		accessibilities.put(accessibility, value);
	}
	
	public static Map<String, Boolean> getDefaultAccessibilities(){
		Map<String, Boolean> accessibilities = new HashMap<String, Boolean>();
		accessibilities.put("troopproducers.swordsmen", true);
		accessibilities.put("troopproducers.crossbowsoldiers", true);
		accessibilities.put("troopproducers.knight", false);
		accessibilities.put("troopproducers.juggernaut", true);
		accessibilities.put("troopproducers.catapult", false);
		accessibilities.put("troopproducers.cannon", false);
		accessibilities.put("troopproducers.spy", false);
		return accessibilities;
	}
}

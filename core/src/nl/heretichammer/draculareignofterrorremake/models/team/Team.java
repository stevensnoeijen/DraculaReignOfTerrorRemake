package nl.heretichammer.draculareignofterrorremake.models.team;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.Player;
import nl.heretichammer.draculareignofterrorremake.models.Area;
import nl.heretichammer.draculareignofterrorremake.models.Troop;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.architecture.ArchitectureUpgrader;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.armament.ArmamentUpgrader;

public class Team {
	public static final int PERMISSION_BRIDGE = 0,
			PERMISSION_BRIDGE2 = 1,
			PERMISSION_BRIDGE3 = 2,
			PERMISSION_TOWER = 3,
			PERMISSION_CASTLE1 = 4,
			PERMISSION_CASTLE2 = 5,
			PERMISSION_CASTLE3 = 6,
			PERMISSION_CASTLE4 = 7,
			PERMISSION_CASTLE5 = 8,
			PERMISSION_CASTLE6 = 9,
			PERMISSION_SWORDSMEN = 10,
			PERMISSION_CROSSBOWSOLDIERS = 11,
			PERMISSION_JUGGERNAUT = 12,
			PERMISSION_KNIGHT = 13,
			PERMISSION_SPY = 14,
			PERMISSION_CATAPULT = 15,
			PERMISSION_CANNON = 16;
	private static final String ERR_PERMISSION = "Permission do not exist";
	
	private int id;
	private String name;
	private TeamColor color;
	private List<Area> ownedAreas;
	private List<Troop> troops;
	private List<Player> players;
	private ArmamentUpgrader armamentUpgrader = new ArmamentUpgrader();
	private ArchitectureUpgrader architectureUpgrader = new ArchitectureUpgrader();
	private Map<Integer, Boolean> permissions = new HashMap<Integer, Boolean>();

	public Team(int id, String name, TeamColor color) {
		this.id = id;
		this.name = name;
		this.color = color;
		players = new LinkedList<Player>();
		troops = new LinkedList<Troop>();
		ownedAreas = new ArrayList<Area>();
		//add permissions
		permissions.put(PERMISSION_BRIDGE, true);
		permissions.put(PERMISSION_BRIDGE2, false);
		permissions.put(PERMISSION_BRIDGE3, false);
		permissions.put(PERMISSION_TOWER, false);
		permissions.put(PERMISSION_CASTLE1, false);
		permissions.put(PERMISSION_CASTLE2, false);
		permissions.put(PERMISSION_CASTLE3, false);
		permissions.put(PERMISSION_CASTLE4, false);
		permissions.put(PERMISSION_CASTLE5, false);
		permissions.put(PERMISSION_CASTLE6, false);
		permissions.put(PERMISSION_SWORDSMEN, true);
		permissions.put(PERMISSION_CROSSBOWSOLDIERS, true);
		permissions.put(PERMISSION_JUGGERNAUT, true);
		permissions.put(PERMISSION_KNIGHT, false);
		permissions.put(PERMISSION_SPY, false);
		permissions.put(PERMISSION_CANNON, false);
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
	
	public int getUnits() {
		int units = 0;
		for(Troop troop : troops) {
			units += troop.getSize();
		}
		return units;
	}
	
	public void week() {
		armamentUpgrader.week();
		architectureUpgrader.week();
	}
	
	public void setPermission(int permission, boolean enable){
		if(!permissions.containsKey(permissions)){
			throw new IllegalArgumentException(ERR_PERMISSION);
		}else{
			permissions.put(permission, enable);
		}
	}
	
	public boolean hasPermission(int permission){
		return permissions.get(permission);
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
}

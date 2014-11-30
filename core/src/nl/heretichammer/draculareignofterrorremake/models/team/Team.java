package nl.heretichammer.draculareignofterrorremake.models.team;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.models.Area;
import nl.heretichammer.draculareignofterrorremake.models.Model;
import nl.heretichammer.draculareignofterrorremake.models.Troop;
import nl.heretichammer.draculareignofterrorremake.models.events.PermissionSetEvent;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.ArchitectureUpgrader;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.ArmamentUpgrader;

public class Team extends Model {
	private static final String ERR_PERMISSION = "Permission do not exist";
	
	public static final Team turks = new Team("Turks", TeamColor.RED);
	public static final Team transylvanians = new Team("Transylvanians", TeamColor.BLUE);
	
	private String name;
	private TeamColor color;
	private List<Area> ownedAreas;
	private List<Troop<?>> troops;
	private ArmamentUpgrader armamentUpgrader = new ArmamentUpgrader();
	private ArchitectureUpgrader architectureUpgrader = new ArchitectureUpgrader();
	private Map<Permission, Boolean> permissions = new HashMap<>();

	private Team(String name, TeamColor color) {
		this.name = name;
		this.color = color;
		troops = new LinkedList<Troop<?>>();
		ownedAreas = new ArrayList<Area>();
		//add permissions
		for(Permission permission : Permission.values()){
			permissions.put(permission, true);//TODO: dont set all permissions to true
		}
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
	
	public void setPermission(Permission permission, boolean enable){
		if(!permissions.containsKey(permissions)){
			throw new IllegalArgumentException(ERR_PERMISSION);
		}else{
			permissions.put(permission, enable);
			post(new PermissionSetEvent());
		}
	}
	
	public boolean hasPermission(Permission permission){
		return permissions.get(permission);
	}
	
	public ArchitectureUpgrader getArchitectureUpgrader() {
		return this.architectureUpgrader;
	}
	
	public ArmamentUpgrader getArmamentUpgrader() {
		return this.armamentUpgrader;
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

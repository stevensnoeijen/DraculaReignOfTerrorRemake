package nl.heretichammer.draculareignofterrorremake.team;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.ItemFactory;
import nl.heretichammer.draculareignofterrorremake.team.access.AccessManager;

public class Team {//implements Json.Serializable
	//public static final Team NEUTRAL = new Team("Neutral", Color.WHITE);
	
	private String name;
	private TeamColor color;
	
	public final AccessManager accessManager;
	public final Resources resources = new Resources();

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
	
	public static class Resources {
		public final Item gold = ItemFactory.create("gold");
		public int goldIncome;
		public final Item wood = ItemFactory.create("wood");
		public int woodIncome;
		public final Item food = ItemFactory.create("food");
		public int foodIncome;
		public final Item men = ItemFactory.create("men");
		public int menIncome;
		public int army;
		public int armyIncome;
	}
}

package nl.heretichammer.draculareignofterrorremake.team;

import nl.heretichammer.draculareignofterrorremake.team.access.AccessManager;

import com.badlogic.gdx.graphics.Color;

public class Team {
	public static final Team NEUTRAL = new Team("Neutral", Color.WHITE);
	
	private String name;
	private Color color;
	
	public final AccessManager accessManager;

	public Team(String name, Color color) {
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
	public Color getColor() {
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
}

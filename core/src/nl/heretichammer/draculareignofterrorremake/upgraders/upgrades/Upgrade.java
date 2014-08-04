package nl.heretichammer.draculareignofterrorremake.upgraders.upgrades;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.tbs.Turnable;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.team.access.Accessible;
import nl.heretichammer.draculareignofterrorremake.upgraders.Upgrader;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSuppliable;

/**
 * Strategy pattern.
 * @author Steven Snoeijen
 *
 */
public interface Upgrade extends ItemSuppliable, Teamable, Accessible, Turnable {
	public String getName();
	public int getLevel();
	public Item.ItemDescriptor[] getCost();
	public Item.ItemDescriptor getCost(String name);
	public int getTurnCost();
	public void setUpgrader(Upgrader upgrader);
	public void start();
	public boolean isDone();
	public String getImage();
	
	public static class UpgradeData {
		public String name;
		public int level;
		public Item.ItemDescriptor[] cost;
		public int turnCost;
		public String accessName;
		public String image;
	}

	public boolean isStarted();
}

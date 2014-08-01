package nl.heretichammer.draculareignofterrorremake.upgraders.upgrades;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.team.access.Accessible;
import nl.heretichammer.draculareignofterrorremake.upgraders.Upgrader;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.utils.Startable;

/**
 * Strategy pattern.
 * @author Steven Snoeijen
 *
 */
public interface Upgrade extends ItemSuppliable, Teamable, Accessible, Startable {
	public String getName();
	public int getLevel();
	public Item.ItemDescriptor[] getCost();
	public int getTurnCost();
	public void setUpgrader(Upgrader upgrader);
	public boolean isDone();
	
	public static class UpgradeData {
		public String name;
		public int level;
		public Item.ItemDescriptor[] cost;
		public int turnCost;
		public String accessName;
	}
}

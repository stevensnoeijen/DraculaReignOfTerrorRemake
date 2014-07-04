package nl.heretichammer.draculareignofterrorremake.upgrades.upgrader;

import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.team.access.Accessible;
import nl.heretichammer.draculareignofterrorremake.upgrades.Upgrade;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.utils.Startable;

public interface Upgrader extends Startable, ItemSuppliable, Teamable, Accessible {

	public String getName();
	public int getMaxLevel();
	public Upgrade getCurrent();
	
	public static class UpgraderData {
		public String accessName;
		public String name;
		/**
		 * In order
		 */
		public String[] upgrades; 
	}
}

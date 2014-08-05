package nl.heretichammer.draculareignofterrorremake.upgraders;

import nl.heretichammer.draculareignofterrorremake.tbs.Turnable;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.team.access.Accessible;
import nl.heretichammer.draculareignofterrorremake.upgraders.upgrades.Upgrade;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.utils.Startable;

public interface Upgrader extends Startable, ItemSuppliable, Teamable, Accessible, Turnable {
	/**
	 * Init after team set for starting default upgrade(s)
	 */
	public void init();
	public String getName();
	public int getMaxLevel();
	public Upgrade getCurrent();
	public Upgrade getNext();
	
	/**
	 * Called by an {@link Upgrade} when done
	 * @param upgrade that is done
	 */
	public void onDone(Upgrade upgrade);
	
	public static class UpgraderData {
		public String accessName;
		public String name;
		/**
		 * In order
		 */
		public String[] upgrades; 
	}
}

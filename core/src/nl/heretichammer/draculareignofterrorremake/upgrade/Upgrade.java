package nl.heretichammer.draculareignofterrorremake.upgrade;

import nl.heretichammer.draculareignofterrorremake.ItemSupplier;

/**
 * Strategy pattern.
 * @author Steven Snoeijen
 *
 */
public interface Upgrade {
	public String getName();
	public void setItemSupplier(ItemSupplier itemSupplier);
	public void startUpgrade();
	public void stopUpgrade();
	public boolean isDone();
	public String getPreviousUpgradeName();
	public String[] getNextUpgradeNames();
}

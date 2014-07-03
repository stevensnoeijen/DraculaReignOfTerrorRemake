package nl.heretichammer.draculareignofterrorremake.upgrade;

import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.items.Item;

/**
 * Strategy pattern.
 * @author Steven Snoeijen
 *
 */
public interface Upgrade {
	public String getName();
	public void setItemSupplier(ItemSupplier itemSupplier);
	public void start();
	public void stop();
	public boolean isDone();
}

package nl.heretichammer.draculareignofterrorremake.upgrade;

import nl.heretichammer.draculareignofterrorremake.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.items.Item;

/**
 * Strategy pattern.
 * @author Steven Snoeijen
 *
 */
public interface Upgrade extends ItemSuppliable {
	public String getName();
	public Item.ItemDescriptor[] getCost();
	public void start();
	public void stop();
	public boolean isDone();
}

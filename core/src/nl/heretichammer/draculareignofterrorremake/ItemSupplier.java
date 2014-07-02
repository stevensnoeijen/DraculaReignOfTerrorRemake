package nl.heretichammer.draculareignofterrorremake;

import nl.heretichammer.draculareignofterrorremake.items.Item;

public interface ItemSupplier {
	//TODO: make "supply" methods
	/**
	 * @param item to find in the supplier
	 * @return found item in supplier
	 */
	public Item findItem(Item.Descriptor itemDescriptor);
	/**
	 * Removes item from himself and returns it.
	 * @param itemDescriptor name and amount of item
	 * @return item with the requested amount or null
	 */
	public Item[] removeItems(Item.Descriptor[] itemDescriptor);
	public Item removeItem(Item.Descriptor itemDescriptor);
	
	public boolean hadItem(Item.Descriptor itemDescriptor);
	public boolean hasItems(Item.Descriptor[] itemDescriptor);
}

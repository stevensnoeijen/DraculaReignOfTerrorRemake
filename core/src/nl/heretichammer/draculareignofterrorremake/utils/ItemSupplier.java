package nl.heretichammer.draculareignofterrorremake.utils;

import nl.heretichammer.draculareignofterrorremake.items.Item;

public interface ItemSupplier {
	//TODO: make "supply" methods
	/**
	 * @param item to find in the supplier
	 * @return found item in supplier
	 */
	public Item findItem(Item.ItemDescriptor itemItemDescriptor);
	/**
	 * Removes item from himself and returns it.
	 * @param itemItemDescriptor name and amount of item
	 * @return item with the requested amount or null
	 */
	public Item[] removeItems(Item.ItemDescriptor[] itemItemDescriptor);
	public Item removeItem(Item.ItemDescriptor itemItemDescriptor);
	
	public boolean hadItem(Item.ItemDescriptor itemItemDescriptor);
	public boolean hasItems(Item.ItemDescriptor[] itemItemDescriptor);
}

package nl.heretichammer.draculareignofterrorremake.data.factories;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.Item.ItemData;

public class ItemDataFactory extends AbstractDataFactory<Item.ItemData>
{
	public static final ItemDataFactory instance = new ItemDataFactory();
	
	@Override
	public ItemData fromFile(String name) {
		return get(String.format("data/items/%s.json", name), Item.ItemData.class);
	}
}

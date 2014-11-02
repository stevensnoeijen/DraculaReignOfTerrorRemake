package nl.heretichammer.draculareignofterrorremake.models.data.factories;

import nl.heretichammer.draculareignofterrorremake.models.items.Item;
import nl.heretichammer.draculareignofterrorremake.models.items.Item.ItemData;

public class ItemDataFactory extends AbstractDataFactory<Item.ItemData>
{
	public static final ItemDataFactory instance = new ItemDataFactory();
	
	@Override
	public ItemData fromFile(String name) {
		return get(String.format("data/items/%s.json", name), Item.ItemData.class);
	}
}

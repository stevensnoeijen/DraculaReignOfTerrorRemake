package nl.heretichammer.draculareignofterrorremake.data.factories;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.Item.ItemModel;

public class ItemDataFactory extends AbstractDataFactory<Item.ItemModel>
{
	public static final ItemDataFactory instance = new ItemDataFactory();
	
	@Override
	public ItemModel fromFile(String name) {
		return get(String.format("data/items/%s.json", name), Item.ItemModel.class);
	}
}

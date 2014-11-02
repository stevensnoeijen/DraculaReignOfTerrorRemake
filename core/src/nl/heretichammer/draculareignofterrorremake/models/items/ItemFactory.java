package nl.heretichammer.draculareignofterrorremake.models.items;

import nl.heretichammer.draculareignofterrorremake.models.data.DataManager;

public class ItemFactory {
	public static Item create(Item.ItemDescriptor itemItemDescriptor) {
		Item.ItemData model = DataManager.instance.getItemData(itemItemDescriptor.name);
		return create(model, itemItemDescriptor.amount);
	}
	
	public static Item create(String name) {
		Item.ItemDescriptor itemDescriptor = new Item.ItemDescriptor();
		itemDescriptor.name = name;
		return create(itemDescriptor);
	}
	
	private static Item create(Item.ItemData model, int amount) {
		return new BaseItem(model, amount);
	}
}

package nl.heretichammer.draculareignofterrorremake.items;

import nl.heretichammer.draculareignofterrorremake.data.DataManager;

public class ItemFactory {
	public static Item create(Item.ItemDescriptor itemItemDescriptor) {
		Item.ItemData model = DataManager.instance.getItemData(itemItemDescriptor.name);
		return create(model, itemItemDescriptor.amount);
	}
	
	private static Item create(Item.ItemData model, int amount) {
		return new BaseItem(model, amount);
	}
}

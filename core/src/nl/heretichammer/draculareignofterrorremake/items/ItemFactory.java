package nl.heretichammer.draculareignofterrorremake.items;

import nl.heretichammer.draculareignofterrorremake.data.DataManager;

public class ItemFactory {
	public static Item create(Item.Descriptor itemDescriptor) {
		Item.ItemData model = DataManager.instance.getItemData(itemDescriptor.name);
		return create(model, itemDescriptor.amount);
	}
	
	private static Item create(Item.ItemData model, int amount) {
		return new DefaultItem(model, amount);
	}
}

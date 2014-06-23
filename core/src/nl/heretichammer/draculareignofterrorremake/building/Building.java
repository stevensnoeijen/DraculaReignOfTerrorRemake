package nl.heretichammer.draculareignofterrorremake.building;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.containers.BlockItemContainer;

public class Building {
	public BlockItemContainer items;
	
	public void addItem(Item item){
		items.add(item);
	}
	
	public Iterable<Item> getItems(){
		return items.getAll();
	}
	
	public Iterable<Item> findItemsByCategory(String category){
		return items.findByCategory(category);
	}
}

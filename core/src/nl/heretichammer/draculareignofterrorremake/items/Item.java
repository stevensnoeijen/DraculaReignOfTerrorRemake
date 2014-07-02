package nl.heretichammer.draculareignofterrorremake.items;

import nl.heretichammer.draculareignofterrorremake.Consumer;
import nl.heretichammer.draculareignofterrorremake.items.consumables.Consumable;
import nl.heretichammer.draculareignofterrorremake.items.containers.ItemContainer;
import nl.heretichammer.draculareignofterrorremake.unit.Unit;

public interface Item {
	public String getName();
	public String getCategory();
	public String getDescription();
	
	public int getWeight();
	public String getImage();
	
	public boolean isStackable();
	public boolean isStacked();
	public int getAmount();
	public int getAmountMax();
	public void add(Item item);
	
	public Unit getOwner();
	public void setOwner(Unit owner);
	
	/**
	 * 
	 * @param amount
	 * @return item with amount
	 */
	public Item remove(int amount);
	
	public boolean isEmpty();
	
	public boolean isFull();
	
	public void accept(ItemVisitor visitor);
	
	public boolean equalModel(Item other);
	
	public static class ItemModel {
		public String name;
		public String description;
		public String category;
		public int weight;
		public String image;
		public int amountMax = 1;
		public int amountDefault = 1;
	}
	
	public static interface ItemVisitor {
		public void visit(UnitItem unitItem);
		public void visit(Key key);
		public void visit(Consumable consumable);
		public void visit(ItemContainer<?> itemContainer);
		public void visit(AbilityItem abilityItem);
		public void visit(DefaultItem baseItem);
	}
	
	public static class Descriptor {
		public String name;
		public int amount;
	}
}

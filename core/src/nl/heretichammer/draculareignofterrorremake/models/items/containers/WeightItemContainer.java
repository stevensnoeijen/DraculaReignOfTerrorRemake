package nl.heretichammer.draculareignofterrorremake.models.items.containers;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.models.items.Item;
import nl.heretichammer.draculareignofterrorremake.models.items.Lock;
import nl.heretichammer.draculareignofterrorremake.models.items.Item.ItemDescriptor;

public class WeightItemContainer extends ItemContainer<WeightItemContainer.WeightItemContainerData> {
	private final List<Item> items;
	private int itemsWeight;
	
	public WeightItemContainer(WeightItemContainer.WeightItemContainerData model, Lock lock) {
		super(model, lock);
		items = new LinkedList<Item>();
	}
	
	public WeightItemContainer(WeightItemContainer.WeightItemContainerData model) {
		this(model, null);
	}

	@Override
	public boolean canAdd(Item item) {
		return itemsWeight + item.getWeight() <= getMaxWeight();
	}

	public int getMaxWeight(){
		return data.maxWeight;
	}
	
	@Override
	public void add(Item item) {
		items.add(item);
		itemsWeight += item.getWeight();
	}

	@Override
	public Item get(int index) {
		return items.get(index);
	}

	@Override
	public int indexOf(Item item) {
		return items.indexOf(item);
	}

	@Override
	public boolean isEmpty() {
		return items.isEmpty();
	}

	@Override
	public boolean remove(Item item) {
		return items.remove(item);
	}

	@Override
	public int getMaxSize() {
		return Integer.MAX_VALUE;
	}
	
	@Override
	public int getSize() {
		return items.size();
	}

	@Override
	public Iterator<Item> iterator() {
		return items.iterator();
	}
	
	@Override
	public int getWeight() {
		return super.getWeight() + data.maxWeight;
	}
	
	public static class WeightItemContainerData extends ItemContainer.ItemContainerData {
		public int maxWeight;
	}

	@Override
	public void accept(ItemVisitor visitor) {
		visitor.visit(this);
	}

	@Override
	public Iterable<Item> findByCategory(String category) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Item findItem(ItemDescriptor itemDescriptor) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Item[] removeItems(ItemDescriptor[] itemDescriptors) {
		if(hasItems(itemDescriptors)) {
			Item[] items = new Item[itemDescriptors.length];
			for(int i = 0; i < itemDescriptors.length; i++) {
				items[i] = removeItem(itemDescriptors[i]);
			}
			return items;
		}
		return null;
	}

	@Override
	public Item removeItem(ItemDescriptor itemDescriptor) {
		for(Item item : items) {
			if(item.is(itemDescriptor)) {
				return item;
			}
		}
		return null;
	}

	@Override
	public boolean hasItem(ItemDescriptor itemDescriptor) {
		for(Item item : items) {
			if(item.is(itemDescriptor)){
				return true;
			}
		}
		return false;//did not have the item
	}

	@Override
	public boolean hasItems(ItemDescriptor[] itemDescriptors) {
		for(ItemDescriptor itemDescriptor : itemDescriptors) {
			if( !hasItem(itemDescriptor) ) {//if had not
				return false;
			}
		}
		return true;//if all items passed it has all items
	}
}

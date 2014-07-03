package nl.heretichammer.draculareignofterrorremake.items.containers;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.Lock;

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
}

package nl.heretichammer.draculareignofterrorremake.items.containers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.Lock;

public class BlockItemContainer extends ItemContainer<BlockItemContainer.BlockItemContainerData> {
	private List<Item> items;
	
	public BlockItemContainer(BlockItemContainer.BlockItemContainerData data, Lock lock) {
		super(data, lock);
		items = new ArrayList<Item>(data.maxBlocks);
	}
	
	public BlockItemContainer(BlockItemContainer.BlockItemContainerData data) {
		this(data, null);
	}

	public static class BlockItemContainerData extends ItemContainer.ItemContainerData {
		public int maxBlocks;
	}
	
	public int getMaxBlocks(){
		return data.maxBlocks;
	}

	@Override
	public boolean canAdd(Item item) {
		return getMaxBlocks() + 1 <= getMaxBlocks();
	}

	@Override
	public void add(Item item) {
		Item equal = findEqual(item);
		if(equal != null) {
			//if there is a equal combine them
			equal.add(item);
		}else {
			items.add(item);
		}
	}
	
	protected Item findEqual(Item find) {
		for(Item item : items) {
			if(item.equalModel(find)){
				return item;
			}
		}
		return null;
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
		return data.maxBlocks;
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
	public void accept(ItemVisitor visitor) {
		visitor.visit(this);
	}

	@Override
	public Iterable<Item> findByCategory(String category) {
		List<Item> found = new ArrayList<Item>();
		for(Item item : items){
			if(item.getCategory().equals(category)){
				found.add(item);
			}
		}
		return found;
	}

	/**
	 * Don't add items to this list
	 * @return
	 */
	public Iterable<Item> getAll() {
		return items;
	}

	@Override
	public Item findItem(ItemDescriptor itemItemDescriptor) {
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
				if(item.getAmount() == itemDescriptor.amount) {//if item is required amount
					remove(item);//remove item
					return item;
				}else {
					return item.remove(itemDescriptor.amount);
				}
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

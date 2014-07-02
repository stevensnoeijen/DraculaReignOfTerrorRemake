package nl.heretichammer.draculareignofterrorremake.items.containers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.Lock;

public class BlockItemContainer extends ItemContainer<BlockItemContainer.BlockItemContainerModel> {
	private List<Item> items;
	
	public BlockItemContainer(BlockItemContainer.BlockItemContainerModel model, Lock lock) {
		super(model, lock);
		items = new ArrayList<Item>(model.maxBlocks);
	}
	
	public BlockItemContainer(BlockItemContainer.BlockItemContainerModel model) {
		this(model, null);
	}

	public static class BlockItemContainerModel extends ItemContainer.ItemContainerModel {
		public int maxBlocks;
	}
	
	public int getMaxBlocks(){
		return model.maxBlocks;
	}

	@Override
	public boolean canAdd(Item item) {
		return size() + 1 <= getMaxBlocks();
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
	public int size() {
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
}

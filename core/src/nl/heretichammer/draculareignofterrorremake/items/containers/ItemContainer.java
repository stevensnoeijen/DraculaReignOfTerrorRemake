package nl.heretichammer.draculareignofterrorremake.items.containers;

import java.util.List;

import nl.heretichammer.draculareignofterrorremake.items.AbstractItem;
import nl.heretichammer.draculareignofterrorremake.items.Closeable;
import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.Key;
import nl.heretichammer.draculareignofterrorremake.items.Lock;
import nl.heretichammer.draculareignofterrorremake.items.Lockable;

public abstract class ItemContainer<M extends ItemContainer.ItemContainerModel> extends AbstractItem<M> implements Iterable<Item>, Closeable, Lockable {
	
	private Lock lock;
	private boolean open;
	
	public ItemContainer(M model, Lock lock) {
		this(model);
		this.lock = lock;
	}
	
	public ItemContainer(M model) {
		super(model);
	}

	@Override
	public void lock(Key key) {
		lock.lock(key);
	}

	@Override
	public boolean isLocked() {
		if(lock != null){
			return lock.isLocked();
		}
		return false;
	}

	@Override
	public void unlock(Key key) {
		lock.unlock(key);
	}
	
	@Override
	public void open() {
		open = true;
	}
	
	@Override
	public void close() {
		open = false;
	}
	
	@Override
	public boolean isOpen() {
		return open;
	}
	
	public abstract Item get(int index);
	
	public abstract int indexOf(Item item);
	
	public abstract boolean isEmpty();
	
	public abstract boolean remove(Item item);
	
	public abstract int size();
	
	public abstract Iterable<Item> findByCategory(String category);
	
	public static class ItemContainerModel extends Item.ItemModel{
		public Item.Descriptor lock;
	}
}

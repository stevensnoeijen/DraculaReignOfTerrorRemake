package nl.heretichammer.draculareignofterrorremake.building;

import nl.heretichammer.draculareignofterrorremake.items.Closeable;
import nl.heretichammer.draculareignofterrorremake.items.Key;
import nl.heretichammer.draculareignofterrorremake.items.Lock;
import nl.heretichammer.draculareignofterrorremake.items.Lockable;

public class Door extends BuildingPiece implements Closeable, Lockable{
	private boolean open;
	private Lock lock;
	
	public Door(Model model) {
		super(model);
	}

	@Override
	public void lock(Key key) {
		lock.lock(key);
	}

	@Override
	public boolean isLocked() {
		return lock.isLocked();
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
	public boolean isOpen() {
		return open;
	}

	@Override
	public void close() {
		open = false;
	}
}

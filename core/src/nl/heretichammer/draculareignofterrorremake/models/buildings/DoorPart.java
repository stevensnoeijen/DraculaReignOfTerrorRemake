package nl.heretichammer.draculareignofterrorremake.models.buildings;

import nl.heretichammer.draculareignofterrorremake.models.items.Closeable;
import nl.heretichammer.draculareignofterrorremake.models.items.Key;
import nl.heretichammer.draculareignofterrorremake.models.items.Lock;
import nl.heretichammer.draculareignofterrorremake.models.items.Lockable;

public class DoorPart extends BuildingPart implements Closeable, Lockable{
	private boolean open;
	private Lock lock;
	
	public DoorPart(BuildingPartData data) {
		super(data);
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

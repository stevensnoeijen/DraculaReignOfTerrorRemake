package nl.heretichammer.draculareignofterrorremake.models.items;

public interface Lockable {
	public void lock(Key key);
	public boolean isLocked();
	public void unlock(Key key);
}

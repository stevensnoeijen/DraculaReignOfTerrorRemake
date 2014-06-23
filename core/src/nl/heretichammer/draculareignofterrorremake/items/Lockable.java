package nl.heretichammer.draculareignofterrorremake.items;

public interface Lockable {
	public void lock(Key key);
	public boolean isLocked();
	public void unlock(Key key);
}

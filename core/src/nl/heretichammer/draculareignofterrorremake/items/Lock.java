package nl.heretichammer.draculareignofterrorremake.items;

public abstract class Lock extends AbstractItem<Lock.LockModel> implements Lockable{
	
	private Key unlockKey;//TODO: place this as a code in model! (masterkey?)
	private boolean locked;
	
	public Lock(LockModel model, Key unlockKey) {
		super(model);
		this.unlockKey = unlockKey;
	}

	@Override
	public void lock(Key key) {
		if(!locked && key.equals(unlockKey)){
			locked = true;
		}
	}

	@Override
	public boolean isLocked() {
		return locked;
	}

	@Override
	public void unlock(Key key) {
		if(locked && key.equals(unlockKey)){
			locked = false;
		}
	}

	public static class LockModel extends Item.ItemData {
		public String key;
	}
}

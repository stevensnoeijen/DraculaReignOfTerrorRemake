package nl.heretichammer.draculareignofterrorremake.tbs;

public interface TBSObject {
	/**
	 * Called when it's the objects turn.
	 * Call {@link TBSGame#turnNext()} when done.
	 */
	public void turn();
}

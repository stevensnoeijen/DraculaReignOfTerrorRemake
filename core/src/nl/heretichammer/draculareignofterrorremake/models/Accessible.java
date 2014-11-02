package nl.heretichammer.draculareignofterrorremake.models;


public interface Accessible {
	/**
	 * Call {@link Team#accessManager#isAccessable(String)}.
	 * @return boolean if team can use it.
	 */
	public boolean isAccessable();
	public void setAccessable(boolean accessable);
}

package nl.heretichammer.draculareignofterrorremake.models.team.access;


public interface Accessible {
	/**
	 * Call {@link Team#accessManager#isAccessable(String)}.
	 * @return boolean if team can use it.
	 */
	public boolean isAccessable();
}

package nl.heretichammer.draculareignofterrorremake.team.access;

import nl.heretichammer.draculareignofterrorremake.team.Teamable;

public interface Accessible extends Teamable {
	/**
	 * Call {@link Team#accessManager#isAccessable(String)}.
	 * @return boolean if team can use it.
	 */
	public boolean isAccessable();
}

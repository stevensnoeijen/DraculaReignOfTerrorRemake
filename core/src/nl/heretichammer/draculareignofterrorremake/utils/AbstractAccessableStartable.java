package nl.heretichammer.draculareignofterrorremake.utils;

import nl.heretichammer.draculareignofterrorremake.models.team.access.Accessible;

/**
 * Accessable overrides {@link #isStartable()}, {@link #isPausable()} and {@link #isStoppable()},
 * and these are set to false.
 * @author Steven Snoeijen
 *
 */
public abstract class AbstractAccessableStartable extends AbstractStartable implements Accessible {

	public AbstractAccessableStartable() {
		this.startable = false;
		this.pausable = false;
		this.stoppable = false;
	}
	
	/**
	 * First checks if {@link #isAccessable()}, if true it returns super. Else false.
	 */
	@Override
	public boolean isStartable() {
		if(isAccessable()) {
			return super.isStartable();
		}else {
			return false;
		}
	}
	
	/**
	 * First checks if {@link #isAccessable()}, if true it returns super. Else false.
	 */
	@Override
	public boolean isPausable() {
		if(isAccessable()) {
			return super.isPausable();
		}else {
			return false;
		}
	}
	
	/**
	 * First checks if {@link #isAccessable()}, if true it returns super. Else false.
	 */
	@Override
	public boolean isStoppable() {
		if(isAccessable()) {
			return super.isStoppable();
		}else {
			return false;
		}
	}
}

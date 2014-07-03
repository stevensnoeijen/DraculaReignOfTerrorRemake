package nl.heretichammer.draculareignofterrorremake.utils;

public abstract class AbstractStartable implements Startable {

	protected boolean startable = true;
	protected boolean pausable = true;
	protected boolean stoppable = true;
	
	@Override
	public boolean isStartable() {
		return startable;
	}

	@Override
	public boolean isPausable() {
		return pausable;
	}

	@Override
	public boolean isStoppable() {
		return stoppable;
	}
}

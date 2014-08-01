package nl.heretichammer.draculareignofterrorremake.utils;

public abstract class AbstractStartable implements Startable {

	protected boolean startable = true;
	protected boolean pausable = true;
	protected boolean stoppable = true;
	
	protected boolean started = false;
	protected boolean paused = false;
	
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
	
	@Override
	public void start() {
		if(isStartable()) {
			started = true;
		}
	}
	
	@Override
	public void stop() {
		if(isStoppable()) {
			started = false;
		}
	}
	
	@Override
	public void pause() {
		if(isPausable()) {
			paused = true;
		}
	}
	
	@Override
	public void unpause() {
		paused = false;		
	}
}

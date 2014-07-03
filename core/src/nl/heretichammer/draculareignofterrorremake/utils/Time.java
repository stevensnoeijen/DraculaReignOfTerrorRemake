package nl.heretichammer.draculareignofterrorremake.utils;

public interface Time {
	public void start();
	public boolean isStarted();
	/**
	 * Calls {@link #reset()} and {@link #pause()}.
	 */
	public void stop();
	public void reset();
	public void pause();
}

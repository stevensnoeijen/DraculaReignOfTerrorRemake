package nl.heretichammer.draculareignofterrorremake;

public interface Timer {
	public void start();
	public boolean isStarted();
	/**
	 * Calls {@link #reset()} and {@link #pause()}.
	 */
	public void stop();
	public void reset();
	public void pause();
	public boolean isDone();
	/**
	 * Let the manager call {@link #reset()} when {@link #isDone()}
	 * @param autoRestart
	 */
	public void setAutoReset(boolean autoRestart);
	public boolean isAutoReset();
}

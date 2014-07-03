package nl.heretichammer.draculareignofterrorremake.utils;

public interface Startable {
	public boolean isStartable();
	public void start();
	public boolean isPausable();
	public void pause();	
	public boolean isStoppable();
	public void stop();
	public void isDone();
}

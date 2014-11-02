package nl.heretichammer.draculareignofterrorremake.models.producers;

import nl.heretichammer.draculareignofterrorremake.models.Accessible;
import nl.heretichammer.draculareignofterrorremake.models.ResourceSupplier;
import nl.heretichammer.draculareignofterrorremake.models.team.Teamable;

public interface Producer<E> extends Accessible, Teamable {	
	public int getTurnCost();
	public int getCurrentTurn();
	/**
	 * remove produced object
	 * @return 
	 */
	public E remove();
	public boolean isDone();
	public boolean isStarted();
	public void week();
	public void setResourceSupplier(ResourceSupplier resourceSupplier);
}

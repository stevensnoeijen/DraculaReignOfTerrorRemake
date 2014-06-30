package nl.heretichammer.draculareignofterrorremake.producers;

import nl.heretichammer.draculareignofterrorremake.Consumable;
import nl.heretichammer.draculareignofterrorremake.Consumer;
import nl.heretichammer.draculareignofterrorremake.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.tbs.TBSObject;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.team.access.Accessible;
import nl.heretichammer.draculareignofterrorremake.items.Item;

public interface Producer<E> extends Accessible, Teamable, Consumable<Consumer<E>>, ItemSuppliable {
	public Item.Descriptor[] getCost();
	public boolean isStartable();
	public void start();
	public boolean isStarted();
	public boolean isStoppable();
	public void stop();
	public boolean isDone();
	/**
	 * remove produced object
	 * @return 
	 */
	public E remove();
}

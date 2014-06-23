package nl.heretichammer.draculareignofterrorremake.producers;

import nl.heretichammer.draculareignofterrorremake.Consumer;
import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.team.access.Accessible;
import nl.heretichammer.draculareignofterrorremake.items.Item;

public interface Producer<E> extends Accessible, Teamable {
	//public String getName();
	//public int getLevel();
	public Item.Descriptor[] getCost();
	public void setItemSupplier(ItemSupplier itemSupplier);
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
	/**
	 * If set to null, item will stay in producer.
	 * @param consumer to receive the produced object
	 */
	public void setConsumer(Consumer<E> consumer);
}

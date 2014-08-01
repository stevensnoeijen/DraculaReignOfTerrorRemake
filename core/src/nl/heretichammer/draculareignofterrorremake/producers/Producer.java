package nl.heretichammer.draculareignofterrorremake.producers;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.tbs.Turnable;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.team.access.Accessible;
import nl.heretichammer.draculareignofterrorremake.utils.Consumable;
import nl.heretichammer.draculareignofterrorremake.utils.Consumer;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.utils.Startable;

public interface Producer<E> extends Accessible, Teamable, Consumable<Consumer<E>>, ItemSuppliable, Turnable {
	public Item.ItemDescriptor[] getCost();
	public Item.ItemDescriptor findCost(String name);
	
	/**
	 * remove produced object
	 * @return 
	 */
	public E remove();
	public boolean isDone();
	
	
	public static class ProducerData {
		public String accessName;
		public Item.ItemDescriptor[] cost;
		public int turnCost = 1;
		public boolean autoStart = false;
	}
}

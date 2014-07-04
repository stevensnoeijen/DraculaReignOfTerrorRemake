package nl.heretichammer.draculareignofterrorremake.producers;

import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.team.access.Accessible;
import nl.heretichammer.draculareignofterrorremake.utils.Consumable;
import nl.heretichammer.draculareignofterrorremake.utils.Consumer;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.utils.Startable;
import nl.heretichammer.draculareignofterrorremake.items.Item;

public interface Producer<E> extends Accessible, Teamable, Consumable<Consumer<E>>, ItemSuppliable, Startable {
	public Item.ItemDescriptor[] getCost();
	
	/**
	 * remove produced object
	 * @return 
	 */
	public E remove();
	
	public static class ProducerData {
		public String accessName;
		public Item.ItemDescriptor[] cost;
		public int turnCost;
	}
}

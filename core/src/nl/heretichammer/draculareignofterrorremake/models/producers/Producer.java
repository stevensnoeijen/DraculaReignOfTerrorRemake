package nl.heretichammer.draculareignofterrorremake.models.producers;

import nl.heretichammer.draculareignofterrorremake.models.items.Item;
import nl.heretichammer.draculareignofterrorremake.models.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.models.team.access.Accessible;
import nl.heretichammer.draculareignofterrorremake.utils.Consumable;
import nl.heretichammer.draculareignofterrorremake.utils.Consumer;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSuppliable;

public interface Producer<E> extends Accessible, Teamable, Consumable<Consumer<E>>, ItemSuppliable {
	public Item.ItemDescriptor[] getCost();
	public boolean canPay();
	public Item.ItemDescriptor findCost(String name);
	
	/**
	 * remove produced object
	 * @return 
	 */
	public E remove();
	public boolean isDone();
	public boolean isStarted();
	public void week();	
	
	public static class ProducerData {
		public String accessName;
		public Item.ItemDescriptor[] cost;
		public int turnCost = 1;
		public boolean autoStart = false;
	}
}

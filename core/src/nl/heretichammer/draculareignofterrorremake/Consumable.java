package nl.heretichammer.draculareignofterrorremake;

import nl.heretichammer.draculareignofterrorremake.Consumer;

public interface Consumable<E extends Consumer<?>> {
	/**
	 * If set to null, item will stay in producer.
	 * @param consumer to receive the produced object
	 */
	public void setConsumer(E consumer);
}

package nl.heretichammer.draculareignofterrorremake.utils;

import nl.heretichammer.draculareignofterrorremake.utils.Consumer;

public interface Consumable<E extends Consumer<?>> {
	/**
	 * If set to null, item will stay in producer.
	 * @param consumer to receive the produced object
	 */
	public void setConsumer(E consumer);
}

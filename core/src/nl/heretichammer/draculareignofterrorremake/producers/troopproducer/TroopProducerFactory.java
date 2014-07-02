package nl.heretichammer.draculareignofterrorremake.producers.troopproducer;

import nl.heretichammer.draculareignofterrorremake.data.DataManager;

public class TroopProducerFactory {
	public static TroopProducer create(String name) {
		return new TroopProducer(DataManager.instance.getTroopProducerData(name));
	}
}

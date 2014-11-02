package nl.heretichammer.draculareignofterrorremake.models.producers.troopproducer;

import nl.heretichammer.draculareignofterrorremake.models.data.DataManager;

public class TroopProducerFactory {
	public static TroopProducer create(String name) {
		return new TroopProducer(DataManager.instance.getTroopProducerData(name));
	}
}

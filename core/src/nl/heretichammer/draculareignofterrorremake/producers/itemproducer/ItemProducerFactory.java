package nl.heretichammer.draculareignofterrorremake.producers.itemproducer;

import nl.heretichammer.draculareignofterrorremake.data.DataManager;

public class ItemProducerFactory {
	
	public static ItemProducer create(String name) {
		return new ItemProducer( DataManager.instance.getItemProducerData(name) );
	}
}

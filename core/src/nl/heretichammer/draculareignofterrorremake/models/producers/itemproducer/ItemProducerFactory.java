package nl.heretichammer.draculareignofterrorremake.models.producers.itemproducer;

import nl.heretichammer.draculareignofterrorremake.models.data.DataManager;

public class ItemProducerFactory {
	
	public static ItemProducer create(String name) {
		return new ItemProducer( DataManager.instance.getItemProducerData(name) );
	}
}

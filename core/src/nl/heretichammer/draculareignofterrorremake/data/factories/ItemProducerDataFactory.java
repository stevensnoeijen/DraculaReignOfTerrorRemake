package nl.heretichammer.draculareignofterrorremake.data.factories;

import nl.heretichammer.draculareignofterrorremake.producers.itemproducer.ItemProducer;

public class ItemProducerDataFactory extends AbstractDataFactory<ItemProducer.ItemProducerData> {

	public static final ItemProducerDataFactory instance = new ItemProducerDataFactory();
	
	@Override
	public ItemProducer.ItemProducerData fromFile(String name) {
		return get(String.format("data/producers/itemproducers/%s.json", name), ItemProducer.ItemProducerData.class);
	}
}

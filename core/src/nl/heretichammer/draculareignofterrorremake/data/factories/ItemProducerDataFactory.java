package nl.heretichammer.draculareignofterrorremake.data.factories;

import nl.heretichammer.draculareignofterrorremake.producers.itemproducer.ItemProducer;
import nl.heretichammer.draculareignofterrorremake.producers.itemproducer.ItemProducer.Model;

public class ItemProducerDataFactory extends AbstractDataFactory<ItemProducer.Model> {

	public static final ItemProducerDataFactory instance = new ItemProducerDataFactory();
	
	@Override
	public Model fromFile(String name) {
		return get(String.format("data/producers/itemproducers/%s.json", name), ItemProducer.Model.class);
	}
}

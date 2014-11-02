package nl.heretichammer.draculareignofterrorremake.models.producers.itemproducer;

import nl.heretichammer.draculareignofterrorremake.models.items.Item;
import nl.heretichammer.draculareignofterrorremake.models.items.ItemFactory;
import nl.heretichammer.draculareignofterrorremake.models.producers.AbstractProducer;
import nl.heretichammer.draculareignofterrorremake.models.producers.Producer;

public class ItemProducer extends AbstractProducer<Item, ItemProducer.ItemProducerData> {

	public ItemProducer(ItemProducerData data) {
		super(data);
	}
	
	public Item.ItemDescriptor getProducesData(){
		return data.produces;
	}

	public static class ItemProducerData extends Producer.ProducerData {
		public Item.ItemDescriptor produces;
	}

	@Override
	protected void produce() {
		produced = ItemFactory.create(data.produces);
	}
}

package nl.heretichammer.draculareignofterrorremake.producers.itemproducer;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.ItemFactory;
import nl.heretichammer.draculareignofterrorremake.producers.AbstractProducer;
import nl.heretichammer.draculareignofterrorremake.producers.Producer;

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

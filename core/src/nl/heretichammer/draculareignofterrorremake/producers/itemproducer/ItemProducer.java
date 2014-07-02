package nl.heretichammer.draculareignofterrorremake.producers.itemproducer;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.ItemFactory;
import nl.heretichammer.draculareignofterrorremake.producers.AbstractProducer;

public class ItemProducer extends AbstractProducer<Item, ItemProducer.Model> {

	public ItemProducer(Model model) {
		super(model);
	}

	public static class Model extends AbstractProducer.Model {
		public Item.Descriptor produces;
	}

	@Override
	protected void produce() {
		produced = ItemFactory.create(model.produces);
	}
}

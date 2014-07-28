package nl.heretichammer.draculareignofterrorremake.producers.itemproducer;

import java.util.List;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.producers.ProducerManager;
import nl.heretichammer.draculareignofterrorremake.utils.Consumable;
import nl.heretichammer.draculareignofterrorremake.utils.Consumer;

public class ItemProducerManager extends ProducerManager<ItemProducer> implements Consumable<Consumer<Item>> {
	public final ItemProducer goldProducer;
	public final ItemProducer woodProducer;
	public final ItemProducer foodProducer;
	public final ItemProducer menProducer;
	
	public ItemProducerManager() {
		producers.add( goldProducer = ItemProducerFactory.create("gold") );
		producers.add( woodProducer = ItemProducerFactory.create("wood") );
		producers.add( foodProducer = ItemProducerFactory.create("food") );
		producers.add( menProducer = ItemProducerFactory.create("men") );
	}

	public ItemProducer findProducerByProducesDataName(String name) {
		for(ItemProducer producer : (List<ItemProducer>)producers) {
			if(producer.getProducesData().name.equals(name)) {
				return producer;
			}
		}
		return null;
	}
	
	@Override
	public void setConsumer(Consumer<Item> consumer) {
		for(ItemProducer producer : producers) {
			producer.setConsumer(consumer);
		}
	}
}

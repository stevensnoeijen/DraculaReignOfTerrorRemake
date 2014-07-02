package nl.heretichammer.draculareignofterrorremake.producers.itemproducer;

import nl.heretichammer.draculareignofterrorremake.Consumable;
import nl.heretichammer.draculareignofterrorremake.Consumer;
import nl.heretichammer.draculareignofterrorremake.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;

public class ItemProducerManager implements Teamable, Consumable<Consumer<Item>>, ItemSuppliable {

	private Team team;
	
	public final ItemProducer goldProducer;
	public final ItemProducer woodProducer;
	public final ItemProducer foodProducer;
	public final ItemProducer menProducer;
	
	public ItemProducerManager() {
		goldProducer = ItemProducerFactory.create("gold");
		woodProducer = ItemProducerFactory.create("wood");
		foodProducer = ItemProducerFactory.create("food");
		menProducer = ItemProducerFactory.create("men");
	}

	@Override
	public void setTeam(Team team) {
		this.team = team;
		goldProducer.setTeam(team);
		woodProducer.setTeam(team);
		foodProducer.setTeam(team);
		menProducer.setTeam(team);
	}

	@Override
	public Team getTeam() {
		return team;
	}

	@Override
	public void setItemSupplier(ItemSupplier itemSupplier) {
		goldProducer.setItemSupplier(itemSupplier);
		woodProducer.setItemSupplier(itemSupplier);
		foodProducer.setItemSupplier(itemSupplier);
		menProducer.setItemSupplier(itemSupplier);
	}

	@Override
	public void setConsumer(Consumer<Item> consumer) {
		goldProducer.setConsumer(consumer);
		woodProducer.setConsumer(consumer);
		foodProducer.setConsumer(consumer);
		menProducer.setConsumer(consumer);
	}
}

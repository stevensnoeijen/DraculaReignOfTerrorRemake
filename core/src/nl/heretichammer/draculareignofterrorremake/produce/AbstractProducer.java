package nl.heretichammer.draculareignofterrorremake.produce;

import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.items.Item;

public abstract class AbstractProducer<E,M extends AbstractProducer.Model> implements Producer<E> {
	protected M model;	
	protected ItemSupplier itemSupplier;
	protected Producer.Consumer<E> consumer;
	protected E produced;
	protected Team team;
	
	public AbstractProducer(M model) {
		this.model = model;
	}
	
	@Override
	public void setTeam(Team team) {
		this.team = team;
	}
	
	@Override
	public Item.Descriptor[] getCost() {
		return model.cost;
	}

	@Override
	public void setItemSupplier(ItemSupplier itemSupplier) {
		this.itemSupplier = itemSupplier;
	}

	@Override
	public void setConsumer(Producer.Consumer<E> consumer) {
		this.consumer = consumer;
	}

	@Override
	public E remove() {
		return produced;
	}
	
	@Override
	public boolean isStoppable() {
		return model.stoppable;
	}

	/**
	 * Object that will produced.
	 * Set to {@link #produced}.
	 * @return
	 */
	protected abstract void produce();
	
	/**
	 * Calls {@link #produce()} and moves the {@link #produced} to {@link #consumer} (is there's one).
	 */
	protected void handleProduct(){
		produce();
		if(consumer != null){//if theres a consumer, let it consume and remove it from the producer.
			consumer.consume(produced);
			produced = null;
		}
	}
	
	public static class Model {
		public boolean stoppable = true;
		public Item.Descriptor[] cost;
	}
}

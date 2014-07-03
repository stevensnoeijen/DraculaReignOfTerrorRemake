package nl.heretichammer.draculareignofterrorremake.producers;

import java.lang.reflect.Array;
import java.util.Collections;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import nl.heretichammer.draculareignofterrorremake.Consumer;
import nl.heretichammer.draculareignofterrorremake.DRoTR;
import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.tbs.TBSTime;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.items.Item;

public abstract class AbstractProducer<E,M extends AbstractProducer.Model> implements Producer<E> {
	
	protected M model;	
	protected ItemSupplier itemSupplier;
	protected Consumer<E> consumer;
	protected E produced;
	protected Team team;
	private boolean started;
	private boolean done;
	
	public AbstractProducer(M model) {
		this.model = model;
	}
	
	@Override
	public void setTeam(Team team) {
		this.team = team;
	}
	
	@Override
	public Team getTeam() {
		return team;
	}
	
	@Override
	public Item.ItemDescriptor[] getCost() {
		return model.cost;
	}

	@Override
	public void setItemSupplier(ItemSupplier itemSupplier) {
		this.itemSupplier = itemSupplier;
	}

	@Override
	public void setConsumer(Consumer<E> consumer) {
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
		public String accessName;
		public boolean stoppable = true;
		public Item.ItemDescriptor[] cost;
		public int turnCost;
	}

	@Override
	public boolean isAccessable() {
		if(StringUtils.isEmpty(model.accessName)) {//if no accessName it is accessable
			return true;
		}
		
		if(getTeam() != null) {
			return getTeam().accessManager.isAccessable(model.accessName);
		}else {
			return false;
		}
	}
	
	@Override
	public boolean isStartable() {
		return isAccessable();
	}
	
	/**
	 * 
	 * @return if payed
	 */
	private boolean pay() {
		return !ArrayUtils.isEmpty(itemSupplier.removeItems(model.cost));//if all items are removed is the array not empty
	}
	
	@Override
	public void start() {
		boolean payed = pay();
		if(payed) {//if paid
			started = true;
			DRoTR.tbs.time.schedule(new TBSTime.Task(model.turnCost) {
				@Override
				public void turn() {
					
				}
				
				@Override
				public void done() {
					done = true;
				}
			});
		}
	}
	
	@Override
	public void stop() {
		if(isStartable()) {
			started = false;
		}
	}
	
	@Override
	public boolean isStarted() {
		return started;
	}
	
	@Override
	public boolean isDone() {
		return done;
	}
}

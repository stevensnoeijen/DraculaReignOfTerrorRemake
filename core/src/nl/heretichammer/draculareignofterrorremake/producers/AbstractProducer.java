package nl.heretichammer.draculareignofterrorremake.producers;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import nl.heretichammer.draculareignofterrorremake.Consumer;
import nl.heretichammer.draculareignofterrorremake.DRoTR;
import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.tbs.TBSTime;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.items.Item;

public abstract class AbstractProducer<P,D extends Producer.ProducerData> implements Producer<P> {
	
	protected D data;	
	protected ItemSupplier itemSupplier;
	protected Consumer<P> consumer;
	protected P produced;
	protected Team team;
	private boolean started;
	private boolean done;
	
	public AbstractProducer(D data) {
		this.data = data;
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
		return data.cost;
	}

	@Override
	public void setItemSupplier(ItemSupplier itemSupplier) {
		this.itemSupplier = itemSupplier;
	}

	@Override
	public void setConsumer(Consumer<P> consumer) {
		this.consumer = consumer;
	}

	@Override
	public P remove() {
		return produced;
	}
	
	@Override
	public boolean isStoppable() {
		return data.stoppable;
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

	@Override
	public boolean isAccessable() {
		if(StringUtils.isEmpty(data.accessName)) {//if no accessName it is accessable
			return true;
		}
		
		if(getTeam() != null) {
			return getTeam().accessManager.isAccessable(data.accessName);
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
		return !ArrayUtils.isEmpty(itemSupplier.removeItems(data.cost));//if all items are removed is the array not empty
	}
	
	@Override
	public void start() {
		boolean payed = pay();
		if(payed) {//if paid
			started = true;
			DRoTR.tbs.time.schedule(new TBSTime.Task(data.turnCost) {
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

package nl.heretichammer.draculareignofterrorremake.producers;

import nl.heretichammer.draculareignofterrorremake.GameObject;
import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.Item.ItemDescriptor;
import nl.heretichammer.draculareignofterrorremake.utils.Consumer;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSupplier;

import org.apache.commons.lang3.ArrayUtils;

public abstract class AbstractProducer<P,D extends Producer.ProducerData> extends GameObject implements Producer<P> {
	
	protected D data;
	
	private boolean started;
	
	protected ItemSupplier itemSupplier;
	protected Consumer<P> consumer;
	protected P produced;
	private int turn = 0;
	private boolean done = false;
	
	public AbstractProducer(D data) {
		this.data = data;
	}
	
	@Override
	public Item.ItemDescriptor[] getCost() {
		return data.cost;
	}
	
	/**
	 * 
	 * @param name of the item
	 * @return {@link ItemDescriptor#amount} or {@link ItemDescriptor#NULL} if the item was not found
	 */
	@Override
	public Item.ItemDescriptor findCost(String name) {
		if(data.cost != null) {
			for(Item.ItemDescriptor item : data.cost) {
				if(item.name.equals(name)) {
					return item;
				}
			}
		}
		return Item.ItemDescriptor.NULL;
	}
	
	public int getTurnCost() {
		return data.turnCost;
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
		return isAccessable(data.accessName);
	}
	
	/**
	 * 
	 * @return if payed
	 */
	private boolean pay() {
		if(data.cost == null) {//its free
			return true;
		}else {
			return !ArrayUtils.isEmpty(itemSupplier.removeItems(data.cost));//if all items are removed is the array not empty
		}
	}
	
	/**
	 * Only is started when the {@link #getCost()} is payed fully.
	 */
	public void start() {
		boolean payed = pay();
		if(payed) {//if paid
			setStarted(true);
		}
	}
	
	public boolean isAutoStart() {
		return data.autoStart;
	}
	
	@Override
	public void turn() {
		if(!started && isAutoStart()) {
			start();
		}		
		if(started) {
			setTurn(turn + 1);
			if(turn >= getTurnCost()) {
				//if done
				handleProduct();
				done();
			}
		}
	}
	
	private void done() {
		setDone(true);
		setStarted(false);
		setTurn(0);
	}
	
	private void setDone(boolean done) {
		boolean oldValue = this.done;
		this.done = done;
		firePropertyChange("done", oldValue, done);
	}
	
	@Override
	public boolean isDone() {
		return done;
	}
	
	@Override
	public boolean isStarted() {
		return started;
	}
	
	private void setStarted(boolean started) {
		boolean oldValue = this.started;
		this.started = started;
		firePropertyChange("started", oldValue, started);
	}
	
	public void setTurn(int turn) {
		int oldValue = this.turn;
		this.turn = turn;
		firePropertyChange("turn", oldValue, turn);
	}
}

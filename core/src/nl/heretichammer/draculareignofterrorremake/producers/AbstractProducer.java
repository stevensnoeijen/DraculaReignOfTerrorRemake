package nl.heretichammer.draculareignofterrorremake.producers;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import nl.heretichammer.draculareignofterrorremake.DRoTR;
import nl.heretichammer.draculareignofterrorremake.tbs.TBSTime;
import nl.heretichammer.draculareignofterrorremake.utils.AbstractTeamableAccessableStartable;
import nl.heretichammer.draculareignofterrorremake.utils.Consumer;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.Item.ItemDescriptor;

public abstract class AbstractProducer<P,D extends Producer.ProducerData> extends AbstractTeamableAccessableStartable implements Producer<P> {
	
	protected D data;	
	protected ItemSupplier itemSupplier;
	protected Consumer<P> consumer;
	protected P produced;
	
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
	 * @return {@link ItemDescriptor#amount} or 0 if the item was not found
	 */
	public int findCost(String name) {
		for(Item.ItemDescriptor item : data.cost) {
			if(item.name.equals(name)) {
				return item.amount;
			}
		}
		return 0;
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
		return !ArrayUtils.isEmpty(itemSupplier.removeItems(data.cost));//if all items are removed is the array not empty
	}
	
	/**
	 * Only is started when the {@link #getCost()} is payed fully.
	 */
	@Override
	public void start() {
		if(isStartable()) {
			boolean payed = pay();
			if(payed) {//if paid
				started = true;
				DRoTR.tbs.time.schedule(new TBSTime.Task(data.turnCost) {
					@Override
					public void turn() {
						
					}
					
					@Override
					public void done() {
						handleProduct();
						done = true;
					}
				});
			}
		}
	}
}

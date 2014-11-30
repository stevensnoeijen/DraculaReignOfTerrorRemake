package nl.heretichammer.draculareignofterrorremake.models.producers;

import nl.heretichammer.draculareignofterrorremake.exceptions.NotAccessableException;
import nl.heretichammer.draculareignofterrorremake.exceptions.NotStartedException;
import nl.heretichammer.draculareignofterrorremake.models.Model;
import nl.heretichammer.draculareignofterrorremake.models.ResourceSupplier;
import nl.heretichammer.draculareignofterrorremake.models.TeamableModel;
import nl.heretichammer.draculareignofterrorremake.models.events.AccessableEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.ProducerCurrentTurnChangedEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.ProducerDoneEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.StartedEvent;

public abstract class AbstractProducer<P> extends Model implements Producer<P> {
	private boolean accessable = false;
	private boolean started;
	protected P produced;
	private int turnCost;
	private int currentTurn = 0;
	private boolean done = false;
	protected ResourceSupplier resourceSupplier;
	
	public AbstractProducer() {
		
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
	}
	
	/**
	 * Only is started when the {@link #getCost()} is payed fully.
	 */
	public void start() {
		if(accessable){
			setStarted(true);
		}else{
			throw new NotAccessableException();
		}
	}
	
	public void week() {		
		if(started) {
			setCurrentTurn(currentTurn + 1);
			if(currentTurn >= getTurnCost()) {
				//if done
				handleProduct();
				done();
			}
		}else{
			if(accessable){
				throw new NotStartedException();
			}else{
				throw new NotAccessableException();
			}
		}
	}
	
	private void done() {
		setDone(true);
		setStarted(false);
		setCurrentTurn(0);
	}
	
	private void setDone(boolean done) {
		this.done = done;
		post(new ProducerDoneEvent<P>(this));
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
		this.started = started;
		post(new StartedEvent());
	}
	
	private void setCurrentTurn(int currentTurn) {
		this.currentTurn = currentTurn;
		post(new ProducerCurrentTurnChangedEvent<P>(this));
	}
	
	@Override
	public int getCurrentTurn() {
		return currentTurn;
	}
	
	public void setResourceSupplier(ResourceSupplier resourceSupplier) {
		this.resourceSupplier = resourceSupplier;
	}
	
	public boolean isAccessable() {
		return accessable;
	};
	
	public void setAccessable(boolean accessable) {
		this.accessable = accessable;
		post(new AccessableEvent());
	};
}

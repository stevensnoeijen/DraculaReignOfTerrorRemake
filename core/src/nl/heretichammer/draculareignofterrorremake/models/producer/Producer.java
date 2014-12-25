package nl.heretichammer.draculareignofterrorremake.models.producer;

import java.beans.PropertyChangeEvent;

import nl.heretichammer.draculareignofterrorremake.exceptions.NotAccessableException;
import nl.heretichammer.draculareignofterrorremake.exceptions.NotStartedException;
import nl.heretichammer.draculareignofterrorremake.models.Model;
import nl.heretichammer.draculareignofterrorremake.models.Resource;
import nl.heretichammer.draculareignofterrorremake.models.ResourceSupplier;
import nl.heretichammer.draculareignofterrorremake.models.events.DoneEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.StartedEvent;

public abstract class Producer<P> extends Model{
	private boolean autoRestart = false;
	private boolean started = false;
	protected P produced;
	protected int timeCost = 0;
	private int time = 0;
	private boolean done = false;
	protected ResourceSupplier resourceSupplier;
	
	public Producer() {
		
	}

	/**
	 * Object that will produced.
	 * Set to {@link #produced}.
	 * @return
	 */
	protected abstract void produce();
	
	/**
	 * Only is started when the {@link #getCost()} is payed fully.
	 */
	public void start() {
		if(isAccessable()){
			setTime(0);
			setStarted(true);
		}else{
			throw new NotAccessableException();
		}
	}
	
	public void restart(){
		if(isDone()){
			setDone(false);
		}
		start();
	}
	
	public void week() {
		if(!started && isAutoRestart()){
			start();
		}		
		if(started) {
			setTime(time + 1);
			if(time >= timeCost) {
				//if done
				produce();
				done();
			}
		}
	}
	
	private void done() {
		setDone(true);
		if(isAutoRestart()){
			restart();
		}else{
			setStarted(false);
		}
	}
	
	protected void setDone(boolean done) {
		this.done = done;
		post(new DoneEvent());
	}
	
	public boolean isDone() {
		return done;
	}
	
	public boolean isStarted() {
		return started;
	}
	
	private void setStarted(boolean started) {
		this.started = started;
		post(new StartedEvent());
	}
	
	private void setTime(int time) {
		int oldtime = this.time;
		this.time = time;
		post(new PropertyChangeEvent(this, "time", oldtime, time));
	}
	
	public int getTime() {
		return time;
	}
	
	public void setResourceSupplier(ResourceSupplier resourceSupplier) {
		this.resourceSupplier = resourceSupplier;
	}
	
	public abstract boolean isAccessable();
	
	public abstract int getCost(Resource resource);

	public boolean canSupplyCost() {
		for(Resource resource : Resource.values()){
			int amount = getCost(resource);
			if(!resourceSupplier.hasResource(resource, amount)){
				return false;
			}
		}
		return true;
	}
	
	public P remove(){
		P produced = this.produced;
		this.produced = null;
		return produced;
	}

	public boolean isAutoRestart() {
		return autoRestart;
	}

	public void setAutoRestart(boolean autoRestart) {
		this.autoRestart = autoRestart;
	}
}

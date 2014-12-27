package nl.heretichammer.draculareignofterrorremake.models.producer;

import java.beans.PropertyChangeEvent;
import java.util.EnumMap;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.exceptions.NotAccessableException;
import nl.heretichammer.draculareignofterrorremake.models.Model;
import nl.heretichammer.draculareignofterrorremake.models.Resource;
import nl.heretichammer.draculareignofterrorremake.models.ResourceSupplier;

public abstract class Producer<P> extends Model{
	private boolean autoRestart = false;
	private boolean started = false;
	protected P produced;
	protected Map<Resource, Integer> cost = new EnumMap<Resource, Integer>(Resource.class);
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
		if(started){
			throw new IllegalStateException("producer is already started");
		}
		if(isAccessable()){
			pay();
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
			if(time >= cost.get(Resource.TIME)) {
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
		post(new PropertyChangeEvent(this, "done", !done, done));
	}
	
	public boolean isDone() {
		return done;
	}
	
	public boolean isStarted() {
		return started;
	}
	
	private void setStarted(boolean started) {
		this.started = started;
		post(new PropertyChangeEvent(this, "started", !started, started));
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
	
	public int getCost(Resource resource){
		return cost.get(resource);
	}

	public boolean canSupplyCost() {
		for(Resource resource : cost.keySet()){
			if(resource != Resource.TIME){//check everything except time
				int amount = getCost(resource);
				if(!resourceSupplier.hasResource(resource, -amount)){
					return false;
				}
			}
		}
		return true;
	}
	
	private void pay() {
		for(Resource resource : cost.keySet()){
			if(resource != Resource.TIME){//all resources except time
				resourceSupplier.decrementResource(resource, cost.get(resource));
			}
		}
	}
	
	public P remove(){
		P produced = this.produced;
		this.produced = null;
		return produced;
	}

	public boolean isAutoRestart() {
		return autoRestart;
	}

	protected void setAutoRestart(boolean autoRestart) {
		this.autoRestart = autoRestart;
	}
}

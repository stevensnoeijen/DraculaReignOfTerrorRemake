package nl.heretichammer.draculareignofterrorremake.models.producer;

import java.beans.PropertyChangeEvent;
import java.util.EnumMap;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.exceptions.NotAccessableException;
import nl.heretichammer.draculareignofterrorremake.models.Model;
import nl.heretichammer.draculareignofterrorremake.models.ResourceSupplier;
import nl.heretichammer.draculareignofterrorremake.models.ResourceType;
import nl.heretichammer.draculareignofterrorremake.models.team.Permission;

public abstract class Producer<P> extends Model{
	private boolean autoRestart = false;
	private boolean started = false;
	protected P produced;
	protected Map<ResourceType, Integer> cost = new EnumMap<ResourceType, Integer>(ResourceType.class);
	private int time = 0;
	private boolean done = false;
	protected ResourceSupplier resourceSupplier;
	
	public Producer() {
		
	}
	
	public abstract String getName();

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
		if(started && !autoRestart){
			throw new IllegalStateException("producer is already started");
		}
		if(isAccessable()){
			pay();
			reset();
			setStarted(true);
		}else{
			throw new NotAccessableException();
		}
	}
	
	private void reset(){
		setTime(0);
	}
	
	public void stop(){
		refund();
		setStarted(false);
		reset();
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
			if(time >= cost.get(ResourceType.TIME)) {
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
	
	protected abstract boolean isAccessable();
	
	public int getCost(ResourceType resource){
		return cost.get(resource);
	}

	public boolean canSupplyCost() {
		for(ResourceType resource : cost.keySet()){
			if(resource != ResourceType.TIME){//check everything except time
				int amount = getCost(resource);
				if(!resourceSupplier.hasResource(resource, -amount)){
					return false;
				}
			}
		}
		return true;
	}
	
	private void pay() {
		for(ResourceType resource : cost.keySet()){
			if(resource != ResourceType.TIME){//all resources except time
				resourceSupplier.decrementResource(resource, cost.get(resource));
			}
		}
	}
	
	private void refund(){
		for(ResourceType resource : cost.keySet()){
			if(resource != ResourceType.TIME){//all resources except time
				resourceSupplier.incrementResource(resource, cost.get(resource));
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
	
	public static class ProducerData {
		public String name;
		public Map<ResourceType, Integer> cost;
		public Permission permission;
	}
}

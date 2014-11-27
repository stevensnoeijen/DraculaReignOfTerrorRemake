package nl.heretichammer.draculareignofterrorremake.models.upgraders;

import java.util.HashMap;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.exceptions.InsufficientResources;
import nl.heretichammer.draculareignofterrorremake.models.Accessible;
import nl.heretichammer.draculareignofterrorremake.models.Resource;
import nl.heretichammer.draculareignofterrorremake.models.ResourceSuppliable;
import nl.heretichammer.draculareignofterrorremake.models.ResourceSupplier;
import nl.heretichammer.draculareignofterrorremake.models.TeamableModel;
import nl.heretichammer.draculareignofterrorremake.models.events.AccessableEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.CurrentTurnChangedEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.EndedEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.StartedEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.UpgradeDoneEvent;
import nl.heretichammer.draculareignofterrorremake.models.team.Teamable;

public abstract class Upgrade extends TeamableModel implements ResourceSuppliable, Teamable {
	private int level;
	private boolean started = false;
	private boolean done = false;
	private int currentTurn = 0;
	
	private Map<Resource, Integer> cost;
	
	public Upgrade() {
		cost = new HashMap<Resource, Integer>();
	}
	
	public abstract int getLevel();
	
	public boolean canPay() {
		return resourceSupplier.canSupply(getGoldCost(), getWoodCost(), getFoodCost());
	}

	

	/**
	 * @throws InsufficientResources
	 */
	private void pay() {
		resourceSupplier.removeSupplies(getGoldCost(), getWoodCost(), getFoodCost());
	}
	
	private void refund(){
		resourceSupplier.addSupplies(getGoldCost(), getWoodCost(), getFoodCost());
	}
	
	protected abstract void upgrade();
	
	public boolean isStarted(){
		return started;
	}
	
	/**
	 * @throws InsufficientResources when {@link #pay()} fails
	 */
	public void start() {
		pay();
		setStarted(true);
		if(getWeekCost() == 0) {
			upgrade();
			done();
		}
	}
	
	public void stop(){
		refund();
		setCurrentTurn(0);
		setStarted(false);
	}

	private void setStarted(boolean started){
		this.started = started;
		if(started){
			post(new StartedEvent());
		}else{
			post(new EndedEvent());
		}
	}
	
	/**
	 * Called when upgrade is done.
	 * Sets {@link AccessManager#putAccessable(String, int)} level of upgrade #done to true
	 */
	protected void done() {
		started = false;
		setDone(true);
	}
	
	private void setDone(boolean done) {
		this.done = done;
		post(new UpgradeDoneEvent());
	}
	
	public boolean isDone() {
		return done;
	}
	
	public void week() {
		if(started) {
			setCurrentTurn(getCurrentTurn() + 1);
			if(currentTurn >= getWeekCost()) {
				//is done
				upgrade();
				done();
			}
		}
	}
	
	public int getCurrentTurn() {
		return currentTurn;
	}
	
	private void setCurrentTurn(int currentTurn){
		if(currentTurn < 0){
			throw new IllegalArgumentException();
		}
		this.currentTurn = currentTurn;
		post(new CurrentTurnChangedEvent());
	}
	
	@Override
	public void setResourceSupplier(ResourceSupplier resourceSupplier) {
		this.resourceSupplier = resourceSupplier;	
	}
}

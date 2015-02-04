package nl.heretichammer.draculareignofterrorremake.models.upgraders;

import java.beans.PropertyChangeEvent;
import java.lang.reflect.Method;
import java.util.Collections;
import java.util.EnumMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

import nl.heretichammer.draculareignofterrorremake.exceptions.InsufficientResourcesException;
import nl.heretichammer.draculareignofterrorremake.models.Model;
import nl.heretichammer.draculareignofterrorremake.models.ResourceCost;
import nl.heretichammer.draculareignofterrorremake.models.ResourceSuppliable;
import nl.heretichammer.draculareignofterrorremake.models.ResourceSupplier;
import nl.heretichammer.draculareignofterrorremake.models.ResourceType;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;

public abstract class Upgrader extends Model implements ResourceSuppliable {	
	private ResourceSupplier resourceSupplier;
	private Queue<UpgradeMethod> upgrades;
	private boolean started = false;
	protected Team team;
	private UpgradeMethod current;
	
	@SuppressWarnings("unchecked")
	public Upgrader() {
		upgrades = new LinkedList<UpgradeMethod>();
		for(Method method : this.getClass().getDeclaredMethods()){
			if(method.isAnnotationPresent(Upgrade.class)){
				UpgradeMethod updateMethod = new UpgradeMethod(method);
				upgrades.add(updateMethod);
			}
		}
		Collections.sort((List<UpgradeMethod>)upgrades);
		current = upgrades.poll();//always get first level
	}
	
	public void setTeam(Team team) {
		this.team = team;
	}
	
	public abstract String getName();
	
	public UpgradeMethod getCurrent(){
		return current;
	}
	
	public boolean hasNext(){
		return !upgrades.isEmpty();
	}
	
	public UpgradeMethod getNext(){
		return upgrades.peek();
	}
	
	public void setLevel(int level) {
		UpgradeMethod old = upgrades.peek();
		//remove levels before
		while(upgrades.peek().getLevel() <= level){
			current = upgrades.remove();
		}
		post(new PropertyChangeEvent(this, "current", old, current));
	}
	
	public boolean isStarted(){
		return started;
	}

	public void week() {
		if(started){
			UpgradeMethod current = upgrades.peek();
			current.week();
		}
	}
	
	public abstract int getMaxLevel();
	
	@Override
	public String toString() {
		return getName();
	}
	
	@Override
	public void setResourceSupplier(ResourceSupplier resourceSupplier) {
		this.resourceSupplier = resourceSupplier;
	}
	
	private void next(){
		UpgradeMethod old = current;
		current = upgrades.poll();
		post(new PropertyChangeEvent(this, "current", old, current));
		if(!upgrades.isEmpty()){//has next
			post(new PropertyChangeEvent(this, "next", current, upgrades.peek()));
		}
	}
	
	public class UpgradeMethod implements Comparable<UpgradeMethod> {
		private Upgrade upgrade;
		private Method method;
		/**
		 * All costs except {@link Resource#TIME}
		 */
		private Map<ResourceType, Integer> cost;
		private int time = 0;
		
		private UpgradeMethod(Method method) {
			this.method = method;
			upgrade = method.getAnnotation(Upgrade.class);			
			cost = new EnumMap<ResourceType, Integer>(ResourceType.class);
			ResourceCost cost = upgrade.cost();
			this.cost.put(ResourceType.GOLD, cost.gold());
			this.cost.put(ResourceType.TIME, cost.time());
			this.cost.put(ResourceType.FOOD, cost.food());
			this.cost.put(ResourceType.WOOD, cost.wood());
		}
		
		public int getCost(ResourceType resource){
			return this.cost.get(resource);
		}
		
		public boolean canPay(){
			for(ResourceType resource : cost.keySet()){
				if(resource != ResourceType.TIME){
					if(!resourceSupplier.hasResource(resource, cost.get(resource))){
						return false;
					}
				}
			}
			return true;
		}
		
		public boolean isStarted(){
			return started;
		}
		
		public void start(){
			pay();
			started = true;
			post(new PropertyChangeEvent(Upgrader.this, "started", false, true));
		}
		
		private void pay(){
			if(canPay()){
				for(ResourceType resource : cost.keySet()){
					if(resource != ResourceType.TIME){
						resourceSupplier.decrementResource(resource, cost.get(resource));
					}
				}
			}else{
				throw new InsufficientResourcesException();
			}
		}
		
		private void refund(){
			for(ResourceType resource : cost.keySet()){
				int amount = cost.get(resource);
				if(resource != ResourceType.TIME && amount > 0){
					resourceSupplier.incrementResource(resource, amount);
				}
			}
		}
		
		private void setTime(int time){
			int oldTime = this.time;
			this.time = time;
			post(new PropertyChangeEvent(Upgrader.this, "time", oldTime, time));
		}
		
		public void cancel(){
			if(isStarted()){
				refund();
				setTime(0);
				started = false;
				post(new PropertyChangeEvent(Upgrader.this, "cancelled", false, true));
			}
		}
		
		protected void week(){
			setTime(time+1);
			if(cost.get(ResourceType.TIME) == time){
				done();
			}
		}
		
		private void done(){
			try {
				method.invoke(Upgrader.this);
				started = false;
				if(hasNext()){
					next();
				}
				post(new PropertyChangeEvent(Upgrader.this, "done", false, true));
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		
		public int getLevel(){
			return upgrade.level();
		}
		
		public String getImage(){
			return upgrade.image();
		}
		
		@Override
		public int compareTo(UpgradeMethod other) {
			return Integer.compare(this.upgrade.level(), other.upgrade.level());
		}
	}
}

package nl.heretichammer.draculareignofterrorremake.models.upgraders;

import java.util.Queue;

import nl.heretichammer.draculareignofterrorremake.models.TeamableModel;
import nl.heretichammer.draculareignofterrorremake.models.team.Teamable;

public abstract class Upgrader<T extends Upgrade> extends TeamableModel implements Teamable {
	private Queue<T> upgrades;
	protected boolean done = false;
	
	public abstract String getName();
	
	protected void addUpgrade(T upgrade){
		upgrade.setTeam(getTeam());	
		upgrades.add(upgrade);
	}

	public boolean isDone() {
		return done;
	}

	public void week() {
		if(!upgrades.isEmpty()){
			T currentUpgrade = upgrades.peek();
			if(currentUpgrade.isStarted()) {
				currentUpgrade.week();
			}
		}
	}
	
	public abstract int getMaxLevel();
	
	@Override
	public String toString() {
		return getName();
	}
}
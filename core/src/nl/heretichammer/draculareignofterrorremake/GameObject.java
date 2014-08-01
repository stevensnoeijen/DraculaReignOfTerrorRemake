package nl.heretichammer.draculareignofterrorremake;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import nl.heretichammer.draculareignofterrorremake.tbs.Turnable;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.team.access.Accessible;

import com.google.common.collect.LinkedListMultimap;
import com.google.common.collect.Multimap;

public abstract class GameObject implements Teamable, Turnable, Accessible {
	
	private Team team = Team.NEUTRAL;
	private Multimap<String, PropertyChangeListener> listeners = LinkedListMultimap.create();
	
	public void addPropertyChangeListener(PropertyChangeListener listener) {
		listeners.put(null, listener);
	}
	
	public void addPropertyChangeListener(String propertyName, PropertyChangeListener listener) {
		listeners.put(propertyName, listener);
	}
	
	public void removePropertyChangeListeners(String propertyName) {
		listeners.removeAll(propertyName);
	}
	
	protected void firePropertyChange(String propertyName, Object oldValue, Object newValue) {
		PropertyChangeEvent event = new PropertyChangeEvent(null, propertyName, oldValue, newValue);
		//fist call listeners with propertyName
		if( listeners.containsKey(propertyName) ) {
			for(PropertyChangeListener propertyChangeListener : listeners.get(propertyName)) {
				propertyChangeListener.propertyChange(event);
			}
		}
		//then call listeners with no propertyName (null)
		for(PropertyChangeListener propertyChangeListener : listeners.get(null)) {
			propertyChangeListener.propertyChange(event);
		}
	}
	
	protected void firePropertyChange(String propertyName, boolean oldValue, boolean newValue) {
		firePropertyChange(propertyName, Boolean.valueOf(oldValue), Boolean.valueOf(newValue));
	}
	
	protected void firePropertyChange(String propertyName, int oldValue, int newValue) {
		firePropertyChange(propertyName, Integer.valueOf(oldValue), Integer.valueOf(newValue));
	}
	
	protected void firePropertyChange(String propertyName, byte oldValue, byte newValue) {
		firePropertyChange(propertyName, Byte.valueOf(oldValue), Byte.valueOf(newValue));
	}
	
	protected void firePropertyChange(String propertyName, char oldValue, char newValue) {
		firePropertyChange(propertyName, Character.valueOf(oldValue), Character.valueOf(newValue));
	}
	
	protected void firePropertyChange(String propertyName, short oldValue, short newValue) {
		firePropertyChange(propertyName, Short.valueOf(oldValue), Short.valueOf(newValue));
	}
	
	protected void firePropertyChange(String propertyName, long oldValue, long newValue) {
		firePropertyChange(propertyName, Long.valueOf(oldValue), Long.valueOf(newValue));
	}
	
	protected void firePropertyChange(String propertyName, float oldValue, float newValue) {
		firePropertyChange(propertyName, Float.valueOf(oldValue), Float.valueOf(newValue));
	}
	
	protected void firePropertyChange(String propertyName, double oldValue, double newValue) {
		firePropertyChange(propertyName, Double.valueOf(oldValue), Double.valueOf(newValue));
	}

	@Override
	public void setTeam(Team team) {
		if(team == null) {
			throw new IllegalArgumentException();
		}
		this.team = team;
	}

	@Override
	public Team getTeam() {
		return team;
	}
	
	@Override
	public void turn() {}
	
	public boolean isAccessable(String accessName) {
		return team.accessManager.isAccessable(accessName);
	}
}

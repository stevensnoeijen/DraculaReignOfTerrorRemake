package nl.heretichammer.draculareignofterrorremake.models;

import com.google.common.eventbus.EventBus;

public class Model {
	private final EventBus eventbus = new EventBus();
	
	public void register(Object listener){//TODO: make this an empty interface
		eventbus.register(listener);
	}
	
	public void unregister(Object listener){
		eventbus.unregister(listener);
	}
	
	protected void post(Object event){//TODO: make poolable
		eventbus.post(event);
	}
}

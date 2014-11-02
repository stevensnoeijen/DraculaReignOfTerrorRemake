package nl.heretichammer.draculareignofterrorremake.models;

import com.google.common.eventbus.EventBus;

public class Model {
	private final EventBus eventbus = new EventBus();
	
	public void register(Object listener){
		eventbus.register(listener);
	}
	
	public void unregister(Object listener){
		eventbus.unregister(listener);
	}
	
	protected void post(Object event){
		eventbus.post(event);
	}
}

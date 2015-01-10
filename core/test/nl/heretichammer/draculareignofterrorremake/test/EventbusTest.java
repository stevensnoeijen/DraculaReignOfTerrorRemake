package nl.heretichammer.draculareignofterrorremake.test;

import static org.junit.Assert.*;
import nl.heretichammer.draculareignofterrorremake.eventbus.Eventbus;
import nl.heretichammer.draculareignofterrorremake.eventbus.PropertyChangeEvent;
import nl.heretichammer.draculareignofterrorremake.eventbus.Subscribe;
import nl.heretichammer.draculareignofterrorremake.eventbus.Subscriber;

import org.junit.Before;
import org.junit.Test;

public class EventbusTest {
	boolean called;
	
	@Before
	public void init(){
		called = false;
	}
	
	@Test
	public void registerTest() {
		Eventbus eventbus = new Eventbus();
		eventbus.register(new Subscriber() {
			@Subscribe
			public void on(PropertyChangeEvent e){
				called = true;
			}
		});
		eventbus.post(new PropertyChangeEvent("me", "name", "steven", "stevo"));
		assertTrue(called);
	}
	
	@Test
	public void unregisterTest() {
		 
	}

	@Test
	public void postTest() {
		
	}
}

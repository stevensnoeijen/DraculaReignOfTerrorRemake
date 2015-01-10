package nl.heretichammer.draculareignofterrorremake.test;

import static org.junit.Assert.*;
import nl.heretichammer.draculareignofterrorremake.eventbus.CollectionPropertyChangeEvent;
import nl.heretichammer.draculareignofterrorremake.eventbus.CollectionPropertyChangeEvent.Action;
import nl.heretichammer.draculareignofterrorremake.eventbus.Eventbus;
import nl.heretichammer.draculareignofterrorremake.eventbus.PropertyChangeEvent;
import nl.heretichammer.draculareignofterrorremake.eventbus.Subscribe;
import nl.heretichammer.draculareignofterrorremake.eventbus.Subscribe;
import nl.heretichammer.draculareignofterrorremake.eventbus.Subscriber;

import org.junit.Before;
import org.junit.Test;

public class EventbusTest {
	boolean called, called2, called3;
	
	@Before
	public void reset(){
		called = false;
		called2 = false;
		called3 = false;
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
	public void subscribeFilterTest() {
		Eventbus eventbus = new Eventbus();
		eventbus.register(new Subscriber() {
			@Subscribe(filter="color")
			public void on(PropertyChangeEvent e){
				called = true;
			}
		});
		eventbus.post(new PropertyChangeEvent("me", "name", "steven", "stevo"));
		assertFalse(called);
		eventbus.post(new PropertyChangeEvent("me", "color", "steven", "stevo"));
		assertTrue(called);
	}
	
	@Test
	public void unregisterTest() {
		Eventbus eventbus = new Eventbus();
		Subscriber subscriber;
		eventbus.register(subscriber = new Subscriber() {
			@Subscribe
			public void on(PropertyChangeEvent e){
				called = true;
			}
		});
		eventbus.unregister(subscriber);
		eventbus.post(new PropertyChangeEvent("me", "name", "steven", "stevo"));
		assertFalse(called);//should not be changed
	}
	
	@Test
	public void postCollectionPropertyTest(){
		Eventbus eventbus = new Eventbus();
		eventbus.register(new Subscriber() {
			@Subscribe
			public void on(CollectionPropertyChangeEvent e){
				called = true;
			}
			
			@Subscribe(filter="names:add")
			public void on3(CollectionPropertyChangeEvent e){
				called2 = true;
			}
		});
		eventbus.post(new CollectionPropertyChangeEvent("me", "names", Action.ADD));
		assertTrue(called);
		assertTrue(called2);
		reset();
		eventbus.post(new CollectionPropertyChangeEvent("me", "names", Action.REMOVE));
		assertTrue(called);
		assertFalse(called2);
	}
}

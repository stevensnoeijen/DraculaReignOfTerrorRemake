package nl.heretichammer.draculareignofterrorremake.eventbus;

public class Eventbus {
	
	private final SubscriberRegistry subscriberRegistry = new SubscriberRegistry();
	
	public void register(Subscriber subscriber){
		subscriberRegistry.register(subscriber);
	}
	
	public void unregister(Subscriber subscriber){
		subscriberRegistry.unregister(subscriber);
	}
	
	public void post(Event event){
		for(SubscribeMethod subscribeMethod : subscriberRegistry.getSubscribeMethod(event.getClass())){
			subscribeMethod.invoke(event);
		}
	}
}

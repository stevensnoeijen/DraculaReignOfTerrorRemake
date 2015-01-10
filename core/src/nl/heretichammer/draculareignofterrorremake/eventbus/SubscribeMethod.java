package nl.heretichammer.draculareignofterrorremake.eventbus;

import java.lang.reflect.Method;

public class SubscribeMethod {
	private final Subscriber subscriber;
	private final Method method;
	
	public SubscribeMethod(Subscriber subscriber, Method method) {
		this.subscriber = subscriber;
		this.method = method;
	}
	
	public void invoke(Event event){
		try {
			method.setAccessible(true);
			method.invoke(subscriber, event);
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
	}
}

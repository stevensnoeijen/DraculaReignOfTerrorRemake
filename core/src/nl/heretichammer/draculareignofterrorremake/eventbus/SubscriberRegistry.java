package nl.heretichammer.draculareignofterrorremake.eventbus;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SubscriberRegistry {
	
	private final Map<Class<? extends Event>, List<SubscribeMethod>> subscribers = Collections.synchronizedMap(new HashMap<Class<? extends Event>, List<SubscribeMethod>>());
	
	private Map<Class<? extends Event>, List<SubscribeMethod>> getSubscribers(Subscriber subscriber){
		Map<Class<? extends Event>, List<SubscribeMethod>> subscribers = new HashMap<Class<? extends Event>, List<SubscribeMethod>>();
		Class<? extends Subscriber> clazz = subscriber.getClass();
		for(Method method : clazz.getMethods()){
			if(method.isAnnotationPresent(Subscribe.class)){
				Subscribe subscribe = method.getAnnotation(Subscribe.class);
				if(method.getParameterCount() == 1){
					Class<? extends Event> parameterType = (Class<? extends Event>) method.getParameterTypes()[0];
					if(!subscribers.containsKey(parameterType)){//create list for events if it not exist
						subscribers.put(parameterType, new ArrayList<SubscribeMethod>());
					}					
					SubscribeMethod subscriberMethod = new SubscribeMethod(subscriber, method);
					subscribers.get(parameterType).add(subscriberMethod);
				}else{
					throw new UnsupportedOperationException();
				}
			}
		}
		return subscribers;
	}
	
	public void register(Subscriber subscriber){
		for(Map.Entry<Class<? extends Event>, List<SubscribeMethod>> eventSubscribers : getSubscribers(subscriber).entrySet()){//per subscribe method
			Class<? extends Event> eventType = eventSubscribers.getKey();
			if(!this.subscribers.containsKey(eventType)){//create list for events if it not exist
				this.subscribers.put(eventType, new ArrayList<SubscribeMethod>());
			}
			this.subscribers.get(eventType).addAll( eventSubscribers.getValue() );//add all methods to subscribers
		}
		
	}
	
	public void unregister(Subscriber subscriber){
		throw new UnsupportedOperationException();
	}
	
	Iterable<SubscribeMethod> getSubscribeMethod(Class<? extends Event> eventType){
		if(subscribers.containsKey(eventType)){
			return subscribers.get(eventType);
		}else{
			return Collections.emptySet();
		}
	}
}

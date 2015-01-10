package nl.heretichammer.draculareignofterrorremake.eventbus;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class SubscriberRegistry {
	private final Map<Class<? extends Event>, List<SubscribeMethod>> subscribers = Collections.synchronizedMap(new HashMap<Class<? extends Event>, List<SubscribeMethod>>());
	
	private Map<Class<? extends Event>, List<SubscribeMethod>> getSubscribeMethods(Subscriber subscriber){
		Map<Class<? extends Event>, List<SubscribeMethod>> subscribers = new HashMap<Class<? extends Event>, List<SubscribeMethod>>();
		Class<? extends Subscriber> clazz = subscriber.getClass();
		for(Method method : clazz.getMethods()){
			if(method.isAnnotationPresent(Subscribe.class)){
				if(method.getParameterCount() == 1){
					SubscribeMethod subscriberMethod = new SubscribeMethod(subscriber, method);
					Class<? extends Event> eventType = subscriberMethod.getEventType();
					
					if(!subscribers.containsKey(eventType)){//create list for events if it not exist
						subscribers.put(eventType, Collections.synchronizedList( new ArrayList<SubscribeMethod>()) );
					}
					subscribers.get(eventType).add(subscriberMethod);
				}else{
					throw new UnsupportedOperationException();
				}
			}
		}
		return subscribers;
	}
	
	public void register(Subscriber subscriber){
		for(Map.Entry<Class<? extends Event>, List<SubscribeMethod>> eventSubscribers : getSubscribeMethods(subscriber).entrySet()){//per subscribe method
			Class<? extends Event> eventType = eventSubscribers.getKey();
			if(!this.subscribers.containsKey(eventType)){//create list for events if it not exist
				this.subscribers.put(eventType, new ArrayList<SubscribeMethod>());
			}
			this.subscribers.get(eventType).addAll( eventSubscribers.getValue() );//add all methods to subscribers
		}
		
	}
	
	public void unregister(Subscriber subscriber){
		for(Method method : subscriber.getClass().getMethods()){//go through every method
			method.setAccessible(true);
			if(method.isAnnotationPresent(Subscribe.class)){//that has subscribe annotation
				@SuppressWarnings("unchecked")
				Class<? extends Event> eventType = (Class<? extends Event>) method.getParameterTypes()[0];//get first param, which must be the event
				List<SubscribeMethod> subscribeMethods = subscribers.get(eventType);//get subscribemethods of the event-type
				for (Iterator<SubscribeMethod> iterator = subscribeMethods.iterator(); iterator.hasNext();) {//search trough the subscribemethods
					SubscribeMethod subscribeMethod = iterator.next();
					if(subscribeMethod.getSubscriber() == subscriber){
						iterator.remove();//remove if this subscrivemethod is from the subscriber
					}
				}
			}
		}
	}
	
	Iterable<SubscribeMethod> getSubscribeMethod(Class<? extends Event> eventType){
		if(subscribers.containsKey(eventType)){
			return subscribers.get(eventType);
		}else{
			return Collections.emptySet();
		}
	}
}

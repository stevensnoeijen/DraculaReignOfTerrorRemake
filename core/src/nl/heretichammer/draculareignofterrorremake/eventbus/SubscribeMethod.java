package nl.heretichammer.draculareignofterrorremake.eventbus;

import java.lang.reflect.Method;

public class SubscribeMethod {
	private final Subscriber subscriber;
	private final Method method;
	private final Subscribe subscribe;
	private final Filter<Event> filter;
	
	public SubscribeMethod(Subscriber subscriber, Method method) {
		this.subscriber = subscriber;
		this.method = method;
		this.subscribe = method.getAnnotation(Subscribe.class);
		
		Class<? extends Event> eventType = (Class<? extends Event>) method.getParameterTypes()[0];
		if(eventType.isAnnotationPresent(Filterable.class)){
			try {
				filter = (Filter<Event>) eventType.getAnnotation(Filterable.class).value().newInstance();
			} catch (Exception ex) {
				throw new RuntimeException(ex);
			}
		}else{
			filter = Filter.NULL;
		}
	}
	
	/**
	 * Check if event 
	 * @param event
	 * @return
	 */
	private boolean shouldInvoke(Event event){
		String filter = subscribe.filter();
		if(filter.isEmpty()){
			return true;
		}else{
			return this.filter.allow(event, filter);
		}
	}
	
	public void invoke(Event event){
		if(shouldInvoke(event)){
			try {
				method.setAccessible(true);
				method.invoke(subscriber, event);
			} catch (Exception ex) {
				throw new RuntimeException(ex);
			}
		}
	}
}

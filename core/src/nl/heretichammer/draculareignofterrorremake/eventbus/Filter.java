package nl.heretichammer.draculareignofterrorremake.eventbus;

public interface Filter<T extends Event> {
	public boolean allow(T event, String filter);
	
	public static Filter<Event> NULL = new Filter<Event>() {
		@Override
		public boolean allow(Event event, String filter) {
			return true;
		}		
	};
}
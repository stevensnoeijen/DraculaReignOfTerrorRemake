package nl.heretichammer.draculareignofterrorremake.eventbus;

@Filterable(PropertyChangeEvent.PropertyChangeEventFilter.class)
public class PropertyChangeEvent implements Event {
	private Object source;
	private String propertyName;
	private Object oldValue, newValue;

	public PropertyChangeEvent(Object source, String propertyName, Object oldValue, Object newValue) {
		this.source = source;
		this.propertyName = propertyName;
		this.oldValue = oldValue;
		this.newValue = newValue;
	}

	public Object getSource() {
		return source;
	}

	public String getPropertyName() {
		return propertyName;
	}
	
	public Object getOldValue() {
		return oldValue;
	}
	
	public Object getNewValue() {
		return newValue;
	}
	
	public final static class PropertyChangeEventFilter implements Filter<PropertyChangeEvent> {
		@Override
		public boolean allow(PropertyChangeEvent event, String filter) {
			return filter.contains(event.propertyName);
		}
	}
}

package nl.heretichammer.draculareignofterrorremake.eventbus;

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

	@Override
	public Object getSource() {
		return source;
	}

	public String getPropertyName() {
		return propertyName;
	}
	
	public <T> T getOldValue(Class<T> type) {
		return (T)oldValue;
	}
	
	public <T> T getNewValue(Class<T> type) {
		return (T)newValue;
	}
	
	@Override
	public void reset() {
		this.source = null;
		this.propertyName = null;
		this.oldValue = null;
		this.newValue = null;
	}
}

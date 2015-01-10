package nl.heretichammer.draculareignofterrorremake.eventbus;

@Filterable(CollectionPropertyChangeEvent.CollectionPropertyChangeEventFilter.class)
public class CollectionPropertyChangeEvent implements Event {
	private Object source;
	private String propertyName;
	private Action action;
	private Object element;
	private int index;	
	
	public CollectionPropertyChangeEvent(Object source, String propertyName, Action action, Object element, int index) {
		this.source = source;
		this.propertyName = propertyName;
		if(action == null){
			throw new IllegalArgumentException("action can not be null");
		}
		this.action = action;
		this.element = element;
		this.index = index;
	}

	public CollectionPropertyChangeEvent(Object source, String propertyName, Action action, Object element) {
		this(source, propertyName, action, element, -1);
	}
	
	public CollectionPropertyChangeEvent(Object source, String propertyName, Action action) {
		this(source, propertyName, action, null);
	}
	
	public Object getSource() {
		return source;
	}
	
	public String getPropertyName() {
		return propertyName;
	}
	
	public Action getAction() {
		return action;
	}
	
	public Object getElement() {
		return element;
	}
	
	public int getIndex() {
		return index;
	}

	public static enum Action {
		ADD, REMOVE, CLEAR, SORT
	}
	
	public static class CollectionPropertyChangeEventFilter implements Filter<CollectionPropertyChangeEvent> {
		@Override
		public boolean allow(CollectionPropertyChangeEvent event, String filter) {
			String name = event.propertyName + ":" + event.action.name().toLowerCase();
			return filter.contains(name);
		}
		
	}
}

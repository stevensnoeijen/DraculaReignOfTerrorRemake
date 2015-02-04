package nl.heretichammer.draculareignofterrorremake.models.events;

import nl.heretichammer.draculareignofterrorremake.models.Area;
import nl.heretichammer.draculareignofterrorremake.models.ResourceType;

public class ResourceChangeEvent {
	public Area source;
	public ResourceType resource;
	public int amount;
	
	public ResourceChangeEvent(Area source, ResourceType resource, int amount) {
		super();
		this.source = source;
		this.resource = resource;
		this.amount = amount;
	}
	
	
}

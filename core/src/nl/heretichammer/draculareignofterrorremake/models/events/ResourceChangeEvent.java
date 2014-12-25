package nl.heretichammer.draculareignofterrorremake.models.events;

import nl.heretichammer.draculareignofterrorremake.models.Area;
import nl.heretichammer.draculareignofterrorremake.models.Resource;

public class ResourceChangeEvent {
	public Area source;
	public Resource resource;
	public int amount;
	
	public ResourceChangeEvent(Area source, Resource resource, int amount) {
		super();
		this.source = source;
		this.resource = resource;
		this.amount = amount;
	}
	
	
}

package nl.heretichammer.draculareignofterrorremake.models.events;

import nl.heretichammer.draculareignofterrorremake.models.Area;
import nl.heretichammer.draculareignofterrorremake.models.Resource;

public class ResourceAmountChanged {
	public Area source;
	public Resource resource;
	public int amount;
	
	public ResourceAmountChanged(Area source, Resource resource, int amount) {
		super();
		this.source = source;
		this.resource = resource;
		this.amount = amount;
	}
	
	
}

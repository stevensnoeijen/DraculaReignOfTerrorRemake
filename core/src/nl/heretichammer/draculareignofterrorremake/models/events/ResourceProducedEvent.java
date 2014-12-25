package nl.heretichammer.draculareignofterrorremake.models.events;

import nl.heretichammer.draculareignofterrorremake.models.Resource;
import nl.heretichammer.draculareignofterrorremake.models.producer.ResourceProducer;

public class ResourceProducedEvent {
	public ResourceProducer source;
	public Resource resource;
	public int produced;
	
	public ResourceProducedEvent(ResourceProducer source, Resource resource, int produced) {
		this.source = source;
		this.resource = resource;
		this.produced = produced;
	}
}

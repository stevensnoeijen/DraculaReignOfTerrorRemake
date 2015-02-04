package nl.heretichammer.draculareignofterrorremake.models.events;

import nl.heretichammer.draculareignofterrorremake.models.ResourceType;
import nl.heretichammer.draculareignofterrorremake.models.producer.ResourceProducer;

public class ResourceProducedEvent {
	public ResourceProducer source;
	public ResourceType resource;
	public int produced;
	
	public ResourceProducedEvent(ResourceProducer source, ResourceType resource, int produced) {
		this.source = source;
		this.resource = resource;
		this.produced = produced;
	}
}

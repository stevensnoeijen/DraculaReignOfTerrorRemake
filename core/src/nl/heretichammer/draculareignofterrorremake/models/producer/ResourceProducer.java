package nl.heretichammer.draculareignofterrorremake.models.producer;

import nl.heretichammer.draculareignofterrorremake.models.ResourceType;
import nl.heretichammer.draculareignofterrorremake.models.events.ResourceProducedEvent;

public class ResourceProducer extends Producer<Integer> {

	/**
	 * Produces resource
	 */
	private ResourceType resource;
	private int produces;
	
	public ResourceProducer(ResourceType resource, int produces) {
		this.cost.put(ResourceType.TIME, 1);
		this.resource = resource;
		this.produces = produces;
		setAutoRestart(true);
	}

	public ResourceType getResource() {
		return this.resource;
	}
	
	public int getProduces() {
		return this.produces;
	}
	
	@Override
	protected void produce() {
		produced = produces;
		post(new ResourceProducedEvent(this, resource, produced));
	}
	
	@Override
	public int getCost(ResourceType resource) {
		return 0;
	}
	
	@Override
	protected boolean isAccessable() {
		return true;
	}

	@Override
	public String getName() {
		return resource.name();
	}
}

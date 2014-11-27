package nl.heretichammer.draculareignofterrorremake.models.producers.resourceproducer;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCost;
import nl.heretichammer.draculareignofterrorremake.models.Resource;
import nl.heretichammer.draculareignofterrorremake.models.producers.AbstractProducer;

public class ResourceProducer extends AbstractProducer<Integer> {

	/**
	 * Produces resource
	 */
	private Resource resource;
	private int produces;
	
	public ResourceProducer(Resource resource, int produces) {
		this.resource = resource;
		this.produces = produces;
	}

	public Resource getResource() {
		return this.resource;
	}
	
	public int getProduces() {
		return this.produces;
	}
	
	@Override
	protected void produce() {
		produced = produces;
	}

	@Override
	public ResourceCost[] getCost() {
		return null;
	}

	@Override
	public boolean canSupplyCost() {
		return true;
	}
}

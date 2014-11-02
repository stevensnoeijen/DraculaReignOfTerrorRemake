package nl.heretichammer.draculareignofterrorremake.models.producers.resourceproducer;

import nl.heretichammer.draculareignofterrorremake.models.producers.AbstractProducer;

public class ResourceProducer extends AbstractProducer<Integer> {

	/**
	 * Produces resource
	 */
	private int resource;
	
	public ResourceProducer() {
		
	}

	@Override
	protected void produce() {
		produced = resource;
	}
}

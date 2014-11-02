package nl.heretichammer.draculareignofterrorremake.models.events;

import nl.heretichammer.draculareignofterrorremake.models.producers.Producer;

public abstract class ProducerEvent<P> {
	private final Producer<P> producer;
	
	public ProducerEvent(Producer<P> producer) {
		this.producer = producer;
	}
	
	public Producer<P> getProducer() {
		return producer;
	}
}

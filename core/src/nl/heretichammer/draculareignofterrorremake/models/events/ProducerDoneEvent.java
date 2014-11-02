package nl.heretichammer.draculareignofterrorremake.models.events;

import nl.heretichammer.draculareignofterrorremake.models.producers.Producer;

public class ProducerDoneEvent<P> extends ProducerEvent<P> {
	public ProducerDoneEvent(Producer<P> producer) {
		super(producer);
	}
}

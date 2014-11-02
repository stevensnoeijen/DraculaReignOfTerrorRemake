package nl.heretichammer.draculareignofterrorremake.models.events;

import nl.heretichammer.draculareignofterrorremake.models.producers.Producer;

public class ProducerCurrentTurnChangedEvent<P> extends ProducerEvent<P> {

	public ProducerCurrentTurnChangedEvent(Producer<P> producer) {
		super(producer);
	}

}

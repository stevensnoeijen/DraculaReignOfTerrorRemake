package nl.heretichammer.draculareignofterrorremake.models.data.factories;

import nl.heretichammer.draculareignofterrorremake.models.producers.troopproducer.TroopProducer;

public class TroopProducerDataFactory extends AbstractDataFactory<TroopProducer.TroopProducerData>{

	public static final TroopProducerDataFactory instance = new TroopProducerDataFactory();
	
	@Override
	public TroopProducer.TroopProducerData fromFile(String name) {
		return get(String.format("data/producers/troopproducers/%s.json", name), TroopProducer.TroopProducerData.class) ;
	}
}

package nl.heretichammer.draculareignofterrorremake.data.factories;

import nl.heretichammer.draculareignofterrorremake.producers.troopproducer.TroopProducer;
import nl.heretichammer.draculareignofterrorremake.producers.troopproducer.TroopProducer.Model;

public class TroopProducerDataFactory extends AbstractDataFactory<TroopProducer.Model>{

	public static final TroopProducerDataFactory instance = new TroopProducerDataFactory();
	
	@Override
	public Model fromFile(String name) {
		return get(String.format("data/producers/troopproducers/%s.json", name), TroopProducer.Model.class) ;
	}
}

package nl.heretichammer.draculareignofterrorremake.producers.troopproducer;

import nl.heretichammer.draculareignofterrorremake.producers.AbstractProducer;
import nl.heretichammer.draculareignofterrorremake.producers.Producer;
import nl.heretichammer.draculareignofterrorremake.unit.Troop;
import nl.heretichammer.draculareignofterrorremake.unit.UnitFactory;

public class TroopProducer extends AbstractProducer<Troop, TroopProducer.TroopProducerData> {

	public TroopProducer(TroopProducerData data) {
		super(data);
	}
	
	@Override
	protected void produce() {
		produced = new Troop(data.produces.size);
		produced.addUnits(UnitFactory.createUnits(data.produces.unitName, data.produces.size));
	}
	
	public static class TroopProducerData extends Producer.ProducerData {
		public Troop.TroopModel produces;
	}
}

package nl.heretichammer.draculareignofterrorremake.producers.troopproducer;

import nl.heretichammer.draculareignofterrorremake.producers.AbstractProducer;
import nl.heretichammer.draculareignofterrorremake.producers.AbstractProducer.Model;
import nl.heretichammer.draculareignofterrorremake.unit.Troop;
import nl.heretichammer.draculareignofterrorremake.unit.UnitFactory;

public class TroopProducer extends AbstractProducer<Troop, TroopProducer.Model> {

	public TroopProducer(TroopProducer.Model model) {
		super(model);
	}
	
	@Override
	protected void produce() {
		produced = new Troop(model.produces.size);
		produced.addUnits(UnitFactory.createUnits(model.produces.unitName, produced.getSize()));
	}
	
	public static class Model extends AbstractProducer.Model {
		public Troop.TroopModel produces;
	}
}

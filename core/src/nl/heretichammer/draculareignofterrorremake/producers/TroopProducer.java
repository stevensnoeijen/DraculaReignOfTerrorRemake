package nl.heretichammer.draculareignofterrorremake.producers;

import nl.heretichammer.draculareignofterrorremake.unit.Troop;
import nl.heretichammer.draculareignofterrorremake.unit.UnitFactory;

public class TroopProducer extends AbstractProducer<Troop, TroopProducer.Model> {

	public TroopProducer(TroopProducer.Model model) {
		super(model);
	}
	
	@Override
	protected void produce() {
		produced = new Troop(model.troop.size);
		produced.addUnits(UnitFactory.createUnits(model.troop.unitName, produced.getSize()));
	}
	
	public static class Model extends AbstractProducer.Model {
		public Troop.TroopModel troop;
	}
}

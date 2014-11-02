package nl.heretichammer.draculareignofterrorremake.models.producers.troopproducer;

import nl.heretichammer.draculareignofterrorremake.models.data.DataManager;
import nl.heretichammer.draculareignofterrorremake.models.producers.AbstractProducer;
import nl.heretichammer.draculareignofterrorremake.models.producers.Producer;
import nl.heretichammer.draculareignofterrorremake.models.unit.Troop;
import nl.heretichammer.draculareignofterrorremake.models.unit.Unit;
import nl.heretichammer.draculareignofterrorremake.models.unit.UnitFactory;

public class TroopProducer extends AbstractProducer<Troop, TroopProducer.TroopProducerData> {

	public TroopProducer(TroopProducerData data) {
		super(data);
	}
	
	@Override
	protected void produce() {
		produced = new Troop(data.produces.size);
		produced.addUnits(UnitFactory.createUnits(data.produces.unitName, data.produces.size));
	}
	
	public Unit.UnitData getUnitData(){
		return DataManager.instance.getUnitData(data.produces.unitName);		
	}
	
	public String getTroopName() {
		return data.produces.name;
	}
	
	public String getStartSound() {
		return data.startSound;
	}
	
	public static class TroopProducerData extends Producer.ProducerData {
		public Troop.TroopModel produces;
		public String startSound;
	}
}

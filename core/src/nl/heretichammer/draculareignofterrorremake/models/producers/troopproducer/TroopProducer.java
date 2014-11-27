package nl.heretichammer.draculareignofterrorremake.models.producers.troopproducer;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCost;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;
import nl.heretichammer.draculareignofterrorremake.models.Troop;
import nl.heretichammer.draculareignofterrorremake.models.events.TroopProducedEvent;
import nl.heretichammer.draculareignofterrorremake.models.producers.AbstractProducer;
import nl.heretichammer.draculareignofterrorremake.models.units.Unit;

public class TroopProducer<T extends Unit> extends AbstractProducer<Troop<T>> {
	private Class<T> clazz;
	private Trooper trooper;
	
	public TroopProducer(Class<T> clazz) {
		this.clazz = clazz;
		trooper = clazz.getAnnotation(Trooper.class);
	}
	
	@Override
	protected void produce() {
		produced = new Troop<T>(trooper.size());
		for(int i = 0; i < trooper.size(); i++){
			T unit;
			try {
				unit = clazz.newInstance();
			} catch (InstantiationException | IllegalAccessException ex) {
				throw new RuntimeException(ex);
			}
			unit.setTeam(this);
			produced.addUnit(unit);
		}
		post(new TroopProducedEvent());
	}
	
	public String getTroopName() {
		return trooper.name();
	}
	
	private void pay() {
		for(ResourceCost costs : trooper.cost()){
			resourceSupplier.decrementResource(costs.resource(), costs.amount());
		}
	}
	
	@Override
	public void start() {
		pay();
		super.start();
	}

	@Override
	public ResourceCost[] getCost() {
		return trooper.cost();
	}

	@Override
	public boolean canSupplyCost() {
		for(ResourceCost costs : trooper.cost()){
			if(!resourceSupplier.hasResource(costs.resource(), costs.amount())){
				return false;
			}
		}
		return true;
	}
}

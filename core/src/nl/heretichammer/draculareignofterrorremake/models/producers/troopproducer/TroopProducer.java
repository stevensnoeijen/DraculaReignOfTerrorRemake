package nl.heretichammer.draculareignofterrorremake.models.producers.troopproducer;

import nl.heretichammer.draculareignofterrorremake.annotations.TroopDescriptor;
import nl.heretichammer.draculareignofterrorremake.models.Troop;
import nl.heretichammer.draculareignofterrorremake.models.events.TroopProducedEvent;
import nl.heretichammer.draculareignofterrorremake.models.producers.AbstractProducer;
import nl.heretichammer.draculareignofterrorremake.models.units.Unit;

public class TroopProducer<T extends Unit> extends AbstractProducer<Troop> {
	private Class<T> clazz;
	private TroopDescriptor troopDescriptor;
	private int goldCost, woodCost, foodCost;
	
	public TroopProducer(Class<T> class1) {
		this.clazz = class1;
		troopDescriptor = class1.getAnnotation(TroopDescriptor.class);
	}
	
	@Override
	protected void produce() {
		produced = new Troop<T>(troopDescriptor.size());
		for(int i = 0; i < troopDescriptor.size(); i++){
			Unit unit;
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
		return troopDescriptor.name();
	}
	
	private void pay() {
		resourceSupplier.removeSupplies(goldCost, woodCost, foodCost);
	}
	
	@Override
	public void start() {
		pay();
		super.start();
	}
	
	public int getGoldCost(){
		return goldCost;
	}
	
	public int getWoodCost(){
		return woodCost;
	}
	
	public int getFoodCost(){
		return foodCost;
	}
}

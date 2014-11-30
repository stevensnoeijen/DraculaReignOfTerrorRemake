package nl.heretichammer.draculareignofterrorremake.models.producer;

import java.util.HashMap;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.annotations.ResourceCost;
import nl.heretichammer.draculareignofterrorremake.annotations.Trooper;
import nl.heretichammer.draculareignofterrorremake.annotations.UnitAttribute;
import nl.heretichammer.draculareignofterrorremake.annotations.Uniter;
import nl.heretichammer.draculareignofterrorremake.models.Resource;
import nl.heretichammer.draculareignofterrorremake.models.Troop;
import nl.heretichammer.draculareignofterrorremake.models.events.TeamChangedEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.TroopProducedEvent;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.units.Unit;

public class TroopProducer<T extends Unit> extends Producer<Troop<T>> {
	private Class<T> clazz;
	private Trooper trooper;
	private Uniter uniter;
	private Map<Resource, Integer> cost;
	private Map<Unit.AttributeType, Integer> unitAttributes;
	private Team team;
	
	public TroopProducer(Class<T> clazz) {
		this.clazz = clazz;
		trooper = clazz.getAnnotation(Trooper.class);
		uniter = clazz.getAnnotation(Uniter.class);
		cost = new HashMap<>();
		for(ResourceCost costs : trooper.cost()){
			this.cost.put(costs.resource(), costs.amount());
		}
		unitAttributes = new HashMap<>();
		for(UnitAttribute attribute : uniter.attributes()){
			this.unitAttributes.put(attribute.type(), attribute.value());
		}
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
			unit.setTeam(team);
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
	
	public int getResourceCost(Resource resource){
		return cost.get(resource);
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
	
	public Trooper getTroopDate(){
		return trooper;
	}
	
	public Uniter getUnitData(){
		return uniter;
	}
	
	public int getUnitAttributeValue(Unit.AttributeType attributeType){
		return unitAttributes.get(attributeType);
	}
	
	public Team getTeam() {
		return this.team;
	}
	
	public void setTeam(Team team) {
		this.team = team;
		post(new TeamChangedEvent());
	}
}

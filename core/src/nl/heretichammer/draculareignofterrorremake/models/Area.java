package nl.heretichammer.draculareignofterrorremake.models;

import java.beans.PropertyChangeEvent;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import nl.heretichammer.draculareignofterrorremake.exceptions.InsufficientResourcesException;
import nl.heretichammer.draculareignofterrorremake.models.events.ResourceChangeEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.ResourceProducedEvent;
import nl.heretichammer.draculareignofterrorremake.models.producer.Producer;
import nl.heretichammer.draculareignofterrorremake.models.producer.ProducerFactory;
import nl.heretichammer.draculareignofterrorremake.models.producer.ResourceProducer;
import nl.heretichammer.draculareignofterrorremake.models.producer.TroopProducer;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.units.Troop;
import nl.heretichammer.draculareignofterrorremake.models.units.UnitType;

import com.google.common.eventbus.Subscribe;

public class Area extends TeamableModel implements ResourceSupplier {	
	private String name;
	private Set<Troop> troops = new HashSet<Troop>();
	private Map<ResourceType, Integer> resources = new HashMap<ResourceType, Integer>();
	
	private Set<TroopProducer> troopProducers = new HashSet<TroopProducer>();	
	private Map<ResourceType, ResourceProducer> resourceProducers = new HashMap<ResourceType, ResourceProducer>();
	
	public Area() {
		//create resources
		resources.put(ResourceType.GOLD, 50);
		resources.put(ResourceType.WOOD, 10);
		resources.put(ResourceType.FOOD, 20);
		resources.put(ResourceType.MEN, 50);
		
		//add troopproducers
		for(UnitType type : UnitType.values()){
			addTroopProducer( ProducerFactory.createTroopProducer(type) );
		}
		
		//create and add resouceproducers
		addResourceProducer( new ResourceProducer(ResourceType.GOLD, 20) );
		addResourceProducer( new ResourceProducer(ResourceType.WOOD, 10) );
		addResourceProducer( new ResourceProducer(ResourceType.FOOD, 35) );
		addResourceProducer( new ResourceProducer(ResourceType.MEN, 2) );
	}
	
	private void addTroopProducer(final TroopProducer troopProducer){
		troopProducer.setResourceSupplier(this);
		troopProducer.register(new Object(){
			//TODO: make listener for this?
			@Subscribe
			public void on(PropertyChangeEvent e){
				if(e.getPropertyName().equals("produced")){
					addTroop(troopProducer.remove());
				}
			}
		});
		troopProducers.add(troopProducer);
	}
	
	private void addResourceProducer(final ResourceProducer resourceProducer){
		resourceProducer.setResourceSupplier(this);
		resourceProducer.register(new Object(){
			@Subscribe
			public void on(ResourceProducedEvent e){
				incrementResource(e.resource, e.source.remove());
			}
		});
		resourceProducers.put(resourceProducer.getResource(), resourceProducer);
	}
	
	@Override
	public void setTeam(Team team) {
		super.setTeam(team);
		for(TroopProducer troopProducer : troopProducers){
			troopProducer.setTeam(team);
		}
	}
	
	public String getName() {
		return name;
	}

	public Iterable<Troop> getTroops() {
		return troops;
	}
	
	public void addTroop(Troop troop){
		troops.add(troop);
	}
	
	public void week() {
		for(Producer<?> producer : resourceProducers.values()){
			producer.week();
		}
		for(Producer<?> producer : troopProducers){
			producer.week();
		}
	}

	public int getResource(ResourceType resource){
		return resources.get(resource);
	}
	
	public int getArmy() {
		int amount = 0;
		for(Troop troop : troops){
			amount += troop.getSize();
		}
		return amount;
	}
	
	public int getResourceIncome(ResourceType resource) {
		return resourceProducers.get(resource).getProduces();
	}
	
	/**
	 * Checks if it has the amount of gold
	 * @param gold
	 * @return
	 */
	@Override
	public boolean hasResource(ResourceType resource, int amount){
		if(amount == 0){
			return true;
		}else{
			return (resources.get(resource) - amount) >= 0;
		}
	}
	
	@Override
	public void incrementResource(ResourceType resource, int amount) {
		int current = resources.get(resource);
		int incremented = current + amount;
		if(incremented < 0){
			throw new InsufficientResourcesException();
		}
		resources.put(resource, incremented);
		post(new ResourceChangeEvent(this, resource, incremented));
		post(new PropertyChangeEvent(this, "resource", null, null));//temp
		post(new PropertyChangeEvent(this, "resources", null, resources));//temp
	}
	
	@Override
	public void decrementResource(ResourceType resource, int amount) {
		incrementResource(resource, -amount);
	}
	
	public Iterable<TroopProducer> getTroopProducers() {
		return this.troopProducers;
	}
	
	/**
	 * 
	 * @param name of troop to produce
	 * @return
	 */
	public TroopProducer getTroopProducer(String name){
		for(TroopProducer troopProducer : troopProducers){
			if(troopProducer.getName().equals(name)){
				return troopProducer;
			}
		}
		return null;
	}
	
	public Iterable<ResourceProducer> getResourceProducers() {
		return this.resourceProducers.values();
	}
}

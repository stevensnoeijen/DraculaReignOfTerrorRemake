package nl.heretichammer.draculareignofterrorremake.models;

import java.beans.PropertyChangeEvent;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import nl.heretichammer.draculareignofterrorremake.exceptions.InsufficientResourcesException;
import nl.heretichammer.draculareignofterrorremake.models.events.ResourceChangeEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.ResourceProducedEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.TroopProducedEvent;
import nl.heretichammer.draculareignofterrorremake.models.producer.Producer;
import nl.heretichammer.draculareignofterrorremake.models.producer.ResourceProducer;
import nl.heretichammer.draculareignofterrorremake.models.producer.TroopProducer;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.units.Cannon;
import nl.heretichammer.draculareignofterrorremake.models.units.Catapult;
import nl.heretichammer.draculareignofterrorremake.models.units.Crossbowsoldier;
import nl.heretichammer.draculareignofterrorremake.models.units.Juggernaut;
import nl.heretichammer.draculareignofterrorremake.models.units.Knight;
import nl.heretichammer.draculareignofterrorremake.models.units.Spy;
import nl.heretichammer.draculareignofterrorremake.models.units.Swordsmen;
import nl.heretichammer.draculareignofterrorremake.models.units.Unit;

import com.google.common.eventbus.Subscribe;

public class Area extends TeamableModel implements ResourceSupplier {	
	private String name;
	private String minimapImage;
	private World world;//TODO: replace with neighbors
	private Set<Troop<?>> troops = new HashSet<Troop<?>>();
	private Map<Resource, Integer> resources = new HashMap<Resource, Integer>();
	
	private Set<TroopProducer<?>> troopProducers = new HashSet<TroopProducer<?>>();	
	private Map<Resource, ResourceProducer> resourceProducers = new HashMap<Resource, ResourceProducer>();
	
	public Area() {
		//create resources
		resources.put(Resource.GOLD, 50);
		resources.put(Resource.WOOD, 10);
		resources.put(Resource.FOOD, 20);
		resources.put(Resource.MEN, 50);
		
		//create and add troopproducers
		addTroopProducer( new TroopProducer<Swordsmen>(Swordsmen.class) );
		addTroopProducer( new TroopProducer<Crossbowsoldier>(Crossbowsoldier.class) );
		addTroopProducer( new TroopProducer<Knight>(Knight.class) );
		addTroopProducer( new TroopProducer<Juggernaut>(Juggernaut.class) );
		addTroopProducer( new TroopProducer<Catapult>(Catapult.class) );
		addTroopProducer( new TroopProducer<Cannon>(Cannon.class) );
		addTroopProducer( new TroopProducer<Spy>(Spy.class) );
		
		//create and add resouceproducers
		addResourceProducer( new ResourceProducer(Resource.GOLD, 20) );
		addResourceProducer( new ResourceProducer(Resource.WOOD, 10) );
		addResourceProducer( new ResourceProducer(Resource.FOOD, 35) );
		addResourceProducer( new ResourceProducer(Resource.MEN, 2) );
	}
	
	private void addTroopProducer(final TroopProducer<? extends Unit> troopProducer){
		troopProducer.setResourceSupplier(this);
		troopProducer.register(new Object(){
			//TODO: make listener for this?
			@Subscribe
			public void on(TroopProducedEvent e){
				addTroop(troopProducer.remove());
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
		for(TroopProducer<?> troopProducer : troopProducers){
			troopProducer.setTeam(team);
		}
	}
	
	public String getName() {
		return name;
	}

	public Iterable<Troop<?>> getTroops() {
		return troops;
	}
	
	public void addTroop(Troop<?> troop){
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
	
	public void setWorld(World world) {
		this.world = world;
	}
	
	public String getMinimapImage() {
		return minimapImage;
	}
	
	public int getResource(Resource resource){
		return resources.get(resource);
	}
	
	public int getArmy() {
		int amount = 0;
		for(Troop<?> troop : troops){
			amount += troop.getSize();
		}
		return amount;
	}
	
	public int getResourceIncome(Resource resource) {
		return resourceProducers.get(resource).getProduces();
	}
	
	/**
	 * Checks if it has the amount of gold
	 * @param gold
	 * @return
	 */
	@Override
	public boolean hasResource(Resource resource, int amount){
		if(amount == 0){
			return true;
		}else{
			return (resources.get(resource) + amount) >= 0;
		}
	}
	
	@Override
	public void incrementResource(Resource resource, int amount) {
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
	public void decrementResource(Resource resource, int amount) {
		incrementResource(resource, -amount);
	}
	
	public Iterable<TroopProducer<?>> getTroopProducers() {
		return this.troopProducers;
	}
	
	/**
	 * 
	 * @param name of troop to produce
	 * @return
	 */
	public TroopProducer<?> getTroopProducer(String name){
		for(TroopProducer<?> troopProducer : troopProducers){
			if(troopProducer.getTroopName().equals(name)){
				return troopProducer;
			}
		}
		return null;
	}
	
	public Iterable<ResourceProducer> getResourceProducers() {
		return this.resourceProducers.values();
	}
}

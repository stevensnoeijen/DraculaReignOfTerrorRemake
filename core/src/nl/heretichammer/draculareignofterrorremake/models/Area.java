package nl.heretichammer.draculareignofterrorremake.models;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import nl.heretichammer.draculareignofterrorremake.models.events.ResourceProducedEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.TroopProducedEvent;
import nl.heretichammer.draculareignofterrorremake.models.producers.Producer;
import nl.heretichammer.draculareignofterrorremake.models.producers.resourceproducer.ResourceProducer;
import nl.heretichammer.draculareignofterrorremake.models.producers.troopproducer.TroopProducer;
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
	public static final String SIBIU = "sibiu";
	public static final String FAGARAS = "fagaras";
	public static final String CURTEA = "curtea";
	public static final String BRASOV = "brasov";
	public static final String PITESTI = "pitesti";
	public static final String TIRGO = "tirgo";
	public static final String SNAGOV = "snagov";
	public static final String GIURGIU = "giurgiu";
	public static final String BRAILA = "braila";
	public static final String HIRSOVA = "hirsova";
	public static final String RASOVA = "rasova";
	public static final String OSTROV = "ostrov";

	public static final String[] NAMES = { SIBIU, FAGARAS, CURTEA, BRASOV, PITESTI, TIRGO, SNAGOV, GIURGIU, BRAILA, HIRSOVA, RASOVA, OSTROV };
	
	private String minimapImage;
	private String name;
	private World world;//TODO: replace with neighbors
	private Set<Troop<?>> troops = new HashSet<Troop<?>>();
	
	private Map<Resource, Integer> resources = new HashMap<>();
	private int army = 0;
	
	private Set<Producer<?>> producers = new HashSet<>();
	private Set<TroopProducer<?>> troopProducers = new HashSet<>();	
	private Map<Resource, ResourceProducer> resourceProducers = new HashMap<>();
	
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
		producers.add(troopProducer);
	}
	
	private void addResourceProducer(final ResourceProducer resourceProducer){
		resourceProducer.setResourceSupplier(this);
		resourceProducer.register(new Object(){
			@Subscribe
			public void on(ResourceProducedEvent e){
				incrementResource(e.resource, e.produced);
			}
		});
		resourceProducers.put(resourceProducer.getResource(), resourceProducer);
		producers.add(resourceProducer);
	}
	
	@Override
	public void setTeam(Team team) {
		for(Producer<?> producer : producers) {
			producer.setTeam(team);
		}
		super.setTeam(team);
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
		for(Producer<?> producer : producers){
			if(producer.isAccessable() && producer.isStarted()){
				producer.week();
			}
		}
	}
	
	public void setWorld(World world) {
		this.world = world;
	}
	
	public String getMinimapImage() {
		return minimapImage;
	}
	
	public int getResourceAmount(Resource resource){
		return resources.get(resource);
	}
	
	public int getArmy() {
		return this.army;
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
		resources.put(resource, incremented);
	}
	
	@Override
	public void decrementResource(Resource resource, int amount) {
		incrementResource(resource, -amount);
	}
	
	public Iterable<TroopProducer<?>> getTroopProducers() {
		return this.troopProducers;
	}
	
	public Iterable<ResourceProducer> getResourceProducers() {
		return this.resourceProducers.values();
	}
}

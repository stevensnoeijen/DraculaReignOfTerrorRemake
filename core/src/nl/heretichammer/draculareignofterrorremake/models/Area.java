package nl.heretichammer.draculareignofterrorremake.models;

import java.util.HashSet;
import java.util.Set;

import nl.heretichammer.draculareignofterrorremake.exceptions.InsufficientResources;
import nl.heretichammer.draculareignofterrorremake.models.events.ResourceProducedEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.TroopProducedEvent;
import nl.heretichammer.draculareignofterrorremake.models.producers.Producer;
import nl.heretichammer.draculareignofterrorremake.models.producers.resourceproducer.ResourceProducer;
import nl.heretichammer.draculareignofterrorremake.models.producers.troopproducer.TroopProducer;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.units.Swordsmen;

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
	
	private int gold, wood, food, men, army;
	private int goldIncome, woodIncome, foodIncome;
	
	private TroopProducer<Swordsmen> swordsmenProducer = new TroopProducer<Swordsmen>(Swordsmen.class);
	//private TroopProducer<Crossbowsoldier> crossbowsoldierProducer = new TroopProducer<Crossbowsoldier>(Crossbowsoldier.class);
	//knight
	//juggernaut
	//catapult
	//cannon
	//spy
	
	private ResourceProducer goldProducer = new ResourceProducer();
	//wood
	//food
	
	/**
	 * Producers that will be run at {@link #week()}
	 */
	private Set<Producer<?>> producers = new HashSet<>();
	
	public Area() {
		producers.add(swordsmenProducer);
		swordsmenProducer.setResourceSupplier(this);
		swordsmenProducer.register(new Object(){
			//TODO: make listener for this?
			@Subscribe
			public void on(TroopProducedEvent e){
				addTroop(swordsmenProducer.remove());
			}
		});
		
		//create resouceproducers
		producers.add(goldProducer);
		goldProducer.register(new Object(){
			@Subscribe
			public void on(ResourceProducedEvent e){
				addResources(e.gold, e.wood, e.food);
			}
		});
	}
	
	@Override
	public void setTeam(Team team) {
		swordsmenProducer.setTeam(this);
		goldProducer.setTeam(this);
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
	
	public int getGold() {
		return gold;
	}
	
	public int getFood() {
		return food;
	}
	
	public int getWood() {
		return wood;
	}
	
	private void addResources(int gold, int wood, int food){
		addGold(gold);
		addWood(wood);
		addFood(food);
	}
	
	private void addGold(int gold){
		if(hasGold(gold)){
			this.gold += gold;
		}else{
			throw new InsufficientResources();
		}
	}
	
	private void addWood(int wood){
		if(hasWood(wood)){
			this.wood += wood;
		}else{
			throw new InsufficientResources();
		}
	}
	
	private void addFood(int food){
		if(hasFood(food)){
			this.food += food;
		}else{
			throw new InsufficientResources();
		}
	}
	
	/**
	 * Checks if it has the amount of gold
	 * @param gold
	 * @return
	 */
	public boolean hasGold(int gold){
		if(gold == 0){
			return true;
		}else{
			return (this.gold - gold) >= 0;
		}
	}
	
	public boolean hasWood(int wood){
		if(wood == 0){
			return true;
		}else{
			return (this.wood - wood) >= 0;
		}
	}
	
	public boolean hasFood(int food){
		if(food == 0){
			return true;
		}else{
			return (this.food - food) >= 0;
		}
	}

	@Override
	public void removeSupplies(int gold, int wood, int food) {
		addGold(gold);
		addWood(wood);
		addFood(food);
	}

	@Override
	public boolean canSupply(int gold, int wood, int food) {
		return hasGold(gold) && hasWood(wood) && hasFood(food);
	}

	@Override
	public void addSupplies(int gold, int wood, int food) {
		addFood(food);
		addWood(wood);
		addFood(food);
	}
}

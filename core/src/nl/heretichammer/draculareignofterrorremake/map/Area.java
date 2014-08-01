package nl.heretichammer.draculareignofterrorremake.map;

import java.util.ArrayList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.ItemFactory;
import nl.heretichammer.draculareignofterrorremake.items.Item.ItemDescriptor;
import nl.heretichammer.draculareignofterrorremake.items.containers.ItemContainer;
import nl.heretichammer.draculareignofterrorremake.items.containers.ItemContainerFactory;
import nl.heretichammer.draculareignofterrorremake.producers.itemproducer.ItemProducerManager;
import nl.heretichammer.draculareignofterrorremake.producers.troopproducer.TroopProducerManager;
import nl.heretichammer.draculareignofterrorremake.tbs.Turnable;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.unit.Troop;
import nl.heretichammer.draculareignofterrorremake.utils.Consumer;
import nl.heretichammer.draculareignofterrorremake.utils.DRoTRUtils;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSupplier;

public class Area implements Teamable, ItemSupplier, Turnable {
	private final AreaData data;
	private String name;
	private Team team;
	private World world;
	private List<Troop> troops = new ArrayList<Troop>();
	private ItemContainer<?> resources = ItemContainerFactory.createBlockItemContainer("buildinginventory");
	
	public final TroopProducerManager troopProducerManager;
	public final ItemProducerManager itemProducerManager;
	
	//adjacents
	
	public Area(AreaData data) {
		this.data = data;
		this.name = data.name;
		troopProducerManager = new TroopProducerManager();
		itemProducerManager = new ItemProducerManager();
		troopProducerManager.setConsumer(new Consumer<Troop>() {
			@Override
			public void consume(Troop troop) {
				troop.setTeam(team);
				troops.add(troop);
			}
		});
		troopProducerManager.setItemSupplier(this);
		itemProducerManager.setConsumer(new Consumer<Item>() {
			@Override
			public void consume(Item item) {
				Item resource = findResourceByName(item.getName());
				if(resource != null) {//if exists in resources
					resource.add(item);//add amount to resource
				} else {				
					resources.add(item);//add is as new
				}
			}
		});
		itemProducerManager.setItemSupplier(this);
		
		for(Item.ItemDescriptor itemItemDescriptor : data.items) {
			resources.add( ItemFactory.create(itemItemDescriptor) );
		}
	}
	
	public String getName() {
		return name;
	}
	
	@Override
	public void setTeam(Team team) {
		this.team = team;
		team.addOwnedArea(this);
		DRoTRUtils.setTeam(team, troopProducerManager, itemProducerManager);
	}

	@Override
	public Team getTeam() {
		return team;
	}
	
	public Item findResourceByName(String name) {
		for(Item resource : resources) {
			if(resource.getName().equals(name)) {
				return resource;
			}
		}
		return null;
	}
	
	@Override
	public Item findItem(ItemDescriptor itemItemDescriptor) {
		return resources.findItem(itemItemDescriptor);
	}

	@Override
	public Item[] removeItems(ItemDescriptor[] itemDescriptors) {
		return resources.removeItems(itemDescriptors);
	}

	@Override
	public Item removeItem(ItemDescriptor itemDescriptor) {
		return resources.removeItem(itemDescriptor);
	}

	@Override
	public boolean hasItem(ItemDescriptor itemDescriptor) {
		return resources.hasItem(itemDescriptor);
	}

	@Override
	public boolean hasItems(ItemDescriptor[] itemDescriptors) {
		return resources.hasItems(itemDescriptors);
	}
	
	public List<Troop> getTroops() {
		return troops;
	}
	
	/**
	 * 
	 * @param name
	 * @return cost minus cost made
	 */
	public int getIncome(String name) {
		int income = 0;
		income += itemProducerManager.findProducerByProducesDataName(name).getProducesData().amount;
		income -= itemProducerManager.getTotalCost(name);
		return income;
	}
	
	@Override
	public void turn() {
		itemProducerManager.turn();
		troopProducerManager.turn();
	}
	
	public void setWorld(World world) {
		this.world = world;
		setTeam( world.findTeamByName(data.teamName) );
	}
	
	public String getMinimapImage() {
		return data.minimapImage;
	}
	
	public static class AreaData {
		public String name;
		public String teamName;
		public String minimapImage;
		public Item.ItemDescriptor[] items;
	}
}

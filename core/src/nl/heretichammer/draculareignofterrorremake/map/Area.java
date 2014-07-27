package nl.heretichammer.draculareignofterrorremake.map;

import java.util.ArrayList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.ItemFactory;
import nl.heretichammer.draculareignofterrorremake.items.Item.ItemDescriptor;
import nl.heretichammer.draculareignofterrorremake.items.containers.BlockItemContainer;
import nl.heretichammer.draculareignofterrorremake.items.containers.ItemContainerFactory;
import nl.heretichammer.draculareignofterrorremake.producers.itemproducer.ItemProducerManager;
import nl.heretichammer.draculareignofterrorremake.producers.troopproducer.TroopProducerManager;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.unit.Troop;
import nl.heretichammer.draculareignofterrorremake.utils.Consumer;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSupplier;

public class Area implements Teamable, ItemSupplier {
	private String name;
	private Team team;
	private List<Troop> troops = new ArrayList<Troop>();
	private List<Item> resources = new ArrayList<Item>(4);
	
	public final TroopProducerManager troopProducerManager;
	public final ItemProducerManager itemProducerManager;
	
	//adjacents
	
	public Area(AreaData data) {
		this(data.name, World.Teams.byName(data.teamName));
		
		for(Item.ItemDescriptor itemItemDescriptor : data.items) {
			resources.add( ItemFactory.create(itemItemDescriptor) );
		}
	}
	
	public Area(String name, Team team) {
		this.name = name;
		troopProducerManager = new TroopProducerManager();
		itemProducerManager = new ItemProducerManager();
		setTeam(team);
		troopProducerManager.setConsumer(new Consumer<Troop>() {
			@Override
			public void consume(Troop troop) {
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
	}
	
	public String getName() {
		return name;
	}
	
	@Override
	public void setTeam(Team team) {
		this.team = team;
		team.addOwnedArea(this);
		troopProducerManager.setTeam(team);
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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Item[] removeItems(ItemDescriptor[] itemItemDescriptor) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Item removeItem(ItemDescriptor itemItemDescriptor) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean hadItem(ItemDescriptor itemItemDescriptor) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean hasItems(ItemDescriptor[] itemItemDescriptor) {
		// TODO Auto-generated method stub
		return false;
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
		income -= troopProducerManager.getTotalCost(name);
		return income;
	}
	
	public static class AreaData {
		public String name;
		public String teamName;
		public Item.ItemDescriptor[] items;
	}
}

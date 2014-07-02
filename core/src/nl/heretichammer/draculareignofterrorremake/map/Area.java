package nl.heretichammer.draculareignofterrorremake.map;

import java.util.ArrayList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.Consumer;
import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.ItemFactory;
import nl.heretichammer.draculareignofterrorremake.items.Item.Descriptor;
import nl.heretichammer.draculareignofterrorremake.items.containers.BlockItemContainer;
import nl.heretichammer.draculareignofterrorremake.items.containers.ItemContainerFactory;
import nl.heretichammer.draculareignofterrorremake.producers.itemproducer.ItemProducerManager;
import nl.heretichammer.draculareignofterrorremake.producers.troopproducer.TroopProducerManager;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.unit.Troop;

public class Area implements Teamable, ItemSupplier {
	private String name;
	private Team team;
	private List<Troop> troops = new ArrayList<Troop>();
	private BlockItemContainer inventory = ItemContainerFactory.createBlockItemContainer("buildinginventory");
	
	private TroopProducerManager troopProducerManager;
	private ItemProducerManager itemProducerManager;
	
	//adjacents
	
	public Area(AreaData data) {
		this(data.name, World.Teams.byName(data.teamName));
		
		for(Item.Descriptor itemDescriptor : data.items) {
			inventory.add( ItemFactory.create(itemDescriptor) );
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
				inventory.add(item);
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
		troopProducerManager.setTeam(team);
	}

	@Override
	public Team getTeam() {
		return team;
	}

	public BlockItemContainer getInventory() {
		return inventory;
	}
	
	@Override
	public Item findItem(Descriptor itemDescriptor) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Item[] removeItems(Descriptor[] itemDescriptor) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Item removeItem(Descriptor itemDescriptor) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean hadItem(Descriptor itemDescriptor) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean hasItems(Descriptor[] itemDescriptor) {
		// TODO Auto-generated method stub
		return false;
	}
	
	public static class AreaData {
		public String name;
		public String teamName;
		public Item.Descriptor[] items;
	}
}

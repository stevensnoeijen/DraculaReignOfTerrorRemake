package nl.heretichammer.draculareignofterrorremake.map;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.Consumer;
import nl.heretichammer.draculareignofterrorremake.DRoTR;
import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.Item.Descriptor;
import nl.heretichammer.draculareignofterrorremake.producers.TroopProducerManager;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.unit.Troop;
import nl.heretichammer.draculareignofterrorremake.unit.Unit;

public class Area implements Teamable, Consumer<Troop>, ItemSupplier {
	private String name;
	private Team team;
	private List<Troop> troops = new ArrayList<Troop>();
	
	private TroopProducerManager troopProducerManager;
	
	//adjacents
	
	public Area(String name, Team team) {
		this.name = name;
		troopProducerManager = new TroopProducerManager();
		setTeam(team);
		troopProducerManager.setConsumer(this);
		troopProducerManager.setItemSupplier(this);
	}
	
	public Area() {
		
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

	@Override
	public Item findItem(Descriptor itemDescriptor) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Item removeItems(Descriptor[] itemDescriptor) {
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

	@Override
	public void consume(Troop troop) {
		troops.add(troop);
	}
}

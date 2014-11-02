package nl.heretichammer.draculareignofterrorremake.models.producers;

import java.util.LinkedList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.models.items.Item;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.utils.DRoTRUtils;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSupplier;

public abstract class ProducerManager<P extends Producer<?>> implements Teamable, ItemSuppliable {
	private Team team;
	protected List<P> producers = new LinkedList<P>();
	
	@SuppressWarnings("unchecked")
	@Override
	public void setItemSupplier(ItemSupplier itemSupplier) {
		DRoTRUtils.setItemSupplier(itemSupplier, (List<ItemSuppliable>) producers);
	}

	@SuppressWarnings("unchecked")
	@Override
	public void setTeam(Team team) {
		this.team = team;
		DRoTRUtils.setTeam(team, (List<Teamable>)producers);
	}

	@Override
	public Team getTeam() {
		return team;
	}
	
	public List<P> getProducers() {
		return producers;
	}
	
	/**
	 * @return cost of all {@link #producers} for itemName
	 */
	public int getTotalCost(String itemName){
		int totalCost = 0;
			
		for(P producer : producers) {
			Item.ItemDescriptor item = producer.findCost(itemName);
			if(item != null) {
				totalCost += item.amount;
			}
		}
		return totalCost;
	}
	
	public void week() {
		for(P producer : producers) {
			producer.week();
		}
	}	
}

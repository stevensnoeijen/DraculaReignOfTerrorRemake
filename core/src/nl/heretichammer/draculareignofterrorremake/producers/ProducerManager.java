package nl.heretichammer.draculareignofterrorremake.producers;

import java.util.LinkedList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.utils.DRoTRUtils;

public abstract class ProducerManager<P extends Producer<?>> implements Teamable,ItemSuppliable {
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
}

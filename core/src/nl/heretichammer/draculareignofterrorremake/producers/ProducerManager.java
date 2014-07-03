package nl.heretichammer.draculareignofterrorremake.producers;

import java.util.LinkedList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;

public abstract class ProducerManager<P extends Producer<?>> implements Teamable,ItemSuppliable {
	private Team team;
	protected List<P> producers = new LinkedList<P>();
	
	@Override
	public void setItemSupplier(ItemSupplier itemSupplier) {
		for(Producer<?> producer : producers) {
			producer.setItemSupplier(itemSupplier);
		}
	}

	@Override
	public void setTeam(Team team) {
		this.team = team;
		for(Producer<?> producer : producers) {
			producer.setTeam(team);
		}
	}

	@Override
	public Team getTeam() {
		return team;
	}
}

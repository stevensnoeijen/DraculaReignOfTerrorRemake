package nl.heretichammer.draculareignofterrorremake.upgraders;

import java.util.LinkedList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.utils.DRoTRUtils;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSupplier;

public abstract class AbstractUpgraderManager implements Teamable, ItemSuppliable {
	protected List<Upgrader> upgraders = new LinkedList<Upgrader>();
	private Team team;
	
	@SuppressWarnings("unchecked")
	@Override
	public void setItemSupplier(ItemSupplier itemSupplier) {
		DRoTRUtils.setItemSupplier(itemSupplier, (List<ItemSuppliable>)(List<?>)upgraders);
	}

	@SuppressWarnings("unchecked")
	@Override
	public void setTeam(Team team) {
		this.team = team;
		DRoTRUtils.setTeam(team, (List<Teamable>)(List<?>)upgraders);
	}

	@Override
	public Team getTeam() {
		return team;
	}
}

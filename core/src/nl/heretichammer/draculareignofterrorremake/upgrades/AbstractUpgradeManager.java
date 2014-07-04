package nl.heretichammer.draculareignofterrorremake.upgrades;

import java.util.LinkedList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.utils.DRoTRUtils;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSupplier;

public abstract class AbstractUpgradeManager implements Teamable, ItemSuppliable {
	protected List<Upgrade> upgrades = new LinkedList<Upgrade>();
	private Team team;
	
	@SuppressWarnings("unchecked")
	@Override
	public void setItemSupplier(ItemSupplier itemSupplier) {
		DRoTRUtils.setItemSupplier(itemSupplier, (List<ItemSuppliable>)(List<?>)upgrades);
	}

	@SuppressWarnings("unchecked")
	@Override
	public void setTeam(Team team) {
		this.team = team;
		DRoTRUtils.setTeam(team, (List<Teamable>)(List<?>)upgrades);
	}

	@Override
	public Team getTeam() {
		return team;
	}
}

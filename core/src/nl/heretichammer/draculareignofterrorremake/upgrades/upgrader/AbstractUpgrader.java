package nl.heretichammer.draculareignofterrorremake.upgrades.upgrader;

import org.apache.commons.lang3.StringUtils;

import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.upgrades.Upgrade;
import nl.heretichammer.draculareignofterrorremake.utils.AbstractTeamableAccessableStartable;
import nl.heretichammer.draculareignofterrorremake.utils.DRoTRUtils;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSupplier;

public class AbstractUpgrader<D extends Upgrader.UpgraderData> extends AbstractTeamableAccessableStartable implements Upgrader {
	protected D data;
	private Upgrade[] upgraders;
	private Upgrade current;
	
	public AbstractUpgrader(D data) {
		this.data = data;
	}
	
	@Override
	public void setTeam(Team team) {
		super.setTeam(team);
		DRoTRUtils.setTeam(team, upgraders);
	}
	
	@Override
	public void setItemSupplier(ItemSupplier itemSupplier) {
		DRoTRUtils.setItemSupplier(itemSupplier, upgraders);
	}

	@Override
	public boolean isAccessable() {
		return isAccessable(data.accessName);
	}

	@Override
	public String getName() {
		return data.name;
	}

	@Override
	public int getMaxLevel() {
		if(upgraders == null) {
			return 0;
		}
		return upgraders[upgraders.length-1].getLevel();
	}

	@Override
	public Upgrade getCurrent() {
		return current;
	}

}

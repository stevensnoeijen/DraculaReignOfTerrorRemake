package nl.heretichammer.draculareignofterrorremake.utils;

import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;

/**
 * Implements {@link Teamable}
 * @author Steven Snoeijen
 *
 */
public abstract class AbstractTeamableAccessableStartable extends AbstractAccessableStartable implements Teamable {

	private Team team;

	@Override
	public void setTeam(Team team) {
		this.team = team;
	}

	@Override
	public Team getTeam() {
		return this.team;
	}

}

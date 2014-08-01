package nl.heretichammer.draculareignofterrorremake.utils;

import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.team.access.AccessManager;

/**
 * Implements {@link Teamable}
 * @author Steven Snoeijen
 *
 */
public abstract class AbstractTeamableAccessableStartable extends AbstractAccessableStartable implements Teamable {

	private Team team = Team.NEUTRAL;

	@Override
	public void setTeam(Team team) {
		if(team == null) {
			throw new IllegalArgumentException();
		}
		this.team = team;
	}

	@Override
	public Team getTeam() {
		return this.team;
	}

	/**
	 * If it doesnt have a {@link #getTeam()}, return false.
	 * Otherwise check if accessName is not empty, otherwise return true.
	 * Otherwise {@link AccessManager#isAccessable(String)} from team.
	 * @param accessName
	 * @return
	 */
	protected boolean isAccessable(String accessName) {
		return team.accessManager.isAccessable(accessName);		
	}
}

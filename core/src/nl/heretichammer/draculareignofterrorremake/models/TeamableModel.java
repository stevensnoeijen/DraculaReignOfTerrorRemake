package nl.heretichammer.draculareignofterrorremake.models;

import nl.heretichammer.draculareignofterrorremake.models.events.TeamChangedEvent;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.team.Teamable;

public class TeamableModel extends Model implements Teamable {
	private Team team;
	
	@Override
	public void setTeam(Team team) {
		this.team = team;
		post(new TeamChangedEvent());
	}
	
	public Team getTeam() {
		return team;
	};
	
	public final void setTeam(Teamable teamable){
		this.team = teamable.getTeam();
	}
}

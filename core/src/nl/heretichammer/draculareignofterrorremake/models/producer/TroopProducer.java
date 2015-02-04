package nl.heretichammer.draculareignofterrorremake.models.producer;

import nl.heretichammer.draculareignofterrorremake.eventbus.PropertyChangeEvent;
import nl.heretichammer.draculareignofterrorremake.models.ResourceType;
import nl.heretichammer.draculareignofterrorremake.models.events.TeamChangedEvent;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.units.Troop;
import nl.heretichammer.draculareignofterrorremake.models.units.Troop.TroopData;
import nl.heretichammer.draculareignofterrorremake.models.units.TroopFactory;

public class TroopProducer extends Producer<Troop> {
	private TroopProducerData data;
	private Team team;
	
	protected TroopProducer(TroopProducerData data) {
		this.data = data;
	}
	
	@Override
	protected void produce() {
		produced = TroopFactory.create(data.troopData.unitType);
		produced.setTeam(team);
		post(new PropertyChangeEvent(this, "produced", null, produced));
	}
	
	public String getName() {
		return data.name;
	};

	public int getCost(ResourceType resource) {
		return cost.get(resource);
	}
	
	public int getResourceCost(ResourceType resource){
		return cost.get(resource);
	}
	
	public TroopData getTroopData(){
		return data.troopData;
	}
	
	public Team getTeam() {
		return this.team;
	}
	
	public void setTeam(Team team) {
		this.team = team;
		post(new TeamChangedEvent());
	}
	
	@Override
	protected boolean isAccessable() {
		return team.hasPermission(data.permission);
	};
	
	public static class TroopProducerData extends Producer.ProducerData {
		public Troop.TroopData troopData;
	}
}

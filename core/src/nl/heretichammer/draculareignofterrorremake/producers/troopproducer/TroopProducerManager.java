package nl.heretichammer.draculareignofterrorremake.producers.troopproducer;

import nl.heretichammer.draculareignofterrorremake.Consumable;
import nl.heretichammer.draculareignofterrorremake.Consumer;
import nl.heretichammer.draculareignofterrorremake.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.data.DataManager;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.unit.Troop;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.utils.Json;

public class TroopProducerManager implements Teamable, Consumable<Consumer<Troop>>, ItemSuppliable {

	private Team team;
	
	public final TroopProducer swordsmenTroopProducer;
	public final TroopProducer crossbowsoldierTroopProducer;
	public final TroopProducer knightTroopProducer;
	public final TroopProducer juggernautTroopProducer;
	public final TroopProducer catapultTroopProducer;
	public final TroopProducer cannonTroopProducer;
	public final TroopProducer spyTroopProducer;
	
	public TroopProducerManager() {
		swordsmenTroopProducer = TroopProducerFactory.create("swordsmen");
		crossbowsoldierTroopProducer = TroopProducerFactory.create("crossbowsoldiers");
		knightTroopProducer = TroopProducerFactory.create("knight");
		juggernautTroopProducer = TroopProducerFactory.create("juggernaut");
		catapultTroopProducer = TroopProducerFactory.create("catapult");
		cannonTroopProducer = TroopProducerFactory.create("cannon");
		spyTroopProducer = TroopProducerFactory.create("spy");
	}

	@Override
	public void setTeam(Team team) {
		this.team = team;
		swordsmenTroopProducer.setTeam(team);
		crossbowsoldierTroopProducer.setTeam(team);
		knightTroopProducer.setTeam(team);
		juggernautTroopProducer.setTeam(team);
		catapultTroopProducer.setTeam(team);
		cannonTroopProducer.setTeam(team);
		spyTroopProducer.setTeam(team);
	}

	@Override
	public Team getTeam() {
		return team;
	}

	@Override
	public void setItemSupplier(ItemSupplier itemSupplier) {
		swordsmenTroopProducer.setItemSupplier(itemSupplier);
		crossbowsoldierTroopProducer.setItemSupplier(itemSupplier);
		knightTroopProducer.setItemSupplier(itemSupplier);
		juggernautTroopProducer.setItemSupplier(itemSupplier);
		catapultTroopProducer.setItemSupplier(itemSupplier);
		cannonTroopProducer.setItemSupplier(itemSupplier);
		spyTroopProducer.setItemSupplier(itemSupplier);
	}

	@Override
	public void setConsumer(Consumer<Troop> consumer) {
		swordsmenTroopProducer.setConsumer(consumer);
		crossbowsoldierTroopProducer.setConsumer(consumer);
		knightTroopProducer.setConsumer(consumer);
		juggernautTroopProducer.setConsumer(consumer);
		catapultTroopProducer.setConsumer(consumer);
		cannonTroopProducer.setConsumer(consumer);
		spyTroopProducer.setConsumer(consumer);
	}
}

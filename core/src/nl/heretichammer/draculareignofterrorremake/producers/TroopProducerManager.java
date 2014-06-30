package nl.heretichammer.draculareignofterrorremake.producers;

import nl.heretichammer.draculareignofterrorremake.Consumable;
import nl.heretichammer.draculareignofterrorremake.Consumer;
import nl.heretichammer.draculareignofterrorremake.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.Item.ItemConsumer;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.unit.Troop;
import nl.heretichammer.draculareignofterrorremake.unit.Unit.UnitConsumer;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.utils.Json;

public class TroopProducerManager implements Teamable, Consumable<Consumer<Troop>>, ItemSuppliable {

	private Team team;
	
	public final TroopProducer swordsmenTroopProducer;
	/*
	public final TroopProducer crossbowsoldierTroopProducer;
	public final TroopProducer knightTroopProducer;
	public final TroopProducer juggernautTroopProducer;
	public final TroopProducer catapultTroopProducer;
	public final TroopProducer cannonTroopProducer;
	public final TroopProducer spyTroopProducer;
	*/
	
	public TroopProducerManager() {
		Json json = new Json();

		swordsmenTroopProducer = new TroopProducer( json.fromJson(TroopProducer.Model.class, Gdx.files.internal("data/producers/troopproducers/swordsmen.json")) );
		/*
		crossbowsoldierTroopProducer;
		knightTroopProducer;
		juggernautTroopProducer;
		catapultTroopProducer;
		cannonTroopProducer;
		spyTroopProducer;
		*/
	}

	@Override
	public void setTeam(Team team) {
		this.team = team;
		swordsmenTroopProducer.setTeam(team);
	}

	@Override
	public Team getTeam() {
		return team;
	}

	@Override
	public void setItemSupplier(ItemSupplier itemSupplier) {
		swordsmenTroopProducer.setItemSupplier(itemSupplier);
	}

	@Override
	public void setConsumer(Consumer<Troop> consumer) {
		swordsmenTroopProducer.setConsumer(consumer);
	}
}

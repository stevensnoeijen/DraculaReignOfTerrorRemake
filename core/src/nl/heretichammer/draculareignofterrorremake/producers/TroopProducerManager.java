package nl.heretichammer.draculareignofterrorremake.producers;

import nl.heretichammer.draculareignofterrorremake.Consumable;
import nl.heretichammer.draculareignofterrorremake.Consumer;
import nl.heretichammer.draculareignofterrorremake.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
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
		Json json = new Json();
		
		swordsmenTroopProducer = new TroopProducer( json.fromJson(TroopProducer.Model.class, Gdx.files.internal("data/producers/troopproducers/swordsmen.json")) );
		crossbowsoldierTroopProducer = new TroopProducer( json.fromJson(TroopProducer.Model.class, Gdx.files.internal("data/producers/troopproducers/crossbowsoldiers.json")) );
		knightTroopProducer = new TroopProducer( json.fromJson(TroopProducer.Model.class, Gdx.files.internal("data/producers/troopproducers/knight.json")) );
		juggernautTroopProducer = new TroopProducer( json.fromJson(TroopProducer.Model.class, Gdx.files.internal("data/producers/troopproducers/juggernaut.json")) );
		catapultTroopProducer = new TroopProducer( json.fromJson(TroopProducer.Model.class, Gdx.files.internal("data/producers/troopproducers/catapult.json")) );
		cannonTroopProducer = new TroopProducer( json.fromJson(TroopProducer.Model.class, Gdx.files.internal("data/producers/troopproducers/cannon.json")) );
		spyTroopProducer = new TroopProducer( json.fromJson(TroopProducer.Model.class, Gdx.files.internal("data/producers/troopproducers/spy.json")) );
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

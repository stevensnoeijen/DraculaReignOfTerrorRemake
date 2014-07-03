package nl.heretichammer.draculareignofterrorremake.producers.troopproducer;

import nl.heretichammer.draculareignofterrorremake.Consumable;
import nl.heretichammer.draculareignofterrorremake.Consumer;
import nl.heretichammer.draculareignofterrorremake.producers.ProducerManager;
import nl.heretichammer.draculareignofterrorremake.unit.Troop;

public class TroopProducerManager extends ProducerManager<TroopProducer> implements Consumable<Consumer<Troop>> {
	public final TroopProducer swordsmenTroopProducer;
	public final TroopProducer crossbowsoldierTroopProducer;
	public final TroopProducer knightTroopProducer;
	public final TroopProducer juggernautTroopProducer;
	public final TroopProducer catapultTroopProducer;
	public final TroopProducer cannonTroopProducer;
	public final TroopProducer spyTroopProducer;
	
	public TroopProducerManager() {
		producers.add( swordsmenTroopProducer = TroopProducerFactory.create("swordsmen") );
		producers.add( crossbowsoldierTroopProducer = TroopProducerFactory.create("crossbowsoldiers") );
		producers.add( knightTroopProducer = TroopProducerFactory.create("knight") );
		producers.add( juggernautTroopProducer = TroopProducerFactory.create("juggernaut") );
		producers.add( catapultTroopProducer = TroopProducerFactory.create("catapult") );
		producers.add( cannonTroopProducer = TroopProducerFactory.create("cannon") );
		producers.add( spyTroopProducer = TroopProducerFactory.create("spy") );
	}

	@Override
	public void setConsumer(Consumer<Troop> consumer) {
		for(TroopProducer producer : producers) {
			producer.setConsumer(consumer);
		}
	}
}

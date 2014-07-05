package nl.heretichammer.draculareignofterrorremake.data.factories;

import nl.heretichammer.draculareignofterrorremake.upgraders.Upgrader;

public class UpgraderDataFactory extends AbstractDataFactory<Upgrader.UpgraderData> {

	public static final UpgraderDataFactory instance = new UpgraderDataFactory();
	
	@Override
	public Upgrader.UpgraderData fromFile(String name) {
		return get(String.format("data/upgraders/%s.json", name), Upgrader.UpgraderData.class);
	}

}

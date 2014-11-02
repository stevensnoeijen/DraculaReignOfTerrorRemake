package nl.heretichammer.draculareignofterrorremake.models.data.factories;

import nl.heretichammer.draculareignofterrorremake.models.map.Area.AreaData;

public class AreaDataFactory extends AbstractDataFactory<AreaData>{

	public static final AreaDataFactory instance = new AreaDataFactory();
	
	@Override
	public AreaData fromFile(String name) {
		return get(String.format("data/areas/%s.json", name), AreaData.class);
	}

}

package nl.heretichammer.draculareignofterrorremake.models.data.factories;

import nl.heretichammer.draculareignofterrorremake.models.items.containers.WeightItemContainer;

public class WeightItemContainerDataFactory extends AbstractDataFactory<WeightItemContainer.WeightItemContainerData> {

	public static final WeightItemContainerDataFactory instance = new WeightItemContainerDataFactory();
	
	@Override
	public WeightItemContainer.WeightItemContainerData fromFile(String name) {
		return get(String.format("data/items/%s.json", name), WeightItemContainer.WeightItemContainerData.class);
	}
}

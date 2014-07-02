package nl.heretichammer.draculareignofterrorremake.data.factories;

import nl.heretichammer.draculareignofterrorremake.items.containers.WeightItemContainer;
import nl.heretichammer.draculareignofterrorremake.items.containers.WeightItemContainer.WeightItemContainerModel;

public class WeightItemContainerDataFactory extends AbstractDataFactory<WeightItemContainer.WeightItemContainerModel> {

	public static final WeightItemContainerDataFactory instance = new WeightItemContainerDataFactory();
	
	@Override
	public WeightItemContainerModel fromFile(String name) {
		return get(String.format("data/items/%s.json", name), WeightItemContainer.WeightItemContainerModel.class);
	}
}

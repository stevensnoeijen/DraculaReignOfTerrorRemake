package nl.heretichammer.draculareignofterrorremake.data.factories;

import nl.heretichammer.draculareignofterrorremake.items.containers.BlockItemContainer;
import nl.heretichammer.draculareignofterrorremake.items.containers.ItemContainer;
import nl.heretichammer.draculareignofterrorremake.items.containers.ItemContainer.ItemContainerModel;

public class BlockItemContainerDataFactory extends AbstractDataFactory<BlockItemContainer.BlockItemContainerModel>{

	public static final BlockItemContainerDataFactory instance = new BlockItemContainerDataFactory();
	
	@Override
	public BlockItemContainer.BlockItemContainerModel fromFile(String name) {
		return get(String.format("data/items/%s.json", name), BlockItemContainer.BlockItemContainerModel.class);
	}
	
}

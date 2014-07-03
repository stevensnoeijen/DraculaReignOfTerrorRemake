package nl.heretichammer.draculareignofterrorremake.data.factories;

import nl.heretichammer.draculareignofterrorremake.items.containers.BlockItemContainer;

public class BlockItemContainerDataFactory extends AbstractDataFactory<BlockItemContainer.BlockItemContainerData>{

	public static final BlockItemContainerDataFactory instance = new BlockItemContainerDataFactory();
	
	@Override
	public BlockItemContainer.BlockItemContainerData fromFile(String name) {
		return get(String.format("data/items/%s.json", name), BlockItemContainer.BlockItemContainerData.class);
	}
	
}

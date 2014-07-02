package nl.heretichammer.draculareignofterrorremake.items.containers;

import nl.heretichammer.draculareignofterrorremake.data.DataManager;

public class ItemContainerFactory {
	public static ItemContainer<?> create(String name, Class<? extends ItemContainer<?>> type){
		if(type == BlockItemContainer.class) {
			return createBlockItemContainer(name);
		}else {
			//otherwise weight
			return createWeightItemContainer(name);
		}
	}
	
	public static BlockItemContainer createBlockItemContainer(String name) {
		return new BlockItemContainer( (BlockItemContainer.BlockItemContainerModel)DataManager.instance.getItemContainerData(name, BlockItemContainer.BlockItemContainerModel.class) );
	}
	
	public static WeightItemContainer createWeightItemContainer(String name) {
		return new WeightItemContainer( (WeightItemContainer.WeightItemContainerModel)DataManager.instance.getItemContainerData(name, WeightItemContainer.WeightItemContainerModel.class) );
	}
}

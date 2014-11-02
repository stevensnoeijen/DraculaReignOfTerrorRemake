package nl.heretichammer.draculareignofterrorremake.models.items.containers;

import nl.heretichammer.draculareignofterrorremake.models.data.DataManager;

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
		return new BlockItemContainer( (BlockItemContainer.BlockItemContainerData)DataManager.instance.getItemContainerData(name, BlockItemContainer.BlockItemContainerData.class) );
	}
	
	public static WeightItemContainer createWeightItemContainer(String name) {
		return new WeightItemContainer( (WeightItemContainer.WeightItemContainerData)DataManager.instance.getItemContainerData(name, WeightItemContainer.WeightItemContainerData.class) );
	}
}

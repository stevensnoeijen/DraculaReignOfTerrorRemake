package nl.heretichammer.draculareignofterrorremake.data;

import nl.heretichammer.draculareignofterrorremake.data.factories.AreaDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.BlockItemContainerDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.ItemDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.ItemProducerDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.TroopProducerDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.WeightItemContainerDataFactory;
import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.containers.BlockItemContainer;
import nl.heretichammer.draculareignofterrorremake.items.containers.ItemContainer;
import nl.heretichammer.draculareignofterrorremake.items.containers.WeightItemContainer;
import nl.heretichammer.draculareignofterrorremake.map.Area;
import nl.heretichammer.draculareignofterrorremake.producers.itemproducer.ItemProducer;
import nl.heretichammer.draculareignofterrorremake.producers.troopproducer.TroopProducer;

import com.badlogic.gdx.assets.AssetManager;

public class DataManager {
	public static final DataManager instance = new DataManager();
	
	public void setAssetManager(AssetManager assetManager) {
		ItemDataFactory.instance.setAssetManager(assetManager);
		AreaDataFactory.instance.setAssetManager(assetManager);
	}
	
	//items
	public Item.ItemModel getItemData(String name){
		return ItemDataFactory.instance.fromFile(name);
	}
	
	@SuppressWarnings("unchecked")
	public <T> T getItemContainerData(String name, Class<? extends ItemContainer.ItemContainerModel> type){
		if(type == BlockItemContainer.BlockItemContainerModel.class) {
			return (T) BlockItemContainerDataFactory.instance.fromFile(name);
		}else {
			//otherwise weight
			return (T) WeightItemContainerDataFactory.instance.fromFile(name);
		}
	}
	
	//areas
	public Area.AreaData getAreaData(String name){
		return AreaDataFactory.instance.fromFile(name);
	}
	
	//producers
	public TroopProducer.Model getTroopProducerData(String name){
		return TroopProducerDataFactory.instance.fromFile(name);
	}
	
	public ItemProducer.Model getItemProducerData(String name){
		return ItemProducerDataFactory.instance.fromFile(name);
	}
	
	//troops
	//units
}

package nl.heretichammer.draculareignofterrorremake.data;

import nl.heretichammer.draculareignofterrorremake.data.factories.AreaDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.ItemDataFactory;
import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.map.Area;

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
	
	//areas
	public Area.AreaData getAreaData(String name){
		return AreaDataFactory.instance.fromFile(name);
	}
	
	//producers
	//troops
	//units
}

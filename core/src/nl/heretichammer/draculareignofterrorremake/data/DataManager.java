package nl.heretichammer.draculareignofterrorremake.data;

import nl.heretichammer.draculareignofterrorremake.buildings.Building;
import nl.heretichammer.draculareignofterrorremake.data.factories.AccessUpgradeDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.AreaDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.BlockItemContainerDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.BuildingDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.ItemDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.ItemProducerDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.TroopProducerDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.UnitDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.UpgraderDataFactory;
import nl.heretichammer.draculareignofterrorremake.data.factories.WeightItemContainerDataFactory;
import nl.heretichammer.draculareignofterrorremake.exceptions.DataModelDontExistException;
import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.containers.BlockItemContainer;
import nl.heretichammer.draculareignofterrorremake.items.containers.ItemContainer;
import nl.heretichammer.draculareignofterrorremake.items.containers.WeightItemContainer;
import nl.heretichammer.draculareignofterrorremake.map.Area;
import nl.heretichammer.draculareignofterrorremake.producers.itemproducer.ItemProducer;
import nl.heretichammer.draculareignofterrorremake.producers.troopproducer.TroopProducer;
import nl.heretichammer.draculareignofterrorremake.unit.Unit;
import nl.heretichammer.draculareignofterrorremake.upgraders.Upgrader;
import nl.heretichammer.draculareignofterrorremake.upgraders.upgrades.AccessUpgrade;

public class DataManager {
	public static final DataManager instance = new DataManager();

	//items
	public Item.ItemData getItemData(String name){
		return ItemDataFactory.instance.fromFile(name);
	}
	
	@SuppressWarnings("unchecked")
	public <T> T getItemContainerData(String name, Class<? extends ItemContainer.ItemContainerData> type){		
		if(type == BlockItemContainer.BlockItemContainerData.class) {
			return (T) BlockItemContainerDataFactory.instance.fromFile(name);
		}else if(type == WeightItemContainer.WeightItemContainerData.class) {
			return (T) WeightItemContainerDataFactory.instance.fromFile(name);
		}else {
			throw new DataModelDontExistException();
		}
	}
	
	//areas
	public Area.AreaData getAreaData(String name){
		return AreaDataFactory.instance.fromFile(name);
	}
	
	//producers
	public TroopProducer.TroopProducerData getTroopProducerData(String name){
		return TroopProducerDataFactory.instance.fromFile(name);
	}
	
	public ItemProducer.ItemProducerData getItemProducerData(String name){
		return ItemProducerDataFactory.instance.fromFile(name);
	}
	
	//upgrader
	public Upgrader.UpgraderData getUpgraderData(String name){
		return UpgraderDataFactory.instance.fromFile(name);
	}
	
	//upgrade
	public AccessUpgrade.AccessUpgradeData getAccessUpgradeData(String name){
		return AccessUpgradeDataFactory.instance.fromFile(name);
	}

	//troops
	//units
	public Unit.UnitData getUnitData(String name){
		return UnitDataFactory.instance.fromFile(name);
	}
	
	//buildings
	public Building.BuildingData getBuildingData(String name, int level){
		return BuildingDataFactory.instance.fromFile(name + "-" + level);
	}
}

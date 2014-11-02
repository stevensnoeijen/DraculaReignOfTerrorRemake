package nl.heretichammer.draculareignofterrorremake.models.data;

import nl.heretichammer.draculareignofterrorremake.exceptions.DataModelDontExistException;
import nl.heretichammer.draculareignofterrorremake.models.buildings.Building;
import nl.heretichammer.draculareignofterrorremake.models.data.factories.AccessUpgradeDataFactory;
import nl.heretichammer.draculareignofterrorremake.models.data.factories.AreaDataFactory;
import nl.heretichammer.draculareignofterrorremake.models.data.factories.BlockItemContainerDataFactory;
import nl.heretichammer.draculareignofterrorremake.models.data.factories.BuildingDataFactory;
import nl.heretichammer.draculareignofterrorremake.models.data.factories.ItemDataFactory;
import nl.heretichammer.draculareignofterrorremake.models.data.factories.ItemProducerDataFactory;
import nl.heretichammer.draculareignofterrorremake.models.data.factories.TroopProducerDataFactory;
import nl.heretichammer.draculareignofterrorremake.models.data.factories.UnitDataFactory;
import nl.heretichammer.draculareignofterrorremake.models.data.factories.UpgraderDataFactory;
import nl.heretichammer.draculareignofterrorremake.models.data.factories.WeightItemContainerDataFactory;
import nl.heretichammer.draculareignofterrorremake.models.items.Item;
import nl.heretichammer.draculareignofterrorremake.models.items.containers.BlockItemContainer;
import nl.heretichammer.draculareignofterrorremake.models.items.containers.ItemContainer;
import nl.heretichammer.draculareignofterrorremake.models.items.containers.WeightItemContainer;
import nl.heretichammer.draculareignofterrorremake.models.map.Area;
import nl.heretichammer.draculareignofterrorremake.models.producers.itemproducer.ItemProducer;
import nl.heretichammer.draculareignofterrorremake.models.producers.troopproducer.TroopProducer;
import nl.heretichammer.draculareignofterrorremake.models.unit.Unit;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.Upgrader;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.upgrades.AccessUpgrade;

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

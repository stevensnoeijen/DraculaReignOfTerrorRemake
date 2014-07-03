package nl.heretichammer.draculareignofterrorremake.utils;

import java.util.List;

import nl.heretichammer.draculareignofterrorremake.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;

public class DRoTRUtils {
	
	public static void setTeam(Team team, List<Teamable> teamables) {
		for(Teamable teamable : teamables) {
			teamable.setTeam(team);
		}
	}
	
	public static void setTeam(Team team, Teamable... teamables) {
		for(Teamable teamable : teamables) {
			teamable.setTeam(team);
		}
	}
	
	public static void setItemSupplier(ItemSupplier itemSupplier, List<ItemSuppliable> itemSuppliables) {
		for(ItemSuppliable itemSuppliable : itemSuppliables) {
			itemSuppliable.setItemSupplier(itemSupplier);
		}
	}
	
	public static void setItemSupplier(ItemSupplier itemSupplier, ItemSuppliable... itemSuppliables) {
		for(ItemSuppliable itemSuppliable : itemSuppliables) {
			itemSuppliable.setItemSupplier(itemSupplier);
		}
	}
}

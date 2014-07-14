package nl.heretichammer.draculareignofterrorremake.map;

import com.badlogic.gdx.graphics.Color;

import nl.heretichammer.draculareignofterrorremake.tbs.TBSObject;
import nl.heretichammer.draculareignofterrorremake.team.Team;

public class World implements TBSObject {
	private int year = 1456;
	private int week = 1;
	
	public final Teams teams;
	public final Areas areas;
	
	public World() {
		teams = new Teams();
		areas = new Areas();
	}
	
	public static class Teams {
		public static final Team transylvania = new Team("Transylvania", Color.BLUE);
		public static final Team turks = new Team("Turks", Color.RED);
		
		public static Team byName(String name) {
			if(name.equals("turks")) {
				return turks;
			}else {
				return transylvania;
			}
		}
		
		private Teams() {
			
		}
	}
	
	public final class Areas {
		public final Area sibiu = AreaFactory.create("sibiu");
		public final Area fagaras = AreaFactory.create("fagaras");
		public final Area curtea = AreaFactory.create("curtea");
		public final Area brasov = AreaFactory.create("brasov");
		public final Area pitesti = AreaFactory.create("pitesti");
		public final Area tirgo = AreaFactory.create("tirgo");
		public final Area snagov = AreaFactory.create("snagov");
		public final Area giurgiu = AreaFactory.create("giurgiu");
		public final Area braila = AreaFactory.create("braila");
		public final Area hirsova = AreaFactory.create("hirsova");
		public final Area rasova = AreaFactory.create("rasova");
		public final Area ostrov = AreaFactory.create("ostrov");
		
		private Areas() {
			
		}
	}

	@Override
	public void turn() {
		if(week == 52) {
			year++;
			week = 1;
		}else {
			week++;
		}
	}
	
	public int getWeek() {
		return week;
	}
	
	public int getYear() {
		return year;
	}
}

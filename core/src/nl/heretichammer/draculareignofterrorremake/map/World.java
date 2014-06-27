package nl.heretichammer.draculareignofterrorremake.map;

import com.badlogic.gdx.graphics.Color;

import nl.heretichammer.draculareignofterrorremake.team.Team;

public class World {
	public final Teams teams;
	public final Areas areas;
	
	public World() {
		teams = new Teams();
		areas = new Areas();
	}
	
	public final class Teams {
		public final Team transylvania = new Team("Transylvania", Color.BLUE);
		public final Team turks = new Team("Turks", Color.RED);
		
		private Teams() {
		}
	}
	
	public final class Areas {
		public final Area sibiu = new Area("Sibiu", teams.turks);
		public final Area fagaras = new Area("Fagaras", teams.transylvania);
		public final Area curtea = new Area("Curtea", teams.turks);
		public final Area brasov = new Area("Brasov", teams.turks);
		public final Area pitesti = new Area("Pitesti", teams.turks);
		public final Area tirgo = new Area("Tirgo", teams.turks);
		public final Area snagov = new Area("Snagov", teams.turks);
		public final Area giurgiu = new Area("Giurgiu", teams.turks);
		public final Area braila = new Area("Braila", teams.turks);
		public final Area hirsova = new Area("Hirsova", teams.turks);
		public final Area rasova = new Area("Rasova", teams.turks);
		public final Area ostrov = new Area("Ostrov", teams.turks);
		
		private Areas() {
			
		}
	}
}

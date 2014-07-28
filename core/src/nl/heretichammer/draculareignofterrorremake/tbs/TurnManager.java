package nl.heretichammer.draculareignofterrorremake.tbs;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

public class TurnManager {

	private Turnable current;
	private Queue<Turnable> queue = new LinkedList<Turnable>();
	
	public void addTurn(Turnable turnable) {
		queue.offer(turnable);
	}
	
	public void addTurns(Turnable...turnables) {
		queue.addAll(Arrays.asList(turnables));
	}
	
	public void nextTurn() {
		current = queue.poll();//replace current
		if(current != null) {
			current.turn();
		}
	}
	
	public boolean isEmpty() {
		return queue.isEmpty();
	}
	
	public void done(Turnable turnable) {
		if(current == turnable) {//if is current
			nextTurn();
		}
	}
	
	public static final TurnManager instance = new TurnManager();
}

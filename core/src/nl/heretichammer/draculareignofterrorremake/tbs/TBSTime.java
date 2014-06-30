package nl.heretichammer.draculareignofterrorremake.tbs;

import java.util.LinkedList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.Time;

public final class TBSTime implements Time, TBSObject {
	private int currentTurn;
	private boolean started = false;
	private boolean paused = false;
	private List<TBSTime.Task> tasks = new LinkedList<TBSTime.Task>();
	
	private TBSTime(int currentTurns) {
		this.currentTurn = currentTurns;
	}
	
	private TBSTime() {
		this(0);
	}
	
	@Override
	public void start() {
		started = true;
		paused = false;
		reset();
	}
	
	@Override
	public boolean isStarted() {
		return started;
	}

	@Override
	public void stop() {
		reset();
		pause();
		started = false;
	}

	/**
	 * Reset {@link #currentTurn} to 0.
	 */
	@Override
	public void reset() {
		currentTurn = 0;
		tasks.clear();
	}

	@Override
	public void pause() {
		paused = true;
	}

	@Override
	public void turn() {
		if(!paused){
			currentTurn++;
			//update tasks
			for(TBSTime.Task task : tasks) {
				task.current++;
				task.turn();
				if(task.isDone()) {
					task.done();
					tasks.remove(task);//may cause problems (if so remove with async colleciton or after for-loop)
				}
			}			
		}
	}

	public int getCurrentTurn() {
		return currentTurn;
	}
	
	public void schedule(TBSTime.Task task) {
		tasks.add(task);
	}
	
	public static abstract class Task implements TBSObject {
		public final int delay;
		private int current = 0;
		
		public Task(int delay) {
			this.delay = delay;
		}
		
		public boolean isDone() {
			return current >= delay;
		}
		
		/**
		 * Override for done callback.
		 */
		public abstract void done();
		
		public int getCurrent() {
			return current;
		}
	}
	
	public static final TBSTime instance = new TBSTime();
}

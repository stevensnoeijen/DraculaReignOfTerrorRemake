package nl.heretichammer.draculareignofterrorremake.tbs;

import nl.heretichammer.draculareignofterrorremake.Timer;

public final class TBSTimer implements Timer, TBSObject {
	private final int maxTurns;
	private int currentTurn;
	
	private boolean started = false;
	private boolean paused = false;
	private boolean autoReset = false;
	
	public TBSTimer(int maxTurns, int currentTurns) {
		this.maxTurns = maxTurns;
		this.currentTurn = currentTurns;
	}
	
	public TBSTimer(int maxTurns) {
		this(maxTurns, 0);
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
	}

	@Override
	public void pause() {
		paused = true;
	}

	@Override
	public boolean isDone() {
		return currentTurn == maxTurns;
	}

	@Override
	public void turn() {
		if(!paused && !isDone()){
			currentTurn++;
		}
	}

	@Override
	public void setAutoReset(boolean autoRestart) {
		this.autoReset = autoRestart;
	}

	@Override
	public boolean isAutoReset() {
		return autoReset;
	}
	
	public int getCurrentTurn() {
		return currentTurn;
	}
	
	public int getMaxTurns() {
		return maxTurns;
	}
	
	public static class Args {
		public int maxTurns = 0;
		public int currentTurns = 0;
	}
}

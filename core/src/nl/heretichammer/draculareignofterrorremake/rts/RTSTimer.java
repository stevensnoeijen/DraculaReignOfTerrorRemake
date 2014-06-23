package nl.heretichammer.draculareignofterrorremake.rts;

import nl.heretichammer.draculareignofterrorremake.Timer;

import com.badlogic.gdx.Gdx;

public final class RTSTimer implements Timer, RTSObject {
	private float currentTime;
	private final float maxTime;
	private float restTime = 0.0f;
	
	private boolean started = false;
	private boolean done = false;
	private boolean paused = false;
	private boolean autoReset = false;
	
	public RTSTimer(float maxTime, float currentTime) {
		this.maxTime = maxTime;
		this.currentTime = currentTime;
	}
	
	public RTSTimer(float maxTime) {
		this(maxTime, 0);
	}
	
	@Override
	public void start() {
		paused = false;
		reset();
		started = true;
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

	@Override
	public void reset() {
		currentTime = 0.0f;
		done = false;
		if(restTime != 0.0f){
			currentTime += restTime;
			restTime = 0.0f;
		}
	}

	@Override
	public void pause() {
		paused = true;
	}

	@Override
	public boolean isDone() {
		return done;
	}

	@Override
	public void setAutoReset(boolean autoReset) {
		this.autoReset = autoReset;
	}

	@Override
	public boolean isAutoReset() {
		return autoReset;
	}

	@Override
	public void update() {
		if(!paused){
			float elapsed = Gdx.graphics.getDeltaTime();
			if(currentTime + elapsed >= maxTime){//if elapsed is more then needed
				done = true;
				currentTime = maxTime;
				if(autoReset){
					restTime = (currentTime + elapsed)- maxTime;//left over time is taken for the next one
				}
			}
		}
	}
}

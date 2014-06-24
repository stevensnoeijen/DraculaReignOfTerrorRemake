package nl.heretichammer.draculareignofterrorremake.rts;

import java.util.LinkedList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.Time;

import com.badlogic.gdx.Gdx;

public final class RTSTimer implements Time, RTSObject {
	private float currentTime;
	private boolean started = false;
	private boolean paused = false;
	private List<RTSTimer.Task> tasks = new LinkedList<RTSTimer.Task>();
	
	public RTSTimer(float currentTime) {
		this.currentTime = currentTime;
	}
	
	public RTSTimer() {
		this(0);
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
		tasks.clear();
	}

	@Override
	public void pause() {
		paused = true;
	}

	@Override
	public void update() {
		if(!paused){
			float elapsed = Gdx.graphics.getDeltaTime();
			currentTime += elapsed;
			for(Task task : tasks) {
				task.current += elapsed;
				if(task.current % task.updateInterval <= elapsed) {//update if interval passed
					task.update();
				}
				if(task.isDone()) {
					task.done();
					tasks.remove(task);//may cause problems (if so remove with async colleciton or after for-loop)
				}
			}
		}
	}
	
	public static abstract class Task implements RTSObject {
		public final float updateInterval;
		public final float delay;
		private float current = 0;
		
		public Task(float delay, float updateInterval) {
			this.delay = delay;
			this.updateInterval = updateInterval;
		}
		
		public Task(float delay) {
			this(delay, 1f);
		}
		
		public boolean isDone() {
			return current >= delay;
		}
		
		public abstract void done();
		
		public float getCurrent() {
			return current;
		}
	}
}

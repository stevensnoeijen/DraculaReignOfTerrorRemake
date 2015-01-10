package nl.heretichammer.draculareignofterrorremake.eventbus;

import com.badlogic.gdx.utils.Pool.Poolable;

public interface Event extends Poolable {
	public Object getSource();
}

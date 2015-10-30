package nl.heretichammer.draculareignofterrorremake.component;

import com.badlogic.ashley.core.Component;
import com.badlogic.gdx.math.Vector2;

public class PositionComponent extends Component {
	public final Vector2 position;
	
	public PositionComponent(Vector2 position) {
		this.position = position;
	}
	
	public PositionComponent(){
		this(new Vector2());
	}
}

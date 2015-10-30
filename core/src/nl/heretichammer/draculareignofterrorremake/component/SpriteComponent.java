package nl.heretichammer.draculareignofterrorremake.component;

import com.badlogic.gdx.graphics.g2d.Sprite;

public class SpriteComponent {
	public final Sprite sprite;
	
	public SpriteComponent(Sprite sprite) {
		this.sprite = new Sprite();
	}
	
	public SpriteComponent() {
		this(new Sprite());
	}
}

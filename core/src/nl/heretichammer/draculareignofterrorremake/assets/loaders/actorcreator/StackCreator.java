package nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator;

import nl.heretichammer.draculareignofterrorremake.assets.loaders.ActorLoader;

import com.badlogic.gdx.scenes.scene2d.ui.Stack;
import com.badlogic.gdx.utils.XmlReader.Element;

public class StackCreator extends WidgetGroupCreator<Stack> {
	
	public StackCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}
	
	@Override
	public String getName() {
		return "stack";
	}

	@Override
	public Stack create(Element element, Object context) {
		Stack stack = new Stack();
		set(stack,  element, context);
		return stack;
	}
}

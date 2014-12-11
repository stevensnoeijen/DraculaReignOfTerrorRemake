package nl.heretichammer.draculareignofterrorremake.utils.actorcreator;

import nl.heretichammer.draculareignofterrorremake.utils.ActorLoader;

import com.badlogic.gdx.scenes.scene2d.ui.Stack;
import com.badlogic.gdx.utils.XmlReader.Element;

public class StackCreator extends WidgetGroupCreator<Stack> {
	
	public StackCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}

	@Override
	public Stack create(Element element, Object context) {
		Stack stack = new Stack();
		set(stack,  element, context);
		return stack;
	}
}

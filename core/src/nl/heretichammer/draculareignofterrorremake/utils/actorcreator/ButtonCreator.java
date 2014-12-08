package nl.heretichammer.draculareignofterrorremake.utils.actorcreator;

import java.text.AttributedCharacterIterator;

import nl.heretichammer.draculareignofterrorremake.utils.ActorLoader;

import com.badlogic.gdx.scenes.scene2d.ui.Button;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader.Element;

public class ButtonCreator<T extends Button> extends WidgetGroupCreator<T> {

	public ButtonCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}
	
	@Override
	protected void set(Button button, Element element) {
		super.set(button, element);
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes.containsKey("checked")){
			button.setChecked(Boolean.parseBoolean(attributes.get("checked")));
		}
		if(attributes.containsKey("disabled")){
			button.setDisabled(Boolean.parseBoolean(attributes.get("disabled")));
		}
	}
}

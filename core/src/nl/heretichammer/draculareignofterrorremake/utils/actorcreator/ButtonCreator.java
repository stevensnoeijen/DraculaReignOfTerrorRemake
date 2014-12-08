package nl.heretichammer.draculareignofterrorremake.utils.actorcreator;

import nl.heretichammer.draculareignofterrorremake.utils.ActorLoader;

import com.badlogic.gdx.scenes.scene2d.ui.Button;
import com.badlogic.gdx.scenes.scene2d.ui.ButtonGroup;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader.Element;

public class ButtonCreator<T extends Button> extends WidgetGroupCreator<T> {

	/**
	 * All buttongroups created by name
	 */
	private ObjectMap<String, ButtonGroup> buttongroups = new ObjectMap<String, ButtonGroup>();
	
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
		if(attributes.containsKey("group")){
			String name = attributes.get("group");
			if(!buttongroups.containsKey(name)){//if dont exist, create buttongroup
				ButtonGroup buttonGroup = new ButtonGroup();
				buttongroups.put(name, buttonGroup);
			}
			buttongroups.get(name).add(button);//add button to group
		}
	}
	
	@Override
	public void reset() {
		super.reset();
		buttongroups.clear();
	}
}

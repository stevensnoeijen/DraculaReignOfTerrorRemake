package nl.heretichammer.draculareignofterrorremake.utils.actorcreator;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import nl.heretichammer.draculareignofterrorremake.utils.ActorLoader;

import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.ui.Button;
import com.badlogic.gdx.scenes.scene2d.ui.ButtonGroup;
import com.badlogic.gdx.scenes.scene2d.utils.ClickListener;
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
	protected void set(Button button, Element element, final Object context) {
		super.set(button, element, context);
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
		if(attributes.containsKey("click")){
			try {
				String click = attributes.get("click");
				final Method method = context.getClass().getMethod(click, InputEvent.class);
				button.addListener(new ClickListener(){
					@Override
					public void clicked(InputEvent event, float x, float y) {
						try {
							method.invoke(context, event);
						} catch (IllegalAccessException | IllegalArgumentException	| InvocationTargetException ex) {
							throw new RuntimeException(ex);
						}
					}
				});
			} catch (IllegalArgumentException | NoSuchMethodException | SecurityException ex) {
				throw new RuntimeException(ex);
			}
		}
	}
	
	@Override
	public void reset() {
		super.reset();
		buttongroups.clear();
	}
}

package nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator;

import nl.heretichammer.draculareignofterrorremake.assets.AssetUtils;

import com.badlogic.gdx.assets.AssetDescriptor;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.scenes.scene2d.ui.Button;
import com.badlogic.gdx.scenes.scene2d.ui.ButtonGroup;
import com.badlogic.gdx.scenes.scene2d.utils.Drawable;
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
	}
	
	protected void setStyleProperties(Button.ButtonStyle style, ObjectMap<String, String> attributes) {
		if(attributes.containsKey("checked")){
			style.checked = actorLoader.getAsset(attributes.get("checked"), Drawable.class);
		}
		if(attributes.containsKey("checkedover")){
			style.checkedOver = actorLoader.getAsset(attributes.get("checkedover"), Drawable.class);
		}
		if(attributes.containsKey("disabled")){
			style.disabled = actorLoader.getAsset(attributes.get("disabled"), Drawable.class);
		}
		if(attributes.containsKey("down")){
			style.down = actorLoader.getAsset(attributes.get("down"), Drawable.class);
		}
		if(attributes.containsKey("over")){
			style.over = actorLoader.getAsset(attributes.get("over"), Drawable.class);
		}
		if(attributes.containsKey("pressedoffsetx")){
			style.pressedOffsetX = Float.parseFloat(attributes.get("pressedoffsetx"));
		}
		if(attributes.containsKey("pressedoffsety")){
			style.pressedOffsetY = Float.parseFloat(attributes.get("pressedoffsety"));
		}
		if(attributes.containsKey("unpressedoffsetx")){
			style.unpressedOffsetX = Float.parseFloat(attributes.get("unpressedoffsetx"));
		}
		if(attributes.containsKey("unpressedoffsety")){
			style.unpressedOffsetY = Float.parseFloat(attributes.get("unpressedoffsety"));
		}
		if(attributes.containsKey("up")){
			style.up = actorLoader.getAsset(attributes.get("up"), Drawable.class);
		}
	}
	
	@Override
	public void reset() {
		super.reset();
		buttongroups.clear();
	}
}

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
	
	@SuppressWarnings("rawtypes")
	@Override
	public ObjectMap<String, AssetDescriptor> getDependencies(Element element) {
		ObjectMap<String, AssetDescriptor> dependencies = super.getDependencies(element);
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes.containsKey("style")){
			String style = attributes.get("style");
			String[] args = style.replaceAll(SPACE, "").split(SEPERATOR);
			for(String arg : args){
				String[] keyval = arg.split("=");
				String key = keyval[0];
				String value = keyval[1];
				
				if(key.equals("checked") || key.equalsIgnoreCase("checkedOver") || key.equals("disabled") || key.equals("down") || key.equals("over") || key.equals("up")){
					AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getFileName(value), TextureAtlas.class);
					dependencies.put(assetDescriptor.fileName, assetDescriptor);
				}
			}
		}
		
		return dependencies;
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
	
	protected void setStyleProperties(Button.ButtonStyle style, String attributes) {
		for(String attribute : attributes.replaceAll(SPACE, "").split(",")){
			String[] args = attribute.split("=");
			String key = args[0];
			String value = args[1];
			
			if(key.equals("checked")){
				style.checked = actorLoader.getAsset(value, Drawable.class);
			}
			if(key.equalsIgnoreCase("checkedOver")){
				style.checkedOver = actorLoader.getAsset(value, Drawable.class);
			}
			if(key.equals("disabled")){
				style.disabled = actorLoader.getAsset(value, Drawable.class);
			}
			if(key.equals("down")){
				style.down = actorLoader.getAsset(value, Drawable.class);
			}
			if(key.equals("over")){
				style.over = actorLoader.getAsset(value, Drawable.class);
			}
			if(key.equalsIgnoreCase("pressedOffsetX")){
				style.pressedOffsetX = Float.parseFloat(value);
			}
			if(key.equalsIgnoreCase("pressedOffsetY")){
				style.pressedOffsetY = Float.parseFloat(value);
			}
			if(key.equalsIgnoreCase("unpressedOffsetX")){
				style.unpressedOffsetX = Float.parseFloat(value);
			}
			if(key.equalsIgnoreCase("unpressedOffsetY")){
				style.unpressedOffsetY = Float.parseFloat(value);
			}
			if(key.equalsIgnoreCase("up")){
				style.up = actorLoader.getAsset(value, Drawable.class);
			}
		}
	}
	
	@Override
	public void reset() {
		super.reset();
		buttongroups.clear();
	}
}

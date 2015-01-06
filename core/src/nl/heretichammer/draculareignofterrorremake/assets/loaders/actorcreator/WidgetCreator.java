package nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator;

import com.badlogic.gdx.scenes.scene2d.ui.Widget;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader.Element;

import nl.heretichammer.draculareignofterrorremake.assets.loaders.ActorLoader;

public abstract class WidgetCreator<T extends Widget> extends ActorCreator<T> {

	public WidgetCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}
	
	@Override
	protected void set(T widget, Element element, Object context) {
		super.set(widget, element, context);
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes != null){
			if(attributes.containsKey("fillparent")){
				widget.setFillParent(Boolean.parseBoolean(attributes.get("fillparent")));
			}
			if(attributes.containsKey("layoutenabled")){
				widget.setLayoutEnabled(Boolean.parseBoolean(attributes.get("layoutenabled")));
			}
			if(attributes.containsKey("pack") && Boolean.parseBoolean(attributes.get("pack"))){//if pack is set to true
				widget.pack();
			}
		}
	}
}

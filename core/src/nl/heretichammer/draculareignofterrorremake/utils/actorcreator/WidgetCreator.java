package nl.heretichammer.draculareignofterrorremake.utils.actorcreator;

import com.badlogic.gdx.scenes.scene2d.ui.Widget;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader.Element;

import nl.heretichammer.draculareignofterrorremake.utils.ActorLoader;

public abstract class WidgetCreator<T extends Widget> extends ActorCreator<T> {

	public WidgetCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}
	
	@Override
	protected void set(T widget, Element element) {
		super.set(widget, element);
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes != null){
			if(attributes.containsKey("fillparent")){
				widget.setFillParent(Boolean.parseBoolean(attributes.get("fillparent")));
			}
			if(attributes.containsKey("layoutenabled")){
				widget.setLayoutEnabled(Boolean.parseBoolean(attributes.get("layoutenabled")));
			}
		}
	}
}

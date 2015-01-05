package nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator;

import nl.heretichammer.draculareignofterrorremake.assets.loaders.ActorLoader;

import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.Window;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader.Element;

public class WindowCreator<T extends Window> extends TableCreator<T> {

	public WindowCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}

	@Override
	public T create(Element element, Object context) {
		Skin skin = actorLoader.getLoadedAsset(element.get("skin"), Skin.class);
		Window window = new Window(element.get("title"), skin);
		set(window, element, context);
		return (T) window;
	}
	
	@Override
	protected void set(Window window, Element element, Object context) {
		super.set(window, element, context);
		ObjectMap<String, String> attributes = element.getAttributes();
		
		if(attributes.containsKey("keepwithinstage")){
			window.setKeepWithinStage(Boolean.getBoolean(attributes.get("keepwithinstage")));
		}
		if(attributes.containsKey("modal")){
			window.setModal(Boolean.parseBoolean(attributes.get("modal")));
		}
		if(attributes.containsKey("movable")){
			window.setMovable(Boolean.parseBoolean(attributes.get("movable")));
		}
		if(attributes.containsKey("resizable")){
			window.setResizable(Boolean.parseBoolean(attributes.get("resizable")));
		}
		if(attributes.containsKey("resizeborder")){
			window.setResizeBorder(Integer.parseInt(attributes.get("resizeborder")));
		}
		if(attributes.containsKey("titlealignment")){
			window.setTitleAlignment(Integer.parseInt(attributes.get("titlealignment")));
		}
	}
	
	@Override
	protected void add(T window, Element element, Object context) {
		window.addActor( actorLoader.create(element, context) );
	}
}

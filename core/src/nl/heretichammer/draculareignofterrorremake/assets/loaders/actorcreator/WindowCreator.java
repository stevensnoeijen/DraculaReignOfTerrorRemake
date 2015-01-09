package nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator;

import com.badlogic.gdx.assets.AssetDescriptor;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.Window;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader.Element;

public class WindowCreator<T extends Window> extends TableCreator<T> {

	public WindowCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}
	
	@Override
	public String getName() {
		return "window";
	}

	@SuppressWarnings("rawtypes")
	@Override
	public ObjectMap<String, AssetDescriptor> getDependencies(Element element) {
		ObjectMap<String, AssetDescriptor> dependencies = new ObjectMap<String, AssetDescriptor>();
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes.containsKey("skin")){
			AssetDescriptor<Skin> assetDescriptor = new AssetDescriptor<Skin>(element.get("skin"), Skin.class);
			dependencies.put(assetDescriptor.fileName, assetDescriptor);
		}
		return dependencies;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public T create(Element element, Object context) {
		String title = "";
		if(element.getAttributes().containsKey("title")){
			title = element.get("title");
		}
		Skin skin = actorLoader.getAsset(element.get("skin"), Skin.class);
		Window window = new Window(title, skin);
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

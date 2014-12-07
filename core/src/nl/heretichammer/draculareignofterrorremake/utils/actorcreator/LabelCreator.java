package nl.heretichammer.draculareignofterrorremake.utils.actorcreator;

import nl.heretichammer.draculareignofterrorremake.utils.ActorLoader;

import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader.Element;

public class LabelCreator extends WidgetCreator<Label> {

	public LabelCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}
	
	@Override
	public Label create(Element element) {
		String text = element.get("text");
		Skin skin =  actorLoader.getLoadedAsset(element.get("skin"), Skin.class);
		Label label = new Label(text, skin);
		set(label, element);
		return label;
	}
	
	@Override
	protected void set(Label label, Element element) {
		super.set(label, element);
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes != null){
			if(attributes.containsKey("alignment")){
				String[] args = attributes.get("alignment").replace(SPACE, "").split(SEPERATOR);
				if(args.length == 1){
					label.setAlignment(parseAlignment(args[0]));
				}else{//2
					label.setAlignment(parseAlignment(args[0]), parseAlignment(args[1]));
				}
			}
			if(attributes.containsKey("ellipsis")){
				label.setEllipse(Boolean.parseBoolean(attributes.get("ellipsis")));
			}
			if(attributes.containsKey("fontscalex")){
				label.setFontScaleX(Float.parseFloat(attributes.get("fontscalex")));
			}
			if(attributes.containsKey("fontscaley")){
				label.setFontScaleY(Float.parseFloat(attributes.get("fontscaley")));
			}
			if(attributes.containsKey("wrap")){
				label.setWrap(Boolean.parseBoolean(attributes.get("wrap")));
			}
		}
	}
}

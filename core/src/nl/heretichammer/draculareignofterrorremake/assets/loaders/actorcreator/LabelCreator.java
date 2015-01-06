package nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator;

import nl.heretichammer.draculareignofterrorremake.assets.loaders.ActorLoader;

import com.badlogic.gdx.graphics.g2d.BitmapFont.TextBounds;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader.Element;

public class LabelCreator extends WidgetCreator<Label> {

	public LabelCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}
	
	@Override
	public Label create(Element element, Object context) {
		String text = "";
		if(element.getAttributes().containsKey("text")){
			text = element.get("text");
		}
		Skin skin =  actorLoader.getLoadedAsset(element.get("skin"), Skin.class);
		Label label = new Label(text, skin);
		set(label, element, context);
		return label;
	}
	
	@Override
	protected void set(Label label, Element element, Object context) {
		super.set(label, element, context);
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes != null){
			if(attributes.containsKey("alignment")){
				String[] args = attributes.get("alignment").replaceAll(SPACE, "").split(SEPERATOR);
				if(args.length == 1){
					label.setAlignment(parseAlignment(args[0]));
				}else{//2
					label.setAlignment(parseAlignment(args[0]), parseAlignment(args[1]));
				}
			}
			if(attributes.containsKey("ellipsis")){
				label.setEllipse(Boolean.parseBoolean(attributes.get("ellipsis")));
			}
			if(attributes.containsKey("fontscale")){
				String[] args = attributes.get("fontscale").replaceAll(SPACE, "").split(SPACE);
				if(args.length == 1){
					label.setFontScale(Float.parseFloat(args[0]));
				}else{
					label.setFontScale(Float.parseFloat(args[0]), Float.parseFloat(args[1]));
				}
			}
			if(attributes.containsKey("wrap")){
				label.setWrap(Boolean.parseBoolean(attributes.get("wrap")));
			}
			if(attributes.containsKey("layout") && Boolean.parseBoolean(attributes.get("layout"))){//if pack is set to true
				label.layout();
			}
		}
	}
}

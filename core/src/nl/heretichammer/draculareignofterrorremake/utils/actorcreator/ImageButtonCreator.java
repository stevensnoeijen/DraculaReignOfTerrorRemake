package nl.heretichammer.draculareignofterrorremake.utils.actorcreator;

import java.lang.reflect.Field;

import nl.heretichammer.draculareignofterrorremake.utils.ActorLoader;

import com.badlogic.gdx.scenes.scene2d.ui.ImageButton;
import com.badlogic.gdx.scenes.scene2d.ui.ImageButton.ImageButtonStyle;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader;
import com.badlogic.gdx.utils.XmlReader.Element;

public class ImageButtonCreator extends ButtonCreator<ImageButton>{

	public ImageButtonCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}

	@Override
	public ImageButton create(Element element) {
		ImageButton imageButton;
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes != null){
			if(attributes.containsKey("skin")){
				Skin skin = actorLoader.getLoadedAsset(attributes.get("skin"), Skin.class);
				imageButton = new ImageButton(skin);
			}else{
				ImageButton.ImageButtonStyle style = createStyle(element.getChildByName("style"));
				imageButton = new ImageButton(style);
			}
		}else{
			throw new IllegalArgumentException("imagebutton must have a skin or style set");
		}
		set(imageButton, element);
		return imageButton;
	}
	
	private ImageButton.ImageButtonStyle createStyle(Element element){
		ObjectMap<String, String> attributes = element.getAttributes();
		ImageButton.ImageButtonStyle style = new ImageButtonStyle();
		//dont check if attributes is not null becouse this must have some values
		try{
			for(Field field : ImageButton.ImageButtonStyle.class.getFields()){
				String fieldName = field.getName();
				if(attributes.containsKey(fieldName)){
					field.set(style, actorLoader.getLoadedAsset(attributes.get(fieldName), field.getType()));
				}
			}
		} catch (IllegalAccessException ex) {
			throw new RuntimeException(ex);
		}
		return style;
	}

	@Override
	protected void set(ImageButton actor, Element element) {
		super.set(actor, element);
	}
}

package nl.heretichammer.draculareignofterrorremake.utils.actorcreator;

import java.lang.reflect.Field;

import nl.heretichammer.draculareignofterrorremake.utils.ActorLoader;

import com.badlogic.gdx.scenes.scene2d.ui.ImageButton;
import com.badlogic.gdx.scenes.scene2d.ui.ImageButton.ImageButtonStyle;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.utils.Drawable;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader.Element;

public class ImageButtonCreator extends ButtonCreator<ImageButton>{

	public ImageButtonCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}

	@Override
	public ImageButton create(Element element, Object context) {
		ImageButton imageButton;
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes != null){
			if(attributes.containsKey("skin")){
				Skin skin = actorLoader.getLoadedAsset(attributes.get("skin"), Skin.class);
				imageButton = new ImageButton(skin);
			}else if(attributes.containsKey("style")){
				ImageButton.ImageButtonStyle style = createStyle(attributes.get("style"), context);
				imageButton = new ImageButton(style);
			}else{
				imageButton = new ImageButton((Drawable)null);
			}
		}else{
			throw new IllegalArgumentException("imagebutton must have a skin or style set");
		}
		set(imageButton, element, context);
		return imageButton;
	}
	
	private ImageButton.ImageButtonStyle createStyle(String attributes, Object context){
		attributes = attributes.replaceAll(SPACE, "");
		ImageButton.ImageButtonStyle style = new ImageButtonStyle();
		//dont check if attributes is not null becouse this must have some values
		try{
			for(String attribute : attributes.split(",")){
				String[] args = attribute.split("=");
				String key = args[0];
				String value = args[1];
				Field field = ImageButton.ImageButtonStyle.class.getField(key);
				field.set(style, actorLoader.getLoadedAsset(value, field.getType()));
			}
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
		return style;
	}

	@Override
	protected void set(ImageButton actor, Element element, Object context) {
		super.set(actor, element, context);
	}
}

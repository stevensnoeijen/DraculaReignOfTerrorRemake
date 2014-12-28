package nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator;

import nl.heretichammer.draculareignofterrorremake.assets.loaders.ActorLoader;

import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.utils.Align;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader;

public abstract class ActorCreator<T extends Actor> {
	public static final String SEPERATOR = ",";
	public static final String SPACE = "\\s+";
	
	protected final ActorLoader actorLoader;
	
	public ActorCreator(ActorLoader actorLoader) {
		this.actorLoader = actorLoader;
	}
	
	public abstract T create(XmlReader.Element element, Object context);
	
	/**
	 * Sets all attributes from element to the actor.
	 * @param actor
	 * @param element
	 */
	protected void set(T actor, XmlReader.Element element, Object context){
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes != null){
			if(attributes.containsKey("color")){
				actor.setColor(parseColor(attributes.get("color")));
			}
			if(attributes.containsKey("debug")){
				actor.setDebug(Boolean.parseBoolean(attributes.get("debug").split(SEPERATOR)[0]));
			}
			if(attributes.containsKey("height")){
				actor.setHeight(Float.parseFloat(attributes.get("height")));
			}
			if(attributes.containsKey("name")){
				actor.setName(attributes.get("name"));
			}
			if(attributes.containsKey("originx")){
				actor.setOriginX(Float.parseFloat(attributes.get("originx")));
			}
			if(attributes.containsKey("origin")){
				actor.setOrigin(parseAlignment(attributes.get("origin")));
			}
			if(attributes.containsKey("originy")){
				actor.setOriginY(Float.parseFloat(attributes.get("originy")));
			}
			if(attributes.containsKey("rotation")){
				actor.setRotation(Float.parseFloat(attributes.get("rotation")));
			}
			if(attributes.containsKey("scalex")){
				actor.setScaleX(Float.parseFloat(attributes.get("scalex")));
			}
			if(attributes.containsKey("scaley")){
				actor.setScaleY(Float.parseFloat(attributes.get("scaley")));
			}
			if(attributes.containsKey("visible")){
				actor.setVisible(Boolean.parseBoolean(attributes.get("visible")));
			}
			if(attributes.containsKey("width")){
				actor.setWidth(Float.parseFloat(attributes.get("width")));
			}
			if(attributes.containsKey("zindex")){
				actor.setZIndex(Integer.parseInt(attributes.get("zindex")));
			}
			if(attributes.containsKey("x")){
				actor.setX(Float.parseFloat(attributes.get("x")));
			}
			if(attributes.containsKey("y")){
				actor.setY(Float.parseFloat(attributes.get("y")));
			}
			if(attributes.containsKey("userobject")){
				actor.setUserObject(attributes.get("userobject"));
			}
		}
	}
	
	/**
	 * Should be called with the children of the element when {@link #set(Actor, com.badlogic.gdx.utils.XmlReader.Element, Object)} is called.
	 * @param actor
	 * @param element
	 * @param context
	 */
	protected void add(T actor, XmlReader.Element element, Object context){
		throw new UnsupportedOperationException();
	}
	
	protected int parseAlignment(String value){
		if(value.equals("bottom")){
			return Align.bottom;
		}else if(value.equals("bottomleft")){
			return Align.bottomLeft;
		}else if(value.equals("bottomright")){
			return Align.bottomRight;
		}else if(value.equals("center")){
			return Align.center;
		}else if(value.equals("left")){
			return Align.left;
		}else if(value.equals("right")){
			return Align.right;
		}else if(value.equals("top")){
			return Align.top;
		}else if(value.equals("topleft")){
			return Align.topLeft;
		}else if(value.equals("topright")){
			return Align.topRight;
		}else{
			throw new UnsupportedOperationException();
		}
	}
	
	protected Color parseColor(String value){
		try {
			return (Color) Color.class.getField(value.toUpperCase()).get(null);
		} catch (Exception ex) {
			throw new UnsupportedOperationException();
		}
	}
	
	/**
	 * Reset temp values saved while creating the actors. 
	 */
	public void reset(){
		
	}
}

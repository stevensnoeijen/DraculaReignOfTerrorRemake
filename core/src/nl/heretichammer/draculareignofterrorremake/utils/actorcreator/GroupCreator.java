package nl.heretichammer.draculareignofterrorremake.utils.actorcreator;

import nl.heretichammer.draculareignofterrorremake.utils.ActorLoader;

import com.badlogic.gdx.math.Rectangle;
import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader;
import com.badlogic.gdx.utils.XmlReader.Element;

public class GroupCreator<T extends Group> extends ActorCreator<T> {

	public GroupCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}
	
	@Override
	public T create(XmlReader.Element element, Object context) {
		Group group = new Group();
		set(group, element, context);
		return (T)group;
	}
	
	@Override
	protected void set(Group group, XmlReader.Element element, Object context) {
		super.set((T)group, element, context);
		
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes != null){
			if(attributes.containsKey("cullingarea")){
				group.setCullingArea(parseRectangle(attributes.get("cullingarea")));
			}
			if(attributes.containsKey("debug")){
				String[] args = attributes.get("debug").split(",");
				if(args.length == 2){
					group.setDebug(Boolean.parseBoolean(args[0]), Boolean.parseBoolean(args[1]));
				}
			}
		}
		int count = element.getChildCount();
		if(count > 0){
			//get actors
			for(int i = 0; i < count; i++){
				add((T)group, element.getChild(i), context);
			}
		}
	}
	
	@Override
	protected void add(T group, Element element, Object context) {
		group.addActor( actorLoader.create(element, context) );
	}
	
	protected Rectangle parseRectangle(String value){
		String[] args = value.split(",");
		return new Rectangle(Float.parseFloat(args[0]), Float.parseFloat(args[1]), Float.parseFloat(args[2]), Float.parseFloat(args[3]));
	}
}

package nl.heretichammer.draculareignofterrorremake.unit;

import java.util.EnumMap;
import java.util.HashMap;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.map.Area;
import nl.heretichammer.draculareignofterrorremake.map.Mappable;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Team.TeamColor;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.unit.Unit.UnitData.UnitMotionDescriptor;
import nl.heretichammer.draculareignofterrorremake.utils.CardinalDirection;
import nl.heretichammer.draculareignofterrorremake.utils.Consumer;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;

import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.math.Vector2;

public class Unit implements Cloneable, Teamable, Mappable {
	
	private UnitData data;
	
	private Team team;	
	public Vector2 position;
	
	public Unit(UnitData data) {
		this.data = data;
	}
	
	@Override
	protected Object clone() throws CloneNotSupportedException {
		return new Unit(data);
	}
	
	@Override
	public void setTeam(Team team) {
		this.team = team;
	}

	@Override
	public Team getTeam() {
		return team;
	}

	@Override
	public int getX() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getY() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void setPosition(int x, int y) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setArea(Area area) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Area getArea() {
		// TODO Auto-generated method stub
		return null;
	}
	
	/*
	//visitors
	private final Unit.ItemVisitor itemVisitor = new Unit.ItemVisitor();
	
	//properties
	private Unit target;
	private boolean moving = false;
	private boolean attacking = false;
	private boolean dying = false;
	private int energy;
	public Map<Unit.Attribute, Integer> attributes = new EnumMap<Unit.Attribute, Integer>(Unit.Attribute.class);
	
	private List<Effect> effects;
	
	private Team team;
	
	public Unit(Model model) {
		if(model==null)throw new IllegalArgumentException();
		this.model = model;
		_facing = DOWN;
		loadModel();
	}
	
	private void loadModel(){
		//set health
		health = model.maxHealth;
		
		if(model.hasAttributes){
			initAttributes();
		}
		if(model.canReceiveEffects){
			effects = new LinkedList<Effect>();
		}
		
		//load graphics
		loadGraphic(model.graphic.graphic, model.graphic.animated, model.graphic.reverse, model.graphic.width, model.graphic.height, model.graphic.unique);
		//add animations
		for(AnimationEvent animationEvent : model.animations){
			for(AnimationItemDescriptor animation : animationEvent.animations){
				addAnimation(animation.name, animation.frames, animation.frameRate, animation.looped);
			}
		}
		//load sounds
		for(SoundEvent soundEvent : model.sounds){
			for(SoundItemDescriptor sound : soundEvent.sounds){
				sounds.put(sound.embeddedSound, FlxG.loadSound(sound.embeddedSound, sound.volume, sound.looped, sound.autoDestroy, sound.autoPlay));
			}
		}
	}
	
	public void onSelect(){
		//play select sound
		SoundEvent soundEvent = model.findSound(_facing, moving, attacking, dying, attacking, true);
		if(soundEvent!=null){
			FlxSound sound = sounds.get(soundEvent.sounds.random().embeddedSound);
			sound.play();
		}
		
	}
	
	@Override
	public void setFacing(int Direction) {
		super.setFacing(Direction);
		updateEvent();
	}
	
	public Team getTeam() {
		return team;
	}
	
	public void setTeam(Team team) {
		this.team = team;
	}
	
	private void initAttributes(){
		attributes = new EnumMap<Unit.Attribute, Integer>(Unit.Attribute.class);
		if(model.defaultAttributes != null){
			attributes.putAll(model.defaultAttributes);
		}else{
			//fill all with 0
			for(Unit.Attribute attribute : Unit.Attribute.values()){
				attributes.put(attribute, 0);
			}
		}
	}
	
	public void receive(Effect effect){
		//TODO: check if it already has this effect from the same unit?
		effects.add(effect);
		//TODO: add recieving of buff and remove
	}
	
	public Item remove(Item item){
		
		return item;
	}
	
	public void receive(Item item){
		
	}
	
	@Override
	public void kill()
	{
		dying = true;
		alive = false;
		exists = true;
	}
	
	public int getMaxHealth(){
		return model.maxHealth;
	}
	
	public int getEnergy() {
		return energy;
	}
	
	public void addEnergy(int energy){
		if(this.energy + energy <= model.maxEnergy){
			this.energy += energy;
		}else{
			this.energy = model.maxEnergy;
		}
	}
	
	public void addHealth(int health){
		//TODO: if dead dont add/revive?
		if(this.health + health <= model.maxHealth){
			this.health += health;
		}else{
			this.health = model.maxHealth;
		}
	}
	
	public void attack(Unit unit){
		attacking = true;
		updateEvent();
	}
	
	@Override
	public void followPath(FlxPath Path, float Speed, int Mode, boolean AutoRotate) {
		moving = true;	
		attacking = false;
		updateEvent();
		super.followPath(Path, Speed, Mode, AutoRotate);
	}
	
	protected void updateEvent() {
		Unit.Model.AnimationEvent animationEvent = model.findAnimation(_facing, moving, attacking, dying, alive);
		AnimationItemDescriptor animation = animationEvent.animations.random();
		play(animation.name);
		
		SoundEvent soundEvent = model.findSound(_facing, moving, attacking, dying, alive, false);
		SoundItemDescriptor sound = soundEvent.sounds.random();
		playSound(sound.embeddedSound);
		super.updateAnimation();
	}
	
	protected void playSound(String name){
		//sound.proximity(x, x, this, Radius);
				//sound.play();
	}
	
	public void pushAbility(Ability ability){
		//TODO: implement
		throw new UnsupportedOperationException();
	}
	
	private class ItemVisitor implements Item.ItemVisitor {
		@Override
		public void visit(BaseItem item) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void visit(Resource resource) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void visit(Key key) {
			// TODO Auto-generated method stub
		}

		@Override
		public void visit(Consumable consumable) {
			consumable.consume();
			
		}

		@Override
		public void visit(ItemContainer<?> itemContainer) {
			// TODO Auto-generated method stub
			
		}
	}
	*/
	public static class UnitData {
		public String name;
		public final Attributes attributes = new Attributes();
		public final Map<Triple<TeamColor, UnitMotionType, CardinalDirection>, UnitMotionDescriptor> motions = new HashMap<Triple<TeamColor, UnitMotionType,CardinalDirection>, UnitMotionDescriptor>();
		
		public static class UnitMotionDescriptor {
			public String animation;
			public String[] sounds;
		}
		
		//public GraphicItemDescriptor graphic;
		/*
		public Array<AnimationEvent> animations = new Array<AnimationEvent>();
		public Array<SoundEvent> sounds = new Array<SoundEvent>();
		
		public boolean hasAttributes;
		
		
		public boolean canReceiveEffects;
		
		public AnimationEvent findAnimation(int facing, boolean moving, boolean attacking, boolean dying, boolean alive){
			for(AnimationEvent animation : animations){
				if(animation.facing == facing && animation.moving == moving && animation.attacking == attacking && animation.dying == dying && animation.alive == alive){
					return animation;
				}
			}
			return null;
		}
		
		public SoundEvent findSound(int facing, boolean moving, boolean attacking, boolean dying, boolean alive, boolean select){
			for(SoundEvent sound : sounds){
				if((facing & sound.facing) > 1
						&& sound.moving == moving
						&& sound.attacking == attacking
						&& sound.dying == dying
						&& sound.alive == alive
						&& sound.select == select){
					return sound;
				}
			}
			return null;
		}
		
		public static abstract class Event{
			public int facing;
			public boolean moving;
			public boolean attacking;
			public boolean dying;
			public boolean alive;
		}
		
		public static class SoundEvent extends Event{
			public Array<String> sounds = new Array<String>();
			//public boolean miss;
			public boolean select;
		}
		
		public static class AnimationEvent extends Event {
			public Array<String> animations = new Array<String>();
		}
		*/
	}
	
	public enum UnitMotionType {
		ATTACK, MOVE, IDLE, DYING, DEAD
	}
	
	public static class Attributes {
		public int strenght;
		public int accuracy;
		public int defance;
		public int stamina;
		public int speed;
		public int range;
	}
	
	/*
	public enum Attribute {
		STRENGHT, ACCURACY, DEFANCE, STAMINA, SPEED, RANGE
	}
	*/
	
	public static class ItemDescriptor {
		public String name;
	}
	
	public static interface UnitConsumer extends Consumer<Unit> {
		
	}
}

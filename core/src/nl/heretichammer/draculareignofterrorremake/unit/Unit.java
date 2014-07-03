package nl.heretichammer.draculareignofterrorremake.unit;

import java.util.EnumMap;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.Consumer;
import nl.heretichammer.draculareignofterrorremake.items.DefaultItem;
import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.items.Key;
import nl.heretichammer.draculareignofterrorremake.items.consumables.Consumable;
import nl.heretichammer.draculareignofterrorremake.items.containers.ItemContainer;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.unit.abilities.Ability;
import nl.heretichammer.draculareignofterrorremake.unit.effects.Effect;

import com.badlogic.gdx.utils.Array;

public class Unit implements Cloneable {//implements Teamable{
	
	public Unit(Model model) {
		// TODO Auto-generated constructor stub
	}
	
	//model
	private Model model;
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
	
	//sounds
	private Map<String, FlxSound> sounds = new HashMap<String, FlxSound>();
	
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
	public static class Model {
		public String name;
		public EnumMap<Attribute, Integer> attributes = new EnumMap<Unit.Attribute, Integer>(Unit.Attribute.class);
		
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
	
	public enum Attribute {
		STRENGHT, ACCURACY, DEFANCE, STAMINA, SPEED, RANGE
	}
	
	public static class ItemDescriptor {
		public String name;
	}
	
	public static interface UnitConsumer extends Consumer<Unit> {
		
	}
	
	@Override
		protected Object clone() throws CloneNotSupportedException {
			return new Unit(model);
		}
}

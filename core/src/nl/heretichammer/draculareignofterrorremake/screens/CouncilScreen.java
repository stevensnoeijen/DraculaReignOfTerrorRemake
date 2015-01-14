package nl.heretichammer.draculareignofterrorremake.screens;

import java.beans.PropertyChangeEvent;

import nl.heretichammer.draculareignofterrorremake.DRoTR;
import nl.heretichammer.draculareignofterrorremake.DRoTRGame;
import nl.heretichammer.draculareignofterrorremake.assets.Asset;
import nl.heretichammer.draculareignofterrorremake.assets.AssetUtils;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.ActorLoader;
import nl.heretichammer.draculareignofterrorremake.models.Area;
import nl.heretichammer.draculareignofterrorremake.models.Player;
import nl.heretichammer.draculareignofterrorremake.models.Resource;
import nl.heretichammer.draculareignofterrorremake.models.Troop;
import nl.heretichammer.draculareignofterrorremake.models.World;
import nl.heretichammer.draculareignofterrorremake.models.buildings.Building;
import nl.heretichammer.draculareignofterrorremake.models.producer.TroopProducer;
import nl.heretichammer.draculareignofterrorremake.models.team.Permission;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.ArchitectureUpgrader;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.ArmamentUpgrader;
import nl.heretichammer.draculareignofterrorremake.view.View;
import nl.heretichammer.draculareignofterrorremake.view.ViewUtils;
import nl.heretichammer.draculareignofterrorremake.view.binder.Binder;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.audio.Music;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
import com.badlogic.gdx.scenes.scene2d.Touchable;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.scenes.scene2d.ui.ImageButton;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.scenes.scene2d.ui.Table;
import com.badlogic.gdx.scenes.scene2d.utils.Align;
import com.badlogic.gdx.scenes.scene2d.utils.Drawable;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.google.common.eventbus.Subscribe;

public class CouncilScreen extends ActorScreen {
	private Assets assets = new Assets();
	private UI ui = new UI();
	private Player player;
	private World world;
	
	public CouncilScreen() {
		world = new World();
		player = new Player(Team.transylvanians);
		//new AIPlayer(world.findTeamByName("turks"));//will add itself to turks team
	}
	
	@Override
	protected void load(AssetManager assetManager) {
		super.load(assetManager);
		AssetUtils.load(assets, assetManager);
		assetManager.load("layout/CouncilScreen.xml", Actor.class, new ActorLoader.ActorLoaderParameter(ui));
	}
	
	@Override
	protected void loaded(AssetManager assetManager) {
		stage.addActor( assetManager.get("layout/CouncilScreen.xml", Actor.class) );
		ViewUtils.bind(stage.getRoot(), ui);
		AssetUtils.bind(assets, assetManager);
		assets.music.setLooping(true);
		super.loaded(assetManager);
	};
	
	@Override
	public void show() {
		super.show();
		setSelectedArea( world.getArea("fagaras") );
		final Team team = player.getTeam();
		
		assets.music.setVolume(DRoTR.options.music);
		assets.music.play();
		
		Binder.bind(ui.week, world, "week");
		Binder.bind(ui.year, world, "year");
		
		ArmamentUpgrader armamentUpgrader = team.getArmamentUpgrader();
		armamentUpgrader.register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				ArmamentUpgrader armamentUpgrader = (ArmamentUpgrader) e.getSource();
				String name = e.getPropertyName();
				if(name.equals("current")){
					ui.armamentLevel.setText(armamentUpgrader.getCurrent().getLevel() + "/" + armamentUpgrader.getMaxLevel());
					ui.armamentImage.setDrawable( assets.getDrawable(armamentUpgrader.getCurrent().getImage()) );
					if(armamentUpgrader.hasNext()){
						ui.armamentGold.setText( Integer.toString(armamentUpgrader.getNext().getCost(Resource.GOLD)) );
						ui.armamentTime.setText( Integer.toString(armamentUpgrader.getNext().getCost(Resource.TIME)) );
					}else{
						ui.armamentGold.setVisible(false);
						ui.armamentTime.setVisible(false);
					}
				}else if(name.equals("started")){
					ui.armamentButton.setDisabled(true);
					ui.armamentButton.setTouchable(Touchable.enabled);//cancelable
				}else if(name.equals("cancelled")){
					if(armamentUpgrader.hasNext() && armamentUpgrader.getNext().canPay()){
						ui.armamentButton.setTouchable(Touchable.enabled);
						ui.armamentButton.setDisabled(false);
					}else{
						ui.armamentButton.setTouchable(Touchable.disabled);
						ui.armamentButton.setDisabled(true);
					}
				}else if(name.equals("done")){
					if(armamentUpgrader.hasNext() && armamentUpgrader.getNext().canPay()){
						ui.armamentButton.setTouchable(Touchable.enabled);
						ui.armamentButton.setDisabled(false);
					}else{
						ui.armamentButton.setTouchable(Touchable.disabled);
						ui.armamentButton.setDisabled(true);
					}
				}
			}
		});
		ui.armamentLevel.setText(armamentUpgrader.getCurrent().getLevel() + "/" + armamentUpgrader.getMaxLevel());
		ui.armamentImage.setDrawable( assets.getDrawable(armamentUpgrader.getCurrent().getImage()) );
		ui.armamentGold.setText( Integer.toString(armamentUpgrader.getNext().getCost(Resource.GOLD)) );
		ui.armamentTime.setText( Integer.toString(armamentUpgrader.getNext().getCost(Resource.TIME)) );
		if(armamentUpgrader.hasNext() && armamentUpgrader.getNext().canPay()){
			ui.armamentButton.setTouchable(Touchable.enabled);
			ui.armamentButton.setDisabled(false);
		}else{
			ui.armamentButton.setTouchable(Touchable.disabled);
			ui.armamentButton.setDisabled(true);
		}
		
		ArchitectureUpgrader architectureUpgrader = team.getArchitectureUpgrader();
		architectureUpgrader.register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				ArchitectureUpgrader architectureUpgrader = (ArchitectureUpgrader) e.getSource();
				String name = e.getPropertyName();
				if(name.equals("current")){
					ui.architectureLevel.setText(architectureUpgrader.getCurrent().getLevel() + "/" + architectureUpgrader.getMaxLevel());
					ui.architectureImage.setDrawable( assets.getDrawable(architectureUpgrader.getCurrent().getImage()) );
					if(architectureUpgrader.hasNext()){
						ui.architectureGold.setText( Integer.toString(architectureUpgrader.getNext().getCost(Resource.GOLD)) );
						ui.architectureTime.setText( Integer.toString(architectureUpgrader.getNext().getCost(Resource.TIME)) );
					}else{
						ui.architectureGold.setVisible(false);
						ui.architectureTime.setVisible(false);
					}
				}else if(name.equals("started")){
					ui.architectureButton.setDisabled(true);
					ui.architectureButton.setTouchable(Touchable.enabled);//cancelable
				}else if(name.equals("cancelled")){
					if(architectureUpgrader.hasNext() && architectureUpgrader.getNext().canPay()){
						ui.architectureButton.setDisabled(false);
						ui.architectureButton.setTouchable(Touchable.enabled);
					}else{
						ui.architectureButton.setDisabled(true);
						ui.architectureButton.setTouchable(Touchable.disabled);
					}
				}else if(name.equals("done")){
					if(architectureUpgrader.hasNext() && architectureUpgrader.getNext().canPay()){
						ui.architectureButton.setDisabled(false);
						ui.architectureButton.setTouchable(Touchable.enabled);
					}else{
						ui.architectureButton.setDisabled(true);
						ui.architectureButton.setTouchable(Touchable.disabled);
					}
				}
			}
		});
		ui.architectureLevel.setText(architectureUpgrader.getCurrent().getLevel() + "/" + architectureUpgrader.getMaxLevel());
		ui.architectureImage.setDrawable( assets.getDrawable(architectureUpgrader.getCurrent().getImage()) );
		ui.architectureGold.setText( Integer.toString(architectureUpgrader.getNext().getCost(Resource.GOLD)) );
		ui.architectureTime.setText( Integer.toString(architectureUpgrader.getNext().getCost(Resource.TIME)) );
		if(architectureUpgrader.hasNext() && architectureUpgrader.getNext().canPay()){
			ui.architectureButton.setTouchable(Touchable.enabled);
			ui.architectureButton.setDisabled(false);
		}else{
			ui.architectureButton.setTouchable(Touchable.disabled);
			ui.architectureButton.setDisabled(true);
		}
	}
	
	public void setSelectedArea(Area selectedArea) {
		if(player.getSelectedArea() != null){
			Binder.unbind(ui.gold, ui.wood, ui.food, ui.men, ui.army);
			Binder.unbind(ui.goldIncome, ui.woodIncome, ui.foodIncome, ui.menIncome);
		}
		
		player.setSelectedArea(selectedArea);
		Team team = player.getTeam();
		
		ui.location.setText( selectedArea.getName() );
		
		//resources
		Binder.bind(ui.gold, selectedArea, "resource", Resource.GOLD);
		Binder.bind(ui.wood, selectedArea, "resource", Resource.WOOD);
		Binder.bind(ui.food, selectedArea, "resource", Resource.FOOD);
		Binder.bind(ui.men, selectedArea, "resource", Resource.MEN);
		Binder.bind(ui.army, selectedArea, "army");
		//income
		Binder.bind(ui.goldIncome, selectedArea, "resourceIncome", Resource.GOLD);
		Binder.bind(ui.woodIncome, selectedArea, "resourceIncome", Resource.WOOD);
		Binder.bind(ui.foodIncome, selectedArea, "resourceIncome", Resource.FOOD);
		Binder.bind(ui.menIncome, selectedArea, "resourceIncome", Resource.MEN);
		
		//resources
		selectedArea.register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				if(e.getPropertyName().equals("resources")){
					Area area = (Area)e.getSource();
					//trainings
					if(!area.getTroopProducer("swordsoldier").isStarted() && area.getTroopProducer("swordsoldier").canSupplyCost()){
						ui.trainerSwordsoldiers.setDisabled(false);
					}else{
						ui.trainerSwordsoldiers.setDisabled(true);
					}
					if(!area.getTroopProducer("crossbowsoldier").isStarted() && area.getTroopProducer("crossbowsoldier").canSupplyCost()){
						ui.trainerCrossbowsoldiers.setDisabled(false);
					}else{
						ui.trainerCrossbowsoldiers.setDisabled(true);
					}
					if(!area.getTroopProducer("knight").isStarted() && area.getTroopProducer("knight").canSupplyCost()){
						ui.trainerKnight.setDisabled(false);
					}else{
						ui.trainerKnight.setDisabled(true);
					}
					if(!area.getTroopProducer("juggernaut").isStarted() && area.getTroopProducer("juggernaut").canSupplyCost()){
						ui.trainerJuggernaut.setDisabled(false);
					}else{
						ui.trainerJuggernaut.setDisabled(true);
					}
					if(!area.getTroopProducer("catapult").isStarted() && area.getTroopProducer("catapult").canSupplyCost()){
						ui.trainerCatapult.setDisabled(false);
					}else{
						ui.trainerCatapult.setDisabled(true);
					}
					if(!area.getTroopProducer("cannon").isStarted() && area.getTroopProducer("cannon").canSupplyCost()){
						ui.trainerCannon.setDisabled(false);
					}else{
						ui.trainerCannon.setDisabled(true);
					}
					if(!area.getTroopProducer("spy").isStarted() && area.getTroopProducer("spy").canSupplyCost()){
						ui.trainerSpy.setDisabled(false);
					}else{
						ui.trainerSpy.setDisabled(true);
					}
				}
			}
		});
		team.register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				if(e.getPropertyName().equals("permissions")){
					Team team = player.getTeam();
					if(team.hasPermission(Permission.SWORDSMEN)){
						ui.trainerSwordsoldiers.setVisible(true);
					}else{
						ui.trainerSwordsoldiers.setVisible(false);
					}
					if(team.hasPermission(Permission.CROSSBOWSOLDIERS)){
						ui.trainerCrossbowsoldiers.setVisible(true);
					}else{
						ui.trainerCrossbowsoldiers.setVisible(false);
					}
					if(team.hasPermission(Permission.KNIGHT)){
						ui.trainerKnight.setVisible(true);
					}else{
						ui.trainerKnight.setVisible(false);
					}
					if(team.hasPermission(Permission.JUGGERNAUT)){
						ui.trainerJuggernaut.setVisible(true);
					}else{
						ui.trainerJuggernaut.setVisible(false);
					}
					if(team.hasPermission(Permission.CATAPULT)){
						ui.trainerCatapult.setVisible(true);
					}else{
						ui.trainerCatapult.setVisible(false);
					}
					if(team.hasPermission(Permission.CANNON)){
						ui.trainerCannon.setVisible(true);
					}else{
						ui.trainerCannon.setVisible(false);
					}
					if(team.hasPermission(Permission.SPY)){
						ui.trainerSpy.setVisible(true);
					}else{
						ui.trainerSpy.setVisible(false);
					}
				}
			}
		});
		
		//started
		//swordsoldiers
		selectedArea.getTroopProducer("swordsoldier").register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				String propertyName = e.getPropertyName();
				if(propertyName.equals("started")){
					if(e.getNewValue().equals(true)){
						ui.trainerSwordsoldiers.setDisabled(true);
					}else{
						ui.trainerSwordsoldiers.setDisabled(false);
					}
				}
			}
		});
		if(!team.hasPermission(Permission.SWORDSMEN)){
			ui.trainerSwordsoldiers.setVisible(false);
		}
		
		selectedArea.getTroopProducer("crossbowsoldier").register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				String propertyName = e.getPropertyName();
				if(propertyName.equals("started")){
					if(e.getNewValue().equals(true)){
						ui.trainerCrossbowsoldiers.setDisabled(true);
					}else{
						ui.trainerCrossbowsoldiers.setDisabled(false);
					}
				}
			}
		});
		if(!team.hasPermission(Permission.CROSSBOWSOLDIERS)){
			ui.trainerCrossbowsoldiers.setVisible(false);
		}
		
		selectedArea.getTroopProducer("knight").register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				String propertyName = e.getPropertyName();
				if(propertyName.equals("started")){
					if(e.getNewValue().equals(true)){
						ui.trainerKnight.setDisabled(true);
					}else{
						ui.trainerKnight.setDisabled(false);
					}
				}
			}
		});
		if(!team.hasPermission(Permission.KNIGHT)){
			ui.trainerKnight.setVisible(false);
		}
		
		selectedArea.getTroopProducer("juggernaut").register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				String propertyName = e.getPropertyName();
				if(propertyName.equals("started")){
					if(e.getNewValue().equals(true)){
						ui.trainerJuggernaut.setDisabled(true);
					}else{
						ui.trainerJuggernaut.setDisabled(false);
					}
				}
			}
		});
		if(!team.hasPermission(Permission.JUGGERNAUT)){
			ui.trainerJuggernaut.setVisible(false);
		}
		
		selectedArea.getTroopProducer("catapult").register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				String propertyName = e.getPropertyName();
				if(propertyName.equals("started")){
					if(e.getNewValue().equals(true)){
						ui.trainerCatapult.setDisabled(true);
					}else{
						ui.trainerCatapult.setDisabled(false);
					}
				}
			}
		});
		if(!team.hasPermission(Permission.CATAPULT)){
			ui.trainerCatapult.setVisible(false);
		}
		
		selectedArea.getTroopProducer("cannon").register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				String propertyName = e.getPropertyName();
				if(propertyName.equals("started")){
					if(e.getNewValue().equals(true)){
						ui.trainerCannon.setDisabled(true);
					}else{
						ui.trainerCannon.setDisabled(false);
					}
				}
			}
		});
		if(!team.hasPermission(Permission.CANNON)){
			ui.trainerCannon.setVisible(false);
		}
		
		selectedArea.getTroopProducer("spy").register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				String propertyName = e.getPropertyName();
				if(propertyName.equals("started")){
					if(e.getNewValue().equals(true)){
						ui.trainerSpy.setDisabled(true);
					}else{
						ui.trainerSpy.setDisabled(false);
					}
				}
			}
		});
		if(!team.hasPermission(Permission.SPY)){
			ui.trainerSpy.setVisible(false);
		}
		
		selectedArea.register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				String name = e.getPropertyName();
				if(name.equals("resources")){
					Team team = player.getTeam();
					if(!team.getArmamentUpgrader().isStarted()){
						if(team.getArmamentUpgrader().hasNext() && team.getArmamentUpgrader().getNext().canPay()){
							ui.armamentButton.setTouchable(Touchable.enabled);
							ui.armamentButton.setDisabled(false);
						}else{
							ui.armamentButton.setTouchable(Touchable.disabled);
							ui.armamentButton.setDisabled(true);
						}
					}
					
					if(!team.getArchitectureUpgrader().isStarted()){
						if(team.getArchitectureUpgrader().hasNext() && team.getArchitectureUpgrader().getNext().canPay()){
							ui.architectureButton.setTouchable(Touchable.enabled);
							ui.architectureButton.setDisabled(false);
						}else{
							ui.architectureButton.setTouchable(Touchable.disabled);
							ui.architectureButton.setDisabled(true);
						}
					}
				}
			}
		});
	}
	
	private void hideAllTabs(){
		//hide all
		ui.tabTraining.setVisible(false);
		ui.tabMovement.setVisible(false);
		ui.tabConstructions.setVisible(false);
		ui.tabInformation.setVisible(false);
		ui.tabAdministration.setVisible(false);
	}
	
	/**
	 * Adds +, - or nothing in front of the income and returns it as a {@link String}.
	 * @param income
	 * @return
	 */
	private static String incomeToString(int income) {
		if(income > 0 ) {
			return "+" + income;
		}else if(income < 0) {
			return "-" + income;
		}else {//is 0
			return String.valueOf(income);
		}
	}
	
	private static enum BuildingType {
		BRIDGE, TOWER, CASTLE
	}
	
	private Building selectedBuilding = null;
	public static final int CONSTRUCTIONMODE_REPAIR = 1, CONSTRUCTIONMODE_UPGRADE = 2, CONSTRUCTIONMODE_BUILD = 3;
	private int constructionMode = CONSTRUCTIONMODE_REPAIR;
	private BuildingType selectedBuildingType = BuildingType.BRIDGE;
	private boolean selectedBuildingTypeWithMoat = false;
	private int selectedBuildingLevel = 0;
	
	private void setConstructionMode(int constructionMode) {
		if( constructionMode == CONSTRUCTIONMODE_REPAIR || constructionMode == CONSTRUCTIONMODE_UPGRADE || constructionMode == CONSTRUCTIONMODE_BUILD ) {
			this.constructionMode = constructionMode;
		}
	}
	
	private void setSelectedBuildingType(BuildingType selectedBuildingType) {
		this.selectedBuildingType = selectedBuildingType;
	}
	
	private ImageButton.ImageButtonStyle createMovementImageButtonStyle(String name){		
		ImageButton.ImageButtonStyle style = new ImageButton.ImageButtonStyle();
		style.up = assets.getDrawable("ui-checkbox-" + name);
		style.checked = assets.getDrawable("ui-checkbox-" + name + "-selected");
		style.disabled = assets.getDrawable("ui-checkbox-" + name + "-disabled");		
		
		return style;
	}
	
	@Override
	public void dispose() {
		super.dispose();
		//TODO: check if al loaded assets in this class will be disposed automaticly?
	}
	
	public class Assets {
		@Asset("image/council.pack") private TextureAtlas images;
		@Asset("music/council1.mp3") private Music music;
		
		//sounds
		@Asset("sound/click.ogg") private Sound sound_click;
		//upgrading
		@Asset("sound/upgrading armerment.ogg") private Sound sound_upgradingArmerment;
		@Asset("sound/upgrading architecture.ogg") private Sound sound_upgradingArchitecture;
		@Asset("sound/training swordsoldiers.ogg") private Sound sound_trainingSwordsoldiers;
		@Asset("sound/training crossbowsoldiers.ogg") private Sound sound_trainingCrossbowsoldiers;
		@Asset("sound/building juggernaut.ogg") private Sound sound_trainingJuggernaut;
		@Asset("sound/training a knight.ogg") private Sound sound_trainingKnight;
		@Asset("sound/building a catapult.ogg") private Sound sound_trainingCatapult;
		@Asset("sound/building a cannon.ogg") private Sound sound_trainingCannon;
		@Asset("sound/training spies.ogg") private Sound sound_trainingSpies;
		@Asset("sound/training cancelled.ogg") private Sound sound_trainingCancelled;
		//construction
		//repair
		@Asset("sound/repairing bridge.ogg") private Sound sound_repairingBridge;
		@Asset("sound/repairing tower.ogg") private Sound sound_repairingTower;
		@Asset("sound/repairing stronghold.ogg") private Sound sound_repairingStronghold;
		@Asset("sound/repairing fortification.ogg") private Sound sound_repairingFortification;
		@Asset("sound/repairing cancelled.ogg") private Sound sound_repairingCancelled;
		//upgrade
		@Asset("sound/upgrading stronghold.ogg") private Sound sound_upgradingStronghold;
		@Asset("sound/upgrading fortification.ogg") private Sound sound_upgradingFortification;
		@Asset("sound/upgrading cancelled.ogg") private Sound sound_upgradingCancelled;
		//build
		@Asset("sound/building bridge.ogg") private Sound sound_buildingBridge;
		@Asset("sound/building tower.ogg") private Sound sound_buildingTower;
		@Asset("sound/building stronghold.ogg") private Sound sound_buildingStronghold;
		@Asset("sound/building fortification.ogg") private Sound sound_buildingFortification;
		@Asset("sound/building cancelled.ogg") private Sound sound_buildingCancelled;
		@Asset("sound/building completed.ogg") private Sound sound_buildingCompleted;
		
		public Drawable getDrawable(String name){
			if(name.startsWith("image/council.pack:")){
				name = name.replace("image/council.pack:", "");
				return new TextureRegionDrawable(images.findRegion(name));
			}else{
				throw new IllegalArgumentException();
			}
		}
	}
	
	public class UI {
		private static final String TOOLTIP_AREA_SELECTED = "In %s";
		private static final String TOOLTIP_GOLD = "Available gold and the progress";
		private static final String TOOLTIP_WOOD = "Available wood and the progress";
		private static final String TOOLTIP_FOOD = "Available food and the progress";
		private static final String TOOLTIP_MEN = "Available men and the progress";
		private static final String TOOLTIP_ARMY = "Available army and the progress";
		private static final String INFO_NOTKNOWN = "This is not known, yet...";
		private static final String INFO_SELECTS = "Selects %s";
		private static final String TOOLTIP_CONFIRM = "Confirm orders and advance to next turn";
		//unit properties
		private static final String TOOLTIP_UNIT_ATTACK = "Attack strength";
		private static final String TOOLTIP_UNIT_ACCURACY = "Accuracy of aim";
		private static final String TOOLTIP_UNIT_DEFENCE = "Defence strength";
		private static final String TOOLTIP_UNIT_STAMINA = "Stamina";
		private static final String TOOLTIP_UNIT_SPEED = "Speed";
		private static final String TOOLTIP_UNIT_RANGE = "Range";
		//resources
		private static final String TOOLTIP_RESOURCE_GOLD = "Gold";
		private static final String TOOLTIP_RESOURCE_WOOD = "Wood";
		private static final String TOOLTIP_RESOURCE_FOOD = "Food";
		//building types
		private static final String TOOLTIP_BUILDINGTYPE_BRIDGE = "bridge";
		private static final String TOOLTIP_BUILDINGTYPE_TOWER = "tower";
		private static final String TOOLTIP_BUILDINGTYPE_CASTLE = "castle";
		//graph
		private static final String TOOLTIP_TOGGLE_GRAPH = "Click to toggle graph";
		//training
		private static final String TOOLTIP_TRAINING_COST_GOLD = "Cost in gold";
		private static final String TOOLTIP_TRAINING_COST_TIME = "Time to produce";
		private static final String TOOLTIP_TRAINING_UNIT_SWORDSMEN = "Train five swordsmen";
		private static final String TOOLTIP_TRAINING_UNIT_CROSSBOWSOLDIERS = "Train five crossbowsoldiers";
		private static final String TOOLTIP_TRAINING_UNIT_JUGGERNAUT = "Build a juggernaut";
		//movements
		private static final String TOOLTIP_MOVEMENT_SELECT = "Select troops and click on a province to move or attack";
		//construction
		private static final String TOOLTIP_CONSTRUCTION_REPAIR_SELECT = "Select repair mode";
		private static final String TOOLTIP_CONSTRUCTION_REPAIR = "Click to repair";
		private static final String TOOLTIP_CONSTRUCTION_UPGRADE_SELECT = "Select upgrade mode";
		private static final String TOOLTIP_CONSTRUCTION_UPGRADE = "Click to upgrade";
		private static final String TOOLTIP_CONSTRUCTION_BUILD_SELECT = "Select build mode";
		private static final String TOOLTIP_CONSTRUCTION_BUILD = "Click to build";
		private static final String TOOLTIP_CONSTRUCTION_MINIMAP = "Use minimap to start building";
		private static final String TOOLTIP_CONSTRUCTION_MINIMAP_SHOW = "Shows a minimap of the province";
		private static final String TOOLTIP_CONSTRUCTION_ARCHITECTURES = "Select different architectures";
		private static final String TOOLTIP_CONSTRUCTION_BUILD_BUILDING = "Build %s";
		//information
		private static final String INFO_INFORMATION_TROOPS = "Shows all your troops in province";
		private static final String INFO_INFORMATION_BUILDING = "Shows all buildings in province";
		private static final String TOOLTIP_INFORMATION_RESOURCE_GOLD = "Gold resources produced per week in Province";
		private static final String TOOLTIP_INFORMATION_RESOURCE_WOOD = "Building material resources produced per week in Province";
		private static final String TOOLTIP_INFORMATION_RESOURCE_FOOD = "Food resources produced per week in Province";
		private static final String TOOLTIP_INFORMATION_RESOURCE_MEN = "MEn resources produced per week in Province";
		private static final String INFP_INFORMATION_SCOUTREPORT = "Out spies report";
		//administration
		private static final String TOOLTIP_ADMINISTRATION_ARMAMENT = "Armament";
		private static final String TOOLTIP_ADMINISTRATION_ARCHITECTURE = "Architecture";
		private static final String TOOLTIP_ADMINISTRATION_UPGRADE = "Upgrade level of %s";
		private static final String TOOLTIP_ADMINISTRATION_INPROGRESS = "In progress\nClick to cancel";
		//reports
		private static final String REPORT_UNDERATTACK = "We're under attack!\nThe turks have crossed  the border of %s. Now we must defend our ground until last man falls";
		private static final String REPORT_SCOUT = "Scouts reporting!\nOur spies in the county of %s has succeeded in sending us resource information!";		
		
		//views auto-bind to the given name in the stage
		//tabs
		@View("tab.background") private Image tabBackground;
		@View("tab.training") private Group tabTraining;
		@View("tab.movement") private Group tabMovement;
		@View("tab.constructions") private Group tabConstructions;
		@View("tab.information") private Group tabInformation;
		@View("tab.administration") private Group tabAdministration;
		//info
		@View("location") private Label location;
		@View("info") private Label info;
		@View("week") private Label week;
		@View("year") private Label year;
		//resources
		@View("gold") private Label gold;
		@View("wood") private Label wood;
		@View("food") private Label food;
		@View("men") private Label men;
		@View("army") private Label army;
		@View("goldIncome") private Label goldIncome;
		@View("woodIncome") private Label woodIncome;
		@View("foodIncome") private Label foodIncome;
		@View("menIncome") private Label menIncome;
		//trainers
		@View("trainer.swordsoldiers") private ImageButton trainerSwordsoldiers;
		@View("trainer.crossbowsoldiers") private ImageButton trainerCrossbowsoldiers;
		@View("trainer.knight") private ImageButton trainerKnight;
		@View("trainer.juggernaut") private ImageButton trainerJuggernaut;
		@View("trainer.catapult") private ImageButton trainerCatapult;
		@View("trainer.cannon") private ImageButton trainerCannon;
		@View("trainer.spy") private ImageButton trainerSpy;
		//administration
		//armament
		@View("administration.armament.level") private Label armamentLevel;
		@View("administration.armament.image") private Image armamentImage;
		@View("administration.armament.gold") private Label armamentGold;
		@View("administration.armament.time") private Label armamentTime;
		@View("administration.armament.button") private ImageButton armamentButton;
		//architecture
		@View("administration.architecture.level") private Label architectureLevel;
		@View("administration.architecture.image") private Image architectureImage;
		@View("administration.architecture.gold") private Label architectureGold;
		@View("administration.architecture.time") private Label architectureTime;
		@View("administration.architecture.button") private ImageButton architectureButton;
		
		public void selectArea(InputEvent event){
			String name = event.getTarget().getUserObject().toString();
			Area area = world.getArea(name);
			setSelectedArea(area);
		}
		
		public void week(InputEvent event){
			assets.sound_click.play();
			world.week();
		}
		
		public void showTrainingTab(InputEvent event){
			hideAllTabs();
			ui.tabBackground.setDrawable(assets.getDrawable("image/council.pack:ui-tab-training"));
			ui.tabTraining.setVisible(true);
		}
		
		public void showMovementTab(InputEvent event){
			hideAllTabs();
			ui.tabBackground.setDrawable(assets.getDrawable("image/council.pack:ui-tab-movement"));
			
			Group root = stage.getRoot();
			Table table = root.findActor("movement.troops");
			table.clear();
			table.row().align(Align.topLeft);
			int column = 0;
			for(Troop troop : player.getSelectedArea().getTroops()) {
				column++;
				ImageButton button = new ImageButton( createMovementImageButtonStyle(troop.getUnitName()) );
				table.add(button).width(42).center();
				if(column == 4) {
					table.row().align(Align.topLeft);
					column = 0;
				}
			}
			
			ui.tabMovement.setVisible(true);
		}
		
		public void showConstructionsTab(InputEvent event){
			hideAllTabs();
			ui.tabBackground.setDrawable(assets.getDrawable("image/council.pack:ui-tab-construction"));
			ui.tabConstructions.setVisible(true);
		}
		
		public void showInformationTab(InputEvent event){
			hideAllTabs();
			ui.tabBackground.setDrawable(assets.getDrawable("image/council.pack:ui-tab-information"));
			ui.tabInformation.setVisible(true);
		}
		
		public void showAdministrationTab(InputEvent event){
			hideAllTabs();
			ui.tabBackground.setDrawable(assets.getDrawable("image/council.pack:ui-tab-administration"));
			ui.tabAdministration.setVisible(true);
		}
		
		public void trainTroop(InputEvent event){
			String name = event.getTarget().getUserObject().toString();
			TroopProducer<?> troopProducer = player.getSelectedArea().getTroopProducer(name);
			
			if(!troopProducer.isStarted()){
				if(name.equals("swordsoldier")){
					assets.sound_trainingSwordsoldiers.play();
				}else if(name.equals("crossbowsoldier")){
					assets.sound_trainingCrossbowsoldiers.play();
				}else if(name.equals("knight")){
					assets.sound_trainingKnight.play();
				}else if(name.equals("juggernaut")){
					assets.sound_trainingJuggernaut.play();
				}else if(name.equals("catapult")){
					assets.sound_trainingCatapult.play();
				}else if(name.equals("cannon")){
					assets.sound_trainingCannon.play();
				}else if(name.equals("spy")){
					assets.sound_trainingSpies.play();
				}
				troopProducer.start();
			}else{//stop
				assets.sound_trainingCancelled.play();
				troopProducer.stop();
			}
		}
		
		public void repairBuilding(InputEvent event){
			setConstructionMode(CONSTRUCTIONMODE_REPAIR);
		}
		
		public void upgradeBuilding(InputEvent event){
			setConstructionMode(CONSTRUCTIONMODE_UPGRADE);
		}
		
		public void buildBuilding(InputEvent event){
			setConstructionMode(CONSTRUCTIONMODE_BUILD);
		}
		
		public void buildingTypeBridge(InputEvent event){
			setSelectedBuildingType(BuildingType.BRIDGE);
		}
		
		public void buildingTypeTower(InputEvent event){
			setSelectedBuildingType(BuildingType.TOWER);
		}
		
		public void buildingTypeCastle(InputEvent event){
			setSelectedBuildingType(BuildingType.CASTLE);
		}
		
		public void buildingTypeCastle2(InputEvent event){
			selectedBuildingTypeWithMoat = true;
			setSelectedBuildingType(BuildingType.CASTLE);
		}
		
		public void number(InputEvent event){
			System.out.println(event.getListenerActor().getUserObject());
		}
		
		public void upgradeArmament(InputEvent event){
			ArmamentUpgrader armamentUpgrader = player.getTeam().getArmamentUpgrader();
			if(!armamentUpgrader.isStarted()){
				armamentUpgrader.getNext().start();;
				assets.sound_upgradingArmerment.play();
			}else{//cancel
				armamentUpgrader.getNext().cancel();
				assets.sound_upgradingCancelled.play();
			}
		}
		
		public void upgradeArchitecture(InputEvent event){
			ArchitectureUpgrader architectureUpgrader = player.getTeam().getArchitectureUpgrader();
			if(!architectureUpgrader.isStarted()){
				architectureUpgrader.getNext().start();
				assets.sound_upgradingArchitecture.play();
			}else{
				architectureUpgrader.getNext().cancel();
				assets.sound_upgradingCancelled.play();
			}
		}
	}
}

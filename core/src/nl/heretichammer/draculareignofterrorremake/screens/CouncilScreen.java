package nl.heretichammer.draculareignofterrorremake.screens;

import java.beans.PropertyChangeEvent;

import nl.heretichammer.draculareignofterrorremake.DRoTRGame;
import nl.heretichammer.draculareignofterrorremake.Player;
import nl.heretichammer.draculareignofterrorremake.annotations.Asset;
import nl.heretichammer.draculareignofterrorremake.annotations.View;
import nl.heretichammer.draculareignofterrorremake.models.Area;
import nl.heretichammer.draculareignofterrorremake.models.Resource;
import nl.heretichammer.draculareignofterrorremake.models.Troop;
import nl.heretichammer.draculareignofterrorremake.models.World;
import nl.heretichammer.draculareignofterrorremake.models.buildings.Building;
import nl.heretichammer.draculareignofterrorremake.models.events.ResourceChangeEvent;
import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.ArchitectureUpgrader;
import nl.heretichammer.draculareignofterrorremake.models.upgraders.ArmamentUpgrader;
import nl.heretichammer.draculareignofterrorremake.utils.ActorLoader;
import nl.heretichammer.draculareignofterrorremake.utils.AssetUtils;
import nl.heretichammer.draculareignofterrorremake.utils.Binder;
import nl.heretichammer.draculareignofterrorremake.utils.ViewUtils;

import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.audio.Music;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.scenes.scene2d.InputEvent;
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
	private Area selectedArea;
	
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
		super.loaded(assetManager);
	};
	
	@Override
	public void show() {
		super.show();
		setSelectedArea( world.getArea("fagaras") );
		final Team team = player.getTeam();
		
		if(DRoTRGame.preferences.getBoolean("music")){
			assets.music.play();
		}
		
		Binder.bind(ui.week, world, "week");
		Binder.bind(ui.year, world, "year");
		
		world.register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				String name = e.getPropertyName();
				if(name.equals("week")){					
					if(team.getArmamentUpgrader().canPayNextUpgrade()){
						ui.armamentButton.setDisabled(true);
					}else{
						ui.armamentButton.setDisabled(false);
					}
					
					if(team.getArchitectureUpgrader().canPayNextUpgrade()){
						ui.architectureButton.setDisabled(true);
					}else{
						ui.architectureButton.setDisabled(false);
					}
				}
			}
		});
		
		ArmamentUpgrader armamentUpgrader = team.getArmamentUpgrader();
		armamentUpgrader.register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				ArmamentUpgrader armamentUpgrader = (ArmamentUpgrader) e.getSource();
				String name = e.getPropertyName();
				if(name.equals("level")){
					ui.armamentLevel.setText(armamentUpgrader.getLevel() + "/" + armamentUpgrader.getMaxLevel());
					ui.armamentImage.setDrawable( assets.getDrawable(armamentUpgrader.getImage()) );
					ui.armamentGold.setText( Integer.toString(armamentUpgrader.getNextUpgradeCost(Resource.GOLD)) );
					ui.armamentTime.setText( Integer.toString(armamentUpgrader.getNextUpgradeCost(Resource.TIME)) );					
				}
			}
		});
		ui.armamentLevel.setText(armamentUpgrader.getLevel() + "/" + armamentUpgrader.getMaxLevel());
		ui.armamentImage.setDrawable( assets.getDrawable(armamentUpgrader.getImage()) );
		ui.armamentGold.setText( Integer.toString(armamentUpgrader.getNextUpgradeCost(Resource.GOLD)) );
		ui.armamentTime.setText( Integer.toString(armamentUpgrader.getNextUpgradeCost(Resource.TIME)) );
		if(armamentUpgrader.canPayNextUpgrade()){
			ui.armamentButton.setDisabled(true);
		}else{
			ui.armamentButton.setDisabled(false);
		}
		
		ArchitectureUpgrader architectureUpgrader = team.getArchitectureUpgrader();
		architectureUpgrader.register(new Object(){
			@Subscribe
			public void on(PropertyChangeEvent e){
				ArchitectureUpgrader architectureUpgrader = (ArchitectureUpgrader) e.getSource();
				String name = e.getPropertyName();
				if(name.equals("level")){
					ui.architectureLevel.setText(architectureUpgrader.getLevel() + "/" + architectureUpgrader.getMaxLevel());
					ui.architectureImage.setDrawable( assets.getDrawable(architectureUpgrader.getImage()) );
					ui.architectureGold.setText( Integer.toString(architectureUpgrader.getNextUpgradeCost(Resource.GOLD)) );
					ui.architectureTime.setText( Integer.toString(architectureUpgrader.getNextUpgradeCost(Resource.TIME)) );
				}
			}
		});
		ui.architectureLevel.setText(architectureUpgrader.getLevel() + "/" + architectureUpgrader.getMaxLevel());
		ui.architectureImage.setDrawable( assets.getDrawable(architectureUpgrader.getImage()) );
		ui.architectureGold.setText( Integer.toString(architectureUpgrader.getNextUpgradeCost(Resource.GOLD)) );
		ui.architectureTime.setText( Integer.toString(architectureUpgrader.getNextUpgradeCost(Resource.TIME)) );
		if(architectureUpgrader.canPayNextUpgrade()){
			ui.architectureButton.setDisabled(true);
		}else{
			ui.architectureButton.setDisabled(false);
		}
	}
	
	public void setSelectedArea(Area selectedArea) {
		if(this.selectedArea != null){
			Binder.unbind(ui.gold, ui.wood, ui.food, ui.men, ui.army);
			Binder.unbind(ui.goldIncome, ui.woodIncome, ui.foodIncome, ui.menIncome);
		}
		
		this.selectedArea = selectedArea;
		Team team = player.getTeam();
		team.getArchitectureUpgrader().setResourceSupplier(selectedArea);
		team.getArmamentUpgrader().setResourceSupplier(selectedArea);
		
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
	public static String incomeToString(int income) {
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
	
	public static class Assets {
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
			for(Troop troop : selectedArea.getTroops()) {
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
			
			//TroopProducer<?> troopProducer = selectedArea.getTroopProducer(name);
			//troopProducer.start();
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
			player.getTeam().getArmamentUpgrader().startNextUpgrade();
			assets.sound_upgradingArmerment.play();
		}
		
		public void upgradeArchitecture(InputEvent event){
			player.getTeam().getArchitectureUpgrader().startNextUpgrade();
			assets.sound_upgradingArchitecture.play();
		}
	}
}
